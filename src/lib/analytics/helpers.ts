import "server-only";

export function parseUserAgent(ua: string | null | undefined): {
  device: string;
  browser: string;
} {
  const value = ua ?? "";
  const device = /mobile|android|iphone|ipad/i.test(value)
    ? /ipad|tablet/i.test(value)
      ? "tablet"
      : "mobile"
    : /tablet/i.test(value)
      ? "tablet"
      : "desktop";

  let browser = "Other";
  if (/edg\//i.test(value)) browser = "Edge";
  else if (/chrome\//i.test(value) && !/edg\//i.test(value)) browser = "Chrome";
  else if (/safari\//i.test(value) && !/chrome\//i.test(value)) browser = "Safari";
  else if (/firefox\//i.test(value)) browser = "Firefox";

  return { device, browser };
}

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  UK: "United Kingdom",
  PK: "Pakistan",
  CA: "Canada",
  AE: "United Arab Emirates",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  IN: "India",
  SA: "Saudi Arabia",
  SG: "Singapore",
};

/** Best-effort geo from Cloudflare / Vercel headers, else unknown. */
export function geoFromHeaders(headers: Headers): {
  country: string | null;
  countryCode: string | null;
  city: string | null;
} {
  const countryCodeRaw =
    headers.get("cf-ipcountry") ||
    headers.get("x-vercel-ip-country") ||
    headers.get("x-country-code");
  const countryCode =
    countryCodeRaw && countryCodeRaw !== "XX" ? countryCodeRaw.toUpperCase() : null;
  const city = headers.get("x-vercel-ip-city") || headers.get("cf-ipcity");

  return {
    countryCode,
    country: countryCode ? COUNTRY_NAMES[countryCode] ?? countryCode : null,
    city: city ? decodeURIComponent(city) : null,
  };
}

export function clientIpFromHeaders(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return headers.get("x-real-ip");
}

/** Local calendar date YYYY-MM-DD. */
export function toDateKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Seed / mock traffic must never appear in live or dashboard totals. */
export function isSeedAnalyticsSession(row: {
  sessionId?: string | null;
  userAgent?: string | null;
}): boolean {
  const sid = row.sessionId ?? "";
  const ua = row.userAgent ?? "";
  return sid.startsWith("seed_") || ua === "seed";
}

export const realAnalyticsSessionWhere = {
  NOT: {
    OR: [{ sessionId: { startsWith: "seed_" } }, { userAgent: "seed" }],
  },
};
