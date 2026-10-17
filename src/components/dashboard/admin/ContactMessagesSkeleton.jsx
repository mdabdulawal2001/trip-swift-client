import { DashboardListControlsSkeleton } from "../shared/DashboardSkeleton";

const ITEMS_PER_PAGE = 8;
export function ContactMessagesSkeleton() {
  return (
    <div className="space-y-6">
      <DashboardListControlsSkeleton filterCount={1} />
      <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div className="grid gap-4">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <div className="h-5 w-44 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-4 w-48 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
              <div className="hidden h-10 w-24 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700 md:block" />
            </div>
            <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <div className="h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-4/5 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-2/3 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="mt-4 h-10 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700 md:hidden" />
          </div>
        ))}
        <div className="pt-2">
          <ContactMessagesPaginationSkeleton />
        </div>
      </div>
    </div>
  );
}

function ContactMessagesPaginationSkeleton() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row">
      <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700"
          />
        ))}
        <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

