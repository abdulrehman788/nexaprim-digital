import { NextResponse } from "next/server";
import { z } from "zod";

import { writeAuditLog } from "@/lib/admin/audit";
import { getPaymentGateway } from "@/lib/payments/gateway";
import { prisma } from "@/lib/prisma";
import { adminApiErrorResponse, safeJsonParse } from "@/lib/security/api-error";
import { assertAdminApi } from "@/lib/security/guards";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  status: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]).optional(),
  verify: z.boolean().optional(),
});

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  const item = await prisma.order.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    ...item,
    items: safeJsonParse(item.items, []),
    gatewayMeta: safeJsonParse(item.gatewayMeta, null),
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  try {
    const body = patchSchema.parse(await request.json());
    const existing = await prisma.order.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    let status = body.status;
    let gatewayMeta = existing.gatewayMeta;

    if (body.verify) {
      if (!existing.gatewayTxnId) {
        return NextResponse.json(
          { error: "Order has no gateway transaction to verify." },
          { status: 400 },
        );
      }
      const gateway = getPaymentGateway();
      const result = await gateway.verifyPayment({ gatewayTxnId: existing.gatewayTxnId });
      status = result.status;
      gatewayMeta = JSON.stringify(result.raw ?? { verified: true });
    }

    if (!status && !body.verify) {
      return NextResponse.json({ error: "No updates provided." }, { status: 400 });
    }

    const item = await prisma.order.update({
      where: { id: params.id },
      data: {
        ...(status ? { status } : {}),
        ...(gatewayMeta ? { gatewayMeta } : {}),
      },
    });

    await writeAuditLog({
      action: "order.update",
      targetType: "order",
      targetId: item.id,
      meta: body,
    });

    return NextResponse.json(item);
  } catch (error) {
    return adminApiErrorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  try {
    const existing = await prisma.order.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.order.delete({ where: { id: params.id } });
    await writeAuditLog({
      action: "order.delete",
      targetType: "order",
      targetId: params.id,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return adminApiErrorResponse(error, "Unable to delete order");
  }
}
