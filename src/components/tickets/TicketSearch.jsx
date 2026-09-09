"use client";

import { MapPin, Search, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function TicketSearch({
  from,
  to,
  setFrom,
  setTo,
}) {
  const [localFrom, setLocalFrom] = useState(from);
  const [localTo, setLocalTo] = useState(to);

  const handleSubmit = (event) => {
    event.preventDefault();

    setFrom(localFrom.trim());
    setTo(localTo.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contents"
    >
      {/* FROM */}
      <div className="flex min-h-[64px] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-sky-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800/60 dark:focus-within:bg-slate-800">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 dark:bg-sky-500/10">
          <MapPin className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            From
          </label>

          <input
            type="text"
            value={localFrom}
            onChange={(event) =>
              setLocalFrom(event.target.value)
            }
            placeholder="Departure city"
            className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
          />
        </div>
      </div>

      {/* TO */}
      <div className="flex min-h-[64px] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-sky-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800/60 dark:focus-within:bg-slate-800">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 dark:bg-sky-500/10">
          <MapPin className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            To
          </label>

          <input
            type="text"
            value={localTo}
            onChange={(event) =>
              setLocalTo(event.target.value)
            }
            placeholder="Destination city"
            className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
          />
        </div>
      </div>

      {/* SEARCH */}
      <button
        type="submit"
        className="min-h-[64px] rounded-2xl bg-sky-500 px-5 text-sm font-bold text-white transition hover:bg-sky-600 active:scale-[0.98]"
      >
        <span className="flex items-center justify-center gap-2">
          <Search className="h-4 w-4" />
          Search
        </span>
      </button>
    </form>
  );
}