import { BlogSidebar } from "@/components/sections/blog/BlogSidebar";
import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { lightBody, lightHeading, lightMuted } from "@/lib/section-surfaces";
import type { BlogPostPublic } from "@/lib/content/blog";
import { cn } from "@/lib/utils";

const IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(IMAGE_RE.source, "g");

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const alt = match[1] ?? "";
    const src = match[2] ?? "";
    parts.push(
      <span key={`${src}-${match.index}`} className="my-4 block overflow-hidden rounded-xl border border-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-auto w-full" loading="lazy" decoding="async" fetchPriority="low" />
      </span>,
    );
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts.length > 0 ? parts : text;
}

function renderContent(content: string) {
  return content.split(/\n\n+/).map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    const soloImage = trimmed.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)$/);
    if (soloImage) {
      const alt = soloImage[1] ?? "";
      const src = soloImage[2] ?? "";
      return (
        <figure key={`img-${index}`} className="overflow-hidden rounded-xl border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="h-auto w-full" loading="lazy" decoding="async" fetchPriority="low" />
          {alt ? (
            <figcaption className={cn("border-t border-slate-100 px-3 py-2 text-center text-xs", lightMuted)}>
              {alt}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={`h3-${index}`} className={cn("font-display text-xl font-bold", lightHeading)}>
          {trimmed.slice(4)}
        </h3>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={`h2-${index}`} className={cn("font-display text-2xl font-bold", lightHeading)}>
          {trimmed.slice(3)}
        </h2>
      );
    }
    if (trimmed.startsWith("# ")) {
      return (
        <h2 key={`h1-${index}`} className={cn("font-display text-2xl font-bold", lightHeading)}>
          {trimmed.slice(2)}
        </h2>
      );
    }

    return (
      <p key={`p-${index}`} className={cn("text-base leading-relaxed sm:text-lg", lightBody)}>
        {renderInline(trimmed)}
      </p>
    );
  });
}

type BlogArticleProps = {
  post: BlogPostPublic;
  latestPosts: BlogPostPublic[];
};

export function BlogArticle({ post, latestPosts }: BlogArticleProps) {
  const date = post.publishAt
    ? new Date(post.publishAt).toLocaleDateString(undefined, { dateStyle: "long" })
    : null;

  return (
    <article>
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#05080f] pb-12 pt-28 sm:pb-16 sm:pt-32">
        {post.coverImage ? (
          <div className="absolute inset-0" aria-hidden="true">
            <OptimizedImage
              src={post.coverImage}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={75}
              priority
            />
            {/* Dark on content (left), clear on empty (right) */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(5,8,15,0.92) 0%, rgba(5,8,15,0.82) 38%, rgba(5,8,15,0.45) 68%, rgba(5,8,15,0.18) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(5,8,15,0.55) 0%, transparent 35%, rgba(5,8,15,0.35) 100%)",
              }}
            />
          </div>
        ) : (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.22), transparent 55%)",
            }}
            aria-hidden="true"
          />
        )}
        <Container className="relative">
          <header className="max-w-2xl lg:max-w-3xl">
            {post.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-0.5 text-xs font-medium text-violet-200 backdrop-blur-sm"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              Expandova Insights
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-slate-200/90">{post.excerpt}</p>
            <p className="mt-4 text-sm text-slate-300/80">
              {post.author}
              {date ? ` · ${date}` : null}
            </p>
          </header>
        </Container>
      </section>

      <section className="bg-white pb-16 pt-10 sm:pt-12">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(260px,3fr)] lg:gap-12">
            <div className="min-w-0">
              <div className="space-y-5">{renderContent(post.content)}</div>

              <footer className="mt-12 border-t border-slate-200 pt-8">
                <p className={cn("text-sm", lightMuted)}>
                  Written by <span className={cn("font-medium", lightHeading)}>{post.author}</span>
                  {date ? ` · ${date}` : null}
                </p>
              </footer>
            </div>

            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <BlogSidebar posts={latestPosts} />
            </aside>
          </div>
        </Container>
      </section>
    </article>
  );
}
