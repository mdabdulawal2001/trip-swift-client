export default function BookingRow({
  name,
  route,
  quantity,
  status,
}) {
  const normalizedStatus = String(
    status || "pending"
  ).toLowerCase();

  const statusConfig = {
    accepted: {
      label: "Accepted",
      className:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },

    rejected: {
      label: "Rejected",
      className:
        "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    },

    pending: {
      label: "Pending",
      className:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },
  };

  const config =
    statusConfig[normalizedStatus] ||
    statusConfig.pending;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">
          {name}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {route} · {quantity}
        </p>
      </div>

      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
      >
        {config.label}
      </span>
    </div>
  );
}