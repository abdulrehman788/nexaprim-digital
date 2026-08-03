import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { blogPostSchema, normalizeBlogPostInput } from "@/lib/schemas/admin";
import { adminApiErrorResponse } from "@/lib/security/api-error";
import { assertAdminApi } from "@/lib/security/guards";

export async function GET() {
  const denied = await assertAdminApi();
  if (denied) return denied;

  const posts = await prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const data = blogPostSchema.parse(normalizeBlogPostInput(body));

    const publishAt = data.publishAt ? new Date(data.publishAt) : null;

    const post = await prisma.blogPost.create({
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
    revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return adminApiErrorResponse(error);
  }
}
