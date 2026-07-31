import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { blogPostSchema, normalizeBlogPostInput } from "@/lib/schemas/admin";
import { adminApiErrorResponse } from "@/lib/security/api-error";
import { assertAdminApi } from "@/lib/security/guards";

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  try {
    const existing = await prisma.blogPost.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = (await request.json()) as Record<string, unknown>;
    const data = blogPostSchema.parse(normalizeBlogPostInput(body));
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
        author: data.author ?? "Expandova",
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
    return adminApiErrorResponse(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  const existing = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.blogPost.delete({ where: { id: params.id } });

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);

  return NextResponse.json({ success: true });
}
