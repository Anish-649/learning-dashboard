export function CoursesSkeleton() {
  return (
    <section className="space-y-3">
      <div className="skeleton h-4 w-28 rounded-md" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-bg-card border border-border-subtle p-5 space-y-4"
          >
            <div className="skeleton w-10 h-10 rounded-xl" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-3/4 rounded-md" />
              <div className="skeleton h-3 w-1/2 rounded-md" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <div className="skeleton h-3 w-14 rounded-md" />
                <div className="skeleton h-3 w-8 rounded-md" />
              </div>
              <div className="skeleton h-1.5 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
