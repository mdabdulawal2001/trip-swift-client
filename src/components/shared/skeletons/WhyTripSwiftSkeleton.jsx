const WhyTripSwiftSkeleton = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7FBFF] py-20 sm:py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">

        {/* Heading Skeleton */}
        <div className="mx-auto mb-12 max-w-2xl text-center animate-pulse">
          
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-slate-300 dark:bg-slate-700" />

            <div className="h-3 w-32 rounded bg-slate-300 dark:bg-slate-700" />

            <div className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
          </div>

          <div className="mx-auto h-10 w-80 max-w-full rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="mx-auto mt-4 h-4 w-full max-w-xl rounded bg-slate-200 dark:bg-slate-800" />

          <div className="mx-auto mt-2 h-4 w-3/4 max-w-lg rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Feature Cards */}
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="
                animate-pulse
                rounded-2xl
                border
                border-blue-100
                bg-white/75
                p-6
                dark:border-slate-800
                dark:bg-slate-900/60
              "
            >
              {/* Icon */}
              <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-800" />

              {/* Title */}
              <div className="mt-5 h-5 w-44 rounded bg-slate-200 dark:bg-slate-800" />

              {/* Description */}
              <div className="mt-3 h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />

              <div className="mt-2 h-3 w-11/12 rounded bg-slate-200 dark:bg-slate-800" />

              <div className="mt-2 h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyTripSwiftSkeleton;