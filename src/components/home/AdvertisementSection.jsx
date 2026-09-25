"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FaArrowRight,
  FaBus,
  FaTrain,
  FaPlane,
  FaCar,
} from "react-icons/fa";

import { motion } from "framer-motion";
import Image from "next/image";

import {
  getAdvertisedTickets,
} from "@/lib/api";
import toast from "react-hot-toast";

const transportIcons = {
  "AC Bus": FaBus,
  Bus: FaBus,
  Train: FaTrain,
  Flight: FaPlane,
  Car: FaCar,
};

const AdvertisementSection = () => {
  const [tickets, setTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadAdvertisedTickets =
      async () => {
        try {
          setLoading(true);

          const data =
            await getAdvertisedTickets();

          setTickets(
            data?.tickets || []
          );
        } catch (error) {
          toast.error(error?.message || "Advertisement Failed");
          setTickets([]);
        } finally {
          setLoading(false);
        }
      };

    loadAdvertisedTickets();
  }, []);

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-[#1978B8]" />

            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#238FD7]">
              Featured Deals
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[42px]">
                Featured{" "}
                <span className="text-[#238FD7]">
                  Tickets
                </span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                Discover handpicked journeys
                selected for your next trip.
              </p>
            </div>

            <Link
              href="/tickets"
              className="group flex w-fit items-center gap-2 text-sm font-semibold text-[#047BFB]"
            >
              View all tickets

              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          tickets.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No featured tickets available
                right now.
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Check back later for featured
                journeys.
              </p>
            </div>
          )}

        {/* Tickets */}
        {!loading &&
          tickets.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tickets.map(
                (ticket, index) => {
                  const TransportIcon =
                    transportIcons[
                      ticket.type
                    ] || FaBus;

                  return (
                    <Link
                      key={ticket._id}
                      href={`/tickets/${ticket._id}`}
                      className="group block"
                    >
                      <motion.article
                        initial={{
                          opacity: 0,
                          y: 25,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.15,
                        }}
                        transition={{
                          duration: 0.5,
                          delay:
                            index * 0.05,
                        }}
                        whileHover={{
                          y: -5,
                        }}
                        className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:border-[#38BDF8]/60 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                      >
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={ticket.image}
                            alt={
                              ticket.title
                            }
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 backdrop-blur dark:bg-slate-900/90 dark:text-white">
                            <TransportIcon className="text-[#238FD7]" />

                            {ticket.type}
                          </div>
                        </div>

                        <div className="p-5">
                          <p className="text-xs font-medium text-slate-500">
                            {ticket.operator}
                          </p>

                          <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                            {ticket.title}
                          </h3>

                          <div className="mt-4 flex items-center justify-between text-sm">
                            <div>
                              <p className="text-xs text-slate-400">
                                Departure
                              </p>

                              <p className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                                {
                                  ticket.departure
                                }
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-xs text-slate-400">
                                Date
                              </p>

                              <p className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                                {ticket.date}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-1.5">
                            {(
                              ticket.perks ||
                              []
                            )
                              .slice(
                                0,
                                3
                              )
                              .map(
                                (
                                  perk
                                ) => (
                                  <span
                                    key={
                                      perk
                                    }
                                    className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                  >
                                    {
                                      perk
                                    }
                                  </span>
                                )
                              )}
                          </div>

                          <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                            <div>
                              <p className="text-xs text-slate-400">
                                Starting from
                              </p>

                              <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                                ৳
                                {Number(
                                  ticket.price ||
                                    0
                                ).toLocaleString()}
                              </p>
                            </div>

                            <span className="flex items-center gap-1 text-xs font-bold bg-[#238FD7] text-white py-3 px-4 rounded-lg hover:bg-[#1A73AD] transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-0.5">
                              View details

                              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  );
                }
              )}
            </div>
          )}
      </div>
    </section>
  );
};

export default AdvertisementSection;