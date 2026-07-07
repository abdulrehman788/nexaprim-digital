import type { BlogPost } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { isContentPublic, parseJsonArray } from "@/lib/content/utils";

export type BlogPostPublic = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  author: string;
  tags: string[];
  publishAt: Date | null;
};

function toPublic(post: BlogPost): BlogPostPublic {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    coverImageAlt: post.coverImageAlt,
    author: post.author,
    tags: parseJsonArray<string>(post.tags),
    publishAt: post.publishAt,
  };
}

export async function getPublishedBlogPosts(): Promise<BlogPostPublic[]> {
  const posts = await prisma.blogPost.findMany({
    where: {
      status: { in: ["PUBLISHED", "SCHEDULED"] },
    },
    orderBy: [{ publishAt: "desc" }, { createdAt: "desc" }],
  });

  return posts.filter((post) => isContentPublic(post.status, post.publishAt)).map(toPublic);
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostPublic | null> {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || !isContentPublic(post.status, post.publishAt)) return null;
  return toPublic(post);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => post.slug);
}

export async function listBlogPostsAdmin() {
  return prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });
}

export async function getBlogPostById(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}
