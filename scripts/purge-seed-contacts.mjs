import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deletedContacts = await prisma.contactSubmission.deleteMany({
  where: {
    OR: [{ email: { endsWith: ".example" } }, { email: { endsWith: "@example.com" } }],
  },
});

const deletedBookings = await prisma.callBooking.deleteMany({
  where: {
    OR: [{ email: { endsWith: ".example" } }, { email: { endsWith: "@example.com" } }],
  },
});

console.log("Deleted seed contacts:", deletedContacts.count);
console.log("Deleted seed bookings:", deletedBookings.count);
await prisma.$disconnect();
