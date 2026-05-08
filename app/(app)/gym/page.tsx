import { GymOverview } from "@/components/modules/gym/gym-overview";

export default function GymPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Gimnasio</h1>
        <p className="text-sm text-foreground/70">Rutinas, sesiones y progreso por ejercicio.</p>
      </header>
      <GymOverview />
    </div>
  );
}