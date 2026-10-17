"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RelatedTickets from "./RelatedTickets";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBus,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTicketAlt,
  FaTrain,
  FaUsers,
} from "react-icons/fa";

import Countdown from "./Countdown";
import BookingModal from "./BookingModal";
import { authClient } from "@/lib/auth-client";
import TicketDetailsSkeleton from "./ticketSkeletons/TicketDetailsSkeleton";

const TicketDetails = ({ ticket, relatedTickets = [], isManagementView }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const getUserRole = async () => {
      try {
        const { data: session } = await authClient.getSession();

        if (mounted) {
          setUserRole(session?.user?.role || null);
        }
      } catch (error) {
        console.error("Failed to get user role:", error);

        if (mounted) {
          setUserRole(null);
        }
      } finally {
        if (mounted) {
          setRoleLoading(false);
        }
      }
    };

    getUserRole();

    return () => {
      mounted = false;
    };
  }, []);

  const TransportIcon = ticket.type === "Train" ? FaTrain : FaBus;

  const galleryImages = useMemo(() => {
    const images = Array.isArray(ticket.images) ? ticket.images : [];
    const allImages = [ticket.image, ...images]
      .filter((url) => typeof url === "string" && url.trim())
      .map((url) => url.trim());

    return [...new Set(allImages)].slice(0, 4);
  }, [ticket.image, ticket.images]);
  const selectedImageIndex =
    galleryImages.length > 0 ? activeImageIndex % galleryImages.length : 0;
  const activeImage = galleryImages[selectedImageIndex] || "";

  const showPreviousImage = () => {
    setActiveImageIndex(
      (selectedImageIndex + galleryImages.length - 1) % galleryImages.length,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex(
      (selectedImageIndex + 1) % galleryImages.length,
    );
  };

  const isSoldOut = ticket.quantity <= 0;
  const isManagementRole = userRole === "admin" || userRole === "vendor";

  const canBook = userRole === "user";
  const isGuest = !roleLoading && !userRole;

  const isExpired = useMemo(() => {
    return new Date(ticket.departureDateTime).getTime() <= Date.now();
  }, [ticket.departureDateTime]);

  const cannotBook =
    isSoldOut || isExpired || roleLoading || (Boolean(userRole) && !canBook);

  const handleBookingClick = () => {
    if (isGuest) {
      const callbackUrl = window.location.pathname + window.location.search;

      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }

    if (canBook) {
      setIsBookingOpen(true);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950!">
        {/* Breadcrumb / Back */}
        <section className="border-b border-slate-200 dark:border-slate-800 dark:!bg-slate-950 bg-white">
          <div className="flex justify-center mx-auto max-w-[1400px] px-5 py-5 sm:px-8 lg:px-8">
            <Link
              href="/tickets"
              className="w-full group inline-flex items-center justify-center gap-2 text-sm font-semibold bg-[#238FD7] px-4 py-3 rounded-xl text-white transition hover:bg-[#1978B8]"
            >
              <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
              Back to all tickets
            </Link>
          </div>
        </section>

        {/* Main Details */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              {/* Left */}
              <div>
                {/* Image Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="group relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {activeImage ? (
                      <Image
                        key={activeImage}
                        src={activeImage}
                        alt={`${ticket.title} image ${selectedImageIndex + 1}`}
                        width={1600}
                        height={900}
                        className="h-[300px] w-full object-cover sm:h-[430px]"
                      />
                    ) : (
                      <div className="flex h-[300px] items-center justify-center text-sm text-slate-500 sm:h-[430px]">
                        No image available
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent" />

                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-slate-800 backdrop-blur dark:bg-slate-900/90 dark:text-white">
                      <TransportIcon className="text-[#047BFB]" />
                      {ticket.type}
                    </div>

                    {galleryImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={showPreviousImage}
                          aria-label="Previous image"
                          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white sm:left-5"
                        >
                          <FaChevronLeft />
                        </button>

                        <button
                          type="button"
                          onClick={showNextImage}
                          aria-label="Next image"
                          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white sm:right-5"
                        >
                          <FaChevronRight />
                        </button>

                        <span className="absolute right-5 top-5 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white">
                          {selectedImageIndex + 1} / {galleryImages.length}
                        </span>
                      </>
                    )}

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-sm text-slate-300">{ticket.operator}</p>

                      <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                        {ticket.title}
                      </h1>
                    </div>
                  </div>

                  {galleryImages.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-3 p-4 sm:p-5">
                      {galleryImages.map((image, index) => (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() => setActiveImageIndex(index)}
                          aria-label={`Show image ${index + 1}`}
                          aria-pressed={selectedImageIndex === index}
                          className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-28 ${
                            selectedImageIndex === index
                              ? "border-[#238FD7] ring-2 ring-[#238FD7]/20"
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${ticket.title} thumbnail ${index + 1}`}
                            width={224}
                            height={160}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Info */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7"
                >
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Journey Information
                  </h2>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <InfoItem
                      icon={FaMapMarkerAlt}
                      label="From"
                      value={ticket.from}
                    />

                    <InfoItem
                      icon={FaMapMarkerAlt}
                      label="To"
                      value={ticket.to}
                    />

                    <InfoItem
                      icon={FaCalendarAlt}
                      label="Departure Date"
                      value={ticket.date}
                    />

                    <InfoItem
                      icon={FaClock}
                      label="Departure Time"
                      value={ticket.departure}
                    />

                    <InfoItem
                      icon={FaUsers}
                      label="Available Seats"
                      value={`${ticket.quantity} seats`}
                    />

                    <InfoItem
                      icon={TransportIcon}
                      label="Transport Type"
                      value={ticket.type}
                    />
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7"
                >
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    About This Journey
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {ticket.description}
                  </p>

                  <div className="mt-6">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Included Facilities
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(ticket.perks || []).map((perk) => (
                        <span
                          key={perk}
                          className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          <FaCheckCircle className="text-[#047BFB]" />
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right booking card */}
              <motion.aside
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:sticky lg:top-24 lg:self-start"
              >
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                  {/* Price */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Ticket price</p>
                      <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                        ৳{ticket.price?.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">per ticket</p>
                    </div>

                    <div className="rounded-xl bg-[#047BFB]/10 px-3 py-2 text-xs font-semibold text-[#047BFB]">
                      {ticket.quantity > 0
                        ? `${ticket.quantity} available`
                        : "Sold out"}
                    </div>
                  </div>

                  {/* Status Alert Banner */}
                  {ticket.status !== "approved" && (
                    <div className="mt-4 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-xs font-medium text-amber-600 dark:text-amber-400">
                      Status:{" "}
                      <span className="capitalize font-bold">
                        {ticket.status}
                      </span>
                      .
                      {ticket.status === "pending" &&
                        " This ticket is waiting for admin approval."}
                      {ticket.status === "rejected" &&
                        " This ticket has been rejected for booking."}
                    </div>
                  )}

                  {/* Countdown */}
                  {ticket.status === "approved" && (
                    <div className="mt-6">
                      <Countdown targetDate={ticket.departureDateTime} />
                    </div>
                  )}

                  {/* Route summary */}
                  <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#047BFB]/10 text-[#047BFB]">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Route</p>
                        <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                          {ticket.from}
                          <span className="mx-2 text-[#047BFB]">→</span>
                          {ticket.to}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button Section */}
                  {isManagementView || isManagementRole ? (
                    <div className="mt-6 rounded-xl bg-slate-100 px-4 py-3 text-center text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      Booking is available for users only.
                    </div>
                  ) : (
                    <button
                      disabled={cannotBook || ticket.status !== "approved"}
                      onClick={handleBookingClick}
                      className={`cursor-pointer mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition ${
                        cannotBook || ticket.status !== "approved"
                          ? "cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-600"
                          : "bg-[#238fd8] text-white hover:bg-[#1978B8] hover:transition-all duration-500 hover:gap-4 hover:shadow-lg"
                      }`}
                    >
                      {roleLoading
                        ? "Checking access..."
                        : ticket.status === "pending"
                          ? "Approval Pending"
                          : ticket.status === "rejected"
                            ? "Ticket Rejected"
                            : isSoldOut
                              ? "Sold Out"
                              : isExpired
                                ? "Departure Passed"
                                : "Book Now"}
                      {ticket.status === "approved" &&
                        !cannotBook &&
                        canBook && <FaArrowRight />}
                    </button>
                  )}

                  {/* Trust / Security Info */}
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800!">
                    <FaShieldAlt className="mt-0.5 shrink-0 text-[#238fd8]" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Safe & reliable booking
                      </p>
                      <p className="mt-1 text-[11px] leading-5 text-slate-500">
                        Your booking information is securely handled by
                        TripSwift.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>

            {/* Related Tickets */}
            <RelatedTickets tickets={relatedTickets} />
          </div>
        </section>
      </main>

      <BookingModal
        ticket={ticket}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#047BFB]/10 text-[#047BFB]">
        <Icon />
      </div>

      <div>
        <p className="text-xs text-slate-500">{label}</p>

        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
};

export default TicketDetails;
