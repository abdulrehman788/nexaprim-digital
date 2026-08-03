import { NextResponse } from "next/server";

import { csvResponse, toCsv } from "@/lib/csv";
import { prisma } from "@/lib/prisma";
import { parsePagination } from "@/lib/security/api-error";
import { assertAdminApi } from "@/lib/security/guards";

export const dynamic = "force-dynamic";

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

    const where = {
      ...seedNoise,
      ...(status === "unread" ? { isRead: false } : {}),
      ...(status === "read" ? { isRead: true } : {}),
      ...(q
        ? {
            AND: [
              {
                OR: [
                  { name: { contains: q } },
                  { email: { contains: q } },
                  { message: { contains: q } },
                ],
              },
            ],
          }
        : {}),
    };

    if (exportCsv) {
      const rows = await prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 5000,
      });
      const csv = toCsv(
        ["Name", "Email", "Phone", "Company", "Intent", "Message", "Read", "Responded", "Submitted"],
        rows.map((r) => [
          r.name,
          r.email,
          r.phone,
          r.company,
          r.intent,
          r.message,
          r.isRead,
          r.responded,
          r.createdAt.toISOString(),
        ]),
      );
      return csvResponse("contact-submissions.csv", csv);
    }

    const [total, items, unreadTotal, openTotal] = await Promise.all([
      prisma.contactSubmission.count({ where }),
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.contactSubmission.count({
        where: { ...seedNoise, isRead: false },
      }),
      prisma.contactSubmission.count({
        where: { ...seedNoise, responded: false },
      }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
      stats: {
        unread: unreadTotal,
        open: openTotal,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load contacts" }, { status: 500 });
  }
}
