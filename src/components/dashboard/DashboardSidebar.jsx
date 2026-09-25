"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import {
  BarChart3,
  FilePlus2,
  Home,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Ticket,
  TrainFront,
  UserRound,
  Users,
  WalletCards,
  X,
} from "lucide-react";

const sidebarMenus = {
  user: [
    {
      section: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },

    {
      section: "My Journey",
      items: [
        {
          label: "My Booked Tickets",
          href: "/dashboard/bookings",
          icon: Ticket,
        },
        {
          label: "Transaction History",
          href: "/dashboard/transactions",
          icon: WalletCards,
        },
      ],
    },

    {
      section: "Account",
      items: [
        {
          label: "My Profile",
          href: "/dashboard/profile",
          icon: UserRound,
        },
      ],
    },
  ],

  vendor: [
    {
      section: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Revenue Overview",
          href: "/dashboard/revenue",
          icon: BarChart3,
        },
      ],
    },

    {
      section: "Ticket Management",
      items: [
        {
          label: "Add Ticket",
          href: "/dashboard/add-ticket",
          icon: FilePlus2,
        },
        {
          label: "My Added Tickets",
          href: "/dashboard/my-tickets",
          icon: TrainFront,
        },
        {
          label: "Requested Bookings",
          href: "/dashboard/requested-bookings",
          icon: Ticket,
        },
      ],
    },

    {
      section: "Account",
      items: [
        {
          label: "My Profile",
          href: "/dashboard/profile",
          icon: UserRound,
        },
      ],
    },
  ],

  admin: [
    {
      section: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },

    {
      section: "Management",
      items: [
        {
          label: "Manage Tickets",
          href: "/dashboard/manage-tickets",
          icon: Ticket,
        },
        {
          label: "Manage Users",
          href: "/dashboard/manage-users",
          icon: Users,
        },
        {
          label: "Advertise Tickets",
          href: "/dashboard/advertise",
          icon: Megaphone,
        },
      ],
    },

    {
      section: "Account",
      items: [
        {
          label: "My Profile",
          href: "/dashboard/profile",
          icon: UserRound,
        },
      ],
    },
  ],
};

