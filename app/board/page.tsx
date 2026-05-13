import { fetchTasks } from "@/lib/actions";
import { KanbanBoardClient } from "./kanban-board-client";

export const dynamic = "force-dynamic";

export default async function BoardPage() {
  const tasks = await fetchTasks();

  return <KanbanBoardClient initialTasks={tasks} />;
}