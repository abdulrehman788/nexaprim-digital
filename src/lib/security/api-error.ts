import { NextResponse } from "next/server";
import { ZodError } from "zod";

/** Safe client-facing messages — never leak Prisma/stack internals. */
export function adminApiErrorResponse(error: unknown, fallback = "Invalid request") {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Please check your form entries and try again." },
      { status: 400 },
    );
  }

  return NextResponse.json({ error: fallback }, { status: 400 });
}
