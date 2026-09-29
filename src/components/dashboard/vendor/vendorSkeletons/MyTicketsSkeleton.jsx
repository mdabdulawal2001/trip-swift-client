"use client";

function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 ${className}`}
    />
  );
}

export default function MyTicketsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Skeleton className="h-4 w-28" />

          <Skeleton className="mt-3 h-9 w-56" />

          <Skeleton className="mt-2 h-4 w-full max-w-lg" />
        </div>

        <Skeleton className="h-11 w-32 rounded-xl" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Image */}
            <Skeleton className="h-56 w-full rounded-none" />

            <div className="p-5">
              <div className="flex justify-between gap-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <Skeleton className="mt-4 h-6 w-44" />

              {/* Route */}
              <Skeleton className="mt-5 h-24 w-full rounded-2xl" />

              {/* Meta */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="ml-auto h-4 w-20" />
              </div>

              {/* Extra */}
              <div className="mt-4 flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-2">
                <Skeleton className="h-11 flex-1" />
                <Skeleton className="h-11 flex-1" />
                <Skeleton className="h-11 flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}