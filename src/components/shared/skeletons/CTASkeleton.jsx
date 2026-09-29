const CTASkeleton = () => {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-8">
      <div
        className="
          relative
          mx-auto
          max-w-7xl
          overflow-hidden
          rounded-3xl
          bg-slate-200
          px-6
          py-14
          animate-pulse
          sm:px-12
          sm:py-16
          lg:px-20
          dark:bg-slate-800
        "
      >
        <div className="mx-auto max-w-3xl text-center">

          {/* Icon */}
          <div className="mx-auto h-14 w-14 rounded-2xl bg-slate-300 dark:bg-slate-700" />

          {/* Heading */}
          <div className="mx-auto mt-6 h-10 w-80 max-w-full rounded-lg bg-slate-300 dark:bg-slate-700 sm:h-12" />

          {/* Description */}
          <div className="mx-auto mt-5 h-4 w-full max-w-2xl rounded bg-slate-300 dark:bg-slate-700" />

          <div className="mx-auto mt-2 h-4 w-4/5 max-w-xl rounded bg-slate-300 dark:bg-slate-700" />

          {/* Button */}
          <div className="mx-auto mt-8 h-14 w-40 rounded-xl bg-slate-300 dark:bg-slate-700" />

        </div>
      </div>
    </section>
  );
};

export default CTASkeleton;