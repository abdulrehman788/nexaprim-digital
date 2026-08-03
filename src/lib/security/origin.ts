import { siteConfig } from "@/lib/constants";

function tryOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function withWwwVariant(origin: string): string[] {
  try {
    const url = new URL(origin);
    const { protocol, hostname, port } = url;
    const hostWithPort = port ? `${hostname}:${port}` : hostname;

    if (hostname.startsWith("www.")) {
      const apex = hostname.slice(4);
      const apexHost = port ? `${apex}:${port}` : apex;
      return [origin, `${protocol}//${apexHost}`];
    }

    return [origin, `${protocol}//www.${hostWithPort}`];
  } catch {
    return [origin];
  }
}

function getAllowedOrigins(): Set<string> {
  const origins = new Set<string>();

  const configured = tryOrigin(siteConfig.url);
  if (configured) {
    for (const variant of withWwwVariant(configured)) {
      origins.add(variant);
    }
  }

  // Vercel preview / production deployment URL
  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    const vercelOrigin = tryOrigin(
      vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`,
    );
    if (vercelOrigin) origins.add(vercelOrigin);
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

function requestHost(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-host");
  if (forwarded) {
    // First value if a proxy chain is present
    return forwarded.split(",")[0]?.trim().toLowerCase() || null;
  }
  return request.headers.get("host")?.toLowerCase() ?? null;
}

/**
 * CSRF guard for state-changing API routes.
 * Allows true same-origin (Origin/Referer host === request Host) plus the
 * configured site URL (www + apex) and Vercel deployment host.
 */
export function isAllowedRequestOrigin(request: Request): boolean {
  const allowedOrigins = getAllowedOrigins();
  const originHeader = request.headers.get("origin");
  const host = requestHost(request);

  if (originHeader) {
    const origin = tryOrigin(originHeader);
    if (!origin) return false;

    // Same-origin POST — works for www, apex, previews, custom domains
    if (host) {
      try {
        if (new URL(origin).host.toLowerCase() === host) return true;
      } catch {
        return false;
      }
    }

    if (allowedOrigins.has(origin)) return true;

    if (process.env.NODE_ENV === "development") {
      try {
        const originUrl = new URL(origin);
        if (isLocalDevHost(originUrl.hostname)) return true;
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

  const refererOrigin = tryOrigin(referer);
  if (!refererOrigin) return false;

  if (host) {
    try {
      if (new URL(refererOrigin).host.toLowerCase() === host) return true;
    } catch {
      return false;
    }
  }

  if (allowedOrigins.has(refererOrigin)) return true;

  if (process.env.NODE_ENV === "development") {
    try {
      if (isLocalDevHost(new URL(refererOrigin).hostname)) return true;
    } catch {
      return false;
    }
  }

  return false;
}
