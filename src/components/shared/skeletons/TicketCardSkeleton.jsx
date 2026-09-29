const TicketCardSkeleton = () => {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        dark:border-slate-800!
        dark:bg-slate-900!
      "
    >
      {/* Image */}

      <div className="relative h-52 animate-pulse bg-slate-200 dark:bg-slate-800!">
        {/* Transport badge */}

        <div
          className="
            absolute
            left-4
            top-4
            flex
            items-center
            gap-2
            rounded-full
            bg-white/80
            px-3
            py-1.5
            dark:bg-slate-900/80!
          "
        >
          <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700!" />

          <div className="h-3 w-14 rounded-full bg-slate-300 dark:bg-slate-700!" />
        </div>
      </div>

      {/* Content */}

      <div className="p-5">
        {/* Operator */}

        <div className="h-3 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800!" />

        {/* Title */}

        <div className="mt-3 space-y-2">
          <div className="h-6 w-4/5 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800!" />

          <div className="h-6 w-3/5 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800!" />
        </div>

        {/* Departure / Date */}

        <div className="mt-5 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-2 w-16 rounded-full bg-slate-200 dark:bg-slate-800!" />

            <div className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-800!" />
          </div>

          <div className="space-y-2 text-right">
            <div className="ml-auto h-2 w-10 rounded-full bg-slate-200 dark:bg-slate-800!" />

            <div className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-800!" />
          </div>
        </div>

        {/* Perks */}

        <div className="mt-5 flex gap-1.5">
          <div className="h-6 w-14 animate-pulse rounded-md bg-slate-100 dark:bg-slate-800!" />

          <div className="h-6 w-16 animate-pulse rounded-md bg-slate-100 dark:bg-slate-800!" />

          <div className="h-6 w-12 animate-pulse rounded-md bg-slate-100 dark:bg-slate-800!" />
        </div>

        {/* Bottom */}

        <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4 dark:!border-slate-800">
          <div className="space-y-2">
            <div className="h-2 w-20 rounded-full bg-slate-200 dark:bg-slate-800!" />

            <div className="h-6 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800!" />
          </div>

          <div className="h-10 w-28 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800!" />
        </div>
      </div>
    </div>
  );
};

export default TicketCardSkeleton;