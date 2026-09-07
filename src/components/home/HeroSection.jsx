"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaLocationDot,
  FaMagnifyingGlass,
  FaShieldHalved,
} from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import { heroSlides } from "@/data/heroSlides";

const HeroSection = () => {
  const swiperRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = heroSlides[activeIndex];

  return (
    <section
      className="
        relative
        mb-40
        overflow-visible
        bg-slate-950
        lg:mb-36
      "
    >
      {/* =========================================================
          HERO SLIDER
      ========================================================== */}

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop
        speed={900}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="w-full"
      >
        {heroSlides.map((slide) => {
          const Icon = slide.icon;

          return (
            <SwiperSlide key={slide.id}>
              <div
                className="
                  relative
                  min-h-232.5
                  overflow-hidden
                  sm:min-h-225
                  lg:min-h-207.5
                "
              >
                {/* =====================================================
                    BACKGROUND
                ====================================================== */}

                <div
                  className="absolute inset-0 bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url("${slide.image}")`,
                    backgroundPosition: slide.position,
                  }}
                />

                {/* Mobile image */}
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat md:hidden"
                  style={{
                    backgroundImage: `url("${slide.image}")`,
                    backgroundPosition: slide.mobilePosition,
                  }}
                />

                {/* =====================================================
                    OVERLAYS
                ====================================================== */}

                {/* Overall readability */}
                <div className="absolute inset-0 bg-slate-950/20" />

                {/* Left dark area */}
                <div
                  className="
                    absolute
                    inset-y-0
                    left-0
                    w-full
                    bg-linear-to-r
                    from-slate-950
                    via-slate-950/90
                    via-45%
                    to-transparent
                    lg:w-[72%]
                  "
                />

                {/* Bottom fade */}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-80
                    bg-linear-to-t
                    from-slate-950
                    via-slate-950/65
                    to-transparent
                  "
                />

                {/* Right subtle shade */}
                <div
                  className="
                    absolute
                    inset-y-0
                    right-0
                    w-[30%]
                    bg-linear-to-l
                    from-slate-950/20
                    to-transparent
                  "
                />

                {/* =====================================================
                    CONTENT
                ====================================================== */}

                <div
                  className="
                    relative
                    z-10
                    mx-auto
                    max-w-7xl
                    px-5
                    sm:px-8
                    lg:px-10
                  "
                >
                  <div
                    className="
                      flex
                      min-h-165
                      max-w-2xl
                      flex-col
                      justify-center
                      pt-16
                      text-white
                      sm:min-h-162.5
                      lg:min-h-155
                      lg:pt-12
                    "
                  >
                    {/* =================================================
                        BADGE
                    ================================================== */}

                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#047BFB]
                          text-white
                          shadow-[0_8px_30px_rgba(4,123,251,0.35)]
                        "
                      >
                        <Icon className="text-sm" />
                      </div>

                      <div>
                        <p
                          className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.22em]
                            text-[#38BDF8]
                          "
                        >
                          TripSwift
                        </p>

                        <p className="mt-0.5 text-xs font-semibold text-white/75">
                          {slide.badge}
                        </p>
                      </div>
                    </div>

                    {/* =================================================
                        TITLE
                    ================================================== */}

                    <h1
                      className="
                        mt-7
                        max-w-162.5
                        text-[46px]
                        font-black
                        leading-tight
                        tracking-tighter
                        sm:text-6xl
                        md:text-7xl
                        lg:text-[74px]
                      "
                    >
                      {slide.title}
                    </h1>

                    {/* Brand accent */}
                    <div
                      className="
                        mt-6
                        h-1
                        w-20
                        rounded-full
                        bg-linear-to-r
                        from-[#38BDF8]
                        to-[#047BFB]
                      "
                    />

                    {/* =================================================
                        DESCRIPTION
                    ================================================== */}

                    <p
                      className="
                        mt-6
                        max-w-xl
                        text-sm
                        leading-7
                        text-white/65
                        sm:text-base
                        sm:leading-8
                      "
                    >
                      {slide.description}
                    </p>

                    {/* =================================================
                        ROUTE CARD
                    ================================================== */}

                    <div
                      className="
                        mt-7
                        flex
                        w-fit
                        max-w-full
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.07]
                        px-4
                        py-3
                        backdrop-blur-xl
                      "
                    >
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#047BFB]/15
                          text-[#38BDF8]
                        "
                      >
                        <FaLocationDot className="text-xs" />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-white/40
                          "
                        >
                          Popular route
                        </p>

                        <p className="mt-1 text-sm font-bold sm:text-base">
                          {slide.from}

                          <span className="mx-2 text-[#38BDF8]/50">→</span>

                          {slide.to}
                        </p>
                      </div>

                      <div className="hidden h-8 w-px bg-white/10 sm:block" />

                      <div className="hidden sm:block">
                        <p
                          className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-white/40
                          "
                        >
                          Availability
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white/85">
                          {slide.stats}
                        </p>
                      </div>
                    </div>

                    {/* =================================================
                        BUTTONS
                    ================================================== */}

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                          bg-[#047BFB]
                          px-6
                          text-sm
                          font-bold
                          text-white
                          shadow-[0_12px_35px_rgba(4,123,251,0.28)]
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:bg-[#035EC4]
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
                          border-white/15
                          bg-white/6
                          px-6
                          text-sm
                          font-semibold
                          text-white
                          backdrop-blur-xl
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:bg-white/10
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
                        mt-8
                        flex
                        flex-wrap
                        items-center
                        gap-x-6
                        gap-y-3
                        text-xs
                        text-white/50
                      "
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#38BDF8]" />
                        <span>10K+ happy travelers</span>
                      </div>

                      <div className="hidden h-4 w-px bg-white/15 sm:block" />

                      <div className="flex items-center gap-2">
                        <FaShieldHalved className="text-[#38BDF8]" />
                        <span>Secure booking</span>
                      </div>

                      <div className="hidden h-4 w-px bg-white/15 sm:block" />

                      <span>500+ available tickets</span>
                    </div>

                    {/* =================================================
                        DOTS
                        এগুলো এখন CONTENT-এর একদম নিচে
                    ================================================== */}

                    <div
                      className="absolute
                        -bottom-18
                        left-1/2
                        z-40
                        flex
                        -translate-x-1/2
                        items-center
                        gap-2"
                    >
                      {heroSlides.map((item, index) => {
                        const active = index === activeIndex;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            aria-label={`Go to ${item.type} slide`}
                            onClick={() =>
                              swiperRef.current?.slideToLoop(index)
                            }
                            className="
                              flex
                              h-6
                              w-6
                              items-center
                              justify-center
                            "
                          >
                            <span
                              className={`
                                block
                                rounded-full
                                transition-all
                                duration-500
                                ${
                                  active
                                    ? "h-2.5 w-2.5 bg-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.65)]"
                                    : "h-2 w-2 bg-white/35 hover:bg-white/70"
                                }
                              `}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* =========================================================
          LEFT ARROW
      ========================================================== */}

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => {
          if (swiperRef.current) {
            swiperRef.current.slidePrev();
          }
        }}
        className="
          absolute
          left-5
          top-1/2
          z-40
          hidden
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-black/20
          text-white
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-[#38BDF8]/40
          hover:bg-[#047BFB]
          lg:flex
          xl:left-8
        "
      >
        <FaChevronLeft className="text-xs" />
      </button>

      {/* =========================================================
          RIGHT ARROW
      ========================================================== */}

      <button
        type="button"
        aria-label="Next slide"
        onClick={() => {
          if (swiperRef.current) {
            swiperRef.current.slideNext();
          }
        }}
        className="
          absolute
          right-5
          top-1/2
          z-40
          hidden
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-black/20
          text-white
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-[#38BDF8]/40
          hover:bg-[#047BFB]
          lg:flex
          xl:right-8
        "
      >
        <FaChevronRight className="text-xs" />
      </button>

      {/* =========================================================
          SEARCH CARD
      ========================================================== */}

      <div
        className="
          absolute
          -bottom-48
          left-1/2
          z-50
          w-[calc(100%-1.5rem)]
          max-w-6xl
          -translate-x-1/2
          sm:-bottom-20
          sm:w-[calc(100%-3rem)]
          lg:-bottom-22
        "
      >
        <div
          className="
            rounded-[24px]
            border
            border-slate-200
            bg-white
            p-5
            shadow-[0_30px_80px_rgba(15,23,42,0.30)]
            dark:border-slate-700
            dark:bg-slate-900
            sm:p-8
          "
        >
          {/* Search heading */}

          <div
            className="
              mb-3
              flex
              items-center
              justify-between
              px-1
            "
          >
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Where do you want to go?
              </p>

              <p className="mt-0.5 hidden text-[11px] text-slate-400 sm:block dark:text-slate-500">
                Search buses, trains, flights and private rides
              </p>
            </div>

            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                bg-sky-50
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-[#047BFB]
                sm:flex
                dark:bg-[#047BFB]/10
                dark:text-[#38BDF8]
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#047BFB]" />
              Live Search
            </div>
          </div>

          {/* Search fields */}

          <div
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
                focus-within:border-[#047BFB]
                focus-within:bg-white
                dark:border-slate-700
                dark:bg-slate-800/70
                dark:focus-within:border-[#047BFB]
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
                  bg-sky-50
                  text-[#047BFB]
                  dark:bg-[#047BFB]/10
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
                focus-within:border-[#047BFB]
                focus-within:bg-white
                dark:border-slate-700
                dark:bg-slate-800/70
                dark:focus-within:border-[#047BFB]
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
                  bg-sky-50
                  text-[#047BFB]
                  dark:bg-[#047BFB]/10
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
                min-h-[62px]
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
                  bg-sky-50
                  text-[#047BFB]
                  dark:bg-[#047BFB]/10
                  dark:text-[#38BDF8]
                "
              >
                {activeSlide?.icon &&
                  (() => {
                    const ActiveIcon = activeSlide.icon;

                    return <ActiveIcon className="text-xs" />;
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
                  <option value="">All types</option>
                  <option value="bus">AC Bus</option>
                  <option value="train">Train</option>
                  <option value="plane">Plane</option>
                  <option value="car">Car</option>
                </select>
              </div>
            </div>

            {/* SEARCH */}

            <Link
              href="/tickets"
              className="
                group
                flex
                min-h-[62px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#047BFB]
                px-5
                text-sm
                font-bold
                text-white
                shadow-[0_10px_30px_rgba(4,123,251,0.25)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#035EC4]
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

              <span>Search</span>

              <FaArrowRight
                className="
                  text-[9px]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
