export default function TicketDetailsSkeleton() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Main Details */}
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Image */}
        <div className="animate-pulse overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800">
          <div className="h-[420px] w-full sm:h-[500px]" />
        </div>

        {/* Content */}
        <div className="animate-pulse">
          {/* Operator */}
          <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />

          {/* Title */}
          <div className="mt-4 h-10 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />

          <div className="mt-3 h-5 w-3/5 rounded bg-slate-200 dark:bg-slate-800" />

          {/* Route */}
          <div
            className="
              mt-8 rounded-2xl
              border border-slate-200
              bg-slate-50 p-5
              dark:border-slate-800 dark:bg-slate-900
            "
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />

                <div className="h-12 w-px border-l border-dashed border-slate-300 dark:border-slate-700" />

                <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
              </div>

              <div className="flex-1">
                <div className="flex justify-between gap-4">
                  <div>
                    <div className="mb-2 h-3 w-10 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-5 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>

                  <div className="h-5 w-5 rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="text-right">
                    <div className="mb-2 ml-auto h-3 w-8 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="ml-auto h-5 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Price */}
          <div className="mt-6 h-10 w-36 rounded bg-slate-200 dark:bg-slate-800" />

          {/* Perks */}
          <div className="mt-6 flex flex-wrap gap-2">
            <div className="h-9 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-9 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-9 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Button */}
          <div className="mt-8 h-14 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Countdown Skeleton */}
      <div className="mt-12 animate-pulse rounded-2xl bg-slate-200 p-6 dark:bg-slate-800">
        <div className="h-5 w-32 rounded bg-slate-300 dark:bg-slate-700" />

        <div className="mt-5 grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-20 rounded-xl bg-slate-300 dark:bg-slate-700"
            />
          ))}
        </div>
      </div>

      {/* Related Tickets */}
      <div className="mt-20">
        <div className="mb-8 animate-pulse">
          <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-3 h-8 w-48 rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                animate-pulse overflow-hidden rounded-2xl
                border border-slate-200 bg-white
                dark:border-slate-800 dark:bg-slate-900
              "
            >
              <div className="h-40 bg-slate-200 dark:bg-slate-800" />

              <div className="p-5">
                <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="mt-2 h-5 w-40 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="mt-3 h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="mt-5 flex items-center justify-between">
                  <div className="h-6 w-20 rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="h-10 w-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}