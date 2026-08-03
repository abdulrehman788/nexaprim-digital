import { siteConfig } from "@/lib/constants";

function getAllowedOrigins(): Set<string> {
  const origins = new Set<string>();

  try {
    origins.add(new URL(siteConfig.url).origin);
  } catch {
    // Ignore invalid configured site URL.
  }

  if (process.env.NODE_ENV === "development") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }

  return origins;
}

function isLocalDevHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname === "::1"
  );
}

/**
 * Allow same-origin admin POSTs. In development, also allow any localhost /
 * loopback port and LAN hosts that match the request Host header (phone testing).
 */
export function isAllowedRequestOrigin(request: Request): boolean {
  const allowedOrigins = getAllowedOrigins();
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (origin) {
    if (allowedOrigins.has(origin)) return true;

    if (process.env.NODE_ENV === "development") {
      try {
        const originUrl = new URL(origin);
        if (isLocalDevHost(originUrl.hostname)) return true;
        if (host && originUrl.host === host) return true;
      } catch {
        return false;
      }
    }

    return false;
  }

  const referer = request.headers.get("referer");

  if (!referer) {
    return process.env.NODE_ENV === "development";
  }

  try {
    const refererUrl = new URL(referer);
    if (allowedOrigins.has(refererUrl.origin)) return true;

    if (process.env.NODE_ENV === "development") {
      if (isLocalDevHost(refererUrl.hostname)) return true;
      if (host && refererUrl.host === host) return true;
    }

    return false;
  } catch {
    return false;
  }
}
