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
      <div className="hidden min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800! dark:bg-slate-900! md:block">
        <table className="w-full table-fixed text-left">
          <colgroup>
            <col style={{ width: "18%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "19%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "26%" }} />
          </colgroup>
          <thead className="border-b border-slate-200 bg-slate-50 dark:!border-slate-800 dark:bg-slate-950!">
            <tr>
              {[
                ["Ticket", "w-12"],
                ["Route", "w-10"],
                ["Vendor", "w-12"],
                ["Price", "w-8"],
                ["Status", "w-10"],
                ["Actions", "ml-auto w-12"],
              ].map(([label, width]) => (
                <th
                  key={label}
                  className={`px-2 py-4 ${label === "Actions" ? "text-right" : ""}`}
                >
                  <Skeleton className={`h-3 ${width}`} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <tr key={index}>
                <td className="px-2 py-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="mt-2 h-3 w-20" />
                </td>
                <td className="px-2 py-4">
                  <Skeleton className="h-4 w-3/4" />
                </td>
                <td className="px-2 py-4">
                  <Skeleton className="h-4 w-5/6" />
                </td>
                <td className="px-2 py-4">
                  <Skeleton className="h-4 w-12" />
                </td>
                <td className="px-2 py-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </td>
                <td className="px-2 py-4">
                  <div className="flex justify-end gap-1">
                    <Skeleton className="h-9 w-9 shrink-0 rounded-lg xl:w-14" />
                    <Skeleton className="h-9 w-9 shrink-0 rounded-lg xl:w-20" />
                    <Skeleton className="h-9 w-9 shrink-0 rounded-lg xl:w-16" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
