import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionTokenEdge } from "@/lib/admin-auth";
import { getSafeAdminRedirect } from "@/lib/security/admin-redirect";
import { isAllowedRequestOrigin } from "@/lib/security/origin";

function forwardWithPathname(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminPage = isAdminRoute && !pathname.startsWith("/admin/login");
  const isAdminApi =
    pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login");

  if (!isAdminPage && !isAdminApi) {
    return forwardWithPathname(request);
  }

  // CSRF defense for cookie-authenticated admin mutations (and logout).
  const method = request.method.toUpperCase();
  if (
    isAdminApi &&
    method !== "GET" &&
    method !== "HEAD" &&
    method !== "OPTIONS" &&
    !isAllowedRequestOrigin(request)
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const authenticated = await verifyAdminSessionTokenEdge(token);

  if (authenticated) {
    return forwardWithPathname(request);
  }

  if (isAdminApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  const safeNext = getSafeAdminRedirect(pathname);
  if (safeNext !== "/admin") {
    loginUrl.searchParams.set("next", safeNext);
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
