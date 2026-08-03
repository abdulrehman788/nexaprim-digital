import { siteConfig } from "@/lib/constants";

function tryUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function normalizeHost(host: string | null | undefined): string | null {
  if (!host) return null;
  const first = host.split(",")[0]?.trim().toLowerCase();
  if (!first) return null;
  // Strip default ports so https://x.com:443 matches x.com
  return first.replace(/:443$/, "").replace(/:80$/, "");
}

function hostnameOnly(host: string): string {
  return host.replace(/:\d+$/, "");
}

function withWwwHostnames(hostname: string): string[] {
  if (hostname.startsWith("www.")) {
    return [hostname, hostname.slice(4)];
  }
  return [hostname, `www.${hostname}`];
}

function getAllowedHostnames(): Set<string> {
  const hosts = new Set<string>();

  const addHostname = (hostname: string | null | undefined) => {
    if (!hostname) return;
    const clean = hostnameOnly(hostname.toLowerCase());
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

function requestHosts(request: Request): string[] {
  const values = [
    request.headers.get("x-forwarded-host"),
    request.headers.get("host"),
  ];
  const hosts: string[] = [];
  for (const value of values) {
    const normalized = normalizeHost(value);
    if (normalized) hosts.push(normalized);
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

function isTrustedHostname(hostname: string, request: Request): boolean {
  const clean = hostnameOnly(hostname.toLowerCase());
  const allowed = getAllowedHostnames();

  if (allowed.has(clean)) return true;

  // True same-origin behind reverse proxies: match any request Host /
  // X-Forwarded-Host (including www variants of those hosts).
  for (const host of requestHosts(request)) {
    const requestHostname = hostnameOnly(host);
    for (const variant of withWwwHostnames(requestHostname)) {
      if (variant === clean) return true;
    }
  }

  if (process.env.NODE_ENV === "development" && isLocalDevHost(clean)) {
    return true;
  }

  return false;
}

/**
 * CSRF guard for state-changing API routes.
 * Trusts configured site hosts (www + apex), Vercel URL, ALLOWED_ORIGINS,
 * and the request's own Host / X-Forwarded-Host.
 */
export function isAllowedRequestOrigin(request: Request): boolean {
  const originHeader = request.headers.get("origin");

  if (originHeader && originHeader.toLowerCase() !== "null") {
    const originUrl = tryUrl(originHeader);
    if (!originUrl) return false;
    return isTrustedHostname(originUrl.hostname, request);
  }

  const referer = request.headers.get("referer");
  if (!referer) {
    // Same-origin fetch usually sends Origin; missing both is only OK in dev.
    return process.env.NODE_ENV === "development";
  }

  const refererUrl = tryUrl(referer);
  if (!refererUrl) return false;
  return isTrustedHostname(refererUrl.hostname, request);
}
