import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/providers/ThemeProvider";
import { ProfileProvider } from "@/context/ProfileContext";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://trip-swift-client.vercel.app"),

  title: {
    default: "TripSwift — Travel, Book, Go",
    template: "%s | TripSwift",
  },

  description:
    "TripSwift is a modern travel ticket booking platform for discovering, booking, and managing bus, train, plane, and other travel tickets.",

  keywords: [
    "TripSwift",
    "travel booking",
    "ticket booking",
    "bus ticket",
    "train ticket",
    "flight ticket",
    "travel tickets",
    "online ticket booking",
  ],

  authors: [
    {
      name: "TripSwift",
    },
  ],

  creator: "TripSwift",

  openGraph: {
    title: "TripSwift — Travel, Book, Go",
    description:
      "Discover and book travel tickets easily with TripSwift.",
    siteName: "TripSwift",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="mx-auto bg-[#F4F9FC] dark:bg-[#071522]!">
        <ThemeProvider>
          <ProfileProvider>
            <Navbar />

            {children}

            <Footer />
          </ProfileProvider>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}