# My Mate

> Plataforma personal tipo ERP para organizar tareas, calendario, entrenamientos y seguimiento diario desde una sola app web.

## Resumen

My Mate es una aplicacion privada pensada para centralizar la gestion personal en modulos simples y escalables. El proyecto esta orientado a uso real en movil y escritorio, con autenticacion, datos persistentes y base tecnica preparada para crecer.

## Que incluye hoy

- Autenticacion con Supabase (magic link)
- Area privada protegida por middleware
- Modulos iniciales:
  - Dashboard
  - Tasks
  - Calendar
  - Gym
  - Profile
- Layout responsive (sidebar en desktop y navegacion inferior en movil)
- PWA instalable (manifest + service worker base)
- Base de datos con RLS y migracion inicial

## Stack tecnico

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend/Data:** Supabase (Auth + Postgres + RLS)
- **Tooling:** ESLint, TypeScript, PostCSS

## Estructura del proyecto

```txt
app/           Rutas, layouts y paginas
components/    UI reutilizable y modulos de interfaz
features/      Logica por dominio
lib/           Utilidades y clientes compartidos (Supabase, helpers)
styles/        Estilos globales
supabase/      Migraciones SQL
types/         Tipos de dominio
public/        Recursos estaticos y PWA
```

## Puesta en marcha

```bash
npm install
cp .env.example .env.local
# Completar variables de Supabase en .env.local
npm run dev
```

App local: `http://localhost:3000`

## Scripts disponibles

```bash
npm run dev        # Desarrollo
npm run build      # Build de produccion
npm run start      # Ejecutar build
npm run lint       # Lint
npm run typecheck  # Chequeo de tipos
```

## Base de datos

La migracion inicial se encuentra en:

- `supabase/migrations/20260508_initial_schema.sql`

Incluye entidades base para perfiles, proyectos, tareas y entrenamiento, con politicas de seguridad por usuario (RLS).

## Roadmap (alto nivel)

1. Completar CRUD de tareas y filtros avanzados
2. Mejorar calendario con mas vistas y eventos
3. Evolucionar modulo Gym (rutinas, sesiones, historial)
4. Pulido UX mobile-first + rendimiento
5. Cobertura de testing y validaciones

## Estado del proyecto

MVP funcional en progreso, con arquitectura modular y base tecnica solida para iterar rapido.
