import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { caseStudySchema } from "@/lib/schemas/admin";

export async function GET() {
  const stories = await prisma.caseStudy.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });
  return NextResponse.json(stories);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = caseStudySchema.parse(body);
    const publishAt = data.publishAt ? new Date(data.publishAt) : null;

    const story = await prisma.caseStudy.create({
      data: {
        slug: data.slug,
        client: data.client,
        industry: data.industry,
        headline: data.headline,
        summary: data.summary,
        image: data.image,
        imageAlt: data.imageAlt,
        stats: JSON.stringify(data.stats),
        challenge: data.challenge,
        approach: JSON.stringify(data.approach),
        outcome: data.outcome,
        quote: data.quote || null,
        quoteAuthor: data.quoteAuthor || null,
        status: data.status,
        publishAt,
      },
    });

    revalidatePath("/case-studies");
    revalidatePath(`/case-studies/${story.slug}`);

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
