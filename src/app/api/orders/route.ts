import { NextResponse } from "next/server";
import { z } from "zod";

import { allocateOrderNumber } from "@/lib/payments/order-number";
import { getPaymentGateway } from "@/lib/payments/gateway";
import { prisma } from "@/lib/prisma";
import { isAllowedRequestOrigin } from "@/lib/security/origin";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { adminApiErrorResponse } from "@/lib/security/api-error";

export const dynamic = "force-dynamic";

const createOrderSchema = z.object({
  customerName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional(),
  amount: z.number().positive().max(1_000_000),
  currency: z.string().trim().min(3).max(3).optional(),
  items: z
    .array(
      z.object({
        name: z.string().max(200),
        quantity: z.number().int().positive().max(100).optional(),
        unitPrice: z.number().nonnegative().optional(),
      }),
    )
    .max(50)
    .optional(),
});

/** Public checkout kickoff — gateway-agnostic. */
export async function POST(request: Request) {
  if (!isAllowedRequestOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const clientIp = getClientIp(request);
  const rate = checkRateLimit(`orders:${clientIp}`, 10, 15 * 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = createOrderSchema.parse(await request.json());
    const currency = body.currency ?? "USD";
    const items = (body.items ?? []).map((item) => ({
      name: item.name,
      quantity: item.quantity ?? 1,
      unitPrice: item.unitPrice,
    }));

    if (items.length === 0 || !items.every((i) => i.unitPrice != null)) {
      return NextResponse.json(
        { error: "Order must include priced line items." },
        { status: 400 },
      );
    }

    const itemsTotal = items.reduce(
      (sum, item) => sum + (item.unitPrice as number) * item.quantity,
      0,
    );
    const delta = Math.abs(itemsTotal - body.amount);
    if (delta > 0.01) {
      return NextResponse.json(
        { error: "Order amount does not match line items." },
        { status: 400 },
      );
    }

    // Use server-computed total — never trust client amount alone.
    const amount = Math.round(itemsTotal * 100) / 100;

    const orderNumber = await allocateOrderNumber();
    const gateway = getPaymentGateway();

    const payment = await gateway.createPayment({
      orderNumber,
      amount,
      currency,
      customerEmail: body.email,
      customerName: body.customerName,
    });

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: body.customerName,
        email: body.email,
        phone: body.phone ?? null,
        amount,
        currency,
        status: payment.status,
        gatewayName: payment.gatewayName,
        gatewayTxnId: payment.gatewayTxnId,
        gatewayMeta: payment.raw ? JSON.stringify(payment.raw) : null,
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json(
      {
        order,
        checkoutUrl: payment.checkoutUrl,
      },
      { status: 201 },
    );
  } catch (error) {
    return adminApiErrorResponse(error, "Unable to create order");
  }
}
