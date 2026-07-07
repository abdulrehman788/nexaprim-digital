import "server-only";

import { cookies } from "next/headers";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin-constants";
import { createAdminSessionToken, verifyAdminSessionToken } from "@/lib/admin-auth";

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdminSession(): Promise<void> {
  const authenticated = await getAdminSession();
  if (!authenticated) {
    throw new Error("UNAUTHORIZED");
  }
}

export async function adminSessionCookieOptions() {
  return {
    name: ADMIN_SESSION_COOKIE,
    value: await createAdminSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
