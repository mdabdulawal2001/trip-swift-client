"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { LogOut, UserRound } from "lucide-react";

import logo from "@/assets/logo.png";
import { authClient } from "@/lib/auth-client";
import NavbarSessionSpinner from "./NavbarSessionSpinner";
import UserAvatar from "./UserAvatar";
import toast from "react-hot-toast";
import ThemeToggleIcon from "./ThemeToggleIcon";
import { useProfile } from "@/components/context/ProfileContext";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Ideas",
    href: "/ideas",
  },
  {
    name: "Add Idea",
    href: "/add-idea",
  },
  {
    name: "My Ideas",
    href: "/my-ideas",
  },
  {
    name: "My Interactions",
    href: "/my-interactions",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useProfile();

  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { theme, setTheme, resolvedTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // AUTH

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // THEME

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  //  LOGOUT

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

  //  PROFILE OUTSIDE CLICK

  useEffect(() => {
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

    if (isProfileOpen) {
      document.addEventListener("pointerdown", handlePointerDownOutside);

      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);

      document.removeEventListener("keydown", handleEscape);
    };
  }, [isProfileOpen]);

  //  MOBILE MENU

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

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

    // Prevent background page scrolling
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);

      document.removeEventListener("pointerdown", handlePointerDownOutside);

      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  //  NAVIGATION

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  // profile link active
  const profileActive = isActive("/profile");

  // ================= USER INFO =================
  const userName = user?.name?.trim() || "User";
  const profileName = profile?.name?.trim() || "User";
  const profileImage = profile?.image || null;

  return (
    <>
      {/* NAVBAR */}

      <header
        className="
          sticky top-0 z-50 mx-auto
          border-b
          border-slate-200/70
          bg-linear-to-r
          from-white/95
          via-blue-50/70
          to-cyan-50/70
          shadow-sm
          backdrop-blur-xl

          dark:border-slate-800/80
          dark:bg-linear-to-r
          dark:from-slate-950/95
          dark:via-blue-950/20
          dark:to-cyan-950/15
        "
      >
        <nav
          className="
            mx-auto flex
            min-h-19
            items-center
            justify-between
            gap-4
            px-4
            sm:px-6
            lg:px-8
            xl:min-h-24
            max-w-7xl
          "
        >
          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex shrink-0 items-center gap-2"
          >
            <div className="relative h-12 w-12 sm:h-14 sm:w-14">
              <Image
                src={logo}
                alt="IdeaVault Logo"
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
                IdeaVault
              </h1>

              <p
                className="
                  -mt-1
                  text-[9px]
                  font-medium
                  tracking-[0.18em]
                  text-slate-500
                  dark:text-slate-400
                "
              >
                SHARE • DISCOVER • INNOVATE
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}

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
                    transition-all
                    duration-300

                    ${
                      active
                        ? `
                          bg-blue-100/70
                          text-blue-600
                          shadow-sm
                          shadow-blue-500/5

                          dark:bg-blue-950/50
                          dark:text-cyan-400
                        `
                        : `
                          text-slate-600
                          hover:bg-white/70
                          hover:text-blue-600

                          dark:text-slate-300
                          dark:hover:bg-slate-800/60
                          dark:hover:text-cyan-400
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
                        bottom-0
                        left-1/2
                        h-0.75
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

          {/* DESKTOP RIGHT SIDE */}

          <div className="hidden items-center gap-2 xl:flex">
            {/* THEME TOGGLE */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="
                flex
                md:h-11
                md:w-11
                items-center
                justify-center
                rounded-full
                border
                border-slate-300/60
                bg-white/35
                text-slate-600
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-blue-300
                hover:bg-blue-100/60
                hover:text-blue-600
                cursor-pointer
                dark:border-slate-700/60
                dark:bg-slate-900/30
                dark:text-slate-300
                dark:hover:border-cyan-500/60
                dark:hover:bg-cyan-950/40
                dark:hover:text-cyan-400
              "
            >
              <ThemeToggleIcon isDark={isDark} mounted={mounted} />
            </button>

            {/* SESSION LOADING */}

            {!mounted || isPending ? (
              <NavbarSessionSpinner />
            ) : !user ? (
              /* LOGGED OUT */

              <div className="ml-1 flex items-center gap-2">
                <Link
                  href="/login"
                  className="
                    rounded-full
                    border
                    border-blue-500
                    bg-white/30
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-blue-600
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:bg-blue-50/80

                    dark:border-cyan-500
                    dark:bg-slate-900/20
                    dark:text-cyan-400
                    dark:hover:bg-cyan-950/30
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="
                    rounded-full
                    bg-linear-to-r
                    from-cyan-500
                    to-blue-600
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-white
                    shadow-md
                    shadow-blue-500/20
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-lg
                    hover:shadow-blue-500/30
                  "
                >
                  Register
                </Link>
              </div>
            ) : (
              /* LOGGED IN PROFILE */

              <div ref={profileRef} className="relative ml-1">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((previous) => !previous)}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-slate-300/60
                    bg-blue-300
                    py-1.5
                    pl-1.5
                    pr-3
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:border-blue-300
                    hover:bg-blue-200
                    cursor-pointer
                    dark:border-slate-700/60
                    dark:bg-slate-900/30
                    dark:hover:border-cyan-500/60
                    dark:hover:bg-cyan-950/30
                  "
                >
                  {/* USER AVATAR */}

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
                      text-sm
                      font-semibold
                      text-slate-700
                      dark:text-slate-200
                    "
                  >
                    {profile?.name || user?.name || "User"}
                  </span>

                  <svg
                    className={`
                      h-4
                      w-4
                      transition-transform
                      duration-200

                      ${isProfileOpen ? "rotate-180" : ""}
                    `}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
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
                      className="
                        absolute
                        right-0
                        mt-3
                        w-56
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-2
                        shadow-xl
                        backdrop-blur-xl

                        dark:border-slate-700
                        dark:bg-slate-900/95
                      "
                    >
                      {/* Profile */}

                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className={`
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            text-sm
                            font-medium
                            transition-all
                            duration-200

                            ${
                              isActive("/profile")
                                ? `
                                  bg-blue-200
                                  text-blue-60                        0

                                  dark:bg-blue-950/50
                                  dark:text-cyan-400
                                `
                                : `
                                  text-slate-700
                                  hover:bg-blue-200
                                  hover:text-blue-60                        0

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

                      {/* Logout */}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="
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
                          transition

                          hover:bg-red-200

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

          {/* MOBILE CONTROLS */}

          <div className="flex items-center gap-2 xl:hidden">
            {/* Mobile Theme Toggle */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-slate-300/60
                bg-white/35
                text-slate-600
                backdrop-blur-md
                transition-all
                duration-300

                hover:border-blue-300
                hover:bg-blue-100/60
                hover:text-blue-600

                dark:border-slate-700/60
                dark:bg-slate-900/30
                dark:text-slate-300
                dark:hover:border-cyan-500
                dark:hover:bg-cyan-950/40
                dark:hover:text-cyan-400
              "
            >
              <ThemeToggleIcon isDark={isDark} mounted={mounted} />
            </button>

            {/* Mobile Menu Button */}

            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-slate-300/60
                bg-white/35
                text-slate-700
                backdrop-blur-md
                transition

                hover:border-blue-300
                hover:bg-blue-100/60
                hover:text-blue-600

                dark:border-slate-700/60
                dark:bg-slate-900/30
                dark:text-slate-200
                dark:hover:border-cyan-500
                dark:hover:bg-cyan-950/40
                dark:hover:text-cyan-400
              "
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE SIDEBAR + BACKDROP */}

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* BACKDROP */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
              className="
          fixed
          inset-0
          z-55
          bg-slate-950/45
          backdrop-blur-[2px]
          xl:hidden
        "
            />

            {/* RIGHT SIDEBAR */}

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
                fixed
                right-0
                top-0
                z-60

                h-dvh
                w-[68%]
                max-w-[320px]

                overflow-hidden

                border-l
               border-slate-200

              bg-white

                shadow-2xl
                shadow-slate-900/25

              dark:border-slate-800
              dark:bg-slate-950!

              xl:hidden"
            >
              {/* SIDEBAR HEADER */}

              <div
                className="
            flex
            h-19
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
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2"
                >
                  <div className="relative h-10 w-10">
                    <Image
                      src={logo}
                      alt="IdeaVault Logo"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <span
                    className="
                bg-linear-to-r
                from-cyan-500
                to-blue-600
                bg-clip-text
                text-lg
                font-extrabold
                text-transparent
              "
                  >
                    IdeaVault
                  </span>
                </Link>

                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={closeMobileMenu}
                  className="
              flex
              h-9
              w-9
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

              hover:border-blue-300
              hover:bg-blue-50
              hover:text-blue-600

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300

              dark:hover:border-cyan-500
              dark:hover:bg-slate-800
              dark:hover:text-cyan-400
            "
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* SIDEBAR CONTENT */}

              <div
                className="
            navbar-mobile-scroll
            h-[calc(100dvh-76px)]
            overflow-y-auto
            px-4
            py-5

            bg-white

            dark:bg-slate-950
          "
              >
                {/* MOBILE PROFILE */}

                {!mounted || isPending ? (
                  <div className="flex justify-center py-3">
                    <NavbarSessionSpinner />
                  </div>
                ) : user ? (
                  <>
                    {/* Profile Info */}

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

                    {/* Profile Management */}

                    <Link
                      href="/profile"
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
                          isActive("/profile")
                            ? `
                              border-blue-200
                              bg-blue-50
                              text-blue-600
                              shadow-sm
                        
                              dark:border-blue-800/70
                              dark:bg-blue-950/60
                              dark:text-cyan-400
                            `
                            : `
                              border-transparent
                              text-slate-700
                        
                              hover:border-blue-100
                              hover:bg-blue-50
                              hover:text-blue-600
                        
                              dark:text-slate-200
                              dark:hover:border-slate-800
                              dark:hover:bg-slate-900
                              dark:hover:text-cyan-400
                            `
                        }
                      `}
                    >
                      <UserRound className="h-4 w-4" />
                      Profile Management
                    </Link>

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

                {/* MOBILE LINKS */}

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
                          border
                          border-blue-200
                          bg-blue-50
                          text-blue-600
                          shadow-sm

                          dark:border-blue-800/70
                          dark:bg-blue-950/60
                          dark:text-cyan-400
                        `
                        : `
                          border
                          border-transparent
                          text-slate-700

                          hover:border-blue-100
                          hover:bg-blue-50
                          hover:text-blue-600

                          dark:text-slate-200
                          dark:hover:border-slate-800
                          dark:hover:bg-slate-900
                          dark:hover:text-cyan-400
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

                <div
                  className="
              my-4
              h-px
              bg-slate-200

              dark:bg-slate-800
            "
                />

                {/* MOBILE AUTH */}

                {isPending ? (
                  <div className="flex justify-center py-2">
                    <NavbarSessionSpinner />
                  </div>
                ) : !user ? (
                  /* LOGGED OUT */

                  <div className="flex w-full flex-col gap-2">
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="
                  rounded-xl

                  border
                  border-blue-500

                  bg-white

                  px-4
                  py-3

                  text-center
                  text-sm
                  font-semibold
                  text-blue-600

                  shadow-sm

                  transition-all
                  duration-200

                  hover:bg-blue-50
                  hover:shadow-md

                  dark:border-cyan-500
                  dark:bg-slate-900
                  dark:text-cyan-400
                  dark:hover:bg-cyan-950/50
                "
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={closeMobileMenu}
                      className="
                  rounded-xl

                  bg-linear-to-r
                  from-cyan-500
                  to-blue-600

                  px-4
                  py-3

                  text-center
                  text-sm
                  font-semibold
                  text-white

                  shadow-md
                  shadow-blue-500/20

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:shadow-lg
                  hover:shadow-blue-500/30
                "
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  /* LOGGED IN */

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
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;