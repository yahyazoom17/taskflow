"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensors,
  useSensor,
  closestCorners,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { toast } from "sonner";
import { ArrowLeft, Search } from "lucide-react";
import { KanbanColumn } from "@/components/kanban-column";
import { TaskCard } from "@/components/task-card";
import { TaskDialog } from "@/components/task-dialog";
import { SearchBar } from "@/components/search-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { createTask, updateTask, deleteTask, reorderTasks } from "@/lib/actions";
import { COLUMNS, type Task, type Status, type Priority } from "@/lib/types";

interface KanbanBoardClientProps {
  initialTasks: Task[];
}

export function KanbanBoardClient({ initialTasks }: KanbanBoardClientProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<Status>("todo");

  // Defer DndContext rendering to avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  // Sensors with activation constraints
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Filter tasks by search query
  const filteredTasks = useMemo(() => {
    if (!search.trim()) return tasks;
    const q = search.toLowerCase();
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q))
    );
  }, [tasks, search]);

  // Group tasks by status column
  const tasksByColumn = useMemo(() => {
    const grouped: Record<Status, Task[]> = {
      todo: [],
      "in-progress": [],
      completed: [],
    };
    for (const task of filteredTasks) {
      grouped[task.status].push(task);
    }
    return grouped;
  }, [filteredTasks]);

  // Find which column a task belongs to
  const findContainer = useCallback(
    (id: string): Status | undefined => {
      if (["todo", "in-progress", "completed"].includes(id)) return id as Status;
      const task = tasks.find((t) => t.id === id);
      return task?.status;
    },
    [tasks]
  );

  // --- Drag handlers ---
  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === active.id ? { ...t, status: overContainer } : t
      );
      return updated;
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (!activeContainer || !overContainer) return;

    if (active.id !== over.id) {
      const columnTasks = tasks.filter((t) => t.status === overContainer);
      const otherTasks = tasks.filter((t) => t.status !== overContainer);

      const oldIndex = columnTasks.findIndex((t) => t.id === active.id);
      const newIndex = columnTasks.findIndex((t) => t.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(columnTasks, oldIndex, newIndex);
      const updated = [...otherTasks, ...reordered];

      setTasks(updated);
      reorderTasks(updated).catch(() => toast.error("Failed to save changes"));
    } else {
      reorderTasks(tasks).catch(() => toast.error("Failed to save changes"));
    }
  }

  // --- CRUD handlers ---
  function handleAddTask(status: Status) {
    setEditingTask(null);
    setDefaultStatus(status);
    setDialogOpen(true);
  }

  function handleEditTask(task: Task) {
    setEditingTask(task);
    setDefaultStatus(task.status);
    setDialogOpen(true);
  }

  async function handleDeleteTask(id: string) {
    const prev = tasks;
    setTasks((t) => t.filter((task) => task.id !== id));
    toast.success("Task deleted");

    try {
      await deleteTask(id);
    } catch {
      setTasks(prev);
      toast.error("Failed to delete task");
    }
  }

  async function handleSaveTask(data: {
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    dueDate?: string;
  }) {
    if (editingTask) {
      const prev = tasks;
      const updated = tasks.map((t) =>
        t.id === editingTask.id ? { ...t, ...data } : t
      );
      setTasks(updated);
      toast.success("Task updated");

      try {
        await updateTask(editingTask.id, data);
      } catch {
        setTasks(prev);
        toast.error("Failed to update task");
      }
    } else {
      try {
        const updated = await createTask(data);
        setTasks(updated);
        toast.success("Task created");
      } catch {
        toast.error("Failed to create task");
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <img
                src="./brand.png"
                alt="TaskFlow"
                className="w-10 h-10 rounded-full border border-border/50"
              />
              <div>
                <h1 className="text-xl font-semibold text-foreground tracking-tight">
                  TaskFlow Board
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {tasks.length} task{tasks.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SearchBar value={search} onChange={setSearch} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Board */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {mounted ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COLUMNS.map((col) => (
                  <KanbanColumn
                    key={col.id}
                    id={col.id}
                    title={col.title}
                    tasks={tasksByColumn[col.id]}
                    onAddTask={handleAddTask}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                  />
                ))}
              </div>

              <DragOverlay>
                {activeTask && (
                  <TaskCard
                    task={activeTask}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    isDragOverlay
                  />
                )}
              </DragOverlay>
            </DndContext>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COLUMNS.map((col) => (
                <div key={col.id} className="flex flex-col min-h-0 rounded-xl">
                  <div className="flex items-center justify-between px-1 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/60" />
                      <h3 className="text-sm font-semibold text-foreground tracking-tight">{col.title}</h3>
                      <span className="text-xs text-muted-foreground font-medium tabular-nums">
                        {tasksByColumn[col.id].length}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 min-h-[120px] px-0.5 animate-pulse">
                    {tasksByColumn[col.id].map((task) => (
                      <div key={task.id} className="rounded-lg border border-border/40 bg-card p-3.5">
                        <div className="h-4 w-3/4 bg-muted rounded" />
                        <div className="h-3 w-1/2 bg-muted rounded mt-2" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="font-medium">
            © {new Date().getFullYear()} TaskFlow. Built with ❤️ by <a href="https://github.com/yahyazoom17" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Yahya</a>
          </p>
          <div className="flex items-center gap-6 font-medium">
            <a href="https://github.com/yahyazoom17/taskflow" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Task Dialog */}
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        defaultStatus={defaultStatus}
        onSave={handleSaveTask}
      />
    </div>
  );
}