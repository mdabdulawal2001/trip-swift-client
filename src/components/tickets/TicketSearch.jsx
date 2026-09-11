"use client";

import { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";

export default function TicketSearch({
  from,
  to,
  onSearch,
}) {
  const [localFrom, setLocalFrom] = useState(from || "");
  const [localTo, setLocalTo] = useState(to || "");

  useEffect(() => {
    setLocalFrom(from || "");
  }, [from]);

  useEffect(() => {
    setLocalTo(to || "");
  }, [to]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch({
      from: localFrom.trim(),
      to: localTo.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
    >
      <div className="relative">
        <MapPin
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={localFrom}
          onChange={(event) =>
            setLocalFrom(event.target.value)
          }
          placeholder="Departure city"
          className="w-full rounded-xl border border-slate-200 bg-transparent py-3 pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#047BFB] dark:border-slate-700 dark:text-white"
        />
      </div>

      <div className="relative">
        <MapPin
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={localTo}
          onChange={(event) =>
            setLocalTo(event.target.value)
          }
          placeholder="Destination city"
          className="w-full rounded-xl border border-slate-200 bg-transparent py-3 pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#047BFB] dark:border-slate-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-[#047BFB] px-5 py-3 font-semibold text-white transition hover:bg-[#035ec4]"
      >
        <Search size={18} />
        Search
      </button>
    </form>
  );
}