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
      className="grid w-full gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end"
    >
      {/* Departure */}
      <div className="relative flex items-center">
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
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#047BFB] focus:ring-2 focus:ring-[#047BFB]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>

      {/* Destination */}
      <div className="relative flex items-center">
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
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#047BFB] focus:ring-2 focus:ring-[#047BFB]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="cursor-pointer inline-flex h-[46px] items-center justify-center gap-2 rounded-xl bg-[#238FD8] px-6 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#035ec4] hover:shadow-md hover:shadow-[#238FD8]/20 active:translate-y-0"
      >
        <Search
          size={18}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        Search
      </button>
    </form>
  );
}