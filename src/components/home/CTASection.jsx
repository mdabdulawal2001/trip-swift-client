"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaCompass } from "react-icons/fa";

const CTASection = () => {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-br from-[#035EC4] via-[#238FD7] to-[#38BDF8] px-6 py-14 text-center text-white sm:px-12 sm:py-16 lg:px-20"
      >
        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-slate-950/10 blur-2xl" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-xl backdrop-blur"
          >
            <FaCompass />
          </motion.div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ready for Your Next Journey?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            Explore destinations, compare available tickets and book your
            journey with TripSwift.
          </p>

          <button className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#035EC4] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            Explore Tickets

            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;