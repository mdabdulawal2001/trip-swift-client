import HeroSkeleton from "@/components/shared/skeletons/HeroSkeleton";
import TicketCardSkeleton from "@/components/shared/skeletons/TicketCardSkeleton";

const Loading = () => {
  return (
    <main>
      {/* Hero */}

      <HeroSkeleton />

      {/* Featured Tickets */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
          {/* Heading */}

          <div className="mb-10">
            <div className="mb-3 h-3 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

            <div className="h-10 w-64 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

            <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Cards */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <TicketCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Tickets */}

      <section className="border-y border-slate-200 bg-slate-50/70 py-20 dark:border-slate-800 dark:bg-slate-950/50 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
          {/* Heading */}

          <div className="mb-10">
            <div className="mb-3 h-3 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

            <div className="h-10 w-60 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

            <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Cards */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <TicketCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Loading;