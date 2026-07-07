import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { getPublishedBlogPosts } from "@/lib/content/blog";
import { sectionLight, sectionPadding } from "@/lib/section-surfaces";
import type { BlogPostPublic } from "@/lib/content/blog";
import { cn } from "@/lib/utils";

function BlogCard({ post }: { post: BlogPostPublic }) {
  const date = post.publishAt
    ? new Date(post.publishAt).toLocaleDateString(undefined, { dateStyle: "long" })
    : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-accent/30 hover:shadow-md">
      {post.coverImage ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <OptimizedImage
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {date ? <time className="text-xs text-slate-500">{date}</time> : null}
        <h2 className="mt-2 font-display text-lg font-bold text-slate-900 group-hover:text-accent">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 text-sm font-semibold text-accent hover:underline"
        >
          Read article →
        </Link>
      </div>
    </article>
  );
}

export async function BlogGrid() {
  const posts = await getPublishedBlogPosts();

  if (posts.length === 0) {
    return (
      <section className={cn(sectionLight, sectionPadding)}>
        <Container className="text-center">
          <p className="text-slate-600">New articles coming soon.</p>
        </Container>
      </section>
    );
  }

  return (
    <section className={cn(sectionLight, sectionPadding, "pb-16")}>
      <Container>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
