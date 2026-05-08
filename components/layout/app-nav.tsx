"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Dumbbell, LayoutDashboard, SquareCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tareas", icon: SquareCheck },
  { href: "/calendar", label: "Calendario", icon: CalendarDays },
  { href: "/gym", label: "Gym", icon: Dumbbell }
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-64 border-r border-border bg-card p-4 md:block">
        <h1 className="mb-6 text-lg font-semibold">Personal ERP</h1>
        <nav className="space-y-2">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm",
                  active ? "bg-primary/10 text-primary" : "hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" /> {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card p-2 md:hidden">
        <ul className="grid grid-cols-4 gap-1">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex flex-col items-center rounded-lg px-2 py-1 text-[11px]",
                    active ? "text-primary" : "text-foreground/70"
                  )}
                >
                  <Icon className="mb-1 h-4 w-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}