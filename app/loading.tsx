import { CoursesSkeleton } from "@/components/ui/CoursesSkeleton";

export default function Loading() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary">
      {/* Sidebar skeleton */}
      <div className="w-64 h-full border-r border-border-subtle flex flex-col p-4 gap-3">
        <div className="skeleton h-10 w-32 rounded-lg mb-6" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton h-10 w-full rounded-lg" />
        ))}
      </div>

      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="col-span-2 skeleton h-48 rounded-2xl" />
          <div className="col-span-2 skeleton h-48 rounded-2xl" />
          <div className="col-span-3">
            <CoursesSkeleton />
          </div>
          <div className="col-span-1 skeleton h-72 rounded-2xl" />
        </div>
      </main>
    </div>
  );
}
