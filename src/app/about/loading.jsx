export default function AboutLoading() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl space-y-5 text-center">
        <div className="mx-auto h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mx-auto h-10 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="mx-auto h-4 w-full max-w-2xl animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800"
          />
        ))}
      </div>
    </main>
  );
}
