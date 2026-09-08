"use client";

import { motion } from "framer-motion";
import {
  FaHeadset,
  FaLock,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaTicketAlt,
  FaWallet,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: FaTicketAlt,
    title: "Easy Ticket Booking",
    description:
      "Find your preferred route, choose your ticket and complete your booking without unnecessary steps.",
  },
  {
    id: 2,
    icon: FaShieldAlt,
    title: "Verified Tickets",
    description:
      "We focus on reliable ticket listings so you can travel with greater confidence and peace of mind.",
  },
  {
    id: 3,
    icon: FaWallet,
    title: "Transparent Pricing",
    description:
      "See clear ticket prices before booking with no confusing pricing structure.",
  },
  {
    id: 4,
    icon: FaMapMarkedAlt,
    title: "Multiple Destinations",
    description:
      "Explore popular routes and discover convenient travel options across different destinations.",
  },
  {
    id: 5,
    icon: FaLock,
    title: "Secure Experience",
    description:
      "Your account and booking experience are designed with security and privacy in mind.",
  },
  {
    id: 6,
    icon: FaHeadset,
    title: "Reliable Support",
    description:
      "Get the help you need throughout your booking journey whenever you need assistance.",
  },
];

const WhyTripSwift = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      {/* Background decoration */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#047BFB]/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#38BDF8]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#38BDF8]" />

            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">
              Why TripSwift
            </span>

            <span className="h-px w-8 bg-[#38BDF8]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px]">
            Travel Better.{" "}
            <span className="text-[#38BDF8]">Travel Smarter.</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            Everything you need for a smoother ticket booking experience,
            thoughtfully designed in one place.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:border-[#38BDF8]/40 hover:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#047BFB]/10 text-xl text-[#38BDF8] transition-all duration-300 group-hover:bg-[#047BFB] group-hover:text-white">
                  <Icon />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTripSwift;