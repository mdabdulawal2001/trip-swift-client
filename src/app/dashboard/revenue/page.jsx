import RevenueOverview from "@/components/dashboard/vendor/RevenueOverview";

export const metadata = {
  title: "Revenue",
  description:
    "View revenue information and performance data on TripSwift.",
};

export default function RevenuePage() {
  return(
    <> 
    <RevenueOverview />;
    </>
  ) 
}