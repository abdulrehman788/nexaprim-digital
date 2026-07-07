import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/schemas/admin";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = blogPostSchema.parse(body);

    const publishAt = data.publishAt ? new Date(data.publishAt) : null;

    const post = await prisma.blogPost.create({
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
    revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
