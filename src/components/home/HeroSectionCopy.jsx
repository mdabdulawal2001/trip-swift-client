"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FaArrowRight,
  FaLocationDot,
  FaMagnifyingGlass,
  FaShieldHalved,
} from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import { heroSlides } from "@/data/heroSlides";

const HeroSectionCopy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transport, setTransport] = useState("");

  const router = useRouter();

  const activeSlide = heroSlides[activeIndex];

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearch = (e) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams();

    if (from.trim()) {
      params.set("from", from.trim());
    }

    if (to.trim()) {
      params.set("to", to.trim());
    }

    if (transport) {
      params.set("type", transport);
    }

    router.push(`/tickets?${params.toString()}`);
  };

  return (
    <section
      className="
        relative
        overflow-visible
        max-w-7xl
        mx-auto
        dark:bg-[#071522]
        transition-colors
        duration-500
      ">
      {/* =========================================================
          SOFT BACKGROUND DECORATION
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          -top-24
          h-80
          w-80
          rounded-full
          bg-[#B8D9EE]/50
          blur-3xl
          dark:bg-[#0B4A6F]/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-32
          h-96
          w-96
          rounded-full
          bg-[#DCECF7]
          blur-3xl
          dark:bg-[#0E7490]/10
        "
      />

      {/* =========================================================
          HERO SLIDER
      ========================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-[1440px]
          px-3
          pt-4
          sm:px-5
          lg:px-8
          lg:pt-6
        "
      >
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={900}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          className="overflow-hidden rounded-[28px] sm:rounded-[36px]"
        >
          {heroSlides.map((slide) => {
            const Icon = slide.icon;

            return (
              <SwiperSlide key={slide.id}>
                <div
                  className="
                    relative
                    min-h-[650px]
                    overflow-hidden
                    bg-[#DCECF7]

                    dark:bg-[#0B1F2D]

                    sm:min-h-[690px]
                    lg:min-h-[620px]
                    xl:min-h-[650px]
                  "
                >
                  {/* =================================================
                      DECORATIVE BACKGROUND
                  ================================================== */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-linear-to-br
                      from-[#DCECF7]
                      via-[#EDF6FB]
                      to-white

                      dark:from-[#0B1F2D]
                      dark:via-[#0A2435]
                      dark:to-[#071522]
                    "
                  />

                  {/* Soft blob */}

                  <div
                    className="
                      absolute
                      -left-24
                      -top-28
                      h-[420px]
                      w-[420px]
                      rounded-full
                      bg-[#B8D9EE]/70
                      blur-2xl

                      dark:bg-[#12648D]/15
                    "
                  />

                  <div
                    className="
                      absolute
                      -bottom-44
                      right-[-80px]
                      h-[520px]
                      w-[520px]
                      rounded-full
                      bg-[#B8D9EE]/40
                      blur-3xl

                      dark:bg-[#1E88B5]/10
                    "
                  />

                  {/* =================================================
                      MAIN HERO CARD
                  ================================================== */}

                  <div
                    className="
                      relative
                      z-10
                      mx-auto
                      flex
                      min-h-[650px]
                      max-w-7xl
                      flex-col

                      sm:min-h-[690px]

                      lg:min-h-[620px]
                      lg:flex-row
                      lg:items-stretch

                      xl:min-h-[650px]
                    "
                  >
                    {/* =================================================
                        LEFT IMAGE
                    ================================================== */}

                    <div
                      className="
                        relative
                        min-h-[330px]
                        w-full
                        overflow-hidden

                        lg:min-h-full
                        lg:w-[54%]
                      "
                    >
                      <div
                        className="
                          absolute
                          inset-0
                          bg-cover
                          bg-center
                          bg-no-repeat

                          transition-transform
                          duration-[7000ms]
                        "
                        style={{
                          backgroundImage: `url("${slide.image}")`,
                          backgroundPosition:
                            slide.position || "center",
                        }}
                      />

                      {/* Mobile image positioning */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-cover
                          bg-center
                          bg-no-repeat
                          md:hidden
                        "
                        style={{
                          backgroundImage: `url("${slide.image}")`,
                          backgroundPosition:
                            slide.mobilePosition ||
                            slide.position ||
                            "center",
                        }}
                      />

                      {/* Image soft overlay */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-linear-to-r
                          from-transparent
                          via-transparent
                          to-[#F4F9FC]/80

                          dark:to-[#071522]/90
                        "
                      />

                      {/* Bottom image shade */}

                      <div
                        className="
                          absolute
                          inset-x-0
                          bottom-0
                          h-32
                          bg-linear-to-t
                          from-[#F4F9FC]/70
                          to-transparent

                          dark:from-[#071522]/70
                        "
                      />

                      {/* Small category badge */}

                      <div
                        className="
                          absolute
                          left-5
                          top-5
                          flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-white/50
                          bg-white/65
                          px-3.5
                          py-2
                          text-xs
                          font-bold
                          text-slate-700
                          shadow-lg
                          backdrop-blur-xl

                          dark:border-white/10
                          dark:bg-slate-950/45
                          dark:text-white
                        "
                      >
                        <span
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-[#238FD7]
                            text-white
                          "
                        >
                          <Icon className="text-[11px]" />
                        </span>

                        <span>
                          {slide.badge}
                        </span>
                      </div>
                    </div>

                    {/* =================================================
                        RIGHT CONTENT
                    ================================================== */}

                    <div
                      className="
                        relative
                        flex
                        w-full
                        flex-1
                        flex-col
                        justify-center
                        px-6
                        pb-12
                        pt-8

                        sm:px-10
                        sm:pb-14

                        lg:w-[46%]
                        lg:px-10
                        lg:py-12

                        xl:px-14
                      "
                    >
                      {/* Accent */}

                      <div
                        className="
                          mb-5
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <span
                          className="
                            h-2
                            w-2
                            rounded-full
                            bg-[#238FD7]
                            shadow-[0_0_12px_rgba(35,143,215,0.5)]
                          "
                        />

                        <span
                          className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.25em]
                            text-[#238FD7]

                            dark:text-[#38BDF8]
                          "
                        >
                          TripSwift
                        </span>
                      </div>

                      {/* =================================================
                          TITLE
                      ================================================== */}

                      <h1
                        className="
                          max-w-xl
                          text-4xl
                          font-black
                          leading-[1.08]
                          tracking-[-0.04em]
                          text-slate-900

                          dark:text-white

                          sm:text-5xl

                          lg:text-[48px]

                          xl:text-[56px]
                        "
                      >
                        {slide.title}
                      </h1>

                      {/* Accent line */}

                      <div
                        className="
                          mt-6
                          h-1
                          w-16
                          rounded-full
                          bg-linear-to-r
                          from-[#238FD7]
                          to-[#75BFE8]
                        "
                      />

                      {/* =================================================
                          DESCRIPTION
                      ================================================== */}

                      <p
                        className="
                          mt-6
                          max-w-lg
                          text-sm
                          leading-7
                          text-slate-500

                          dark:text-slate-400

                          sm:text-base
                          sm:leading-8
                        "
                      >
                        {slide.description}
                      </p>

                      {/* =================================================
                          ROUTE INFORMATION
                      ================================================== */}

                      <div
                        className="
                          mt-7
                          flex
                          w-fit
                          max-w-full
                          flex-wrap
                          items-center
                          gap-4
                          rounded-2xl
                          border
                          border-slate-200/80
                          bg-white/75
                          px-4
                          py-3.5
                          shadow-sm
                          backdrop-blur-xl

                          dark:border-white/10
                          dark:bg-white/5
                        "
                      >
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#238FD7]/10
                            text-[#238FD7]

                            dark:bg-[#38BDF8]/10
                            dark:text-[#38BDF8]
                          "
                        >
                          <FaLocationDot className="text-sm" />
                        </div>

                        <div>
                          <p
                            className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.18em]
                              text-slate-400
                            "
                          >
                            Popular Route
                          </p>

                          <p
                            className="
                              mt-1
                              text-sm
                              font-bold
                              text-slate-800

                              dark:text-white

                              sm:text-base
                            "
                          >
                            {slide.from}

                            <span className="mx-2 text-[#238FD7]">
                              →
                            </span>

                            {slide.to}
                          </p>
                        </div>

                        <div
                          className="
                            hidden
                            h-8
                            w-px
                            bg-slate-200

                            sm:block

                            dark:bg-slate-700
                          "
                        />

                        <div className="hidden sm:block">
                          <p
                            className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.18em]
                              text-slate-400
                            "
                          >
                            Availability
                          </p>

                          <p
                            className="
                              mt-1
                              text-sm
                              font-semibold
                              text-slate-700

                              dark:text-slate-200
                            "
                          >
                            {slide.stats}
                          </p>
                        </div>
                      </div>

                      {/* =================================================
                          BUTTONS
                      ================================================== */}

                      <div
                        className="
                          mt-8
                          flex
                          flex-col
                          gap-3

                          sm:flex-row
                        "
                      >
                        <Link
                          href="/tickets"
                          className="
                            group
                            inline-flex
                            min-h-12
                            items-center
                            justify-center
                            gap-3
                            rounded-xl
                            bg-[#238FD7]
                            px-6
                            text-sm
                            font-bold
                            text-white
                            shadow-[0_12px_30px_rgba(35,143,215,0.25)]
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-[#1978B8]
                            hover:shadow-lg
                          "
                        >
                          Explore Tickets

                          <span
                            className="
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-lg
                              bg-white/15
                              transition-transform
                              duration-300

                              group-hover:translate-x-1
                            "
                          >
                            <FaArrowRight className="text-[10px]" />
                          </span>
                        </Link>

                        <Link
                          href="/about"
                          className="
                            inline-flex
                            min-h-12
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-200
                            bg-white/60
                            px-6
                            text-sm
                            font-semibold
                            text-slate-700
                            backdrop-blur-xl
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:border-[#238FD7]/40
                            hover:bg-white

                            dark:border-white/10
                            dark:bg-white/5
                            dark:text-slate-200
                            dark:hover:bg-white/10
                          "
                        >
                          Discover TripSwift
                        </Link>
                      </div>

                      {/* =================================================
                          TRUST
                      ================================================== */}

                      <div
                        className="
                          mt-7
                          flex
                          flex-wrap
                          items-center
                          gap-x-5
                          gap-y-3
                          text-xs
                          text-slate-400

                          dark:text-slate-500
                        "
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="
                              h-2
                              w-2
                              rounded-full
                              bg-[#238FD7]
                            "
                          />

                          <span>
                            10K+ happy travelers
                          </span>
                        </div>

                        <span className="hidden text-slate-300 sm:block dark:text-slate-700">
                          •
                        </span>

                        <div className="flex items-center gap-2">
                          <FaShieldHalved
                            className="
                              text-[#238FD7]

                              dark:text-[#38BDF8]
                            "
                          />

                          <span>
                            Secure booking
                          </span>
                        </div>

                        <span className="hidden text-slate-300 sm:block dark:text-slate-700">
                          •
                        </span>

                        <span>
                          500+ available tickets
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* =========================================================
          SEARCH CARD
      ========================================================== */}

      <div
        className="
          relative
          z-30
          mx-auto
          -mt-8
          w-[calc(100%-1.5rem)]
          max-w-6xl

          sm:-mt-12
          sm:w-[calc(100%-3rem)]

          lg:-mt-16
        "
      >
        <div
          className="
            rounded-[24px]
            border
            border-slate-200/80
            bg-white/95
            p-4
            shadow-[0_25px_70px_rgba(15,23,42,0.16)]
            backdrop-blur-xl

            dark:border-slate-700/70
            dark:bg-[#0D2233]/95
            dark:shadow-[0_25px_70px_rgba(0,0,0,0.35)]

            sm:p-6
            lg:p-7
          "
        >
          {/* SEARCH HEADING */}

          <div
            className="
              mb-4
              flex
              items-center
              justify-between
              px-1
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-bold
                  text-slate-900

                  dark:text-white
                "
              >
                Where do you want to go?
              </p>

              <p
                className="
                  mt-0.5
                  hidden
                  text-[11px]
                  text-slate-400

                  sm:block
                "
              >
                Search buses, trains, flights and private rides
              </p>
            </div>

            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                bg-[#238FD7]/10
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-[#238FD7]

                sm:flex

                dark:bg-[#38BDF8]/10
                dark:text-[#38BDF8]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#238FD7]

                  dark:bg-[#38BDF8]
                "
              />

              Live Search
            </div>
          </div>

          {/* SEARCH FORM */}

          <form
            onSubmit={handleSearch}
            className="
              grid
              gap-2.5

              md:grid-cols-2

              lg:grid-cols-[1fr_1fr_210px_145px]
            "
          >
            {/* FROM */}

            <div
              className="
                flex
                min-h-15.5
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3.5
                transition-all

                focus-within:border-[#238FD7]
                focus-within:bg-white

                dark:border-slate-700
                dark:bg-slate-800/70
                dark:focus-within:border-[#38BDF8]
                dark:focus-within:bg-slate-800
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#238FD7]/10
                  text-[#238FD7]

                  dark:bg-[#38BDF8]/10
                  dark:text-[#38BDF8]
                "
              >
                <FaLocationDot className="text-xs" />
              </div>

              <div className="min-w-0 flex-1">
                <label
                  className="
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-slate-400
                  "
                >
                  From
                </label>

                <input
                  type="text"
                  placeholder="Departure city"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="
                    mt-1
                    w-full
                    bg-transparent
                    text-sm
                    font-semibold
                    text-slate-800
                    outline-none
                    placeholder:text-slate-400

                    dark:text-white
                  "
                />
              </div>
            </div>

            {/* TO */}

            <div
              className="
                flex
                min-h-15.5
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3.5
                transition-all

                focus-within:border-[#238FD7]
                focus-within:bg-white

                dark:border-slate-700
                dark:bg-slate-800/70
                dark:focus-within:border-[#38BDF8]
                dark:focus-within:bg-slate-800
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#238FD7]/10
                  text-[#238FD7]

                  dark:bg-[#38BDF8]/10
                  dark:text-[#38BDF8]
                "
              >
                <FaLocationDot className="text-xs" />
              </div>

              <div className="min-w-0 flex-1">
                <label
                  className="
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-slate-400
                  "
                >
                  To
                </label>

                <input
                  type="text"
                  placeholder="Destination city"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="
                    mt-1
                    w-full
                    bg-transparent
                    text-sm
                    font-semibold
                    text-slate-800
                    outline-none
                    placeholder:text-slate-400

                    dark:text-white
                  "
                />
              </div>
            </div>

            {/* TRANSPORT */}

            <div
              className="
                flex
                min-h-15.5
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3.5

                dark:border-slate-700
                dark:bg-slate-800/70
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#238FD7]/10
                  text-[#238FD7]

                  dark:bg-[#38BDF8]/10
                  dark:text-[#38BDF8]
                "
              >
                {activeSlide?.icon &&
                  (() => {
                    const ActiveIcon =
                      activeSlide.icon;

                    return (
                      <ActiveIcon className="text-xs" />
                    );
                  })()}
              </div>

              <div className="min-w-0 flex-1">
                <label
                  className="
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-slate-400
                  "
                >
                  Transport
                </label>

                <select
                  value={transport}
                  onChange={(e) =>
                    setTransport(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e);
                    }
                  }}
                  className="
                    mt-1
                    w-full
                    cursor-pointer
                    bg-transparent
                    text-sm
                    font-semibold
                    text-slate-800
                    outline-none

                    dark:bg-slate-800
                    dark:text-white
                  "
                >
                  <option value="">
                    All types
                  </option>

                  <option value="AC Bus">
                    AC Bus
                  </option>

                  <option value="Train">
                    Train
                  </option>

                  <option value="Flight">
                    Flight
                  </option>

                  <option value="Car">
                    Car
                  </option>
                </select>
              </div>
            </div>

            {/* SEARCH BUTTON */}

            <button
              type="submit"
              className="
                group
                flex
                min-h-15.5
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#238FD7]
                px-5
                text-sm
                font-bold
                text-white
                shadow-[0_10px_30px_rgba(35,143,215,0.22)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-[#1978B8]
                hover:shadow-xl
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-white/15
                "
              >
                <FaMagnifyingGlass className="text-[11px]" />
              </span>

              <span>
                Search
              </span>

              <FaArrowRight
                className="
                  text-[9px]
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionCopy;