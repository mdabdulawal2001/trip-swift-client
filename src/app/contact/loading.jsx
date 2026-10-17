export default function ContactLoading() {
  return (
    <main className="bg-[#F4F9FC] px-4 py-14 dark:bg-[#071522] sm:px-6 sm:py-20">
      <div className="mx-auto grid w-full max-w-[1352px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="space-y-4">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-10 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-20 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-24 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-12 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
            />
          ))}
          <div className="h-32 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-12 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </main>
  );
}
