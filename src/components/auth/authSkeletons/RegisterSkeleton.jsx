"use client";

const RegisterSkeleton = () => {
  return (
    <div className="mx-auto my-10 w-full max-w-lg px-4 sm:my-14 sm:px-6 md:w-[60%]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-500/5 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="animate-pulse">
          {/* Header */}
          <div className="mb-7 text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-slate-200 dark:bg-slate-800" />

            <div className="mx-auto mt-4 h-8 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div className="mx-auto mt-3 h-4 w-80 max-w-full rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Full Name */}
          <div className="mb-5">
            <div className="mb-2 h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Email */}
          <div className="mb-5">
            <div className="mb-2 h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Password */}
          <div className="mb-5">
            <div className="mb-2 h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <div className="mb-2 h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Create Account */}
          <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />

          {/* Google Button */}
          <div className="mt-5 h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />

          {/* Login Link */}
          <div className="mx-auto mt-6 h-4 w-56 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default RegisterSkeleton;