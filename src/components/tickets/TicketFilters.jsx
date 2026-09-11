"use client";

export default function TicketFilters({
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        Transport Type
      </label>

      <select
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      >
        <option value="">All Transport</option>
        <option value="AC Bus">AC Bus</option>
        <option value="Train">Train</option>
        <option value="Flight">Flight</option>
        <option value="Car">Car</option>
      </select>
    </div>
  );
}