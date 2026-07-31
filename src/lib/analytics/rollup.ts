import "server-only";

import { realAnalyticsSessionWhere, toDateKey } from "@/lib/analytics/helpers";
import { prisma } from "@/lib/prisma";

/** Bump daily rollup counters (kept for stats cards / future use). */
export async function bumpDailyRollup(opts: { sessions?: number; pageViews?: number; date?: Date }) {
  const date = toDateKey(opts.date ?? new Date());
  const sessions = opts.sessions ?? 0;
  const pageViews = opts.pageViews ?? 0;

  await prisma.analyticsDaily.upsert({
    where: { date },
    create: { date, sessions, pageViews },
    update: {
      sessions: { increment: sessions },
      pageViews: { increment: pageViews },
    },
  });
}

/** Sessions with a heartbeat within the last N seconds count as live. */
export const LIVE_VISITOR_WINDOW_MS = 60_000;

export async function countLiveVisitors() {
  const since = new Date(Date.now() - LIVE_VISITOR_WINDOW_MS);
  const rows = await prisma.analyticsSession.findMany({
    where: {
      lastSeenAt: { gte: since },
      ...realAnalyticsSessionWhere,
    },
    distinct: ["sessionId"],
    select: { sessionId: true, pageUrl: true, lastSeenAt: true, country: true },
    orderBy: { lastSeenAt: "desc" },
  });
  return rows;
}
