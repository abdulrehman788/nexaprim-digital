import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { caseStudySchema } from "@/lib/schemas/admin";

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const story = await prisma.caseStudy.findUnique({ where: { id: params.id } });
  if (!story) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(story);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const existing = await prisma.caseStudy.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await request.json();
    const data = caseStudySchema.parse(body);
    const publishAt = data.publishAt ? new Date(data.publishAt) : null;

    const story = await prisma.caseStudy.update({
      where: { id: params.id },
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
    revalidatePath(`/case-studies/${existing.slug}`);
    revalidatePath(`/case-studies/${story.slug}`);

    return NextResponse.json(story);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const existing = await prisma.caseStudy.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.caseStudy.delete({ where: { id: params.id } });

  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${existing.slug}`);

  return NextResponse.json({ success: true });
}
