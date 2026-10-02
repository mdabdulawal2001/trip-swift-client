export default function DashboardContainer({
  eyebrow,
  title,
  description,
  children,
  actions,
  loading = false,
}) {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        {loading ? (
          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 sm:h-10 sm:w-72" />
            <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ) : (
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-sm font-semibold text-sky-500">{eyebrow}</p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {title}
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        )}

        {actions &&
          (loading ? (
            <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700 sm:w-32" />
          ) : (
            actions
          ))}
      </div>

      {children}
    </div>
  );
}
