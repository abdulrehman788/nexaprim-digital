import { NextResponse } from "next/server";

import { verifyAdminPassword } from "@/lib/admin-auth";
import { adminSessionCookieOptions } from "@/lib/admin-session";
import { loginSchema } from "@/lib/schemas/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = loginSchema.parse(body);

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const cookie = await adminSessionCookieOptions();
    const response = NextResponse.json({ success: true });
    response.cookies.set(cookie);
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
