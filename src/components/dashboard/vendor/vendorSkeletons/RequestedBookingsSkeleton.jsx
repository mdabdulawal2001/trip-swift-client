"use client";

function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 ${className}`}
    />
  );
}

export default function RequestedBookingsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-4 w-28" />

        <Skeleton className="mt-3 h-9 w-60" />

        <Skeleton className="mt-2 h-4 w-full max-w-xl" />
      </div>

      {/* Booking cards */}
      <div className="grid gap-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="w-full space-y-4">
                <div className="flex gap-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                <Skeleton className="h-6 w-44" />

                <Skeleton className="h-4 w-56" />

                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>

                <Skeleton className="h-3 w-40" />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div>
                  <Skeleton className="ml-auto h-3 w-24" />
                  <Skeleton className="mt-2 ml-auto h-7 w-28" />
                </div>

                <div className="flex gap-2">
                  <Skeleton className="h-11 w-24 rounded-xl" />
                  <Skeleton className="h-11 w-24 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}