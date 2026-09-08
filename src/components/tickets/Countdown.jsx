"use client";

import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

const getTimeLeft = (targetDate) => {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    expired: false,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center dark:border-red-900/50 dark:bg-red-950/20">
        <p className="text-sm font-semibold text-red-600 dark:text-red-400">
          This journey has already departed.
        </p>
      </div>
    );
  }

  const items = [
    ["Days", timeLeft.days],
    ["Hours", timeLeft.hours],
    ["Minutes", timeLeft.minutes],
    ["Seconds", timeLeft.seconds],
  ];

  return (
    <div className="rounded-2xl border border-[#047BFB]/20 bg-[#047BFB]/5 p-5 dark:bg-[#047BFB]/10">
      <div className="flex items-center gap-2">
        <FaClock className="text-[#047BFB]" />

        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Departure in
        </p>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl bg-white p-3 text-center dark:bg-slate-900"
          >
            <p className="text-xl font-bold text-[#047BFB] sm:text-2xl">
              {String(value).padStart(2, "0")}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;