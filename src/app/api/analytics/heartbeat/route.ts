import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { assertRateLimit, assertSameOrigin } from "@/lib/security/guards";

export const dynamic = "force-dynamic";

const heartbeatSchema = z.object({
  sessionId: z.string().trim().min(8).max(80),
  pageUrl: z.string().trim().min(1).max(500).optional(),
});

export async function POST(request: Request) {
  const originBlocked = assertSameOrigin(request);
  if (originBlocked) return originBlocked;

  const limited = assertRateLimit(request, "analytics-hb", 180, 60_000);
  if (limited) return limited;

  try {
    const body = heartbeatSchema.parse(await request.json());
    const latest = await prisma.analyticsSession.findFirst({
      where: { sessionId: body.sessionId },
      orderBy: { lastSeenAt: "desc" },
    });

    if (!latest) {
      return NextResponse.json({ ok: true, created: false });
    }

    await prisma.analyticsSession.update({
      where: { id: latest.id },
      data: {
        lastSeenAt: new Date(),
        ...(body.pageUrl ? { pageUrl: body.pageUrl.slice(0, 500) } : {}),
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
