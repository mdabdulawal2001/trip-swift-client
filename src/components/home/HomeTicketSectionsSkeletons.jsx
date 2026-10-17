import TicketCardSkeleton from "@/components/shared/skeletons/TicketCardSkeleton";

function SectionHeadingSkeleton({ eyebrowWidth, titleWidth }) {
  return (
    <div className="mb-10">
      <div
        className={`mb-3 h-3 ${eyebrowWidth} animate-pulse rounded-full bg-slate-200 dark:bg-slate-800`}
      />
      <div
        className={`h-10 ${titleWidth} animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800`}
      />
      <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

export function LatestTicketsSkeleton() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-20 dark:border-slate-950 dark:bg-slate-950/50 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-8">
        <SectionHeadingSkeleton eyebrowWidth="w-28" titleWidth="w-60" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <TicketCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AdvertisementSectionSkeleton() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-8">
        <SectionHeadingSkeleton eyebrowWidth="w-32" titleWidth="w-64" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <TicketCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
