function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 ${className}`}
    />
  );
}

export default function TicketDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950!">
      <section className="border-b border-slate-200 bg-white dark:border-slate-800! dark:bg-slate-950!">
        <div className="mx-auto flex w-full max-w-[1400px] justify-center px-5 py-5 sm:px-8 lg:px-8">
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800! dark:bg-slate-900!">
                <div className="relative flex h-[300px] items-center justify-center bg-slate-200 dark:bg-slate-800! sm:h-[430px]">
                  <Skeleton className="absolute left-5 top-5 h-9 w-24 bg-slate-300 dark:bg-slate-700!" />
                  <Skeleton className="absolute left-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-slate-300 dark:bg-slate-700! sm:left-5" />
                  <Skeleton className="absolute right-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-slate-300 dark:bg-slate-700! sm:right-5" />
                  <Skeleton className="absolute right-5 top-5 h-7 w-14 rounded-full bg-slate-300 dark:bg-slate-700!" />
                  <div className="absolute bottom-5 left-5 right-5 space-y-2">
                    <Skeleton className="h-4 w-28 bg-slate-300 dark:bg-slate-700!" />
                    <Skeleton className="h-9 w-3/4 max-w-sm bg-slate-300 dark:bg-slate-700!" />
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 p-4 sm:p-5">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-16 w-20 shrink-0 rounded-xl sm:h-20 sm:w-28"
                    />
                  ))}
                </div>
              </div>

              <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800! dark:bg-slate-900! sm:p-7">
                <Skeleton className="h-7 w-56" />
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800! dark:bg-slate-900! sm:p-7">
                <Skeleton className="h-7 w-48" />
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5 max-w-full" />
                </div>
                <Skeleton className="mt-6 h-4 w-36" />
                <div className="mt-3 flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-9 w-24 rounded-full" />
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800! dark:bg-slate-900! sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-9 w-36" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-8 w-24 rounded-xl" />
                </div>

                <Skeleton className="mt-6 h-28 w-full rounded-xl" />

                <div className="mt-6 rounded-xl bg-slate-100 p-4 dark:bg-slate-800/60!">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-48 max-w-full" />
                    </div>
                  </div>
                </div>

                <Skeleton className="mt-6 h-12 w-full" />

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-52 max-w-full" />
                    <Skeleton className="h-3 w-44 max-w-full" />
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <section className="mt-20">
            <div className="mb-8 space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-48" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                >
                  <Skeleton className="h-40 w-full rounded-none" />
                  <div className="space-y-3 p-5">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-40 max-w-full" />
                    <Skeleton className="h-4 w-32" />
                    <div className="flex items-center justify-between pt-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-10 w-16 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
