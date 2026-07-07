import { notFound } from "next/navigation";
import { FileText } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
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
    <div>
      <AdminPageHeader
        eyebrow="Blog"
        title="Edit blog post"
        icon={FileText}
        description={post.title}
        back={{ label: "Blog posts", href: "/admin/blog" }}
      />
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
    </div>
  );
}
