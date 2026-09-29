"use client";

function Skeleton({
  className = "",
}) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700 ${className}`}
    />
  );
}

export function DashboardHeaderSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-3 w-28 rounded-full" />

      <Skeleton className="h-8 w-64" />

      <Skeleton className="h-4 w-full max-w-xl" />
    </div>
  );
}

export function DashboardStatSkeleton() {
  return (
    <div
      className="
        rounded-3xl
        border border-slate-200
        bg-white
        p-5
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="flex items-start justify-between">
        <Skeleton className="h-11 w-11 rounded-2xl" />

        <Skeleton className="h-4 w-16 rounded-full" />
      </div>

      <div className="mt-5 space-y-2">
        <Skeleton className="h-3 w-24" />

        <Skeleton className="h-8 w-20" />

        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <DashboardStatSkeleton key={index} />
      ))}
    </div>
  );
}

export function QuickActionsSkeleton({
  count = 4,
}) {
  return (
    <div
      className="
        rounded-3xl
        border border-slate-200
        bg-white
        p-6
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />

        <Skeleton className="h-4 w-16" />
      </div>

      <div className="mt-5 space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-slate-100
              p-3
              dark:border-slate-800!
            "
          >
            <Skeleton className="h-10 w-10 rounded-xl" />

            <Skeleton className="h-4 flex-1 max-w-40" />

            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardPanelSkeleton({
  height = "h-64",
}) {
  return (
    <div
      className="
        rounded-3xl
        border border-slate-200
        bg-white
        p-6
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-36" />

        <Skeleton className="h-4 w-20" />
      </div>

      <div className={`mt-6 ${height}`}>
        <Skeleton className="h-full w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function ActivityListSkeleton({
  count = 3,
}) {
  return (
    <div className="space-y-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex gap-3"
        >
          <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />

            <Skeleton className="h-3 w-56 max-w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}