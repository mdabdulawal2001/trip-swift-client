"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Home, Lightbulb, Search } from "lucide-react";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-16 dark:bg-slate-950">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10"
        />

        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 35, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"
        />
      </div>

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Floating Icon */}

        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900"
        >
          <motion.div
            animate={{
              rotate: [0, -8, 8, -5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <Lightbulb className="h-10 w-10 text-blue-600 dark:text-cyan-400" />
          </motion.div>
        </motion.div>

        {/* 404 */}

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            type: "spring",
            stiffness: 120,
          }}
        >
          <h1 className="bg-linear-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-[90px] font-black leading-none tracking-tight text-transparent sm:text-[130px] md:text-[170px]">
            404
          </h1>
        </motion.div>

        {/* Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white"
        >
          Oops! Something Wrong.
        </motion.h2>

        {/* Description */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400"
        >
          The page you're looking for doesn't exist, may have been moved, or the
          ticket you're trying to explore is no longer available.
        </motion.p>

        {/* Search-like box */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <Search className="h-5 w-5 shrink-0 text-blue-500 dark:text-cyan-400" />

          <span className="text-sm text-slate-400">
            Let's find something useful...
          </span>
        </motion.div>

        {/* Buttons */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Home className="h-4 w-4" />
            Go Home
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/tickets"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Explore Tickets
          </Link>
        </motion.div>

        {/* Bottom decoration */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span>Keep thinking. Keep creating.</span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
