"use client";

import { SlidersHorizontal } from "lucide-react";

const transportTypes = [
  {
    value: "",
    label: "All Transport",
  },
  {
    value: "AC Bus",
    label: "AC Bus",
  },
  {
    value: "Train",
    label: "Train",
  },
  {
    value: "Flight",
    label: "Flight",
  },
  {
    value: "Car",
    label: "Car",
  },
];

export default function TicketFilters({
  transportType,
  setTransportType,
}) {
  return (
    <div className="relative">
      <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <select
        value={transportType}
        onChange={(event) =>
          setTransportType(event.target.value)
        }
        className="h-full min-h-[64px] w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-10 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800/60 dark:text-white dark:focus:bg-slate-800"
      >
        {transportTypes.map((item) => (
          <option
            key={item.value}
            value={item.value}
            className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white"
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}