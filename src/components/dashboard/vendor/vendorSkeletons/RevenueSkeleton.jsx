"use client";

function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 ${className}`}
    />
  );
}

export default function RevenueSkeleton() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-9 w-56" />
          <Skeleton className="mt-2 h-4 w-full max-w-xl" />
        </div>
        <Skeleton className="h-11 w-full rounded-xl sm:w-32" />
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <Skeleton className="mx-auto h-11 w-11 rounded-2xl sm:mx-0" />
            <Skeleton className="mx-auto mt-5 h-4 w-24 sm:mx-0" />
            <Skeleton className="mx-auto mt-2 h-8 w-32 sm:mx-0" />
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="flex justify-between">
          <div>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-2 h-4 w-64" />
          </div>

          <Skeleton className="h-8 w-28 rounded-full" />
        </div>

        <div className="mt-8 flex h-72 items-end gap-3 sm:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex h-full flex-1 flex-col justify-end"
            >
              <Skeleton
                className="mx-auto w-full max-w-14 rounded-t-2xl"
                style={{
                  height: `${30 + index * 10}%`,
                }}
              />

              <Skeleton className="mx-auto mt-3 h-3 w-10" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <Skeleton className="h-5 w-40" />

            <Skeleton className="mt-5 h-20 w-full rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
