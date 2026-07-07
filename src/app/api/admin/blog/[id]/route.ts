import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/schemas/admin";

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const existing = await prisma.blogPost.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await request.json();
    const data = blogPostSchema.parse(body);
    const publishAt = data.publishAt ? new Date(data.publishAt) : null;

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || null,
        coverImageAlt: data.coverImageAlt || null,
        author: data.author ?? "NexaPrime Digital",
        tags: JSON.stringify(data.tags ?? []),
        status: data.status,
        publishAt,
      },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
    revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json(post);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const existing = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.blogPost.delete({ where: { id: params.id } });

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);

  return NextResponse.json({ success: true });
}
