import { createRequire } from "node:module";
import { PrismaClient } from "@prisma/client";

const require = createRequire(import.meta.url);
const { caseStudies } = require("../src/data/case-studies.ts");

const prisma = new PrismaClient();

async function seedOpsMockData() {
  console.log("Seeding admin ops mock data…");
  // Skip analytics / contacts / bookings / orders / forms demo rows so
  // admin dashboards reflect real site traffic and form submissions only.

  await prisma.adminUser.upsert({
    where: { email: "admin@expandova.com" },
    create: {
      name: "Super Admin",
      email: "admin@expandova.com",
      passwordHash: "managed-via-ADMIN_PASSWORD-env",
      role: "SUPER_ADMIN",
    },
    update: { role: "SUPER_ADMIN" },
  });

  console.log("Admin ops mock data ready.");
}

async function main() {
  console.log("Seeding case studies…");

  for (const study of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: study.slug },
      create: {
        slug: study.slug,
        client: study.client,
        industry: study.industry,
        headline: study.headline,
        summary: study.summary,
        image: study.image,
        imageAlt: study.imageAlt,
        stats: JSON.stringify(study.stats),
        challenge: study.challenge,
        approach: JSON.stringify(study.approach),
        outcome: study.outcome,
        quote: study.quote ?? null,
        quoteAuthor: study.quoteAuthor ?? null,
        status: "PUBLISHED",
        publishAt: new Date(),
      },
      update: {
        client: study.client,
        industry: study.industry,
        headline: study.headline,
        summary: study.summary,
        image: study.image,
        imageAlt: study.imageAlt,
        stats: JSON.stringify(study.stats),
        challenge: study.challenge,
        approach: JSON.stringify(study.approach),
        outcome: study.outcome,
        quote: study.quote ?? null,
        quoteAuthor: study.quoteAuthor ?? null,
        status: "PUBLISHED",
        publishAt: new Date(),
      },
    });
  }

  console.log(`Seeded ${caseStudies.length} case studies.`);
  await seedOpsMockData();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
