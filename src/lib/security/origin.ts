import { siteConfig } from "@/lib/constants";

function tryUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function hostnameOnly(host: string): string {
  return host.replace(/:\d+$/, "").toLowerCase();
}

function withWwwHostnames(hostname: string): string[] {
  if (hostname.startsWith("www.")) {
    return [hostname, hostname.slice(4)];
  }
  return [hostname, `www.${hostname}`];
}

/**
 * Explicit allowlist only — never trust request Host / X-Forwarded-Host
 * (those are attacker-controlled when not overwritten by a trusted proxy).
 */
function getAllowedHostnames(): Set<string> {
  const hosts = new Set<string>();

  const addHostname = (hostname: string | null | undefined) => {
    if (!hostname) return;
    const clean = hostnameOnly(hostname);
    for (const variant of withWwwHostnames(clean)) {
      hosts.add(variant);
    }
  };

  const configured = tryUrl(siteConfig.url);
  if (configured) addHostname(configured.hostname);

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    const vercel = tryUrl(vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`);
    if (vercel) addHostname(vercel.hostname);
  }

  // Optional comma-separated origins or hostnames, e.g.
  // ALLOWED_ORIGINS=https://www.expandova.com,staging.expandova.com
  const extra = process.env.ALLOWED_ORIGINS?.split(",") ?? [];
  for (const item of extra) {
    const trimmed = item.trim();
    if (!trimmed) continue;
    const asUrl = tryUrl(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    if (asUrl) addHostname(asUrl.hostname);
    else addHostname(trimmed);
  }

  if (process.env.NODE_ENV === "development") {
    hosts.add("localhost");
    hosts.add("127.0.0.1");
    hosts.add("::1");
  }

  return hosts;
}

function isLocalDevHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname === "::1"
  );
}

function isTrustedHostname(hostname: string): boolean {
  const clean = hostnameOnly(hostname);
  const allowed = getAllowedHostnames();
  if (allowed.has(clean)) return true;
  if (process.env.NODE_ENV === "development" && isLocalDevHost(clean)) return true;
  return false;
}

/**
 * CSRF guard for state-changing public/admin API routes.
 * Compares Origin/Referer hostname against an explicit env allowlist only.
 */
export function isAllowedRequestOrigin(request: Request): boolean {
  const originHeader = request.headers.get("origin");

  if (originHeader && originHeader.toLowerCase() !== "null") {
    const originUrl = tryUrl(originHeader);
    if (!originUrl) return false;
    return isTrustedHostname(originUrl.hostname);
  }

  const referer = request.headers.get("referer");
  if (!referer) {
    return process.env.NODE_ENV === "development";
  }

  const refererUrl = tryUrl(referer);
  if (!refererUrl) return false;
  return isTrustedHostname(refererUrl.hostname);
}
