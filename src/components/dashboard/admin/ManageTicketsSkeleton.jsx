import { DashboardPaginationSkeleton } from "../shared/DashboardSkeleton";
const ITEMS_PER_PAGE = 10;

export default function ManageTicketsSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Header Skeleton */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

          <div className="h-9 w-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="h-4 w-96 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 sm:w-32" />
      </div>

      <div className="mb-6 grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[minmax(0,1fr)_180px_180px]">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-11 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>

      {/* Mobile Card Skeleton */}
      <div className="space-y-4 md:hidden">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800! dark:bg-slate-900!"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-20 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950!">
              <div className="h-3 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="h-3 w-14 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-3 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>

            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="h-10 flex-1 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
              <div className="h-10 flex-1 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
              <div className="h-10 flex-1 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800! dark:bg-slate-900 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-237.5 text-left">
            {/* Header */}
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950!">
              <tr>
                {[
                  "Ticket",
                  "Route",
                  "Vendor",
                  "Price",
                  "Status",
                  "Actions",
                ].map((item) => (
                  <th
                    key={item}
                    className={`px-5 py-4 ${item === "Actions" ? "text-right" : ""}`}
                  >
                    <div
                      className={`h-3 ${
                        item === "Ticket"
                          ? "w-20"
                          : item === "Route"
                            ? "w-14"
                            : item === "Vendor"
                              ? "w-16"
                              : item === "Price"
                                ? "w-12"
                                : item === "Status"
                                  ? "w-14"
                                  : "ml-auto w-16"
                      } animate-pulse rounded bg-slate-200 dark:bg-slate-800`}
                    />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <tr key={index}>
                  {/* Ticket */}
                  <td className="px-5 py-5">
                    <div className="space-y-2">
                      <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                      <div className="h-3 w-20 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </td>

                  {/* Route */}
                  <td className="px-5 py-5">
                    <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  {/* Vendor */}
                  <td className="px-5 py-5">
                    <div className="h-4 w-44 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  {/* Price */}
                  <td className="px-5 py-5">
                    <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                    <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5">
                    <div className="flex justify-end gap-2">
                      <div className="h-9 w-16 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />

                      <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />

                      <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DashboardPaginationSkeleton />
    </div>
  );
}
