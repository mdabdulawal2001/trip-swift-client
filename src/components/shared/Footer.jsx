"use client";

import logo from "@/assets/logo.png";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaPaypal,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    ["Home", "/"],
    ["All Tickets", "/tickets"],
    ["About Us", "/about"],
    ["Login", "/login"],
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      label: "Facebook",
    },
    {
      icon: FaXTwitter,
      label: "X",
    },
    {
      icon: FaLinkedinIn,
      label: "LinkedIn",
    },
  ];

  const paymentIcons = [
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaPaypal,
  ];

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      {/* =========================
          BACKGROUND EFFECTS
      ========================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        {/* Top left glow */}
        <div
          className="
            absolute
            -left-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-[#238FD7]/5
            blur-3xl
            dark:bg-[#238FD7]/10
          "
        />

        {/* Top right glow */}
        <div
          className="
            absolute
            -right-24
            top-1/3
            h-80
            w-80
            rounded-full
            bg-[#047BFB]/5
            blur-3xl
            dark:bg-[#047BFB]/10
          "
        />

        {/* =========================
            FIRST WAVE
        ========================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            w-[200%]
            animate-[slide_15s_linear_infinite]
            opacity-20
            dark:opacity-25
          "
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-20 w-full fill-[#238FD7]"
          >
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>

        {/* =========================
            SECOND WAVE
        ========================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            w-[200%]
            animate-[slide_25s_linear_infinite_reverse]
            opacity-10
            dark:opacity-15
          "
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-28 w-full fill-[#047BFB]"
          >
            <path d="M0,30 C200,100 400,0 600,60 C800,120 1000,20 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </div>

      {/* =========================
          FOOTER CONTENT
      ========================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* =========================
              BRAND
          ========================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="group flex shrink-0 items-center justify-center gap-1 md:justify-start"
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

            <p
              className="
                mt-5
                text-center
                text-sm
                leading-7
                text-slate-600
                dark:text-slate-400
                md:max-w-xs
                md:text-left
              "
            >
              TripSwift makes ticket booking simple, reliable and convenient
              so you can spend less time planning and more time travelling.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200
                      text-sm
                      text-slate-600
                      transition-all
                      duration-300
                      hover:border-[#047BFB]
                      hover:bg-[#238FD7]
                      hover:text-white
                      dark:border-slate-800
                      dark:text-slate-400
                    "
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* =========================
              QUICK LINKS
          ========================== */}

          <div className="text-center md:text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="mt-5 flex flex-col items-center space-y-3 md:items-start">
              {quickLinks.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="
                      text-sm
                      text-slate-600
                      transition-all
                      duration-300
                      hover:text-[#238FD7]
                      hover:underline
                      dark:text-slate-400
                      dark:hover:text-[#238FD7]
                    "
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================
              CONTACT
          ========================== */}

          <div className="text-center md:text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Contact
            </h3>

            <div className="mt-5 flex flex-col items-center space-y-4 md:items-start">

              <div className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#238FD7]" />

                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Dhaka, Bangladesh
                </p>
              </div>

              <div className="flex gap-3">
                <FaPhoneAlt className="mt-1 shrink-0 text-[#238FD7]" />

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  +880 1XXX-XXXXXX
                </p>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="mt-1 shrink-0 text-[#238FD7]" />

                <p className="break-all text-sm text-slate-600 dark:text-slate-400">
                  support@tripswift.com
                </p>
              </div>

            </div>
          </div>

          {/* =========================
              PAYMENT
          ========================== */}

          <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Secure Payments
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Pay securely for your bookings through our trusted payment
              gateway.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
              {paymentIcons.map((Icon, index) => (
                <div
                  key={index}
                  className="
                    flex
                    h-10
                    w-14
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-slate-50
                    text-2xl
                    text-[#238FD7]
                    transition-colors
                    duration-300
                    hover:bg-[#238FD7]/10
                    dark:border-slate-800
                    dark:bg-slate-900
                    dark:text-slate-400
                    dark:hover:bg-[#238FD7]/10
                  "
                >
                  <Icon />
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Powered by Stripe
            </p>
          </div>
        </div>

        {/* =========================
            BOTTOM BAR
        ========================== */}

        <div
          className="
            mt-14
            flex
            flex-col
            items-center
            gap-4
            border-t
            border-slate-200
            pt-6
            text-center
            dark:border-slate-800
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {currentYear} TripSwift. All rights reserved.
          </p>

          <div className="flex gap-5 text-xs text-slate-500">
            <Link
              href="#"
              className="transition hover:text-[#047BFB] hover:underline"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="transition hover:text-[#047BFB] hover:underline"
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