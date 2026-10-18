const ITEMS_PER_PAGE = 10;

function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded bg-slate-200 dark:bg-slate-800 ${className}`}
    />
  );
}

export default function ManageTicketsSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1400px] min-w-0">
      {/* Page heading and export action */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <Skeleton className="mb-2 h-4 w-28" />
          <Skeleton className="h-8 w-56 rounded-lg sm:h-9" />
          <Skeleton className="mt-3 h-4 w-full max-w-xl" />
        </div>
        <Skeleton className="h-11 w-full rounded-xl sm:w-32" />
      </div>

      {/* Search, status, and sort controls */}
      <div className="mb-6 grid min-w-0 gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[minmax(0,1fr)_180px_180px]">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-full rounded-xl" />
        ))}
      </div>

      {/* Mobile ticket cards: the live page switches to its table at md. */}
      <div className="space-y-4 md:hidden">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <article
            key={index}
            className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-6 w-20 shrink-0 rounded-full" />
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="flex min-w-0 flex-col items-center gap-2">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
              <Skeleton className="h-10 min-w-[72px] flex-1 rounded-lg" />
              <Skeleton className="h-10 min-w-[88px] flex-1 rounded-lg" />
              <Skeleton className="h-10 min-w-[80px] flex-1 rounded-lg" />
            </div>
          </article>
        ))}
      </div>

      {/* Desktop and tablet table, matching the live table's scroll container. */}
      <div className="hidden min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              <tr>
                {[
                  ["Ticket", "w-20"],
                  ["Route", "w-14"],
                  ["Vendor", "w-16"],
                  ["Price", "w-12"],
                  ["Status", "w-14"],
                  ["Actions", "ml-auto w-16"],
                ].map(([label, width]) => (
                  <th
                    key={label}
                    className={`px-5 py-4 ${label === "Actions" ? "text-right" : ""}`}
                  >
                    <Skeleton className={`h-3 ${width}`} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <tr key={index}>
                  <td className="px-5 py-5">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="mt-2 h-3 w-20" />
                  </td>
                  <td className="px-5 py-5">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="px-5 py-5">
                    <Skeleton className="h-4 w-44" />
                  </td>
                  <td className="px-5 py-5">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-5 py-5">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex min-w-max justify-end gap-2">
                      <Skeleton className="h-9 w-[72px] rounded-lg" />
                      <Skeleton className="h-9 w-[100px] rounded-lg" />
                      <Skeleton className="h-9 w-[92px] rounded-lg" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results count and pagination */}
      <div className="mt-5">
        <Skeleton className="mb-3 h-3 w-44" />
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row">
          <Skeleton className="h-3 w-24" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-10 w-10 rounded-xl" />
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-10 rounded-xl" />
            ))}
            <Skeleton className="h-10 w-10 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
