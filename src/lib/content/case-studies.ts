import type { CaseStudy as CaseStudyModel } from "@prisma/client";

import { caseStudies as staticCaseStudies } from "@/data/case-studies";
import { prisma } from "@/lib/prisma";
import { isContentPublic, parseJsonArray } from "@/lib/content/utils";
import type { CaseStudy, CaseStudyStat } from "@/types";

function dbToCaseStudy(record: CaseStudyModel): CaseStudy {
  return {
    id: record.slug,
    slug: record.slug,
    client: record.client,
    industry: record.industry,
    headline: record.headline,
    summary: record.summary,
    image: record.image,
    imageAlt: record.imageAlt,
    stats: parseJsonArray<CaseStudyStat>(record.stats),
    challenge: record.challenge,
    approach: parseJsonArray<string>(record.approach),
    outcome: record.outcome,
    quote: record.quote ?? undefined,
    quoteAuthor: record.quoteAuthor ?? undefined,
  };
}

async function getPublishedFromDb(): Promise<CaseStudy[]> {
  const records = await prisma.caseStudy.findMany({
    where: { status: { in: ["PUBLISHED", "SCHEDULED"] } },
    orderBy: [{ publishAt: "desc" }, { createdAt: "desc" }],
  });

  return records
    .filter((record) => isContentPublic(record.status, record.publishAt))
    .map(dbToCaseStudy);
}

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  try {
    const fromDb = await getPublishedFromDb();
    if (fromDb.length > 0) return fromDb;
  } catch {
    // Database not initialized — fall back to static content.
  }
  return staticCaseStudies;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const record = await prisma.caseStudy.findUnique({ where: { slug } });
    if (record && isContentPublic(record.status, record.publishAt)) {
      return dbToCaseStudy(record);
    }
  } catch {
    // fall through
  }
  return staticCaseStudies.find((study) => study.slug === slug) ?? null;
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const studies = await getPublishedCaseStudies();
  return studies.map((study) => study.slug);
}

export async function listCaseStudiesAdmin() {
  return prisma.caseStudy.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });
}

export async function getCaseStudyById(id: string) {
  return prisma.caseStudy.findUnique({ where: { id } });
}

/** Synchronous getter for static-only contexts (sitemap fallback). */
export function getStaticCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return staticCaseStudies.find((study) => study.slug === slug);
}

export { staticCaseStudies };
