import { Card } from "@/components/ui/card";

const tasks = [
  { id: "1", title: "Revisar rutina", priority: "alta" },
  { id: "2", title: "Comprar comida post-entreno", priority: "media" }
];

export function TodayTasksCard() {
  return (
    <Card>
      <h2 className="mb-3 text-sm font-semibold">Tareas de hoy</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="rounded-xl bg-muted px-3 py-2 text-sm">
            {task.title}
          </li>
        ))}
      </ul>
    </Card>
  );
}