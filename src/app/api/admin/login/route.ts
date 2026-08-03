import { NextResponse } from "next/server";

import { verifyAdminPassword } from "@/lib/admin-auth";
import { adminSessionCookieOptions } from "@/lib/admin-session";
import { loginSchema } from "@/lib/schemas/admin";
import { assertProductionSecrets } from "@/lib/security/env";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

// Brute-force protection: the admin is a single shared password, so cap guesses.
const LOGIN_RATE_LIMIT = 5;
const LOGIN_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  // Login is protected by password + rate limit. Origin checks here break on
  // reverse proxies / www mismatch / privacy browsers (Origin: null) and block
  // legitimate admins. CSRF matters more after a session cookie exists.
  try {
    assertProductionSecrets();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Admin authentication is misconfigured." },
      { status: 503 },
    );
  }

  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(
    `admin-login:${clientIp}`,
    LOGIN_RATE_LIMIT,
    LOGIN_RATE_LIMIT_WINDOW_MS,
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: rateLimit.retryAfterSeconds
          ? { "Retry-After": String(rateLimit.retryAfterSeconds) }
          : undefined,
      },
    );
  }

  try {
    const body = await request.json();
    const { password } = loginSchema.parse(body);

    if (!(await verifyAdminPassword(password))) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const cookie = await adminSessionCookieOptions();
    const response = NextResponse.json({ success: true });
    response.cookies.set(cookie);
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
