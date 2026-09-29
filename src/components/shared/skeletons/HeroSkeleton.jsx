const HeroSkeleton = () => {
  return (
    <section className="relative max-w-7xl mx-auto">
      {/* =========================================================
          HERO
      ========================================================== */}

      <div className="relative mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8 lg:pt-6">
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            bg-slate-100
            dark:bg-slate-900
            sm:rounded-[36px]
          "
        >
          <div
            className="
              flex
              min-h-[650px]
              flex-col
              sm:min-h-[690px]
              lg:min-h-[620px]
              lg:flex-row
              xl:min-h-[650px]
            "
          >
            {/* =================================================
                IMAGE SKELETON
            ================================================== */}

            <div
              className="
                relative
                min-h-[330px]
                w-full
                animate-pulse
                bg-slate-200
                dark:bg-slate-800
                lg:min-h-full
                lg:w-[54%]
              "
            >
              {/* Badge */}

              <div
                className="
                  absolute
                  left-5
                  top-5
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/70
                  px-3.5
                  py-2
                  dark:bg-slate-900/70
                "
              >
                <div className="h-7 w-7 rounded-full bg-slate-300 dark:bg-slate-700" />

                <div className="h-3 w-20 rounded-full bg-slate-300 dark:bg-slate-700" />
              </div>
            </div>

            {/* =================================================
                CONTENT SKELETON
            ================================================== */}

            <div
              className="
                flex
                w-full
                flex-1
                flex-col
                justify-center
                px-6
                pb-12
                pt-8
                sm:px-10
                sm:pb-14
                lg:w-[46%]
                lg:px-10
                lg:py-12
                xl:px-14
              "
            >
              {/* Small label */}

              <div className="mb-5 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />

                <div className="h-3 w-20 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
              </div>

              {/* Title */}

              <div className="space-y-3">
                <div className="h-12 w-full max-w-xl animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                <div className="h-12 w-4/5 max-w-lg animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Accent line */}

              <div className="mt-6 h-1 w-16 rounded-full bg-slate-300 dark:bg-slate-700" />

              {/* Description */}

              <div className="mt-6 max-w-lg space-y-2">
                <div className="h-3 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

                <div className="h-3 w-11/12 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

                <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Route information */}

              <div
                className="
                  mt-7
                  flex
                  w-fit
                  max-w-full
                  flex-wrap
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3.5
                  dark:border-slate-800
                  dark:bg-slate-900!
                "
              >
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800!" />

                <div className="space-y-2">
                  <div className="h-2 w-20 rounded-full bg-slate-200 dark:bg-slate-800!" />

                  <div className="h-4 w-36 rounded-full bg-slate-200 dark:bg-slate-800! sm:w-44" />
                </div>

                <div className="hidden h-8 w-px bg-slate-200 sm:block dark:bg-slate-800!" />

                <div className="hidden space-y-2 sm:block">
                  <div className="h-2 w-20 rounded-full bg-slate-200 dark:bg-slate-800!" />

                  <div className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-800!" />
                </div>
              </div>

              {/* Buttons */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 sm:w-44" />

                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 sm:w-48" />
              </div>

              {/* Trust */}

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />

                <div className="hidden h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-800 sm:block" />

                <div className="h-3 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          SEARCH CARD
      ========================================================== */}

      <div
        className="
          relative
          z-30
          mx-auto
          -mt-8
          w-[calc(100%-1.5rem)]
          max-w-6xl
          sm:-mt-12
          sm:w-[calc(100%-3rem)]
          lg:-mt-16
        "
      >
        <div
          className="
            rounded-[24px]
            border
            border-slate-200
            bg-white
            p-4
            shadow-lg
            dark:border-slate-800
            dark:bg-slate-900
            sm:p-6
            lg:p-7
          "
        >
          {/* Search heading */}

          <div className="mb-4 flex items-center justify-between px-1">
            <div className="space-y-2">
              <div className="h-4 w-48 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

              <div className="hidden h-3 w-72 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800 sm:block" />
            </div>

            <div className="hidden h-7 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800 sm:block" />
          </div>

          {/* Search fields */}

          <div
            className="
              grid
              gap-2.5
              md:grid-cols-2
              lg:grid-cols-[1fr_1fr_210px_145px]
            "
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  flex
                  min-h-15.5
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-3.5
                  dark:border-slate-800
                  dark:bg-slate-800/70
                "
              >
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-2 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />

                  <div className="h-4 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            ))}

            {/* Search button */}

            <div className="h-15.5 min-h-15.5 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;