export default function DashboardSidebar({
  role = "user",
  open,
  setOpen,
}) {
  const pathname = usePathname();

  const menus =
    sidebarMenus[role] || sidebarMenus.user;

  const mobileSidebarRef = useRef(null);

  // ============================================================
  // MOBILE SIDEBAR
  // OUTSIDE CLICK + ESCAPE + SCROLL LOCK
  // ============================================================

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const handlePointerDownOutside = (event) => {
      if (
        mobileSidebarRef.current &&
        !mobileSidebarRef.current.contains(
          event.target,
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    document.addEventListener(
      "pointerdown",
      handlePointerDownOutside,
    );

    // ========================================================
    // PREVENT BACKGROUND SCROLL
    // ========================================================

    const originalBodyOverflow =
      document.body.style.overflow;

    const originalHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";

    document.documentElement.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );

      document.removeEventListener(
        "pointerdown",
        handlePointerDownOutside,
      );

      document.body.style.overflow =
        originalBodyOverflow;

      document.documentElement.style.overflow =
        originalHtmlOverflow;
    };
  }, [open, setOpen]);

  // ============================================================
  // CLOSE AFTER ROUTE CHANGE
  // ============================================================

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [pathname]);

  // ============================================================
  // SIDEBAR CONTENT
  // ============================================================

  const SidebarContent = ({ mobile = false }) => {
    return (
      <>
        {/* ================================================== */}
        {/* BRAND */}
        {/* ================================================== */}

        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <Link
            href="/dashboard"
            onClick={
              mobile
                ? () => setOpen(false)
                : undefined
            }
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 font-bold text-white">
              TS
            </div>

            <div>
              <p className="font-bold tracking-tight text-slate-900 dark:text-white">
                Trip
                <span className="text-sky-500">
                  Swift
                </span>
              </p>

              <p className="text-[11px] text-slate-500">
                {roleLabel(role)} Dashboard
              </p>
            </div>
          </Link>
        </div>

        {/* ================================================== */}
        {/* NAVIGATION */}
        {/* ================================================== */}

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {menus.map((section) => (
            <div
              key={section.section}
              className="mb-6"
            >
              <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {section.section}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(
                          item.href,
                        );

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={
                        mobile
                          ? () =>
                              setOpen(false)
                          : undefined
                      }
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`h-[18px] w-[18px] shrink-0 transition ${
                          isActive
                            ? "text-sky-500"
                            : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                        }`}
                      />

                      <span>{item.label}</span>

                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-500" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ================================================== */}
        {/* BOTTOM */}
        {/* ================================================== */}

        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <Link
            href="/"
            onClick={
              mobile
                ? () => setOpen(false)
                : undefined
            }
            className="
              flex
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              font-medium
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <Home className="h-[18px] w-[18px]" />

            Back to Home
          </Link>

          <button
            type="button"
            className="
              mt-1
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              font-medium
              text-slate-500
              transition
              hover:bg-red-50
              hover:text-red-500
              dark:hover:bg-red-500/10
            "
          >
            <LogOut className="h-[18px] w-[18px]" />

            Logout
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      {/* ======================================================== */}
      {/* DESKTOP SIDEBAR */}
      {/* ======================================================== */}

      <aside className="hidden w-64 shrink-0 rounded-lg border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950! lg:block">
        <div className="sticky top-[72px] flex h-[calc(100vh-72px)] flex-col">
          <SidebarContent />
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MOBILE SIDEBAR */}
      {/* ======================================================== */}

      <AnimatePresence>
        {open && (
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
              lg:hidden
            "
          >
            {/* ================================================== */}
            {/* BACKDROP */}
            {/* ================================================== */}

            <div
              onClick={() => setOpen(false)}
              className="
                absolute
                inset-0
                bg-slate-950/45
                backdrop-blur-[2px]
              "
            />

            {/* ================================================== */}
            {/* MOBILE SIDEBAR */}
            {/* ================================================== */}

            <motion.aside
              ref={mobileSidebarRef}
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                type: "spring",
                stiffness: 360,
                damping: 35,
              }}
              className="
                absolute
                left-0
                top-0
                h-full
                w-[68vw]
                max-w-[320px]
                overflow-hidden
                border-r
                border-slate-200
                bg-white
                shadow-2xl
                shadow-slate-900/25
                dark:border-slate-800
                dark:bg-slate-950!
              "
            >
              {/* ================================================== */}
              {/* MOBILE SIDEBAR HEADER */}
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
                {/* BRAND */}

                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 font-bold text-white">
                    TS
                  </div>

                  <div>
                    <p className="font-bold tracking-tight text-slate-900 dark:text-white">
                      Trip
                      <span className="text-sky-500">
                        Swift
                      </span>
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {roleLabel(role)} Dashboard
                    </p>
                  </div>
                </Link>

                {/* CLOSE BUTTON */}

                <button
                  type="button"
                  aria-label="Close dashboard sidebar"
                  onClick={() => setOpen(false)}
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
                    hover:border-sky-300
                    hover:bg-sky-50
                    hover:text-sky-600
                    active:scale-95
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-slate-300
                    dark:hover:border-sky-500/40
                    dark:hover:bg-sky-500/10
                    dark:hover:text-sky-400
                  "
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* ================================================== */}
              {/* MOBILE SCROLL AREA */}
              {/* ================================================== */}

              <div
                className="
                  h-[calc(100%-76px)]
                  min-h-0
                  overflow-y-auto
                  overflow-x-hidden
                  overscroll-contain
                  bg-white
                  dark:bg-slate-950
                "
              >
                <SidebarContent mobile />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function roleLabel(role) {
  if (role === "admin") {
    return "Admin";
  }

  if (role === "vendor") {
    return "Vendor";
  }

  return "User";
}