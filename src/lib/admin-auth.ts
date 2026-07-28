import "server-only";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin-constants";

export { ADMIN_SESSION_COOKIE };

/** Session lifetime — keep in sync with cookie maxAge in admin-session.ts */
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

const SESSION_VERSION = "v2";

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET must be set (min 16 characters)");
  }
  return secret;
}

function timingSafeEqualStrings(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function randomNonceHex(bytes = 16): string {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Signed, expiring session token.
 * Format: v2.<expiresAtMs>.<nonce>.<hmac>
 * Each login issues a unique token; stolen cookies expire with the TTL.
 */
export async function createAdminSessionToken(): Promise<string> {
  const expiresAt = Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000;
  const nonce = randomNonceHex();
  const payload = `${SESSION_VERSION}.${expiresAt}.${nonce}`;
  const signature = await hmacSha256Hex(getSessionSecret(), payload);
  return `${payload}.${signature}`;
}

export async function verifyAdminSessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length !== 4) return false;

    const [version, expiresAtRaw, nonce, signature] = parts;
    if (version !== SESSION_VERSION || !expiresAtRaw || !nonce || !signature) {
      return false;
    }

    if (!/^\d+$/.test(expiresAtRaw) || !/^[a-f0-9]+$/i.test(nonce)) {
      return false;
    }

    const expiresAt = Number(expiresAtRaw);
    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
      return false;
    }

    const payload = `${version}.${expiresAtRaw}.${nonce}`;
    const expected = await hmacSha256Hex(getSessionSecret(), payload);
    return timingSafeEqualStrings(signature, expected);
  } catch {
    return false;
  }
}

/** Edge-compatible alias used by middleware. */
export const verifyAdminSessionTokenEdge = verifyAdminSessionToken;

/**
 * Compare password digests so differing lengths do not short-circuit timing.
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  try {
    const secret = getSessionSecret();
    const [providedDigest, expectedDigest] = await Promise.all([
      hmacSha256Hex(secret, `admin-password:${password}`),
      hmacSha256Hex(secret, `admin-password:${expected}`),
    ]);
    return timingSafeEqualStrings(providedDigest, expectedDigest);
  } catch {
    return false;
  }
}
