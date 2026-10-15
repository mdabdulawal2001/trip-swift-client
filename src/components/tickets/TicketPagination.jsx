"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function TicketPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  let pages;

  if (totalPages <= 7) {
    pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    const visiblePages = new Set([1, totalPages]);

    if (currentPage <= 4) {
      [2, 3, 4, 5].forEach((page) => visiblePages.add(page));
    } else if (currentPage >= totalPages - 3) {
      [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1].forEach(
        (page) => visiblePages.add(page),
      );
    } else {
      [currentPage - 1, currentPage, currentPage + 1].forEach((page) =>
        visiblePages.add(page),
      );
    }

    const sortedPages = [...visiblePages].sort((first, second) => first - second);
    pages = sortedPages.flatMap((page, index) => {
      const previousPage = sortedPages[index - 1];

      return [
        ...(previousPage && page - previousPage > 1
          ? [`ellipsis-${previousPage}`]
          : []),
        page,
      ];
    });
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row">
      <p className="text-xs text-slate-500">
        Page{" "}
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {totalPages}
        </span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Pages */}
        {pages.map((page) =>
          typeof page === "string" ? (
            <span
              key={page}
              aria-label="More pages"
              className="flex h-10 min-w-6 items-center justify-center text-sm text-slate-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${
                currentPage === page
                  ? "bg-sky-500 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}