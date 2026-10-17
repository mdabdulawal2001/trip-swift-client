import {
  DashboardListControlsSkeleton,
  DashboardPaginationSkeleton,
} from "../shared/DashboardSkeleton";

export default function BookingsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

          <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 sm:h-9" />

          <div className="h-4 w-full max-w-md animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700 sm:w-32" />
      </div>

      {/* Summary Skeleton */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

            <div className="mt-3 h-8 w-12 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      <DashboardListControlsSkeleton />

      {/* Booking Cards Skeleton */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <BookingCardSkeleton key={index} />
        ))}
      </div>

      <DashboardPaginationSkeleton />
    </div>
  );
}

function BookingCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800! dark:bg-slate-900">
      {/* Image */}
      <div className="h-48 animate-pulse bg-slate-200 dark:bg-slate-800" />

      <div className="p-5">
        {/* Title */}
        <div className="mb-4 space-y-2">
          <div className="h-3 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

          <div className="h-6 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />

          <div className="h-6 w-1/2 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Route */}
        <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-950!">
          <div className="flex items-center justify-between gap-4">
            <div className="w-24 space-y-2">
              <div className="h-3 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>

            <div className="h-4 w-5 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

            <div className="w-24 space-y-2">
              <div className="ml-auto h-3 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="ml-auto h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>

        {/* Journey Info */}
        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-slate-100 py-5 dark:border-slate-800">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

              <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="mt-5 rounded-2xl bg-slate-100 p-4 dark:bg-slate-950!">
          <div className="h-3 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

          <div className="mt-3 grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-12 animate-pulse rounded-lg bg-white dark:bg-slate-900!"
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mt-5 rounded-2xl bg-slate-100 p-4 dark:bg-slate-950!">
          <div className="flex flex-col items-center gap-2">
            <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

            <div className="h-8 w-28 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />

            <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="mt-4 h-10 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
