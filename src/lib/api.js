
export async function getTickets(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.from) {
    searchParams.set("from", params.from);
  }

  if (params.to) {
    searchParams.set("to", params.to);
  }

  if (params.type) {
    searchParams.set("type", params.type);
  }

  if (params.sort) {
    searchParams.set("sort", params.sort);
  }

  searchParams.set("page", String(params.page || 1));
  searchParams.set("limit", String(params.limit || 6));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tickets?${searchParams.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}