import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const result = await prisma.analyticsSession.updateMany({
  where: {
    OR: [{ sessionId: { startsWith: "seed_" } }, { userAgent: "seed" }],
  },
  data: {
    lastSeenAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
});

console.log("Expired seed sessions from live window:", result.count);
await prisma.$disconnect();
