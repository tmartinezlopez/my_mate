-- Extensions
create extension if not exists "pgcrypto";

-- Updated-at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  timezone text default 'Europe/Madrid',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text,
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tasks
create type public.task_status as enum ('pending', 'in_progress', 'completed');
create type public.task_priority as enum ('low', 'medium', 'high');

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  description text,
  status public.task_status not null default 'pending',
  priority public.task_priority not null default 'medium',
  due_date date,
  completed_at timestamptz,
  recurrence_rule text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_user_due_idx on public.tasks(user_id, due_date);
create index if not exists tasks_user_status_idx on public.tasks(user_id, status);

-- Gym - exercises
create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  muscle_group text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Gym - routines
create table if not exists public.workout_routines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workout_routine_exercises (
  id uuid primary key default gen_random_uuid(),
  routine_id uuid not null references public.workout_routines(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  sort_order integer not null default 0,
  target_sets integer,
  target_reps text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(routine_id, exercise_id)
);

-- Gym - sessions
create table if not exists public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  routine_id uuid references public.workout_routines(id) on delete set null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workout_sets (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.workout_sessions(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  set_number integer not null,
  reps integer,
  weight_kg numeric(6,2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(session_id, exercise_id, set_number)
);

-- Triggers
create trigger trg_profiles_updated_at before update on public.profiles
for each row execute procedure public.set_updated_at();

create trigger trg_projects_updated_at before update on public.projects
for each row execute procedure public.set_updated_at();

create trigger trg_tasks_updated_at before update on public.tasks
for each row execute procedure public.set_updated_at();

create trigger trg_exercises_updated_at before update on public.exercises
for each row execute procedure public.set_updated_at();

create trigger trg_workout_routines_updated_at before update on public.workout_routines
for each row execute procedure public.set_updated_at();

create trigger trg_workout_routine_exercises_updated_at before update on public.workout_routine_exercises
for each row execute procedure public.set_updated_at();

create trigger trg_workout_sessions_updated_at before update on public.workout_sessions
for each row execute procedure public.set_updated_at();

create trigger trg_workout_sets_updated_at before update on public.workout_sets
for each row execute procedure public.set_updated_at();

-- Auto profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id)
  values (new.id)
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.exercises enable row level security;
alter table public.workout_routines enable row level security;
alter table public.workout_routine_exercises enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.workout_sets enable row level security;

-- Policies
create policy "profiles_owner" on public.profiles
for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "projects_owner" on public.projects
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "tasks_owner" on public.tasks
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "exercises_owner" on public.exercises
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "routines_owner" on public.workout_routines
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "routine_exercises_owner" on public.workout_routine_exercises
for all using (
  exists (
    select 1 from public.workout_routines wr
    where wr.id = workout_routine_exercises.routine_id
    and wr.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.workout_routines wr
    where wr.id = workout_routine_exercises.routine_id
    and wr.user_id = auth.uid()
  )
);

create policy "sessions_owner" on public.workout_sessions
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "sets_owner" on public.workout_sets
for all using (
  exists (
    select 1 from public.workout_sessions ws
    where ws.id = workout_sets.session_id
    and ws.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.workout_sessions ws
    where ws.id = workout_sets.session_id
    and ws.user_id = auth.uid()
  )
);