import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { lightBody, lightHeading, lightMuted } from "@/lib/section-surfaces";
import type { BlogPostPublic } from "@/lib/content/blog";
import { cn } from "@/lib/utils";

function renderContent(content: string) {
  return content.split(/\n\n+/).map((block) => (
    <p key={block.slice(0, 40)} className={cn("text-base leading-relaxed sm:text-lg", lightBody)}>
      {block}
    </p>
  ));
}

export function BlogArticle({ post }: { post: BlogPostPublic }) {
  const date = post.publishAt
    ? new Date(post.publishAt).toLocaleDateString(undefined, { dateStyle: "long" })
    : null;

  return (
    <article>
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505] pb-10 pt-28 sm:pb-12 sm:pt-32">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,163,88,0.1),transparent_55%)]"
          aria-hidden="true"
        />
        <Container className="relative">
          <header className="mx-auto max-w-3xl">
            {post.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-0.5 text-xs font-medium text-content-secondary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-content-secondary">{post.excerpt}</p>
            <p className="mt-4 text-sm text-content-muted">
              {post.author}
              {date ? ` · ${date}` : null}
            </p>
          </header>
        </Container>
      </section>

      <section className="bg-white pb-16 pt-10 sm:pt-12">
        <Container>
          {post.coverImage ? (
            <div className="relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden rounded-2xl border border-slate-200">
              <OptimizedImage
                src={post.coverImage}
                alt={post.coverImageAlt ?? post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
          ) : null}

          <div className="mx-auto mt-10 max-w-3xl space-y-5">
            {renderContent(post.content)}
          </div>

          <footer className="mx-auto mt-12 max-w-3xl border-t border-slate-200 pt-8">
            <p className={cn("text-sm", lightMuted)}>
              Written by <span className={cn("font-medium", lightHeading)}>{post.author}</span>
              {date ? ` · ${date}` : null}
            </p>
          </footer>
        </Container>
      </section>
    </article>
  );
}
