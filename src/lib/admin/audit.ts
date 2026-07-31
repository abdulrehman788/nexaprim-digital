import "server-only";

import { prisma } from "@/lib/prisma";

export async function writeAuditLog(input: {
  adminEmail?: string | null;
  action: string;
  targetType?: string;
  targetId?: string;
  meta?: Record<string, unknown>;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        adminEmail: input.adminEmail ?? null,
        action: input.action,
        targetType: input.targetType ?? null,
        targetId: input.targetId ?? null,
        meta: input.meta ? JSON.stringify(input.meta) : null,
      },
    });
  } catch {
    // Never break the main request if audit write fails
  }
}
