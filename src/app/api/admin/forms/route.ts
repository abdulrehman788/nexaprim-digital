import { NextResponse } from "next/server";

import { csvResponse, toCsv } from "@/lib/csv";
import { prisma } from "@/lib/prisma";
import { parsePagination, safeJsonParse, sanitizeDownloadFilename } from "@/lib/security/api-error";
import { assertAdminApi } from "@/lib/security/guards";

export const dynamic = "force-dynamic";

/** Exclude demo seed payloads that used example.com emails. */
const seedNoise = {
  NOT: {
    OR: [{ data: { contains: "@example.com" } }, { data: { contains: ".example\"" } }],
  },
};

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function GET(request: Request) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  try {
    const { searchParams } = new URL(request.url);
    const formName = searchParams.get("form")?.trim();
    const { page, pageSize, skip } = parsePagination(searchParams);
    const exportCsv = searchParams.get("export") === "csv";

    if (!formName) {
      if (exportCsv) {
        return NextResponse.json(
          { error: "Provide ?form=name to export submissions." },
          { status: 400 },
        );
      }

      const week = daysAgo(7);

      const [grouped, totalAll, weekCount, funnel] = await Promise.all([
        prisma.formSubmission.groupBy({
          by: ["formName"],
          where: seedNoise,
          _count: { _all: true },
          _max: { createdAt: true },
        }),
        prisma.formSubmission.count({ where: seedNoise }),
        prisma.formSubmission.count({
          where: { ...seedNoise, createdAt: { gte: week } },
        }),
        prisma.formFunnelEvent.groupBy({
          by: ["formName", "event"],
          _count: { _all: true },
        }),
      ]);

      const forms = grouped
        .map((g) => ({
          formName: g.formName,
          count: g._count._all,
          lastSubmission: g._max.createdAt,
        }))
        .sort((a, b) => b.count - a.count);

      return NextResponse.json({
        forms,
        funnel,
        stats: {
          total: totalAll,
          forms: forms.length,
          week: weekCount,
        },
      });
    }

    const where = { ...seedNoise, formName };

    if (exportCsv) {
      const rows = await prisma.formSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 5000,
      });
      const csv = toCsv(
        ["Form", "Data", "Submitted"],
        rows.map((r) => [r.formName, r.data, r.createdAt.toISOString()]),
      );
      return csvResponse(sanitizeDownloadFilename(`${formName}-submissions.csv`), csv);
    }

    const [total, items] = await Promise.all([
      prisma.formSubmission.count({ where }),
      prisma.formSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
    ]);

    return NextResponse.json({
      formName,
      items: items.map((i) => ({
        ...i,
        data: safeJsonParse(i.data, {}),
      })),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load forms" }, { status: 500 });
  }
}
