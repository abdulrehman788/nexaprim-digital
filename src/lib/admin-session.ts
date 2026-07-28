import "server-only";

import { cookies } from "next/headers";

import {
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-constants";

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
    sameSite: "strict" as const,
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  };
}
