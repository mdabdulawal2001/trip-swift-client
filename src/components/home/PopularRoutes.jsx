"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

import { getTickets } from "@/lib/api";
import Link from "next/link";

const PopularRoutes = () => {
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularRoutes = async () => {
      try {
        setLoading(true);

        const data = await getTickets();

        const tickets = Array.isArray(data)
          ? data
          : Array.isArray(data?.tickets)
            ? data.tickets
            : [];

        // Only approved tickets
        const approvedTickets = tickets.filter(
          (ticket) => ticket.status === "approved",
        );

        // Group tickets by route
        const routeMap = new Map();

        approvedTickets.forEach((ticket) => {
          const from = String(ticket.from || "").trim();
          const to = String(ticket.to || "").trim();

          if (!from || !to) return;

          const routeKey = `${from.toLowerCase()}-${to.toLowerCase()}`;

          if (!routeMap.has(routeKey)) {
            routeMap.set(routeKey, {
              id: routeKey,
              from,
              to,
              image: ticket.image,
              count: 0,
              lowestPrice: Number(ticket.price) || Infinity,
            });
          }

          const route = routeMap.get(routeKey);

          route.count += 1;

          const ticketPrice = Number(ticket.price);

          if (Number.isFinite(ticketPrice) && ticketPrice < route.lowestPrice) {
            route.lowestPrice = ticketPrice;
          }

          // Use image if first ticket did not have one
          if (!route.image && ticket.image) {
            route.image = ticket.image;
          }
        });

        const routes = Array.from(routeMap.values())
          .sort((a, b) => b.count - a.count)
          .slice(0, 4)
          .map((route) => ({
            ...route,
            trips: `${route.count} ${
              route.count === 1 ? "trip" : "trips"
            } available`,
            price:
              route.lowestPrice !== Infinity
                ? `From ৳${route.lowestPrice.toLocaleString()}`
                : "Price unavailable",
          }));

        setPopularRoutes(routes);
      } catch (error) {
        console.error("Failed to load popular routes:", error);

        setPopularRoutes([]);
      } finally {
        setLoading(false);
      }
    };

    loadPopularRoutes();
  }, []);

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-[#238FD7]" />

            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#238FD7]">
              Travel Inspiration
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[42px]">
            Popular <span className="text-[#238FD7]">Routes</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            Explore some of the most searched routes and start planning your
            next adventure.
          </p>
        </motion.div>

        {/* Routes */}

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  h-80
                  animate-pulse
                  rounded-2xl
                  bg-slate-200
                  dark:bg-slate-800
                "
              />
            ))}
          </div>
        ) : popularRoutes.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularRoutes.map((route, index) => (
              <motion.article
                key={route.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                {/* Image */}

                <div className="relative h-80 overflow-hidden">
                  <Image
                    height={320}
                    width={480}
                    src={route.image || "/images/default-route.jpg"}
                    alt={`${route.from} to ${route.to}`}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Route */}

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <FaMapMarkerAlt className="text-[#38BDF8]" />
                      Popular destination
                    </div>

                    <h3 className="mt-2 text-xl font-bold">
                      {route.from}

                      <span className="mx-2 text-[#38BDF8]">→</span>

                      {route.to}
                    </h3>

                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-300">{route.trips}</p>

                        <p className="mt-1 text-sm font-semibold text-white">
                          {route.price}
                        </p>
                      </div>

                      <Link
                        href={`/tickets?from=${encodeURIComponent(
                          route.from,
                        )}&to=${encodeURIComponent(route.to)}`}
                        aria-label={`View tickets from ${route.from} to ${route.to}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 transition-all duration-300 group-hover:bg-[#238FD7] group-hover:text-white"
                      >
                        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-6
              py-12
              text-center
              text-sm
              text-slate-500

              dark:border-slate-800
              dark:bg-slate-900/50
              dark:text-slate-400
            "
          >
            No popular routes available right now.
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularRoutes;
