const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

if (!API_URL) {
  console.warn(
    "NEXT_PUBLIC_SERVER_API_URL is missing from environment variables.",
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
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}

// vendor get tickets
export async function getVendorTickets(email) {
  const searchParams = new URLSearchParams();

  searchParams.set("email", email);

  const response = await fetch(
    `${API_URL}/tickets/vendor?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch vendor tickets");
  }

  return data;
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

// vendor post tickets
export async function addTicket(ticketData) {
  const response = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData?.message || "Failed to add ticket");
  }

  return data;
}

// get admin all tickets
export async function getAdminTickets() {
  const response = await fetch(`${API_URL}/tickets/admin`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch admin tickets");
  }

  return data;
}

// admin update ticket status
export async function updateTicketStatus(id, status) {
  const response = await fetch(`${API_URL}/tickets/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update ticket status");
  }

  return data;
}

// update ticket by vendor
export async function updateTicket(id, ticketData) {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update ticket");
  }

  return data;
}

// delete ticket by vendor
export async function deleteTicket(id) {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to delete ticket");
  }

  return data;
}

// get vendor ticket by id
export async function getVendorTicketById(id, email) {
  const searchParams = new URLSearchParams();

  searchParams.set("email", email);

  const response = await fetch(
    `${API_URL}/tickets/vendor/${id}?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch vendor ticket");
  }

  return data;
}

// get admin ticket by id
export async function getAdminTicketById(id) {
  const response = await fetch(`${API_URL}/tickets/admin/${id}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch admin ticket");
  }

  return data;
}

// create booking

export async function createBooking(bookingData) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to create booking");
  }

  return data;
}

// get user bookings

export async function getUserBookings(email) {
  const searchParams = new URLSearchParams();

  searchParams.set("email", email);

  const response = await fetch(
    `${API_URL}/bookings/user?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch bookings");
  }

  return data;
}

// get vendor bookings
export async function getVendorBookings(email) {
  const searchParams = new URLSearchParams();

  searchParams.set("email", email);

  const response = await fetch(
    `${API_URL}/bookings/vendor?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch vendor bookings");
  }

  return data;
}

// update booking status by vendor
export async function updateBookingStatus(id, status) {
  const response = await fetch(`${API_URL}/bookings/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update booking status");
  }

  return data;
}

// get admin dashboard stats

export async function getAdminDashboardStats() {
  const response = await fetch(`${API_URL}/admin/dashboard-stats`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch admin dashboard stats");
  }

  return data;
}

// get advertised tickets for homepage
export async function getAdvertisedTickets() {
  const response = await fetch(`${API_URL}/tickets/advertised`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch advertised tickets");
  }

  return data;
}

// admin toggle ticket advertisement
export async function updateTicketAdvertisement(id, advertised) {
  const response = await fetch(`${API_URL}/tickets/${id}/advertise`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      advertised,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update advertisement");
  }

  return data;
}
