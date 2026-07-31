import "server-only";

import { prisma } from "@/lib/prisma";

/** Allocate a unique order number without relying on count()+1. */
export async function allocateOrderNumber(): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const stamp = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    const orderNumber = `ORD-${stamp}${rand}`.slice(0, 16);
    const exists = await prisma.order.findUnique({
      where: { orderNumber },
      select: { id: true },
    });
    if (!exists) return orderNumber;
  }
  throw new Error("Unable to allocate order number");
}
