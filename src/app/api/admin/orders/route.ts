import { NextResponse } from "next/server";

import { csvResponse, toCsv } from "@/lib/csv";
import { prisma } from "@/lib/prisma";
import { parsePagination } from "@/lib/security/api-error";
import { assertAdminApi } from "@/lib/security/guards";

export const dynamic = "force-dynamic";

const ORDER_STATUSES = new Set(["PENDING", "PAID", "FAILED", "REFUNDED"]);

export async function GET(request: Request) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const status = searchParams.get("status");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const { page, pageSize, skip } = parsePagination(searchParams);
    const exportCsv = searchParams.get("export") === "csv";

    const statusFilter =
      status && status !== "all" && ORDER_STATUSES.has(status) ? status : undefined;

    const where = {
      // Never surface seeded demo commerce rows
      NOT: {
        OR: [
          { gatewayTxnId: { startsWith: "mock_seed_" } },
          { email: { endsWith: ".example" } },
        ],
      },
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(from || to
        ? {
            createdAt: {
              ...(from && !Number.isNaN(Date.parse(from)) ? { gte: new Date(from) } : {}),
              ...(to && !Number.isNaN(Date.parse(to)) ? { lte: new Date(to) } : {}),
            },
          }
        : {}),
      ...(q
        ? {
            AND: [
              {
                OR: [
                  { orderNumber: { contains: q } },
                  { customerName: { contains: q } },
                  { email: { contains: q } },
                ],
              },
            ],
          }
        : {}),
    };

    if (exportCsv) {
      const rows = await prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 5000,
      });
      const csv = toCsv(
        [
          "Order Number",
          "Customer",
          "Email",
          "Phone",
          "Amount",
          "Currency",
          "Status",
          "Gateway",
          "Txn ID",
          "Created",
        ],
        rows.map((r) => [
          r.orderNumber,
          r.customerName,
          r.email,
          r.phone,
          r.amount,
          r.currency,
          r.status,
          r.gatewayName,
          r.gatewayTxnId,
          r.createdAt.toISOString(),
        ]),
      );
      return csvResponse("orders.csv", csv);
    }

    const [total, items, paidSum, pendingCount, failedCount] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.order.aggregate({ where: { ...where, status: "PAID" }, _sum: { amount: true } }),
      prisma.order.count({ where: { ...where, status: "PENDING" } }),
      prisma.order.count({ where: { ...where, status: "FAILED" } }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
      stats: {
        revenue: paidSum._sum.amount ?? 0,
        pending: pendingCount,
        failed: failedCount,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load orders" }, { status: 500 });
  }
}
