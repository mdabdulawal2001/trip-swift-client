import TicketGridSkeleton from "./TicketGridSkeleton";

export default function TicketBrowserSkeleton() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Search / Filter / Sort Skeleton */}
      <div
        className="
          mb-10 animate-pulse rounded-3xl
          border border-slate-200 bg-white p-4 shadow-sm
          dark:border-slate-800! dark:bg-slate-900!
          sm:p-6
        "
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
          {/* Search */}
          <div className="min-w-0 flex-1">
            <div className="grid w-full gap-3 md:grid-cols-[1fr_1fr_auto]">
              <div className="h-11.5 rounded-xl bg-slate-200 dark:bg-slate-800" />

              <div className="h-11.5 rounded-xl bg-slate-200 dark:bg-slate-800" />

              <div className="h-11.5 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          {/* Filter */}
          <div className="w-full xl:w-47.5">
            <div className="mb-2 h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-11.5 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Sort */}
          <div className="w-full xl:w-47.5">
            <div className="mb-2 h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-11.5 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Reset */}
        <div className="mt-5 flex justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="h-10 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between gap-4 animate-pulse">
        <div>
          <div className="h-7 w-44 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-2 h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="hidden h-4 w-40 rounded bg-slate-200 dark:bg-slate-800 sm:block" />
      </div>

      {/* Tickets */}
      <TicketGridSkeleton count={6} />

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-2 animate-pulse">
        <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </section>
  );
}