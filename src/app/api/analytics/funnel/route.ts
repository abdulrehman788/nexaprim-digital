import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { assertRateLimit, assertSameOrigin } from "@/lib/security/guards";

export const dynamic = "force-dynamic";

const funnelSchema = z.object({
  formName: z.string().trim().min(1).max(80),
  event: z.enum(["viewed", "started", "submitted"]),
  sessionId: z.string().trim().max(80).optional().nullable(),
  pageUrl: z.string().trim().max(500).optional().nullable(),
});

export async function POST(request: Request) {
  const originBlocked = assertSameOrigin(request);
  if (originBlocked) return originBlocked;

  const limited = assertRateLimit(request, "analytics-funnel", 60, 60_000);
  if (limited) return limited;

  try {
    const body = funnelSchema.parse(await request.json());
    await prisma.formFunnelEvent.create({
      data: {
        formName: body.formName,
        event: body.event,
        sessionId: body.sessionId ?? null,
        pageUrl: body.pageUrl ?? null,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
