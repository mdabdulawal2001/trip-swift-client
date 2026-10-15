import AdvertisementSection from "@/components/home/AdvertisementSection";
import BookingFAQ from "@/components/home/BookingFAQ";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";

import LatestTickets from "@/components/home/LatestTickets";
import PopularRoutes from "@/components/home/PopularRoutes";
import WhyTripSwift from "@/components/home/WhyTripSwift";

export const metadata = {
  title: "Travel & Ticket Booking",
  description:
    "Discover travel tickets, explore popular routes, and book your next journey with TripSwift.",
};


export default function Home() {
  return (
    <div>
      <HeroSection />
      <AdvertisementSection />
      <LatestTickets />
      <PopularRoutes />
      <WhyTripSwift />
      <HowItWorks />
      <BookingFAQ />
      <CTASection />
    </div>
  );
}
