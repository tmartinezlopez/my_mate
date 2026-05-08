import { DashboardSummary } from "@/components/modules/dashboard/dashboard-summary";
import { QuickActions } from "@/components/modules/dashboard/quick-actions";
import { TodayTasksCard } from "@/components/modules/dashboard/today-tasks-card";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-foreground/70">Resumen rapido de tu dia.</p>
      </header>
      <DashboardSummary />
      <div className="grid gap-4 md:grid-cols-2">
        <TodayTasksCard />
        <QuickActions />
      </div>
    </div>
  );
}
