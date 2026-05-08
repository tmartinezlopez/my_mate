import { Card } from "@/components/ui/card";

const mock = {
  pendingToday: 4,
  nextWorkout: "Torso - 18:30",
  inProgress: 2
};

export function DashboardSummary() {
  return (
    <section className="grid gap-3 sm:grid-cols-3">
      <Card>
        <p className="text-xs text-foreground/70">Pendientes hoy</p>
        <p className="text-2xl font-semibold">{mock.pendingToday}</p>
      </Card>
      <Card>
        <p className="text-xs text-foreground/70">En progreso</p>
        <p className="text-2xl font-semibold">{mock.inProgress}</p>
      </Card>
      <Card>
        <p className="text-xs text-foreground/70">Próximo entrenamiento</p>
        <p className="text-lg font-semibold">{mock.nextWorkout}</p>
      </Card>
    </section>
  );
}
