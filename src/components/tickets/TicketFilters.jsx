"use client";

import { FaSearch, FaTimes } from "react-icons/fa";

const TicketFilters = ({
  search,
  setSearch,
  from,
  setFrom,
  to,
  setTo,
  type,
  setType,
  sort,
  setSort,
}) => {
  const clearFilters = () => {
    setSearch("");
    setFrom("");
    setTo("");
    setType("");
    setSort("");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto]">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destination or operator..."
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* From */}
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          <option value="">From</option>
          <option value="Dhaka">Dhaka</option>
        </select>

        {/* To */}
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          <option value="">To</option>
          <option value="Cox's Bazar">Cox's Bazar</option>
          <option value="Chattogram">Chattogram</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Khulna">Khulna</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Barishal">Barishal</option>
          <option value="Cumilla">Cumilla</option>
        </select>

        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          <option value="">Transport</option>
          <option value="AC Bus">AC Bus</option>
          <option value="Train">Train</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          <option value="">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

        {/* Clear */}
        <button
          onClick={clearFilters}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-red-950/20"
        >
          <FaTimes />
          Clear
        </button>
      </div>
    </div>
  );
};

export default TicketFilters;