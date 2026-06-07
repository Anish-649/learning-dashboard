# LearnOS — Student Dashboard

A futuristic, animated learning dashboard built with Next.js 14, Supabase, Framer Motion, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion (spring physics, staggered reveals, layoutId)
- **Icons**: Lucide React (dynamically resolved from DB field)
- **Fonts**: Syne (display) + Space Grotesk (body) + JetBrains Mono (code)

## Architecture

### Server / Client Split

| Component | Type | Reason |
|---|---|---|
| `app/page.tsx` | Server Component | Fetches courses from Supabase using server-side client |
| `CoursesGrid` | Server Component | Receives pre-fetched data as props, no client bundle |
| `Sidebar` | Client Component | Requires `useState` for collapse state + Framer Motion `layoutId` |
| `HeroTile`, `ActivityTile`, `StatsRow` | Client Component | Framer Motion animations |
| `CourseTile` | Client Component | `whileHover`, `animate` on progress bar |

### Data Fetching
- Courses are fetched in a Server Component (`CoursesGridServer` in `page.tsx`) using the standard `@supabase/supabase-js` client
- The fetch is wrapped in `<Suspense>` — the skeleton loader shows while data loads
- If the DB returns an empty array or the env vars are missing, fallback demo data is rendered automatically
- Errors during fetch are caught by Next.js `error.tsx` boundary

### Animation Strategy
- **Staggered entrance**: Each Bento tile uses `delay: index * 0.1` to cascade in
- **Hover elevation**: `whileHover={{ scale: 1.015 }}` with spring physics (`stiffness: 300, damping: 20`)
- **Progress bars**: Animate from `0%` to target using `motion.div` + `initial/animate`
- **Activity grid**: Each cell fades + scales in with `delay: 0.4 + i * 0.003`
- **Sidebar highlight**: Uses `layoutId="sidebar-active"` for smooth position transitions
- All animations use `transform` and `opacity` only — zero layout shifts

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/learning-dashboard
cd learning-dashboard
npm install
```

### 2. Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Run this SQL in the Supabase SQL editor:

```sql
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null default 0,
  icon_name text not null default 'BookOpen',
  created_at timestamp with time zone default now()
);

-- Seed data
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code'),
  ('PostgreSQL & Supabase', 42, 'Database'),
  ('Next.js App Router', 60, 'Globe'),
  ('TypeScript Deep Dive', 88, 'Cpu');
```

### 3. Environment Variables

```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key
```

### 4. Run

```bash
npm run dev
```

## Deployment (Vercel)

1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel project settings
4. Deploy

**Never commit `.env.local`** — it's in `.gitignore`. Use `.env.example` to document required variables.

## Responsive Breakpoints

| Viewport | Sidebar | Grid |
|---|---|---|
| Mobile (`<768px`) | Bottom nav bar | Single column |
| Tablet (`768–1024px`) | Collapsed (icons only) | 2 columns |
| Desktop (`>1024px`) | Full sidebar (240px) | 3–4 columns |
