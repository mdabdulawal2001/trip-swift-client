import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function QuickActions({ items }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="font-bold text-slate-900 dark:text-white">
        Quick Actions
      </h2>

      <div className="mt-5 grid gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-3 rounded-2xl border border-slate-100 p-3 transition hover:border-sky-200 hover:bg-sky-50 dark:border-slate-800 dark:hover:border-sky-900 dark:hover:bg-sky-500/10"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-sky-500 group-hover:text-white dark:bg-slate-800">
              {item.icon}
            </div>

            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {item.label}
            </span>

            <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}