import { CalendarView } from "@/components/modules/calendar/calendar-view";

export default function CalendarPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Calendario</h1>
        <p className="text-sm text-foreground/70">Vista de tareas por dia y planificacion.</p>
      </header>
      <CalendarView />
    </div>
  );
}
