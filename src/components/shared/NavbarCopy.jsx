"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import logo from "@/assets/logo.png";
import { authClient } from "@/lib/auth-client";

import NavbarSessionSpinner from "./NavbarSessionSpinner";
import UserAvatar from "./UserAvatar";
import ThemeToggle from "./ThemeToggle";

import { useProfile } from "@/context/ProfileContext";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "All Tickets",
    href: "/tickets",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

const NavbarCopy = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { profile } = useProfile();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ============================================================
  // HYDRATION
  // ============================================================

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // ============================================================
  // AUTH
  // ============================================================

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // ============================================================
  // THEME
  // ============================================================

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // ============================================================
  // USER INFO
  // ============================================================

  const displayName = profile?.name?.trim() || user?.name?.trim() || "User";

  const displayImage = profile?.image || user?.image || null;

  // ============================================================
  // NAVIGATION HELPERS
  // ============================================================

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isExactActive = (href) => {
    return pathname === href;
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setIsProfileOpen(false);
      setIsMenuOpen(false);

      toast.success("Logged out successfully");

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);

      toast.error("Failed to logout");
    }
  };

  // ============================================================
  // CLOSE MOBILE MENU
  // ============================================================

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // ============================================================
  // PROFILE OUTSIDE CLICK + ESCAPE
  // ============================================================

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handlePointerDownOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handlePointerDownOutside);

    // Prevent the background page from scrolling
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);

      document.removeEventListener("pointerdown", handlePointerDownOutside);

      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isProfileOpen) {
      return;
    }

    const handlePointerDownOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);

      document.removeEventListener("keydown", handleEscape);
    };
  }, [isProfileOpen]);

  // ============================================================
  // MOBILE MENU OUTSIDE CLICK + ESCAPE
  // ============================================================

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handlePointerDownOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    document.addEventListener("pointerdown", handlePointerDownOutside);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);

      document.removeEventListener("pointerdown", handlePointerDownOutside);

      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ============================================================
  // CLOSE MENUS AFTER ROUTE CHANGE
  // ============================================================

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      {/* ====================================================== */}
      {/* NAVBAR */}
      {/* ====================================================== */}

      <header
        className="
          pointer-events-none
          sticky
          top-0
          z-50
          mx-auto
          px-3
          pt-3
          sm:px-5
          sm:pt-4

          lg:px-8
          lg:pt-5
        "
      >
        <nav
          className="
            pointer-events-auto
            mx-auto
            flex
            min-h-16.5
            max-w-7xl
            items-center
            justify-between
            gap-3
            rounded-2xl
            border
            border-slate-200/80
            bg-white/85
            px-3.5

            shadow-[0_12px_40px_rgba(15,23,42,0.08)]
            backdrop-blur-2xl

            dark:border-white/10
            dark:bg-[#0B1F2D]/90
            dark:shadow-[0_12px_40px_rgba(0,0,0,0.28)]

            sm:min-h-17.5
            sm:px-5

            lg:px-6

            xl:min-h-18.5
            xl:px-7
          "
        >
          {/* ================================================== */}
          {/* LOGO */}
          {/* ================================================== */}

          <Link
            href="/"
            onClick={closeMobileMenu}
            className="
              group
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-xl
              outline-none
              transition-opacity
              duration-200
              focus-visible:ring-2
              focus-visible:ring-[#238FD7]/50
            "
          >
            <div
              className="
                relative
                h-11
                w-11

                sm:h-12
                sm:w-12

                xl:h-14
                xl:w-14
              "
            >
              <Image
                src={logo}
                alt="TripSwift Logo"
                fill
                priority
                sizes="56px"
                className="
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />
            </div>

            <div className="hidden min-[420px]:block">
              <h1
                className="
                  bg-linear-to-r
                  from-[#238FD7]
                  to-[#55A9D8]
                  bg-clip-text
                  text-lg
                  font-extrabold
                  tracking-tight
                  text-transparent

                  sm:text-xl

                  dark:from-[#38BDF8]
                  dark:to-[#7DD3FC]
                "
              >
                TripSwift
              </h1>

              <p
                className="
                  mt-0.5
                  text-[8px]
                  font-medium
                  tracking-[0.16em]
                  text-slate-500

                  sm:text-[9px]
                  sm:tracking-[0.18em]

                  dark:text-slate-400
                "
              >
                TRAVEL • BOOK • GO
              </p>
            </div>
          </Link>

          {/* ================================================== */}
          {/* DESKTOP NAVIGATION */}
          {/* ================================================== */}

          <div className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative
                    rounded-full
                    px-3.5
                    py-2.5
                    text-sm
                    font-semibold
                    outline-none
                    transition-all
                    duration-300

                    focus-visible:ring-2
                    focus-visible:ring-[#238FD7]/40

                    ${
                      active
                        ? `
                          bg-[#238FD7]/10
                          text-[#1978B8]
                          shadow-sm

                          dark:bg-[#38BDF8]/10
                          dark:text-[#38BDF8]
                        `
                        : `
                          text-slate-600

                          hover:bg-[#238FD7]/7
                          hover:text-[#1978B8]

                          dark:text-slate-300
                          dark:hover:bg-white/5
                          dark:hover:text-[#38BDF8]
                        `
                    }
                  `}
                >
                  {link.name}

                  {active && (
                    <motion.span
                      layoutId="navbar-active-link"
                      className="
                        absolute
                        bottom-0.5
                        left-1/2
                        h-0.5
                        w-7
                        -translate-x-1/2
                        rounded-full
                        bg-linear-to-r
                        from-cyan-400
                        to-blue-600
                      "
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ================================================== */}
          {/* DESKTOP RIGHT SIDE */}
          {/* ================================================== */}

          <div className="hidden items-center gap-2 xl:flex">
            {/* THEME TOGGLE */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full

                border
                border-slate-300
                bg-white/70

                text-slate-600

                backdrop-blur-md
                outline-none
                transition-all
                duration-300

                hover:border-[#238FD7]/40
                hover:bg-[#238FD7]/10
                hover:text-[#238FD7]

                focus-visible:ring-2
                focus-visible:ring-[#238FD7]/40

                dark:border-white/10
                dark:bg-white/5
                dark:text-slate-300

                dark:hover:border-[#38BDF8]/40
                dark:hover:bg-[#38BDF8]/10
                dark:hover:text-[#38BDF8]
              "
            >
              <ThemeToggle isDark={isDark} mounted={mounted} />
            </button>

            {/* SESSION */}

            {!mounted || isPending ? (
              <NavbarSessionSpinner />
            ) : !user ? (
              /* ---------------------------------------------- */
              /* LOGGED OUT */
              /* ---------------------------------------------- */

              <div className="ml-1 flex items-center gap-2">
                <Link
                  href="/login"
                  className="
                    rounded-full
                    border
                    border-[#238FD7]/50
                    bg-white/60

                    px-4
                    py-2

                    text-sm
                    font-semibold
                    text-[#1978B8]

                    backdrop-blur-sm
                    outline-none
                    transition-all
                    duration-300

                    hover:border-[#238FD7]
                    hover:bg-[#238FD7]/10

                    focus-visible:ring-2
                    focus-visible:ring-[#238FD7]/40

                    dark:border-[#38BDF8]/40
                    dark:bg-white/5
                    dark:text-[#38BDF8]
                    dark:hover:bg-[#38BDF8]/10
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="
                    rounded-full
                    bg-[#238FD7]

                    px-5
                    py-2

                    text-sm
                    font-semibold
                    text-white

                    shadow-[0_8px_25px_rgba(35,143,215,0.22)]

                    outline-none
                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-[#1978B8]
                    hover:shadow-lg

                    focus-visible:ring-2
                    focus-visible:ring-[#238FD7]/40
                    focus-visible:ring-offset-2
                  "
                >
                  Register
                </Link>
              </div>
            ) : (
              /* ---------------------------------------------- */
              /* LOGGED IN */
              /* ---------------------------------------------- */

              <div ref={profileRef} className="relative ml-1">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((previous) => !previous)}
                  aria-haspopup="menu"
                  aria-expanded={isProfileOpen}
                  className="
                    flex
                    items-center
                    gap-2

                    rounded-full
                    border
                    border-slate-200

                    bg-white/70

                    py-1.5
                    pl-1.5
                    pr-3

                    backdrop-blur-md
                    cursor-pointer
                    outline-none
                    transition-all
                    duration-300

                    hover:border-[#238FD7]/40
                    hover:bg-[#238FD7]/5

                    focus-visible:ring-2
                    focus-visible:ring-[#238FD7]/40

                    dark:border-white/10
                    dark:bg-[#111A2E]/80

                    dark:hover:border-[#38BDF8]/40
                    dark:hover:bg-[#38BDF8]/5
                  "
                >
                  <UserAvatar
                    user={{
                      ...user,
                      name: profile?.name || user?.name,
                      image: profile?.image || user?.image,
                    }}
                    size="sm"
                  />

                  <span
                    className="
                      max-w-28
                      truncate
                      text-sm
                      font-semibold
                      text-slate-700

                      dark:text-slate-200
                    "
                  >
                    {displayName}
                  </span>

                  <ChevronDown
                    className={`
                      h-4
                      w-4
                      shrink-0
                      text-slate-500
                      transition-transform
                      duration-200

                      dark:text-slate-400

                      ${isProfileOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {/* PROFILE DROPDOWN */}

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                        scale: 0.97,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.97,
                      }}
                      transition={{
                        duration: 0.18,
                      }}
                      role="menu"
                      className="
        absolute
        right-0
        mt-3
        w-60
        overflow-hidden

        rounded-2xl
        border
        border-slate-200

        bg-white/95
        p-2

        shadow-[0_20px_50px_rgba(15,23,42,0.16)]
        backdrop-blur-xl

        dark:border-slate-700
        dark:bg-slate-900/95
        dark:shadow-black/30
      "
                    >
                      {/* PROFILE */}

                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsProfileOpen(false)}
                        role="menuitem"
                        className={`
          flex
          items-center
          gap-3

          rounded-xl

          px-4
          py-3

          text-sm
          font-medium

          outline-none
          transition-all
          duration-200

          ${
            isActive("/dashboard/profile")
              ? `
                bg-blue-50
                text-blue-600

                dark:bg-blue-950/50
                dark:text-cyan-400
              `
              : `
                text-slate-700

                hover:bg-blue-50
                hover:text-blue-600

                dark:text-slate-200
                dark:hover:bg-slate-800
                dark:hover:text-cyan-400
              `
          }
        `}
                      >
                        <UserRound className="h-4 w-4" />
                        Profile Management
                      </Link>

                      {/* LOGOUT */}

                      <button
                        type="button"
                        onClick={handleLogout}
                        role="menuitem"
                        className="
          mt-1

          flex
          w-full
          items-center
          gap-3

          rounded-xl

          px-4
          py-3

          text-left
          text-sm
          font-medium
          text-red-500

          outline-none
          transition-all
          duration-200

          hover:bg-red-50

          focus-visible:ring-2
          focus-visible:ring-red-300

          dark:text-red-400
          dark:hover:bg-red-950/30
        "
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* ================================================== */}
          {/* MOBILE CONTROLS */}
          {/* ================================================== */}

          <div className="flex items-center gap-2 xl:hidden">
            {/* MOBILE THEME */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full

                border
                border-slate-300/70

                bg-white/50

                text-slate-600

                backdrop-blur-md
                outline-none
                transition-all
                duration-300

                hover:border-[#238FD7]/40
                hover:bg-[#238FD7]/10
                hover:text-[#238FD7]

                focus-visible:ring-2
                focus-visible:ring-[#238FD7]/40

                dark:border-slate-700
                dark:bg-slate-900/50
                dark:text-slate-300

                dark:hover:border-cyan-500
                dark:hover:bg-cyan-950/40
                dark:hover:text-cyan-400
              "
            >
              <ThemeToggle isDark={isDark} mounted={mounted} />
            </button>

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((previous) => !previous)}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl

                border
                border-slate-300/70

                bg-white/50

                text-slate-700

                backdrop-blur-md
                outline-none
                transition-all
                duration-300

                hover:border-[#238FD7]/40
                hover:bg-[#238FD7]/10
                hover:text-[#238FD7]

                focus-visible:ring-2
                focus-visible:ring-[#238FD7]/40

                dark:border-slate-700
                dark:bg-slate-900/50
                dark:text-slate-200

                dark:hover:border-cyan-500
                dark:hover:bg-cyan-950/40
                dark:hover:text-cyan-400
              "
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ====================================================== */}
      {/* MOBILE SIDEBAR + BACKDROP */}
      {/* ====================================================== */}

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* ================================================== */}
            {/* MOBILE MENU VIEWPORT LAYER */}
            {/* ================================================== */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="
          fixed
          inset-0
          z-[60]

          overflow-hidden

          xl:hidden
        "
            >
              {/* ================================================== */}
              {/* BACKDROP */}
              {/* ================================================== */}

              <div
                onClick={closeMobileMenu}
                className="
            absolute
            inset-0

            bg-slate-950/45
            
            backdrop-blur-[2px]
          "
              />

              {/* ================================================== */}
              {/* RIGHT SIDEBAR */}
              {/* ================================================== */}

              <motion.aside
                ref={mobileMenuRef}
                initial={{
                  x: "100%",
                }}
                animate={{
                  x: 0,
                }}
                exit={{
                  x: "100%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 360,
                  damping: 35,
                }}
                className="
            absolute
            right-0
            top-0

            h-full
            w-[68vw]
            max-w-[320px]

            overflow-hidden

            border-l
            border-slate-200

            bg-white

            shadow-2xl
            shadow-slate-900/25

            dark:border-slate-800
            dark:bg-slate-950!
          "
              >
                {/* ================================================== */}
                {/* SIDEBAR HEADER */}
                {/* ================================================== */}

                <div
                  className="
              flex
              h-[76px]
              min-h-[76px]
              shrink-0

              items-center
              justify-between

              border-b
              border-slate-200

              bg-linear-to-r
              from-white
              via-blue-50/80
              to-cyan-50/70

              px-4

              dark:border-slate-800
              dark:bg-linear-to-r
              dark:from-slate-950
              dark:via-blue-950/40
              dark:to-slate-950
            "
                >
                  {/* LOGO */}

                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="
                flex
                items-center
                gap-2
              "
                  >
                    <div className="relative h-10 w-10">
                      <Image
                        src={logo}
                        alt="TripSwift Logo"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <span
                      className="
                  bg-linear-to-r
                  from-[#1978B8]
                  to-[#38BDF8]
                  bg-clip-text
                  text-lg
                  font-extrabold
                  text-transparent
                "
                    >
                      TripSwift
                    </span>
                  </Link>

                  {/* CLOSE BUTTON */}

                  <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={closeMobileMenu}
                    className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center

                rounded-xl

                border
                border-slate-200

                bg-white

                text-slate-600

                shadow-sm
                transition-all
                duration-200

                hover:border-[#238FD7]/40
                hover:bg-[#238FD7]/10
                hover:text-[#238FD7]

                dark:hover:border-[#38BDF8]/40
                dark:hover:bg-[#38BDF8]/10
                dark:hover:text-[#38BDF8]
              "
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* ================================================== */}
                {/* SIDEBAR SCROLL AREA */}
                {/* ================================================== */}

                <div
                  className="
              navbar-mobile-scroll

              h-[calc(100%-76px)]
              min-h-0

              overflow-y-auto
              overflow-x-hidden

              overscroll-contain

              px-4
              py-5

              bg-white

              dark:bg-slate-950
            "
                >
                  {/* ================================================== */}
                  {/* MOBILE PROFILE */}
                  {/* ================================================== */}

                  {!mounted || isPending ? (
                    <div className="flex justify-center py-3">
                      <NavbarSessionSpinner />
                    </div>
                  ) : user ? (
                    <>
                      {/* PROFILE INFO */}

                      <div
                        className="
                    mb-4
                    flex
                    flex-col
                    items-center

                    rounded-2xl

                    border
                    border-blue-100

                    bg-linear-to-br
                    from-blue-50
                    via-white
                    to-cyan-50

                    px-3
                    py-4

                    shadow-sm

                    dark:border-blue-900/60
                    dark:bg-linear-to-br
                    dark:from-slate-900
                    dark:via-blue-950/40
                    dark:to-slate-900
                  "
                      >
                        <UserAvatar
                          user={{
                            ...user,
                            name: profile?.name || user?.name,
                            image: profile?.image || user?.image,
                          }}
                          size="lg"
                        />

                        <p
                          className="
                      mt-3
                      text-base
                      font-bold
                      text-slate-900

                      dark:text-white
                    "
                        >
                          {profile?.name || user?.name || "User"}
                        </p>

                        {user.email && (
                          <p
                            className="
                        mt-0.5
                        max-w-full
                        truncate
                        text-xs
                        text-slate-500

                        dark:text-slate-400
                      "
                          >
                            {user.email}
                          </p>
                        )}
                      </div>

                      {/* DASHBOARD */}

                      <Link
                        href="/dashboard"
                        onClick={closeMobileMenu}
                        className={`
                    flex
                    items-center
                    gap-3

                    rounded-xl
                    border

                    px-4
                    py-3

                    text-sm
                    font-semibold

                    transition-all
                    duration-200

                    ${
                      isActive("/dashboard")
                        ? `
                          border-[#238FD7]/30
                        bg-[#238FD7]/10
                        text-[#1978B8]
                        shadow-sm

                        dark:border-[#38BDF8]/30
                        dark:bg-[#38BDF8]/10
                        dark:text-[#38BDF8]
                        `
                        : `
                          border-transparent
                        text-slate-600
                        hover:border-[#238FD7]/20
                        hover:bg-[#238FD7]/7
                        hover:text-[#1978B8]
                        dark:text-slate-300
                        dark:hover:border-white/10
                        dark:hover:bg-white/5
                        dark:hover:text-[#38BDF8]
                        `
                    }
                  `}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>

                      {/* MY PROFILE */}

                      <Link
                        href="/dashboard/profile"
                        onClick={closeMobileMenu}
                        className={`
                    mt-1.5

                    flex
                    items-center
                    gap-3

                    rounded-xl
                    border

                    px-4
                    py-3

                    text-sm
                    font-semibold

                    transition-all
                    duration-200

                    ${
                      isActive("/dashboard/profile")
                        ? `
                          border-[#238FD7]/30
                          bg-[#238FD7]/10
                          text-[#1978B8]
                          shadow-sm
                          dark:border-[#38BDF8]/30
                          dark:bg-[#38BDF8]/10
                          dark:text-[#38BDF8]
                        `
                        : `
                          border-transparent
                        text-slate-600
                        hover:border-[#238FD7]/20
                        hover:bg-[#238FD7]/7
                        hover:text-[#1978B8]
                        dark:text-slate-300
                        dark:hover:border-white/10
                        dark:hover:bg-white/5
                        dark:hover:text-[#38BDF8]
                        `
                    }
                  `}
                      >
                        <UserRound className="h-4 w-4" />
                        My Profile
                      </Link>

                      {/* DIVIDER */}

                      <div
                        className="
                    my-3
                    h-px
                    bg-slate-200

                    dark:bg-slate-800
                  "
                      />
                    </>
                  ) : null}

                  {/* ================================================== */}
                  {/* MOBILE LINKS */}
                  {/* ================================================== */}

                  <div className="space-y-1.5">
                    {navLinks.map((link) => {
                      const active = isActive(link.href);

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMobileMenu}
                          className={`
                      flex
                      items-center
                      justify-between

                      rounded-xl

                      px-4
                      py-3

                      text-sm
                      font-semibold

                      transition-all
                      duration-200

                      ${
                        active
                          ? `
                            border-[#238FD7]/30
                            bg-[#238FD7]/10
                            text-[#1978B8]
                            shadow-sm
                            dark:border-[#38BDF8]/30
                            dark:bg-[#38BDF8]/10
                            dark:text-[#38BDF8]
                          `
                          : `
                            border-transparent
                          text-slate-600
                          hover:border-[#238FD7]/20
                          hover:bg-[#238FD7]/7
                          hover:text-[#1978B8]
                          dark:text-slate-300
                          dark:hover:border-white/10
                          dark:hover:bg-white/5
                          dark:hover:text-[#38BDF8]
                          `
                      }
                    `}
                        >
                          <span>{link.name}</span>

                          {active && (
                            <span
                              className="
                          h-2
                          w-2
                          rounded-full

                          bg-linear-to-r
                          from-cyan-400
                          to-blue-600

                          shadow-sm
                        "
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  {/* DIVIDER */}

                  <div
                    className="
                my-4
                h-px
                bg-slate-200

                dark:bg-slate-800
              "
                  />

                  {/* ================================================== */}
                  {/* MOBILE AUTH */}
                  {/* ================================================== */}

                  {isPending ? (
                    <div className="flex justify-center py-2">
                      <NavbarSessionSpinner />
                    </div>
                  ) : !user ? (
                    <div className="flex w-full flex-col gap-2">
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className="
                    rounded-xl

                    border
                    border-[#238FD7]/50
                    bg-white
                    text-[#1978B8]
                    hover:border-[#238FD7]
                    hover:bg-[#238FD7]/10
                    dark:border-[#38BDF8]/40
                    dark:bg-white/5
                    dark:text-[#38BDF8]
                    dark:hover:bg-[#38BDF8]/10
                  "
                      >
                        Login
                      </Link>

                      <Link
                        href="/register"
                        onClick={closeMobileMenu}
                        className="
                     rounded-xl
                    bg-[#238FD7]
                    px-4
                    py-3
                    text-center
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_8px_25px_rgba(35,143,215,0.22)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#1978B8]
                    hover:shadow-lg
                  "
                      >
                        Register
                      </Link>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2.5

                  rounded-xl

                  border
                  border-slate-200

                  bg-white

                  px-4
                  py-3

                  text-sm
                  font-semibold
                  text-red-500

                  shadow-sm

                  transition-all
                  duration-300

                  hover:border-red-200
                  hover:bg-red-50
                  hover:shadow-md

                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-red-400

                  dark:hover:border-red-900/50
                  dark:hover:bg-red-950/30
                "
                    >
                      <LogOut
                        className="
                    h-4
                    w-4

                    transition-transform
                    duration-300

                    group-hover:-translate-x-0.5
                  "
                      />

                      <span>Logout</span>
                    </button>
                  )}
                </div>
              </motion.aside>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarCopy;
