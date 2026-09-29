export default function TicketCardSkeleton() {
  return (
    <div
      className="
        flex h-full animate-pulse flex-col overflow-hidden rounded-3xl
        border border-slate-200 bg-white
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* Image */}
      <div className="h-56 bg-slate-200 dark:bg-slate-800" />

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Operator + Available */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />

        {/* Route */}
        <div
          className="
            mt-5 rounded-2xl
            border border-slate-100
            bg-slate-100 p-4
            dark:border-slate-800! dark:bg-slate-950/70
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />

              <div className="h-7 w-px border-l border-dashed border-slate-300 dark:border-slate-700" />

              <div className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="mb-2 h-2.5 w-10 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="text-right">
                  <div className="mb-2 ml-auto h-2.5 w-8 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="ml-auto h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date + Time */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Perks */}
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="h-8 w-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Bottom */}
        <div className="mt-auto pt-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Button */}
          <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}