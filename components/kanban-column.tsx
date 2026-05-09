"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "./task-card";
import type { Task, Status } from "@/lib/types";

interface KanbanColumnProps {
  id: Status;
  title: string;
  tasks: Task[];
  onAddTask: (status: Status) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const columnAccents: Record<Status, string> = {
  todo: "bg-muted-foreground/60",
  "in-progress": "bg-[var(--apple-accent)]",
  completed: "bg-emerald-500",
};

export function KanbanColumn({
  id,
  title,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className={`
        flex flex-col min-h-0 rounded-xl transition-colors duration-200
        ${isOver ? "bg-[var(--apple-accent)]/[0.04]" : ""}
      `}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full ${columnAccents[id]}`} />
          <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
          <span className="text-xs text-muted-foreground font-medium tabular-nums">
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={() => onAddTask(id)}
          aria-label={`Add task to ${title}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Task list */}
      <div
        ref={setNodeRef}
        className="flex-1 flex flex-col gap-2 min-h-[120px] px-0.5"
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-8 text-muted-foreground/50">
              <Inbox className="h-8 w-8 mb-2" />
              <p className="text-xs font-medium">No tasks yet</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}
