import {
  DashboardListControlsSkeleton,
  DashboardPaginationSkeleton,
} from "../shared/DashboardSkeleton";

function Pulse({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded bg-slate-200 dark:bg-slate-700 ${className}`}
    />
  );
}

function StatSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900 sm:text-left">
      <Pulse className="mx-auto h-10 w-10 rounded-xl sm:mx-0" />
      <Pulse className="mx-auto mt-4 h-3 w-20 sm:mx-0" />
      <Pulse className="mx-auto mt-2 h-7 w-24 rounded-lg sm:mx-0" />
    </div>
  );
}

function TableRows() {
  return Array.from({ length: 4 }).map((_, index) => (
    <tr key={index}>
      {["w-32", "w-36", "w-24", "w-20", "w-16", "w-20"].map(
        (width, cellIndex) => (
          <td className="px-5 py-5" key={cellIndex}>
          <Pulse
            className={`${cellIndex === 5 ? "h-6 rounded-full" : "h-4"} ${width}`}
          />
          </td>
        ),
      )}
    </tr>
  ));
}

function MobileCards() {
  return Array.from({ length: 3 }).map((_, index) => (
    <div
      key={index}
      className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-col items-center gap-3">
        <Pulse className="h-4 w-36" />
        <Pulse className="h-3 w-44" />
        <Pulse className="h-6 w-20 rounded-full" />
      </div>
      <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />
      <Pulse className="mx-auto h-4 w-40" />
      <div className="mt-4 grid grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((__, cellIndex) => (
          <div key={cellIndex} className="flex flex-col items-center gap-2">
            <Pulse className="h-3 w-12" />
            <Pulse className="h-4 w-20" />
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-50 p-4 dark:bg-slate-950!">
        <Pulse className="h-3 w-12" />
        <Pulse className="h-5 w-20" />
      </div>
    </div>
  ));
}

export default function TransactionsSkeleton() {
  return (
    <div id="dashboard-list-page" className="space-y-8 scroll-mt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <Pulse className="h-4 w-20" />
          <Pulse className="mt-3 h-9 w-64 rounded-lg sm:w-72" />
          <Pulse className="mt-2 h-4 w-full max-w-xl" />
        </div>
        <Pulse className="h-11 w-full rounded-xl sm:w-28" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <StatSkeleton key={index} />
        ))}
      </div>
      <DashboardListControlsSkeleton />
      <section className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800! dark:bg-slate-900 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <TableRows />
            </tbody>
          </table>
        </div>
      </section>
      <div className="space-y-4 md:hidden">
        <MobileCards />
      </div>
      <DashboardPaginationSkeleton />
    </div>
  );
}
