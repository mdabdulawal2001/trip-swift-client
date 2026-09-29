"use client";

function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 ${className}`}
    />
  );
}

export default function TicketFormSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-4 w-28" />

        <Skeleton className="mt-3 h-8 w-48" />

        <Skeleton className="mt-2 h-4 w-full max-w-lg" />
      </div>

      {/* Form Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        {/* Sections */}
        {Array.from({ length: 6 }).map((_, sectionIndex) => (
          <div
            key={sectionIndex}
            className="mb-8 last:mb-0"
          >
            <Skeleton className="mb-4 h-6 w-40" />

            <div className="grid gap-5 md:grid-cols-2">
              {Array.from({
                length: sectionIndex === 5 ? 1 : 2,
              }).map((_, fieldIndex) => (
                <div
                  key={fieldIndex}
                  className={
                    sectionIndex === 5
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  <Skeleton className="h-4 w-28" />

                  <Skeleton className="mt-2 h-12 w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Button */}
        <Skeleton className="mt-8 h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}