import { createRequire } from "node:module";
import { PrismaClient } from "@prisma/client";

const require = createRequire(import.meta.url);
const { caseStudies } = require("../src/data/case-studies.ts");

const prisma = new PrismaClient();

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
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
