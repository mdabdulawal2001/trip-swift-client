import { DashboardListControlsSkeleton, DashboardPaginationSkeleton } from "../shared/DashboardSkeleton";

export default function AdvertiseTicketsSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

          <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="h-4 w-96 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 sm:w-32" />
      </div>

      {/* Counter */}
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-2">
            <div className="h-4 w-44 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

            <div className="h-3 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        <div className="space-y-2 sm:text-right">
          <div className="sm:ml-auto h-8 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

          <div className="sm:ml-auto h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      <div className="mb-6">
        <DashboardListControlsSkeleton />
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Image */}
            <div className="h-56 animate-pulse bg-slate-200 dark:bg-slate-800" />

            {/* Content */}
            <div className="p-5">
              {/* Operator + Status */}
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Title */}
              <div className="h-6 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

              {/* Route */}
              <div className="mt-5 rounded-2xl bg-slate-100 p-4 dark:bg-slate-950!">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />

                    <div className="h-7 w-px bg-slate-300 dark:bg-slate-700" />

                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
                  </div>

                  <div className="flex flex-1 items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="h-2.5 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                      <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </div>

                    <div className="space-y-2 text-right">
                      <div className="ml-auto h-2.5 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                      <div className="ml-auto h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="h-2.5 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="space-y-2 text-right">
                  <div className="ml-auto h-2.5 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="ml-auto h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>

              {/* Perks */}
              <div className="mt-4 flex gap-2">
                <div className="h-7 w-20 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />

                <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />

                <div className="h-7 w-16 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
              </div>

              {/* Bottom */}
              <div className="mt-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="h-3 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Button */}
                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <DashboardPaginationSkeleton />
    </div>
  );
}
