import { NextResponse } from "next/server";

import { csvResponse, toCsv } from "@/lib/csv";
import { prisma } from "@/lib/prisma";
import { parsePagination } from "@/lib/security/api-error";
import { assertAdminApi } from "@/lib/security/guards";

export const dynamic = "force-dynamic";

const BOOKING_STATUSES = new Set(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]);

const seedNoise = {
  NOT: {
    OR: [{ email: { endsWith: ".example" } }, { email: { endsWith: "@example.com" } }],
  },
};

export async function GET(request: Request) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const status = searchParams.get("status");
    const { page, pageSize, skip } = parsePagination(searchParams);
    const exportCsv = searchParams.get("export") === "csv";

    const statusFilter =
      status && status !== "all" && BOOKING_STATUSES.has(status) ? status : undefined;

    const where = {
      ...seedNoise,
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(q
        ? {
            AND: [
              {
                OR: [
                  { name: { contains: q } },
                  { email: { contains: q } },
                  { topic: { contains: q } },
                ],
              },
            ],
          }
        : {}),
    };

    if (exportCsv) {
      const rows = await prisma.callBooking.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 5000,
      });
      const csv = toCsv(
        [
          "Name",
          "Email",
          "Phone",
          "Preferred Date",
          "Preferred Time",
          "Timezone",
          "Topic",
          "Status",
          "Submitted",
        ],
        rows.map((r) => [
          r.name,
          r.email,
          r.phone,
          r.preferredDate,
          r.preferredTime,
          r.timezone,
          r.topic,
          r.status,
          r.createdAt.toISOString(),
        ]),
      );
      return csvResponse("call-bookings.csv", csv);
    }

    const [total, items, pending, confirmed, completed] = await Promise.all([
      prisma.callBooking.count({ where }),
      prisma.callBooking.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.callBooking.count({
        where: { ...seedNoise, status: "PENDING" },
      }),
      prisma.callBooking.count({
        where: { ...seedNoise, status: "CONFIRMED" },
      }),
      prisma.callBooking.count({
        where: { ...seedNoise, status: "COMPLETED" },
      }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
      stats: {
        pending,
        confirmed,
        completed,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load bookings" }, { status: 500 });
  }
}
