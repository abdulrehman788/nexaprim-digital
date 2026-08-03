import Link from "next/link";

import { ContactFormWithIntent } from "@/components/forms/ContactFormWithIntent";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { BlogPostPublic } from "@/lib/content/blog";
import { lightBody, lightHeading, lightMuted } from "@/lib/section-surfaces";
import { cn } from "@/lib/utils";

type BlogSidebarProps = {
  posts: BlogPostPublic[];
};

export function BlogSidebar({ posts }: BlogSidebarProps) {
  return (
    <div className="space-y-8">
      <section
        aria-labelledby="blog-latest-heading"
        className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6"
      >
        <h2
          id="blog-latest-heading"
          className={cn("font-display text-lg font-bold tracking-tight", lightHeading)}
        >
          Latest posts
        </h2>
        <p className={cn("mt-1 text-sm", lightMuted)}>Fresh ideas from the Expandova desk.</p>

        {posts.length > 0 ? (
          <ul className="mt-5 space-y-4">
            {posts.map((post) => {
              const date = post.publishAt
                ? new Date(post.publishAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : null;

              return (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex gap-3 rounded-xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet-500/40"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                      {post.coverImage ? (
                        <OptimizedImage
                          src={post.coverImage}
                          alt={post.coverImageAlt ?? post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="64px"
                          quality={65}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                          Blog
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-violet-700",
                          lightHeading,
                        )}
                      >
                        {post.title}
                      </p>
                      {date ? <p className={cn("mt-1 text-xs", lightMuted)}>{date}</p> : null}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={cn("mt-4 text-sm", lightBody)}>More stories are on the way.</p>
        )}

        <Link
          href="/blog"
          className="mt-5 inline-flex text-sm font-semibold text-violet-600 underline-offset-2 hover:underline"
        >
          View all posts
        </Link>
      </section>

      <section
        aria-labelledby="blog-contact-heading"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6"
      >
        <h2
          id="blog-contact-heading"
          className={cn("font-display text-lg font-bold tracking-tight", lightHeading)}
        >
          Let&apos;s talk growth
        </h2>
        <p className={cn("mt-1 text-sm", lightMuted)}>
          Tell us what you&apos;re building â€” we&apos;ll reply within one business day.
        </p>
        <div className="mt-5">
          <ContactFormWithIntent theme="light" compact defaultIntent="general" />
        </div>
      </section>
    </div>
  );
}
