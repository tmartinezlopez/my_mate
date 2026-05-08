import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function QuickActions() {
  return (
    <Card>
      <h2 className="mb-3 text-sm font-semibold">Accesos rapidos</h2>
      <div className="flex flex-wrap gap-2">
        <Link href="/tasks"><Button>Nueva tarea</Button></Link>
        <Link href="/gym"><Button className="bg-accent">Iniciar entreno</Button></Link>
      </div>
    </Card>
  );
}
