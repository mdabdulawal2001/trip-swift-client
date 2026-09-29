"use client";

const LoginSkeleton = () => {
  return (
    <div className="mx-auto my-10 w-full max-w-md px-4 sm:my-14 sm:px-0">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl dark:bg-cyan-400/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl dark:bg-blue-500/10" />

        <div className="relative animate-pulse">
          {/* Header */}
          <div className="mb-7 text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-slate-200 dark:bg-slate-800" />

            <div className="mx-auto mt-4 h-8 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div className="mx-auto mt-3 h-4 w-72 max-w-full rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Email */}
          <div className="mb-5">
            <div className="mb-2 h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Password */}
          <div className="mb-2">
            <div className="mb-2 h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Forgot Password */}
          <div className="mb-5 flex justify-end">
            <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Login Button */}
          <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />

          {/* Google Button */}
          <div className="mt-5 h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />

          {/* Register Link */}
          <div className="mx-auto mt-6 h-4 w-56 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default LoginSkeleton;