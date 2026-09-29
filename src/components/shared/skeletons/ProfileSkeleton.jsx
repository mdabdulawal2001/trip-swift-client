export default function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {/* Cover */}
        <div className="h-32 animate-pulse bg-slate-200 dark:bg-slate-800 sm:h-40" />

        <div className="px-5 pb-7 sm:px-8 sm:pb-8">
          <div className="-mt-10 flex flex-col gap-5 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* Avatar */}
              <div className="h-28 w-28 shrink-0 animate-pulse rounded-3xl border-4 border-white bg-slate-200 shadow-xl dark:border-slate-900 dark:bg-slate-800" />

              {/* Name */}
              <div className="space-y-3 pb-1">
                <div className="h-7 w-40 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                <div className="h-4 w-52 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>

            {/* Button */}
            <div className="h-11 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Personal Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 space-y-3">
            <div className="h-6 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div className="h-4 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-12 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 space-y-3">
            <div className="h-6 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div className="h-4 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />

                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </div>

                <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}