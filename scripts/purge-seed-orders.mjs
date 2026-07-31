import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleted = await prisma.order.deleteMany({
  where: {
    OR: [
      { gatewayTxnId: { startsWith: "mock_seed_" } },
      { email: { contains: ".example" } },
      { orderNumber: { in: ["ORD-00001", "ORD-00002", "ORD-00003"] } },
    ],
  },
});

console.log("Deleted seed orders:", deleted.count);
await prisma.$disconnect();
