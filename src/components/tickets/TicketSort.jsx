"use client";

import { ArrowDownUp, ChevronDown } from "lucide-react";

const sortOptions = [
  {
    value: "default",
    label: "Recommended",
  },
  {
    value: "low-high",
    label: "Price: Low to High",
  },
  {
    value: "high-low",
    label: "Price: High to Low",
  },
];

export default function TicketSort({
  sort,
  setSort,
}) {
  return (
    <div className="relative min-w-0">
      <ArrowDownUp
        size={17}
        className="
          pointer-events-none
          absolute left-4 top-1/2
          z-10 -translate-y-1/2
          text-[#047BFB]
          dark:text-[#38BDF8]
        "
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        aria-label="Sort tickets"
        className="
          h-13 w-full appearance-none
          rounded-xl border
          border-slate-200
          bg-white
          pl-11 pr-11
          text-sm font-semibold
          text-slate-900
          outline-none
          transition-all duration-200

          focus:border-[#047BFB]
          focus:ring-4
          focus:ring-[#047BFB]/10

          dark:border-slate-700
          dark:bg-slate-950!
          dark:text-white!
          dark:focus:border-[#38BDF8]

          [color-scheme:light]
          dark:[color-scheme:dark]
        "
      >
        {sortOptions.map((item) => (
          <option
            key={item.value}
            value={item.value}
            className="
              bg-white
              text-slate-900
              dark:bg-slate-950
              dark:text-white!
            "
          >
            {item.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={17}
        className="
          pointer-events-none
          absolute right-4 top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />
    </div>
  );
}