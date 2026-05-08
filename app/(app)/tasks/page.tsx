import { TaskFilters } from "@/components/modules/tasks/task-filters";
import { TasksList } from "@/components/modules/tasks/tasks-list";

export default function TasksPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Tareas</h1>
        <p className="text-sm text-foreground/70">Gestiona tareas por estado, prioridad y fecha.</p>
      </header>
      <TaskFilters />
      <TasksList />
    </div>
  );
}