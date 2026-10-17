"use client";

import dynamic from "next/dynamic";
import {
  AdvertisementSectionSkeleton,
  LatestTicketsSkeleton,
} from "./HomeTicketSectionsSkeletons";
import PopularRoutesSkeleton from "./PopularRoutesSkeleton";

const AdvertisementSection = dynamic(() => import("./AdvertisementSection"), {
  loading: () => <AdvertisementSectionSkeleton />,
});
const LatestTickets = dynamic(() => import("./LatestTickets"), {
  loading: () => <LatestTicketsSkeleton />,
});
const PopularRoutes = dynamic(() => import("./PopularRoutes"), {
  loading: () => <PopularRoutesSkeleton />,
});

export function AdvertisementSectionClient() {
  return <AdvertisementSection />;
}

export function LatestTicketsClient() {
  return <LatestTickets />;
}

export function PopularRoutesClient() {
  return <PopularRoutes />;
}
