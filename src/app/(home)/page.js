import BookingFAQ from "@/components/home/BookingFAQ";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";

import WhyTripSwift from "@/components/home/WhyTripSwift";
import {
  AdvertisementSectionClient,
  LatestTicketsClient,
  PopularRoutesClient,
} from "@/components/home/HomeDataSectionsClient";

export const metadata = {
  title: "Travel & Ticket Booking",
  description:
    "Discover travel tickets, explore popular routes, and book your next journey with TripSwift.",
};


export default function Home() {
  return (
    <div>
      <HeroSection />
      <AdvertisementSectionClient />
      <LatestTicketsClient />
      <PopularRoutesClient />
      <WhyTripSwift />
      <HowItWorks />
      <BookingFAQ />
      <CTASection />
    </div>
  );
}
