"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Task, Status, Priority } from "@/lib/types";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null; // null = create mode
  defaultStatus?: Status;
  onSave: (data: {
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    dueDate?: string;
  }) => void;
}

export function TaskDialog({
  open,
  onOpenChange,
  task,
  defaultStatus = "todo",
  onSave,
}: TaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(defaultStatus);
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const isEditing = !!task;

  // Populate form when editing
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setStatus(defaultStatus);
      setPriority("medium");
      setDueDate("");
    }
    setError("");
  }, [task, open, defaultStatus]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      dueDate: dueDate || undefined,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] gap-0 p-0 overflow-hidden border-border/40">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            {isEditing ? "Edit Task" : "New Task"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="px-6 space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label htmlFor="task-title" className="text-sm font-medium text-foreground">
                Title
              </label>
              <Input
                id="task-title"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                className="h-9 border-border/50 focus-visible:ring-1 focus-visible:ring-[var(--apple-accent)]"
                autoFocus
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label htmlFor="task-desc" className="text-sm font-medium text-foreground">
                Description
              </label>
              <Textarea
                id="task-desc"
                placeholder="Add more details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px] resize-none border-border/50 focus-visible:ring-1 focus-visible:ring-[var(--apple-accent)]"
              />
            </div>

            {/* Status + Priority row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Status</label>
                <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
                  <SelectTrigger className="h-9 border-border/50 cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Priority</label>
                <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                  <SelectTrigger className="h-9 border-border/50 cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label htmlFor="task-due" className="text-sm font-medium text-foreground">
                Due Date
              </label>
              <Input
                id="task-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-9 border-border/50 focus-visible:ring-1 focus-visible:ring-[var(--apple-accent)] cursor-pointer"
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-4 mt-4 border-t border-border/40 bg-muted/30">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[var(--apple-accent)] hover:bg-[var(--apple-accent)]/90 text-white cursor-pointer"
            >
              {isEditing ? "Save Changes" : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
