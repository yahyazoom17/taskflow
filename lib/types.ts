/** Priority levels for tasks */
export type Priority = "low" | "medium" | "high";

/** Column status for kanban board */
export type Status = "todo" | "in-progress" | "completed";

/** Core task data model */
export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: string; // ISO date string
  createdAt: string; // ISO date string
};

/** Column definition for the board */
export type Column = {
  id: Status;
  title: string;
};

/** Available columns */
export const COLUMNS: Column[] = [
  { id: "todo", title: "Todo" },
  { id: "in-progress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];
