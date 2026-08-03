import { NextResponse } from "next/server";
import { z } from "zod";

import { writeAuditLog } from "@/lib/admin/audit";
import { prisma } from "@/lib/prisma";
import { adminApiErrorResponse } from "@/lib/security/api-error";
import { assertAdminApi } from "@/lib/security/guards";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]).optional(),
  notes: z.string().max(2000).optional().nullable(),
});

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  const item = await prisma.callBooking.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  try {
    const existing = await prisma.callBooking.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const data = patchSchema.parse(await request.json());
    const item = await prisma.callBooking.update({
      where: { id: params.id },
      data,
    });
    await writeAuditLog({
      action: "booking.update",
      targetType: "booking",
      targetId: item.id,
      meta: data,
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
    const existing = await prisma.callBooking.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.callBooking.delete({ where: { id: params.id } });
    await writeAuditLog({
      action: "booking.delete",
      targetType: "booking",
      targetId: params.id,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return adminApiErrorResponse(error, "Unable to delete booking");
  }
}
