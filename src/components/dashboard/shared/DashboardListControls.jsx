"use client";

import { Search } from "lucide-react";

export default function DashboardListControls({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filters = [],
  sortValue,
  onSortChange,
  sortOptions = [],
}) {
  const desktopGridColumns =
    filters.length > 1
      ? "xl:grid-cols-[minmax(0,1fr)_repeat(3,minmax(140px,190px))]"
      : "xl:grid-cols-[minmax(0,1fr)_repeat(2,minmax(150px,190px))]";

  return (
    <div
      className={`grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900! sm:grid-cols-2 ${desktopGridColumns}`}
    >
      <label className="relative block min-w-0">
        <span className="sr-only">{searchPlaceholder}</span>
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950! dark:text-white"
        />
      </label>

      {filters.map((filter) => (
        <label key={filter.id} className="min-w-0">
          <span className="sr-only">{filter.label}</span>
          <select
            id={filter.id}
            value={filter.value}
            onChange={(event) => filter.onChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950! dark:text-slate-200"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ))}

      <label className="min-w-0">
        <span className="sr-only">Sort results</span>
        <select
          value={sortValue}
          onChange={(event) => onSortChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950! dark:text-slate-200"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
