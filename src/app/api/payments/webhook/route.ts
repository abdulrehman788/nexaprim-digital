import { NextResponse } from "next/server";

import { writeAuditLog } from "@/lib/admin/audit";
import { getPaymentGateway } from "@/lib/payments/gateway";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { timingSafeEqualStrings } from "@/lib/security/timing";

export const dynamic = "force-dynamic";

function verifyWebhookSecret(request: Request): boolean {
  const expected = process.env.PAYMENT_WEBHOOK_SECRET?.trim();
  if (!expected) {
    // In production a secret is required; in development allow mock unsigned webhooks.
    return process.env.NODE_ENV !== "production";
  }

  const provided =
    request.headers.get("x-webhook-secret")?.trim() ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ||
    "";

  if (!provided) return false;
  return timingSafeEqualStrings(provided, expected);
}

/**
 * Payment gateway webhook entrypoint.
 * Plug Stripe/JazzCash/etc. into PaymentGateway.handleWebhook — UI/schema stay unchanged.
 */
export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rate = checkRateLimit(`payments-webhook:${clientIp}`, 60, 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!verifyWebhookSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const gateway = getPaymentGateway();

    // Never accept unsigned mock status flips in production.
    if (process.env.NODE_ENV === "production" && gateway.name === "mock") {
      return NextResponse.json(
        { error: "Mock payment gateway is disabled in production" },
        { status: 503 },
      );
    }

    const payload = await request.json().catch(() => null);
    const result = await gateway.handleWebhook(payload, request.headers);

    if (!result) {
      return NextResponse.json({ ok: true, handled: false });
    }

    const order = result.orderNumber
      ? await prisma.order.findUnique({ where: { orderNumber: result.orderNumber } })
      : await prisma.order.findFirst({ where: { gatewayTxnId: result.gatewayTxnId } });

    if (!order) {
      return NextResponse.json({ ok: true, handled: false, reason: "order_not_found" });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: result.status,
        gatewayTxnId: result.gatewayTxnId,
        gatewayMeta: JSON.stringify({ webhook: payload }),
      },
    });
    await writeAuditLog({
      action: "order.webhook_update",
      targetType: "order",
      targetId: order.id,
      meta: { status: result.status, gateway: gateway.name },
    });

    return NextResponse.json({ ok: true, handled: true, orderNumber: order.orderNumber });
  } catch {
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 400 });
  }
}
