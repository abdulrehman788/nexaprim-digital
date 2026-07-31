import { NextResponse } from "next/server";
import { z } from "zod";

import {
  clientIpFromHeaders,
  geoFromHeaders,
  parseUserAgent,
} from "@/lib/analytics/helpers";
import { bumpDailyRollup } from "@/lib/analytics/rollup";
import { prisma } from "@/lib/prisma";
import { assertRateLimit, assertSameOrigin } from "@/lib/security/guards";

export const dynamic = "force-dynamic";

const trackSchema = z.object({
  sessionId: z.string().trim().min(8).max(80),
  pageUrl: z.string().trim().min(1).max(500),
  referrer: z.string().trim().max(500).optional().nullable(),
});

export async function POST(request: Request) {
  const originBlocked = assertSameOrigin(request);
  if (originBlocked) return originBlocked;

  const limited = assertRateLimit(request, "analytics-track", 120, 60_000);
  if (limited) return limited;

  try {
    const body = trackSchema.parse(await request.json());
    const ua = request.headers.get("user-agent");
    const { device, browser } = parseUserAgent(ua);
    const geo = geoFromHeaders(request.headers);
    const ip = clientIpFromHeaders(request.headers);

    const existing = await prisma.analyticsSession.findFirst({
      where: { sessionId: body.sessionId },
      orderBy: { startedAt: "asc" },
      select: { id: true },
    });

    await prisma.analyticsSession.create({
      data: {
        sessionId: body.sessionId,
        ip,
        country: geo.country,
        countryCode: geo.countryCode,
        city: geo.city,
        device,
        browser,
        userAgent: ua?.slice(0, 500) ?? null,
        pageUrl: body.pageUrl.slice(0, 500),
        referrer: body.referrer?.slice(0, 500) ?? null,
      },
    });

    await bumpDailyRollup({
      sessions: existing ? 0 : 1,
      pageViews: 1,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
