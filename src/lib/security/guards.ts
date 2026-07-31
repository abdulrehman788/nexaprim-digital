import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/admin-session";
import { isAllowedRequestOrigin } from "@/lib/security/origin";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

export function unauthorizedJson() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function forbiddenJson(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function tooManyRequestsJson(retryAfterSeconds?: number) {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: retryAfterSeconds
        ? { "Retry-After": String(retryAfterSeconds) }
        : undefined,
    },
  );
}

/** Defense-in-depth for admin API handlers (middleware already gates most routes). */
export async function assertAdminApi(): Promise<NextResponse | null> {
  try {
    await requireAdminSession();
    return null;
  } catch {
    return unauthorizedJson();
  }
}

/** Block cross-origin writes to public mutation endpoints. */
export function assertSameOrigin(request: Request): NextResponse | null {
  if (!isAllowedRequestOrigin(request)) {
    return forbiddenJson();
  }
  return null;
}

export function assertRateLimit(
  request: Request,
  keyPrefix: string,
  limit: number,
  windowMs: number,
): NextResponse | null {
  const ip = getClientIp(request);
  const result = checkRateLimit(`${keyPrefix}:${ip}`, limit, windowMs);
  if (!result.allowed) {
    return tooManyRequestsJson(result.retryAfterSeconds);
  }
  return null;
}

export function assertContentLength(
  request: Request,
  maxBytes: number,
): NextResponse | null {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }
  return null;
}
