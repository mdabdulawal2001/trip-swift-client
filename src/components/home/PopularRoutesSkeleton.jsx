export default function PopularRoutesSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="relative h-80 animate-pulse overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800"
        >
          <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="h-3 w-28 rounded bg-slate-400/70 dark:bg-slate-600" />
            <div className="mt-3 h-6 w-4/5 rounded bg-slate-400/70 dark:bg-slate-600" />
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="h-3 w-24 rounded bg-slate-400/70 dark:bg-slate-600" />
                <div className="mt-2 h-4 w-20 rounded bg-slate-400/70 dark:bg-slate-600" />
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-400/70 dark:bg-slate-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
