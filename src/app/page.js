import AdvertisementSection from "@/components/home/AdvertisementSection";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import LatestTickets from "@/components/home/LatestTickets";
import PopularRoutes from "@/components/home/PopularRoutes";
import WhyTripSwift from "@/components/home/WhyTripSwift";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AdvertisementSection />
      <LatestTickets />
      <PopularRoutes />
      <WhyTripSwift />
      <CTASection />
    </div>
  );
}
