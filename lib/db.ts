import fs from "fs/promises";
import path from "path";
import type { Task } from "./types";

const DB_PATH = path.join(process.cwd(), "db", "tasks.json");

/** Read all tasks from the JSON database */
export async function getTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data) as Task[];
  } catch {
    // If file doesn't exist, create it with empty array
    await saveTasks([]);
    return [];
  }
}

/** Write all tasks to the JSON database */
export async function saveTasks(tasks: Task[]): Promise<void> {
  const dir = path.dirname(DB_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}
