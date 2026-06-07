import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { Sidebar } from "@/components/layout/Sidebar";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { CourseTile } from "@/components/dashboard/CourseTile";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { CoursesGrid } from "@/components/dashboard/CoursesGrid";
import { CoursesSkeleton } from "@/components/ui/CoursesSkeleton";
import type { Course } from "@/types";

async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return data ?? [];
}

export default async function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

        {/* Radial glow top-right */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(124,58,237,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 p-6 lg:p-8 max-w-[1400px] mx-auto">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-auto">
            {/* Hero Tile — full width on mobile, 2 cols on lg */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <HeroTile name="Alex" streak={14} index={0} />
            </div>

            {/* Stats */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <StatsRow index={1} />
            </div>

            {/* Courses — Server Component wrapped in Suspense */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <Suspense fallback={<CoursesSkeleton />}>
                <CoursesGridServer />
              </Suspense>
            </div>

            {/* Activity Tile */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <ActivityTile index={3} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Server Component for courses
async function CoursesGridServer() {
  const courses = await getCourses();
  return <CoursesGrid courses={courses} />;
}
