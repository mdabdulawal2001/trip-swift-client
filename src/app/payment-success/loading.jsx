export default function PaymentSuccessLoading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl animate-pulse rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="mx-auto mt-6 h-8 w-64 max-w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mx-auto mt-3 h-4 w-80 max-w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-8 h-12 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
      </div>
    </main>
  );
}
