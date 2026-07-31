import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Remove seeded analytics noise so dashboards show real traffic only. */
const deletedSessions = await prisma.analyticsSession.deleteMany({
  where: {
    OR: [{ sessionId: { startsWith: "seed_" } }, { userAgent: "seed" }],
  },
});

const deletedDaily = await prisma.analyticsDaily.deleteMany({});

console.log("Deleted seed sessions:", deletedSessions.count);
console.log("Cleared daily rollups:", deletedDaily.count);

await prisma.$disconnect();
