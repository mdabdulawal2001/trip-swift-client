"use client";

const chartColors = {
  paid: "#0ea5e9",
  pending: "#f59e0b",
  inactive: "#94a3b8",
};

function getMonthlySpending(payments) {
  const currentDate = new Date();
  const months = [];

  for (let offset = 5; offset >= 0; offset -= 1) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - offset,
      1,
    );

    months.push({
      label: date.toLocaleString("en-US", { month: "short" }),
      year: date.getFullYear(),
      monthIndex: date.getMonth(),
      amount: 0,
    });
  }

  payments.forEach((payment) => {
    const date = new Date(payment.paymentDate);
    const amount = Number(payment.amount);

    if (Number.isNaN(date.getTime()) || !Number.isFinite(amount)) return;

    const month = months.find(
      (item) =>
        item.year === date.getFullYear() && item.monthIndex === date.getMonth(),
    );

    if (month) month.amount += amount;
  });

  return months;
}

function getBookingStatusCounts(bookings) {
  return bookings.reduce(
    (counts, booking) => {
      const status = String(booking.status || "").toLowerCase();

      if (["paid", "accepted", "completed", "confirmed"].includes(status)) {
        counts.paid += 1;
      } else if (status === "pending") {
        counts.pending += 1;
      } else {
        counts.inactive += 1;
      }

      return counts;
    },
    { paid: 0, pending: 0, inactive: 0 },
  );
}

function MonthlySpendingChart({ payments }) {
  const months = getMonthlySpending(payments);
  const maxAmount = Math.max(...months.map((month) => month.amount), 1);
  const points = months.map((month, index) => ({
    ...month,
    x: 28 + (index * 544) / (months.length - 1),
    y: 184 - (month.amount / maxAmount) * 145,
  }));
  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const hasPayments = payments.length > 0;

  return (
    <section
      aria-labelledby="monthly-spending-title"
      className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id="monthly-spending-title"
            className="font-bold text-slate-900 dark:text-white"
          >
            Monthly spending
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Paid transactions over the last six months
          </p>
        </div>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
          BDT
        </span>
      </div>

      {hasPayments ? (
        <>
          <svg
            viewBox="0 0 600 220"
            role="img"
            aria-label="Line chart of monthly spending based on your payment history"
            className="mt-5 h-auto w-full overflow-visible"
          >
            {[40, 88, 136, 184].map((y) => (
              <line
                key={y}
                x1="20"
                x2="580"
                y1={y}
                y2={y}
                stroke="currentColor"
                className="text-slate-100 dark:text-slate-800"
                strokeDasharray="4 6"
              />
            ))}
            <path
              d={linePath}
              fill="none"
              stroke={chartColors.paid}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {points.map((point) => (
              <circle
                key={`${point.year}-${point.monthIndex}`}
                cx={point.x}
                cy={point.y}
                r="5"
                fill={chartColors.paid}
                stroke="white"
                strokeWidth="2"
              >
                <title>
                  {point.label} {point.year}: ৳
                  {point.amount.toLocaleString()}
                </title>
              </circle>
            ))}
          </svg>
          <div className="mt-1 grid grid-cols-6 text-center text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">
            {months.map((month) => (
              <span key={`${month.year}-${month.monthIndex}`}>
                {month.label}
              </span>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-8 rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
          Payment history will appear here after a transaction is recorded.
        </p>
      )}
    </section>
  );
}

function BookingStatusChart({ bookings }) {
  const counts = getBookingStatusCounts(bookings);
  const total = bookings.length;
  const paidEnd = total ? (counts.paid / total) * 100 : 0;
  const pendingEnd = total ? paidEnd + (counts.pending / total) * 100 : paidEnd;
  const chartStyle = {
    background: total
      ? `conic-gradient(${chartColors.paid} 0% ${paidEnd}%, ${chartColors.pending} ${paidEnd}% ${pendingEnd}%, ${chartColors.inactive} ${pendingEnd}% 100%)`
      : "conic-gradient(#e2e8f0 0% 100%)",
  };
  const legend = [
    { label: "Paid / confirmed", value: counts.paid, color: chartColors.paid },
    { label: "Pending", value: counts.pending, color: chartColors.pending },
    { label: "Other status", value: counts.inactive, color: chartColors.inactive },
  ];

  return (
    <section
      aria-labelledby="booking-status-title"
      className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900! sm:p-6"
    >
      <div>
        <h2
          id="booking-status-title"
          className="font-bold text-slate-900 dark:text-white"
        >
          Booking status
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Breakdown of your booking records
        </p>
      </div>

      {total ? (
        <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
          <div
            role="img"
            aria-label={`Booking status chart: ${counts.paid} paid or confirmed, ${counts.pending} pending, ${counts.inactive} other`}
            className="relative h-36 w-36 shrink-0 rounded-full"
            style={chartStyle}
          >
            <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {total}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                bookings
              </span>
            </div>
          </div>
          <ul className="w-full space-y-3 sm:w-auto">
            {legend.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between gap-5 text-xs"
              >
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-8 rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
          Booking status will appear here when you make a booking request.
        </p>
      )}
    </section>
  );
}

export default function UserTravelCharts({ bookings, payments }) {
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-2">
      <MonthlySpendingChart payments={payments} />
      <BookingStatusChart bookings={bookings} />
    </div>
  );
}

export function UserTravelChartsSkeleton() {
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-2">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-52 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="h-6 w-12 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="mt-5 aspect-[30/11] animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
        <div className="mt-3 grid grid-cols-6 justify-items-center gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-3 w-7 animate-pulse rounded bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="space-y-2">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-48 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="mt-5 flex min-h-44 flex-col items-center justify-center gap-6 sm:flex-row sm:justify-around">
          <div className="h-36 w-36 shrink-0 animate-pulse rounded-full border-[20px] border-slate-200 dark:border-slate-700" />
          <div className="w-full space-y-4 sm:w-40">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-6 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
