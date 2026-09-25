"use client";

export default function TicketSort({
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        Sort By
      </label>

      <select
        value={value || "default"}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-800 outline-none transition-all duration-300 focus:border-[#047BFB] focus:ring-2 focus:ring-[#047BFB]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      >
        <option value="default">Default</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
  );
}