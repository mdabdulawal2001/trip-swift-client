"use client";

import logo from "@/assets/logo.png";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaPaypal,
} from "react-icons/fa";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
            href="/"
            className="group flex shrink-0 items-center gap-1"
          >
            <div className="relative h-12 w-12 sm:h-14 sm:w-14">
              <Image
                src={logo}
                alt="TripSwift Logo"
                fill
                priority
                className="
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />
            </div>

            <div className="block">
              <h1
                className="
                  bg-linear-to-r
                  from-cyan-500
                  to-blue-600
                  bg-clip-text
                  text-xl
                  font-extrabold
                  tracking-tight
                  text-transparent
                "
              >
                TripSwift
              </h1>

              <p
                className="
                  mt-1
                  text-[9px]
                  font-medium
                  tracking-[0.18em]
                  text-slate-500
                  dark:text-slate-400
                "
              >
                TRAVEL • BOOK • GO
              </p>
            </div>
          </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600 dark:text-slate-400">
              TripSwift makes ticket booking simple, reliable and convenient
              so you can spend less time planning and more time travelling.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {[
                {
                  icon: FaFacebookF,
                  label: "Facebook",
                },
                {
                  icon: FaInstagram,
                  label: "Instagram",
                },
                {
                  icon: FaLinkedinIn,
                  label: "LinkedIn",
                },
              ].map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-sm text-slate-600 transition-all duration-300 hover:border-[#047BFB] hover:bg-[#047BFB] hover:text-white dark:border-slate-800 dark:text-slate-400"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {[
                ["Home", "/"],
                ["All Tickets", "/tickets"],
                ["About Us", "/about"],
                ["Login", "/login"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 transition-colors hover:text-[#047BFB] dark:text-slate-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#047BFB]" />

                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Dhaka, Bangladesh
                </p>
              </div>

              <div className="flex gap-3">
                <FaPhoneAlt className="mt-1 shrink-0 text-[#047BFB]" />

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  +880 1XXX-XXXXXX
                </p>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="mt-1 shrink-0 text-[#047BFB]" />

                <p className="break-all text-sm text-slate-600 dark:text-slate-400">
                  support@tripswift.com
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Secure Payments
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Pay securely for your bookings through our trusted payment
              gateway.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="flex h-10 w-14 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-2xl text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                  >
                    <Icon />
                  </div>
                )
              )}
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Powered by Stripe
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} TripSwift. All rights reserved.
          </p>

          <div className="flex gap-5 text-xs text-slate-500">
            <Link
              href="#"
              className="transition hover:text-[#047BFB]"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="transition hover:text-[#047BFB]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;