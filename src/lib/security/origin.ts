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

export function isAllowedRequestOrigin(request: Request): boolean {
  const allowedOrigins = getAllowedOrigins();
  const origin = request.headers.get("origin");

  if (origin) {
    return allowedOrigins.has(origin);
  }

  const referer = request.headers.get("referer");

  if (!referer) {
    return process.env.NODE_ENV === "development";
  }

  try {
    return allowedOrigins.has(new URL(referer).origin);
  } catch {
    return false;
  }
}
