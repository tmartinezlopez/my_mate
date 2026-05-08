# Personal ERP PWA (MVP)

Aplicaci�n web personal modular (privada) con Next.js + Supabase.

## 1) Propuesta de arquitectura de carpetas

```txt
app/
  (auth)/login/page.tsx
  (app)/
    dashboard/page.tsx
    tasks/page.tsx
    calendar/page.tsx
    gym/page.tsx
    layout.tsx
  api/auth/callback/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  layout/app-nav.tsx
  modules/
    dashboard/*
    tasks/*
    calendar/*
    gym/*
  ui/
    button.tsx
    card.tsx
    theme-provider.tsx
features/
  tasks/
  calendar/
  gym/
lib/
  supabase/
    client.ts
    server.ts
  utils/cn.ts
types/
  task.ts
public/
  manifest.webmanifest
  sw.js
supabase/
  migrations/20260508_initial_schema.sql
```

## 2) Esquema SQL inicial para Supabase

El esquema completo est� en [supabase/migrations/20260508_initial_schema.sql](supabase/migrations/20260508_initial_schema.sql).

Incluye:
- `profiles`
- `projects`
- `tasks`
- `exercises`
- `workout_routines`
- `workout_routine_exercises`
- `workout_sessions`
- `workout_sets`
- RLS activado y pol�ticas por `auth.uid()`
- trigger de `updated_at`

## 3) Roadmap t�cnico por fases

1. Fase 1 (Base): estructura modular, Tailwind, Supabase SSR, PWA b�sica, navegaci�n responsive.
2. Fase 2 (Auth): login con magic link, logout, middleware de protecci�n, perfil editable.
3. Fase 3 (Dashboard): resumen del d�a con queries reales (tareas de hoy + pr�ximo entreno).
4. Fase 4 (Tareas): CRUD completo, filtros persistentes (query params), vista "hoy".
5. Fase 5 (Calendario): vista mensual simple, selector de d�a, tareas por fecha.
6. Fase 6 (Gym): CRUD ejercicios/rutinas, sesi�n y sets, historial por ejercicio.
7. Fase 7 (Pulido): dark mode fino, UX m�vil, rendimiento, validaciones y tests.

## 4) Primera implementaci�n base

Estado actual implementado:
- Proyecto Next.js (App Router) con TypeScript + Tailwind configurado.
- Estructura por m�dulos lista para escalar.
- Supabase cliente servidor/navegador + middleware de rutas protegidas.
- Login b�sico por magic link.
- Layout responsive con sidebar desktop + bottom nav m�vil.
- PWA instalable (manifest + service worker base).
- P�ginas iniciales: Dashboard, Tareas, Calendario y Gym (stubs funcionales).

## 5) Componentes iniciales reutilizables

- UI base: `Button`, `Card`, `ThemeProvider`
- Layout: `AppNav`
- M�dulo dashboard: `DashboardSummary`, `TodayTasksCard`, `QuickActions`
- M�dulo tareas: `TaskFilters`, `TasksList`
- M�dulo calendario: `CalendarView`
- M�dulo gimnasio: `GymOverview`

## 6) Decisiones t�cnicas clave

1. App Router + route groups: separa auth y app privada sin complejidad extra.
2. Supabase SSR (`@supabase/ssr`): auth m�s robusta en server y middleware.
3. RLS desde inicio: seguridad real incluso en app personal.
4. M�dulos por dominio (`components/modules` + `features`): escalado simple.
5. Mobile-first con bottom nav: uso principal c�modo en m�vil.
6. PWA m�nima propia (sin plugins complejos): menor fricci�n y coste cero.
7. Tipos de dominio b�sicos en `types/`: evoluci�n gradual sin sobrearquitectura.

## Arranque local

1. Copiar `.env.example` a `.env.local`
2. Rellenar claves de Supabase
3. `npm install`
4. `npm run dev`
