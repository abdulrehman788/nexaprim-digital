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

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "0");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();

  // Public write APIs: require same-origin to reduce cross-site abuse.
  const isPublicMutationApi =
    method !== "GET" &&
    method !== "HEAD" &&
    method !== "OPTIONS" &&
    (pathname.startsWith("/api/contact") ||
      pathname.startsWith("/api/orders") ||
      pathname.startsWith("/api/analytics/") ||
      pathname.startsWith("/api/payments/webhook"));

  if (isPublicMutationApi && pathname.startsWith("/api/analytics/")) {
    if (!isAllowedRequestOrigin(request)) {
      return withSecurityHeaders(NextResponse.json({ error: "Forbidden" }, { status: 403 }));
    }
    return withSecurityHeaders(forwardWithPathname(request));
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminPage = isAdminRoute && !pathname.startsWith("/admin/login");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminLoginApi = pathname.startsWith("/api/admin/login");
  const isAdminLogoutApi = pathname.startsWith("/api/admin/logout");
  const isProtectedAdminApi = isAdminApi && !isAdminLoginApi && !isAdminLogoutApi;

  if (!isAdminPage && !isAdminApi) {
    return forwardWithPathname(request);
  }

  // CSRF defense for cookie-authenticated admin mutations INCLUDING logout.
  if (
    isAdminApi &&
    !isAdminLoginApi &&
    method !== "GET" &&
    method !== "HEAD" &&
    method !== "OPTIONS" &&
    !isAllowedRequestOrigin(request)
  ) {
    return withSecurityHeaders(NextResponse.json({ error: "Forbidden" }, { status: 403 }));
  }

  // Logout only needs CSRF (handled above); always allow the handler to clear cookie.
  if (isAdminLogoutApi) {
    return withSecurityHeaders(forwardWithPathname(request));
  }

  if (isAdminLoginApi) {
    return withSecurityHeaders(forwardWithPathname(request));
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const authenticated = await verifyAdminSessionTokenEdge(token);

  if (authenticated) {
    return withSecurityHeaders(forwardWithPathname(request));
  }

  if (isProtectedAdminApi) {
    return withSecurityHeaders(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }

  const loginUrl = new URL("/admin/login", request.url);
  const safeNext = getSafeAdminRedirect(pathname);
  if (safeNext !== "/admin") {
    loginUrl.searchParams.set("next", safeNext);
  }
  return withSecurityHeaders(NextResponse.redirect(loginUrl));
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/analytics/:path*",
  ],
};
