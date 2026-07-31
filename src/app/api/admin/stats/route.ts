import { NextResponse } from "next/server";

import { countLiveVisitors } from "@/lib/analytics/rollup";
import { prisma } from "@/lib/prisma";
import { assertAdminApi } from "@/lib/security/guards";

export const dynamic = "force-dynamic";

const seedEmailNoise = {
  NOT: {
    OR: [{ email: { endsWith: ".example" } }, { email: { endsWith: "@example.com" } }],
  },
};

const seedOrderNoise = {
  NOT: {
    OR: [
      { gatewayTxnId: { startsWith: "mock_seed_" } },
      { email: { endsWith: ".example" } },
      { email: { endsWith: "@example.com" } },
    ],
  },
};

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function GET() {
  const denied = await assertAdminApi();
  if (denied) return denied;

  try {
    const today = startOfToday();
    const week = daysAgo(7);
    const month = daysAgo(30);
    const live = await countLiveVisitors();

    const [
      sessionsTodayRows,
      pageViewsToday,
      unreadContacts,
      pendingBookings,
      ordersToday,
      revenuePaid,
      pendingOrders,
      failedOrders,
      contactsWeek,
      bookingsWeek,
      ordersWeek,
      ordersMonth,
      blogDrafts,
      blogPublished,
    ] = await Promise.all([
      prisma.analyticsSession.findMany({
        where: {
          startedAt: { gte: today },
          NOT: {
            OR: [{ sessionId: { startsWith: "seed_" } }, { userAgent: "seed" }],
          },
        },
        select: { sessionId: true },
        distinct: ["sessionId"],
      }),
      prisma.analyticsSession.count({
        where: {
          startedAt: { gte: today },
          NOT: {
            OR: [{ sessionId: { startsWith: "seed_" } }, { userAgent: "seed" }],
          },
        },
      }),
      prisma.contactSubmission.count({
        where: { ...seedEmailNoise, isRead: false },
      }),
      prisma.callBooking.count({
        where: { ...seedEmailNoise, status: "PENDING" },
      }),
      prisma.order.count({
        where: { ...seedOrderNoise, createdAt: { gte: today } },
      }),
      prisma.order.aggregate({
        where: { ...seedOrderNoise, status: "PAID", createdAt: { gte: month } },
        _sum: { amount: true },
      }),
      prisma.order.count({
        where: { ...seedOrderNoise, status: "PENDING" },
      }),
      prisma.order.count({
        where: { ...seedOrderNoise, status: "FAILED" },
      }),
      prisma.contactSubmission.count({
        where: { ...seedEmailNoise, createdAt: { gte: week } },
      }),
      prisma.callBooking.count({
        where: { ...seedEmailNoise, createdAt: { gte: week } },
      }),
      prisma.order.count({
        where: { ...seedOrderNoise, createdAt: { gte: week } },
      }),
      prisma.order.count({
        where: { ...seedOrderNoise, createdAt: { gte: month } },
      }),
      prisma.blogPost.count({ where: { status: "DRAFT" } }),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    ]);

    return NextResponse.json({
      liveVisitors: live.length,
      livePages: live.slice(0, 20),
      sessionsToday: sessionsTodayRows.length,
      pageViewsToday,
      unreadContacts,
      pendingBookings,
      ordersToday,
      ordersWeek,
      ordersMonth,
      revenueMonth: revenuePaid._sum.amount ?? 0,
      pendingOrders,
      failedOrders,
      contactsWeek,
      bookingsWeek,
      blogDrafts,
      blogPublished,
      notifications: {
        contacts: unreadContacts,
        bookings: pendingBookings,
        orders: pendingOrders,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load stats" }, { status: 500 });
  }
}
