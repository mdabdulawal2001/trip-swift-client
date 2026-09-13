import { notFound } from "next/navigation";
import { headers } from "next/headers";
import TicketDetails from "@/components/tickets/TicketDetails";
import { getVendorTicketById } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default async function VendorTicketDetailsPage({ params }) {
  const { id } = await params;
  let email = "";

  try {
    const { data: session } = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    });

    email = session?.user?.email || "";
  } catch (error) {
    console.error("Vendor session error:", error);
  }

  if (!email) {
    notFound();
  }

  const data = await getVendorTicketById(id, email);

  if (!data?.success || !data?.ticket) {
    notFound();
  }

  return (
    <TicketDetails
      ticket={data.ticket}
      relatedTickets={[]}
      isManagementView
    />
  );
}