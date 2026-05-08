import { Card } from "@/components/ui/card";

export function TasksList() {
  return (
    <Card>
      <h2 className="mb-3 text-sm font-semibold">Listado de tareas (MVP)</h2>
      <p className="text-sm text-foreground/70">Aqui ira el CRUD conectado a Supabase.</p>
    </Card>
  );
}
