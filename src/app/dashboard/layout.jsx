import DashboardLayoutClient from "./DashboardLayoutClient";


export const metadata = {
  title: {
    default: "Dashboard",
    template: "%s | TripSwift Dashboard",
  },

  description:
    "Manage bookings, tickets, users, revenue, transactions, and your TripSwift account from the dashboard.",

  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}