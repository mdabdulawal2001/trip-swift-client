"use client";

import { MapPin, Search } from "lucide-react";

const inputClass = `
  h-13 w-full rounded-xl border
  border-slate-200 bg-white
  pl-11 pr-4
  text-sm font-medium
  text-slate-900
  caret-[#047BFB]
  outline-none
  placeholder:text-slate-400
  transition-all duration-200
  focus:border-[#047BFB]
  focus:ring-4 focus:ring-[#047BFB]/10

  dark:border-slate-700
  dark:bg-slate-950!
  dark:text-white!
  dark:caret-[#38BDF8]
  dark:placeholder:text-slate-500
  dark:focus:border-[#38BDF8]
`;

export default function TicketSearch({
  from,
  to,
  setFrom,
  setTo,
}) {
  return (
    <>
      {/* From */}
      <div className="relative min-w-0">
        <MapPin
          size={18}
          className="
            pointer-events-none
            absolute left-4 top-1/2
            z-10 -translate-y-1/2
            text-[#047BFB]
            dark:text-[#38BDF8]
          "
        />

        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="Departure city"
          aria-label="Departure city"
          className={inputClass}
        />
      </div>

      {/* To */}
      <div className="relative min-w-0">
        <Search
          size={18}
          className="
            pointer-events-none
            absolute left-4 top-1/2
            z-10 -translate-y-1/2
            text-[#047BFB]
            dark:text-[#38BDF8]
          "
        />

        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Destination city"
          aria-label="Destination city"
          className={inputClass}
        />
      </div>
    </>
  );
}