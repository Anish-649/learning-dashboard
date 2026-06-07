import { CourseTile } from "@/components/dashboard/CourseTile";
import type { Course } from "@/types";

// Fallback courses when Supabase is not configured
const FALLBACK_COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    progress: 75,
    icon_name: "Code",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "PostgreSQL & Supabase",
    progress: 42,
    icon_name: "Database",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Next.js App Router",
    progress: 60,
    icon_name: "Globe",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "TypeScript Deep Dive",
    progress: 88,
    icon_name: "Cpu",
    created_at: new Date().toISOString(),
  },
];

interface CoursesGridProps {
  courses: Course[];
}

export function CoursesGrid({ courses }: CoursesGridProps) {
  const displayCourses = courses.length > 0 ? courses : FALLBACK_COURSES;
  const isFallback = courses.length === 0;

  return (
    <section className="space-y-3 h-full">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold text-white/60 uppercase tracking-wider">
          Active Courses
        </h2>
        {isFallback && (
          <span className="text-xs text-white/30 font-mono">demo data</span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3">
        {displayCourses.map((course, i) => (
          <CourseTile key={course.id} course={course} index={i} />
        ))}
      </div>
    </section>
  );
}
