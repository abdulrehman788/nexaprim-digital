import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticle } from "@/components/sections/blog/BlogArticle";
import { getAllBlogSlugs, getPublishedBlogPostBySlug } from "@/lib/content/blog";
import { generatePageMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPublishedBlogPostBySlug(params.slug);

  if (!post) {
    return generatePageMetadata({ title: "Post Not Found", path: "/blog", noIndex: true });
  }

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPublishedBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-white">
      <BlogArticle post={post} />
    </main>
  );
}
