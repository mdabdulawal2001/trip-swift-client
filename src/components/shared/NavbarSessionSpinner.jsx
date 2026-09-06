"use client";

const NavbarSessionSpinner = () => {
  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
      aria-label="Checking session"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent dark:border-cyan-400 dark:border-t-transparent" />
    </div>
  );
};

export default NavbarSessionSpinner;