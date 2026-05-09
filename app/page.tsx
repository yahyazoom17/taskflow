import { KanbanBoard } from "@/components/kanban-board";
import { fetchTasks } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const tasks = await fetchTasks();

  return (
    <div className="flex flex-col h-screen">
      <KanbanBoard initialTasks={tasks} />
    </div>
  );
}
