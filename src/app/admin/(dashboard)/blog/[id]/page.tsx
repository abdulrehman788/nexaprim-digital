import { notFound } from "next/navigation";

import { BlogEditorForm } from "@/components/admin/BlogEditorForm";
import { parseContentStatus, parseJsonArray } from "@/lib/content/utils";
import { prisma } from "@/lib/prisma";

interface EditBlogPageProps {
  params: { id: string };
}

export default async function EditBlogPostPage({ params }: EditBlogPageProps) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <BlogEditorForm
      initial={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage ?? "",
        coverImageAlt: post.coverImageAlt ?? "",
        author: post.author,
        tags: parseJsonArray<string>(post.tags),
        status: parseContentStatus(post.status),
        publishAt: post.publishAt?.toISOString() ?? null,
      }}
    />
  );
}
