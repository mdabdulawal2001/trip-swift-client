export function paginateItems(items, currentPage, pageSize = 10) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const activePage = Math.min(Math.max(currentPage, 1), totalPages);
  const firstItemIndex = (activePage - 1) * pageSize;

  return {
    activePage,
    firstItemIndex,
    items: items.slice(firstItemIndex, firstItemIndex + pageSize),
    totalPages,
  };
}

export function compareByDate(firstValue, secondValue, direction = "newest") {
  const firstDate = new Date(firstValue || 0).getTime();
  const secondDate = new Date(secondValue || 0).getTime();
  const difference =
    (Number.isNaN(firstDate) ? 0 : firstDate) -
    (Number.isNaN(secondDate) ? 0 : secondDate);

  return direction === "oldest" ? difference : -difference;
}

export function scrollDashboardListToTop() {
  document
    .getElementById("dashboard-list-page")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
