import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const roleRoutes = {
  vendor: [
    "/dashboard/add-ticket",
    "/dashboard/my-tickets",
    "/dashboard/requested-bookings",
    "/dashboard/revenue",
  ],

  admin: [
    "/dashboard/manage-tickets",
    "/dashboard/manage-users",
    "/dashboard/advertise",
  ],
};

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;

  try {
    const session = await auth.api.getSession({
      headers: request.headers,
      query: {
        // Role changes should be reflected immediately.
        disableCookieCache: true,
      },
    });

    // Not logged in
    if (!session?.user) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set(
        "callbackUrl",
        pathname + request.nextUrl.search
      );

      return NextResponse.redirect(loginUrl);
    }

    const role = session.user.role || "user";

    // Check role-specific dashboard routes
    for (const [requiredRole, routes] of Object.entries(roleRoutes)) {
      const isProtectedRoute = routes.some(
        (route) =>
          pathname === route ||
          pathname.startsWith(`${route}/`)
      );

      if (isProtectedRoute && role !== requiredRole) {
        return NextResponse.redirect(
          new URL("/dashboard", request.url)
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Dashboard proxy error:", error);

    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      pathname + request.nextUrl.search
    );

    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

