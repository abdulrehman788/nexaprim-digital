import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

/** Safe client-facing messages — never leak Prisma/stack internals. */
export function adminApiErrorResponse(error: unknown, fallback = "Invalid request") {
  if (error instanceof ZodError) {
    const first = error.issues[0];
    const message = first?.message?.trim() || "Please check your form entries and try again.";
    return NextResponse.json(
      {
        error: message,
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Already exists" }, { status: 409 });
    }
  }

  if (error instanceof Error && error.message === "UNAUTHORIZED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.error("API error:", error);
  return NextResponse.json({ error: fallback }, { status: 500 });
}

export function parsePagination(searchParams: URLSearchParams, defaults = { page: 1, pageSize: 20 }) {
  const pageRaw = Number(searchParams.get("page"));
  const sizeRaw = Number(searchParams.get("pageSize"));
  const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.floor(pageRaw) : defaults.page;
  const pageSize = Number.isFinite(sizeRaw)
    ? Math.min(100, Math.max(1, Math.floor(sizeRaw)))
    : defaults.pageSize;
  return { page, pageSize, skip: (page - 1) * pageSize };
}

export function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function sanitizeDownloadFilename(name: string, fallback = "export.csv"): string {
  const cleaned = name.replace(/["\r\n\\/]+/g, "_").trim();
  return cleaned || fallback;
}
