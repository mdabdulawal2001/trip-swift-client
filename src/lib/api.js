
const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

if (!API_URL) {
  console.warn(
    "NEXT_PUBLIC_SERVER_API_URL is missing from environment variables."
  );
}

export async function getTickets({
  from = "",
  to = "",
  type = "",
  sort = "default",
  page = 1,
  limit = 6,
} = {}) {
  const searchParams = new URLSearchParams();

  if (from) {
    searchParams.set("from", from);
  }

  if (to) {
    searchParams.set("to", to);
  }

  if (type) {
    searchParams.set("type", type);
  }

  if (sort && sort !== "default") {
    searchParams.set("sort", sort);
  }

  searchParams.set("page", String(page));
  searchParams.set("limit", String(limit));

  const response = await fetch(
    `${API_URL}/tickets?${searchParams.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}

export async function getTicketById(id) {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ticket");
  }

  return response.json();
}