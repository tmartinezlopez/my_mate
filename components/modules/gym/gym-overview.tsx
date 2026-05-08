import { Card } from "@/components/ui/card";

export function GymOverview() {
  return (
    <Card>
      <h2 className="mb-2 text-sm font-semibold">Gestor de gimnasio</h2>
      <p className="text-sm text-foreground/70">Ejercicios, rutinas, sesiones y progreso.</p>
    </Card>
  );
}