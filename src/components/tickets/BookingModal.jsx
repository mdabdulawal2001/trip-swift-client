"use client";

import { useEffect, useState } from "react";
import {
  FaBus,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaMinus,
  FaPlus,
  FaTimes,
  FaTrain,
} from "react-icons/fa";

const BookingModal = ({ ticket, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !ticket) {
    return null;
  }

  const TransportIcon =
    ticket.type === "Train" ? FaTrain : FaBus;

  const totalPrice = ticket.price * quantity;

  const increaseQuantity = () => {
    if (quantity < ticket.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleConfirm = () => {
    /*
      Later:
      1. Check authenticated user
      2. POST booking to backend
      3. Save booking with status "pending"
      4. Redirect/show success
      5. My Booked Tickets will display it
    */

    console.log("Booking:", {
      ticketId: ticket.id,
      quantity,
      totalPrice,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#047BFB]">
              Confirm Booking
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              Book Your Ticket
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-500 dark:bg-slate-800"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-5">
          {/* Ticket summary */}
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#047BFB]/10 text-[#047BFB]">
                <TransportIcon />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {ticket.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {ticket.operator}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <FaClock className="text-[#047BFB]" />
                {ticket.departure}
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-[#047BFB]" />
                {ticket.date}
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Number of Tickets
              </p>

              <p className="text-xs text-slate-500">
                {ticket.quantity} available
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <button
                onClick={decreaseQuantity}
                disabled={quantity === 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-300"
              >
                <FaMinus />
              </button>

              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {quantity}
                </p>

                <p className="text-[10px] uppercase tracking-wide text-slate-500">
                  ticket{quantity > 1 ? "s" : ""}
                </p>
              </div>

              <button
                onClick={increaseQuantity}
                disabled={quantity >= ticket.quantity}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#047BFB] text-white transition hover:bg-[#035EC4] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="mt-6 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Price per ticket
              </span>

              <span className="font-semibold text-slate-800 dark:text-slate-200">
                ৳{ticket.price.toLocaleString()}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-slate-500">
                Quantity
              </span>

              <span className="font-semibold text-slate-800 dark:text-slate-200">
                × {quantity}
              </span>
            </div>

            <div className="my-4 h-px bg-slate-200 dark:bg-slate-700" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Total
              </span>

              <span className="text-2xl font-bold text-[#047BFB]">
                ৳{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Confirm */}
          <button
            onClick={handleConfirm}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#047BFB] py-3.5 text-sm font-bold text-white transition hover:bg-[#035EC4]"
          >
            <FaCheckCircle />
            Confirm Booking
          </button>

          <p className="mt-3 text-center text-[11px] leading-5 text-slate-500">
            Your booking will be created as pending. Payment will be available
            after the vendor accepts your booking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;