"use server";

import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { getTasks, saveTasks } from "./db";
import type { Task, Status, Priority } from "./types";

/** Fetch all tasks */
export async function fetchTasks(): Promise<Task[]> {
  return getTasks();
}

/** Create a new task */
export async function createTask(data: {
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
}): Promise<Task[]> {
  const tasks = await getTasks();
  const newTask: Task = {
    id: uuidv4(),
    title: data.title,
    description: data.description || "",
    status: data.status,
    priority: data.priority,
    dueDate: data.dueDate || undefined,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  await saveTasks(tasks);
  revalidatePath("/");
  return tasks;
}

/** Update an existing task */
export async function updateTask(
  id: string,
  data: Partial<Omit<Task, "id" | "createdAt">>
): Promise<Task[]> {
  const tasks = await getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) throw new Error(`Task ${id} not found`);
  tasks[index] = { ...tasks[index], ...data };
  await saveTasks(tasks);
  revalidatePath("/");
  return tasks;
}

/** Delete a task */
export async function deleteTask(id: string): Promise<Task[]> {
  let tasks = await getTasks();
  tasks = tasks.filter((t) => t.id !== id);
  await saveTasks(tasks);
  revalidatePath("/");
  return tasks;
}

/** Reorder tasks (after drag-and-drop) — accepts the full updated task list */
export async function reorderTasks(tasks: Task[]): Promise<void> {
  await saveTasks(tasks);
  revalidatePath("/");
}
