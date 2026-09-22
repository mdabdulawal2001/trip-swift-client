const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

if (!API_URL) {
  console.warn(
    "NEXT_PUBLIC_SERVER_API_URL is missing from environment variables.",
  );
}

// ============================================================
// JWT TOKEN
// ============================================================

const getToken = async () => {
  // Client side
  if (typeof window !== "undefined") {
    const { authClient } = await import("@/lib/auth-client");

    const { data, error } = await authClient.token();

    if (error) {
      throw new Error(
        error.message || "Failed to get client JWT token",
      );
    }

    return data?.token || null;
  }

  // Server side
  try {
    const { auth } = await import("@/lib/auth");
    const { headers } = await import("next/headers");

    const { token, error } = await auth.api.getToken({
      headers: await headers(),
    });

    if (error) {
      throw new Error(
        error.message || "Failed to get server JWT token",
      );
    }

    return token || null;
  } catch (error) {
    console.error("JWT Error:", error);

    throw error;
  }
};

// ============================================================
// AUTH HEADERS
// ============================================================

const getAuthHeaders = async () => {
  const token = await getToken();

  return {
    "Content-Type": "application/json",

    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

// ============================================================
// AUTH FETCH
// ============================================================

const authFetch = async (endpoint, options = {}) => {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Something went wrong",
    );
  }

  return data;
};

// ============================================================
// PUBLIC TICKETS
// ============================================================

// get all approved tickets
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

// get advertised tickets for homepage
export async function getAdvertisedTickets() {
  const response = await fetch(
    `${API_URL}/tickets/advertised`,
    {
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to fetch advertised tickets",
    );
  }

  return data;
}

// get ticket by id
export async function getTicketById(id) {
  const response = await fetch(
    `${API_URL}/tickets/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ticket");
  }

  return response.json();
}

// ============================================================
// VENDOR TICKETS
// ============================================================

// vendor get tickets
export async function getVendorTickets(email) {
  const searchParams = new URLSearchParams();

  searchParams.set("email", email);

  return authFetch(
    `/tickets/vendor?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );
}

// vendor post tickets
export async function addTicket(ticketData) {
  return authFetch("/tickets", {
    method: "POST",

    body: JSON.stringify(ticketData),
  });
}

// update ticket by vendor
export async function updateTicket(id, ticketData) {
  return authFetch(`/tickets/${id}`, {
    method: "PATCH",

    body: JSON.stringify(ticketData),
  });
}

// delete ticket by vendor
export async function deleteTicket(id) {
  return authFetch(`/tickets/${id}`, {
    method: "DELETE",
  });
}

// get vendor ticket by id
export async function getVendorTicketById(id, email) {
  const searchParams = new URLSearchParams();

  searchParams.set("email", email);

  return authFetch(
    `/tickets/vendor/${id}?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );
}

// admin toggle ticket advertisement
export async function updateTicketAdvertisement(
  id,
  advertised,
) {
  return authFetch(`/tickets/${id}/advertise`, {
    method: "PATCH",

    body: JSON.stringify({
      advertised,
    }),
  });
}

// ============================================================
// ADMIN TICKETS
// ============================================================

// get admin all tickets
export async function getAdminTickets() {
  return authFetch("/tickets/admin", {
    cache: "no-store",
  });
}

// admin update ticket status
export async function updateTicketStatus(id, status) {
  return authFetch(`/tickets/${id}/status`, {
    method: "PATCH",

    body: JSON.stringify({
      status,
    }),
  });
}

// get admin ticket by id
export async function getAdminTicketById(id) {
  return authFetch(`/tickets/admin/${id}`, {
    cache: "no-store",
  });
}

// ============================================================
// BOOKINGS
// ============================================================

// create booking
export async function createBooking(bookingData) {
  return authFetch("/bookings", {
    method: "POST",

    body: JSON.stringify(bookingData),
  });
}

// get user bookings
export async function getUserBookings(email) {
  const searchParams = new URLSearchParams();

  searchParams.set("email", email);

  return authFetch(
    `/bookings/user?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );
}

// get vendor bookings
export async function getVendorBookings(email) {
  const searchParams = new URLSearchParams();

  searchParams.set("email", email);

  return authFetch(
    `/bookings/vendor?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );
}

// update booking status by vendor
export async function updateBookingStatus(id, status) {
  return authFetch(`/bookings/${id}/status`, {
    method: "PATCH",

    body: JSON.stringify({
      status,
    }),
  });
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================

// get admin dashboard stats
export async function getAdminDashboardStats() {
  return authFetch("/admin/dashboard-stats", {
    cache: "no-store",
  });
}

// ============================================================
// STRIPE CHECKOUT
// ============================================================

// checkout session
export async function createCheckoutSession(bookingId, userEmail) {
  const response = await fetch("/api/checkout_sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookingId,
      userEmail,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to create checkout session",
    );
  }

  return data;
}

// ============================================================
// PAYMENT
// ============================================================

// create payment
export async function createPayment(
  bookingId,
  userEmail,
) {
  return authFetch("/payments", {
    method: "POST",

    body: JSON.stringify({
      bookingId,
      userEmail,
    }),
  });
}

// get user payments
export async function getUserPayments(email) {
  const searchParams = new URLSearchParams();

  searchParams.set("email", email);

  return authFetch(
    `/payments/user?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );
}

// get vendor payments
export async function getVendorPayments(email) {
  return authFetch(
    `/payments/vendor?email=${encodeURIComponent(email)}`,
    {
      cache: "no-store",
    },
  );
}

// get admin payments
export async function getAdminPayments() {
  return authFetch("/payments/admin", {
    cache: "no-store",
  });
}

