"use client";

import dynamic from "next/dynamic";
import DashboardContainer from "@/components/dashboard/shared/DashboardContainer";
import { ContactMessagesSkeleton } from "@/components/dashboard/admin/ContactMessagesSkeleton";

function ContactMessagesPageSkeleton() {
  return (
    <DashboardContainer
      eyebrow="Admin Dashboard"
      title="Contact Messages"
      description="Review messages submitted through the TripSwift contact form."
      loading
    >
      <ContactMessagesSkeleton />
    </DashboardContainer>
  );
}

const ContactMessages = dynamic(
  () => import("@/components/dashboard/admin/ContactMessages"),
  { loading: () => <ContactMessagesPageSkeleton /> },
);

export default function ContactMessagesClient() {
  return <ContactMessages />;
}
