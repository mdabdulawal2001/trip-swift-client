"use client";

function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 ${className}`}
    />
  );
}

function FieldSkeleton({ className = "" }) {
  return (
    <div className={className}>
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-2 h-12 w-full" />
    </div>
  );
}

export default function TicketFormSkeleton({ variant = "add" }) {
  const isEdit = variant === "edit";

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-8">
        {isEdit && <Skeleton className="mb-2 h-4 w-28" />}
        <Skeleton className="h-8 w-52" />
        <Skeleton className="mt-2 h-4 w-full max-w-lg" />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <section className="mb-8">
          <Skeleton className="mb-4 h-6 w-44" />
          <div className="grid gap-5 md:grid-cols-2">
            <FieldSkeleton />
            <FieldSkeleton />
          </div>
        </section>

        <section className="mb-8">
          <Skeleton className="mb-4 h-6 w-44" />
          <div className="grid gap-5 md:grid-cols-2">
            <FieldSkeleton />
            <FieldSkeleton />
            <FieldSkeleton />
            {isEdit && <FieldSkeleton />}
            {isEdit && <FieldSkeleton />}
            {!isEdit && <FieldSkeleton />}
          </div>
        </section>

        {!isEdit && (
          <section className="mb-8">
            <Skeleton className="mb-4 h-6 w-52" />
            <div className="grid gap-5 md:grid-cols-2">
              <FieldSkeleton />
              <FieldSkeleton />
            </div>
          </section>
        )}

        <section className="mb-8">
          <Skeleton className="mb-4 h-6 w-28" />
          <FieldSkeleton />
        </section>

        <section className="mb-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <Skeleton className="h-6 w-36" />
              <Skeleton className="mt-2 h-4 w-72 max-w-full" />
            </div>
            <Skeleton className="h-10 w-28" />
          </div>

          <div className="space-y-4">
            {[0, 1].map((imageIndex) => (
              <div
                key={imageIndex}
                className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <Skeleton className="h-12 w-full" />
                {imageIndex === 0 && (
                  <Skeleton className="mt-3 h-32 w-full rounded-lg sm:w-56" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <Skeleton className="mb-4 h-6 w-32" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
          <Skeleton className="mt-3 h-3 w-64 max-w-full" />
        </section>

        <section className="mb-8">
          <Skeleton className="mb-2 h-4 w-28" />
          <Skeleton className="h-36 w-full" />
        </section>

        <div
          className={
            isEdit
              ? "flex flex-col gap-3 sm:flex-row sm:justify-end"
              : "flex w-full"
          }
        >
          {isEdit && <Skeleton className="h-12 w-full sm:w-32" />}
          <Skeleton
            className={isEdit ? "h-12 w-full sm:w-40" : "h-12 w-full"}
          />
        </div>
      </div>
    </div>
  );
}
