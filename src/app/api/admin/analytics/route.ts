import { NextResponse } from "next/server";

import { realAnalyticsSessionWhere, toDateKey } from "@/lib/analytics/helpers";
import { countLiveVisitors } from "@/lib/analytics/rollup";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function parseRange(searchParams: URLSearchParams) {
  const preset = searchParams.get("range") ?? "7d";
  const customFrom = searchParams.get("from");
  const customTo = searchParams.get("to");

  const to = customTo && !Number.isNaN(Date.parse(customTo)) ? new Date(customTo) : new Date();
  to.setHours(23, 59, 59, 999);

  let from: Date;
  if (customFrom && !Number.isNaN(Date.parse(customFrom))) {
    from = new Date(customFrom);
  } else if (preset === "30d") {
    from = new Date();
    from.setDate(from.getDate() - 29);
  } else if (preset === "90d") {
    from = new Date();
    from.setDate(from.getDate() - 89);
  } else {
    from = new Date();
    from.setDate(from.getDate() - 6);
  }
  from.setHours(0, 0, 0, 0);

  return { from, to, preset };
}

function eachDateKey(from: Date, to: Date): string[] {
  const keys: string[] = [];
  const cursor = new Date(from);
  cursor.setHours(12, 0, 0, 0);
  const end = new Date(to);
  end.setHours(12, 0, 0, 0);
  while (cursor <= end) {
    keys.push(toDateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return keys;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { from, to, preset } = parseRange(searchParams);

    const [sessions, live] = await Promise.all([
      prisma.analyticsSession.findMany({
        where: {
          startedAt: { gte: from, lte: to },
          ...realAnalyticsSessionWhere,
        },
        select: {
          country: true,
          countryCode: true,
          device: true,
          browser: true,
          sessionId: true,
          startedAt: true,
        },
        orderBy: { startedAt: "asc" },
      }),
      countLiveVisitors(),
    ]);

    const byCountry = new Map<string, number>();
    const byDevice = new Map<string, number>();
    const byBrowser = new Map<string, number>();
    const uniqueSessions = new Set<string>();
    const dailySessions = new Map<string, Set<string>>();
    const dailyPageViews = new Map<string, number>();

    for (const key of eachDateKey(from, to)) {
      dailySessions.set(key, new Set());
      dailyPageViews.set(key, 0);
    }

    for (const row of sessions) {
      const day = toDateKey(row.startedAt);
      dailyPageViews.set(day, (dailyPageViews.get(day) ?? 0) + 1);
      const daySet = dailySessions.get(day) ?? new Set<string>();
      daySet.add(row.sessionId);
      dailySessions.set(day, daySet);

      if (uniqueSessions.has(row.sessionId)) continue;
      uniqueSessions.add(row.sessionId);

      const country = row.country || row.countryCode || "Unknown";
      byCountry.set(country, (byCountry.get(country) ?? 0) + 1);
      byDevice.set(row.device || "unknown", (byDevice.get(row.device || "unknown") ?? 0) + 1);
      byBrowser.set(row.browser || "Other", (byBrowser.get(row.browser || "Other") ?? 0) + 1);
    }

    const daily = eachDateKey(from, to).map((date) => ({
      date,
      sessions: dailySessions.get(date)?.size ?? 0,
      pageViews: dailyPageViews.get(date) ?? 0,
    }));

    const funnel = await prisma.formFunnelEvent.groupBy({
      by: ["formName", "event"],
      where: { createdAt: { gte: from, lte: to } },
      _count: { _all: true },
    });

    return NextResponse.json({
      range: { from: from.toISOString(), to: to.toISOString(), preset },
      daily,
      uniqueSessions: uniqueSessions.size,
      pageViews: sessions.length,
      countries: Array.from(byCountry.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      devices: Array.from(byDevice.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      browsers: Array.from(byBrowser.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      live: {
        count: live.length,
        visitors: live,
      },
      funnel,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load analytics" }, { status: 500 });
  }
}
