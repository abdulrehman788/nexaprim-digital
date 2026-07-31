import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedDataFilter = {
  OR: [{ data: { contains: "@example.com" } }, { data: { contains: ".example\"" } }],
};

const deletedSubs = await prisma.formSubmission.deleteMany({
  where: seedDataFilter,
});

// Seed funnel rows had no sessionId; keep rows that look real if any exist with sessionId.
// Also wipe orphaned seed funnel counts for known demo forms when no real submissions remain.
const remaining = await prisma.formSubmission.count();
const deletedFunnel =
  remaining === 0
    ? await prisma.formFunnelEvent.deleteMany({})
    : await prisma.formFunnelEvent.deleteMany({
        where: { sessionId: null },
      });

const left = await prisma.formSubmission.findMany({ take: 10 });
console.log("Deleted seed form submissions:", deletedSubs.count);
console.log("Deleted funnel events:", deletedFunnel.count);
console.log(
  "Remaining submissions:",
  left.map((r) => ({ form: r.formName, data: r.data.slice(0, 100) })),
);
await prisma.$disconnect();
