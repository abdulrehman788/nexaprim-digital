type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL_MS = 60_000;
let lastCleanup = Date.now();

function cleanupExpiredEntries(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) {
    return;
  }

  rateLimitStore.forEach((entry, key) => {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  });

  lastCleanup = now;
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  cleanupExpiredEntries(now);

  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true };
}

export function getClientIp(request: Request): string {
  // Prefer platform-provided IPs that proxies overwrite (harder to spoof).
  const vercel = request.headers.get("x-vercel-forwarded-for");
  if (vercel) {
    return vercel.split(",")[0]?.trim() || "unknown";
  }

  const cf = request.headers.get("cf-connecting-ip");
  if (cf?.trim()) return cf.trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp?.trim()) return realIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return "unknown";
}
