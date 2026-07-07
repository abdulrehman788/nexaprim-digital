import "server-only";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin-constants";

export { ADMIN_SESSION_COOKIE };

const SESSION_PAYLOAD = "nexaprime-admin-v1";

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

export async function createAdminSessionToken(): Promise<string> {
  return hmacSha256Hex(getSessionSecret(), SESSION_PAYLOAD);
}

export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  try {
    const expected = await createAdminSessionToken();
    return timingSafeEqualStrings(token, expected);
  } catch {
    return false;
  }
}

/** Edge-compatible alias used by middleware. */
export const verifyAdminSessionTokenEdge = verifyAdminSessionToken;

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeEqualStrings(password, expected);
}
