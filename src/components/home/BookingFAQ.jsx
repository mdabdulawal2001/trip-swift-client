"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const questions = [
  {
    question: "Where can I search for available journeys?",
    answer:
      "Open All Tickets to search by departure city and destination, choose a transport type, and sort the available listings.",
  },
  {
    question: "How do I send a booking request?",
    answer:
      "Open a ticket's details and use its booking action. Sign in with a regular user account to submit a request.",
  },
  {
    question: "Where can I check a booking or payment?",
    answer:
      "Sign in and open your dashboard. Your bookings and transaction records are available from the dashboard navigation.",
  },
  {
    question: "How do I get help with an account or journey?",
    answer:
      "Send a message through the contact form and include the booking or ticket details relevant to your question.",
  },
];

export default function BookingFAQ() {
  return (
    <section className="bg-[#F7FBFF] py-20 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#238FD7] dark:text-[#38BDF8]">
            Help before you travel
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Common questions
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Quick guidance for searching tickets, requesting a booking, and
            finding your account activity.
          </p>
          <Link
            href="/contact"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1978B8] hover:text-[#035EC4] dark:text-[#38BDF8] dark:hover:text-sky-300"
          >
            Contact TripSwift
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="space-y-3">
          {questions.map(({ question, answer }, index) => (
            <motion.details
              key={question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors open:border-sky-200 open:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:open:border-sky-800 sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[#238FD7] transition-transform group-open:rotate-45 dark:bg-sky-500/10 dark:text-[#38BDF8]">
                  <span aria-hidden="true" className="text-xl leading-none">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 max-w-2xl pr-10 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {answer}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
