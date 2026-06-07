-- Run this in your Supabase SQL Editor (https://app.supabase.com)

-- Create courses table
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name text not null default 'BookOpen',
  created_at timestamp with time zone default now()
);

-- Seed with 4 example courses
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code'),
  ('PostgreSQL & Supabase', 42, 'Database'),
  ('Next.js App Router', 60, 'Globe'),
  ('TypeScript Deep Dive', 88, 'Cpu');

-- Optional: enable Row Level Security (read-only public access)
alter table courses enable row level security;
create policy "Allow public read" on courses for select using (true);
