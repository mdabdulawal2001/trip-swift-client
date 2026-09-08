"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function TicketPagination({
  page,
  total,
  setPage,
}) {
  if (total <= 1) return null;

  const getPages = () => {
    if (total <= 5) {
      return Array.from(
        { length: total },
        (_, index) => index + 1
      );
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "...", total];
    }

    if (page >= total - 2) {
      return [
        1,
        "...",
        total - 3,
        total - 2,
        total - 1,
        total,
      ];
    }

    return [
      1,
      "...",
      page - 1,
      page,
      page + 1,
      "...",
      total,
    ];
  };

  const pages = getPages();

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        aria-label="Previous page"
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl border border-slate-200
          bg-white text-slate-600
          transition-all
          hover:border-[#047BFB] hover:text-[#047BFB]
          disabled:pointer-events-none disabled:opacity-40
          dark:border-slate-700 dark:bg-slate-900
          dark:text-slate-300
          dark:hover:border-[#38BDF8]
          dark:hover:text-[#38BDF8]
        "
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((item, index) =>
        item === "..." ? (
          <span
            key={`dots-${index}`}
            className="flex h-10 w-8 items-center justify-center text-slate-400"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => setPage(item)}
            className={`
              flex h-10 min-w-10 items-center justify-center
              rounded-xl px-3 text-sm font-semibold
              transition-all duration-200
              ${
                page === item
                  ? "bg-[#047BFB] text-white shadow-lg shadow-[#047BFB]/20"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-[#047BFB] hover:text-[#047BFB] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-[#38BDF8] dark:hover:text-[#38BDF8]"
              }
            `}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        disabled={page === total}
        onClick={() => setPage(page + 1)}
        aria-label="Next page"
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl border border-slate-200
          bg-white text-slate-600
          transition-all
          hover:border-[#047BFB] hover:text-[#047BFB]
          disabled:pointer-events-none disabled:opacity-40
          dark:border-slate-700 dark:bg-slate-900
          dark:text-slate-300
          dark:hover:border-[#38BDF8]
          dark:hover:text-[#38BDF8]
        "
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}