import { cache } from "react";
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

/** List/sidebar card — omits heavy markdown body. */
export type BlogPostSummary = Omit<BlogPostPublic, "content">;

const listSelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  coverImage: true,
  coverImageAlt: true,
  author: true,
  tags: true,
  publishAt: true,
  status: true,
  createdAt: true,
} as const;

function toSummary(post: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  author: string;
  tags: string;
  publishAt: Date | null;
}): BlogPostSummary {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    coverImageAlt: post.coverImageAlt,
    author: post.author,
    tags: parseJsonArray<string>(post.tags),
    publishAt: post.publishAt,
  };
}

function toPublic(post: BlogPost): BlogPostPublic {
  return {
    ...toSummary(post),
    content: post.content,
  };
}

function publicWhere() {
  const now = new Date();
  return {
    OR: [
      { status: "PUBLISHED" as const },
      { status: "SCHEDULED" as const, publishAt: { lte: now } },
    ],
  };
}

export async function getPublishedBlogPosts(): Promise<BlogPostSummary[]> {
  const posts = await prisma.blogPost.findMany({
    where: publicWhere(),
    orderBy: [{ publishAt: "desc" }, { createdAt: "desc" }],
    select: listSelect,
  });

  return posts
    .filter((post) => isContentPublic(post.status, post.publishAt))
    .map(toSummary);
}

export async function getLatestBlogPosts(
  limit = 5,
  excludeSlug?: string,
): Promise<BlogPostSummary[]> {
  const posts = await prisma.blogPost.findMany({
    where: {
      ...publicWhere(),
      ...(excludeSlug ? { slug: { not: excludeSlug } } : {}),
    },
    orderBy: [{ publishAt: "desc" }, { createdAt: "desc" }],
    take: limit,
    select: listSelect,
  });

  return posts
    .filter((post) => isContentPublic(post.status, post.publishAt))
    .map(toSummary);
}

export const getPublishedBlogPostBySlug = cache(
  async (slug: string): Promise<BlogPostPublic | null> => {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post || !isContentPublic(post.status, post.publishAt)) return null;
    return toPublic(post);
  },
);

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await prisma.blogPost.findMany({
    where: publicWhere(),
    select: { slug: true, status: true, publishAt: true },
    orderBy: [{ publishAt: "desc" }, { createdAt: "desc" }],
  });

  return posts
    .filter((post) => isContentPublic(post.status, post.publishAt))
    .map((post) => post.slug);
}

export async function listBlogPostsAdmin() {
  return prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });
}

export async function getBlogPostById(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}
