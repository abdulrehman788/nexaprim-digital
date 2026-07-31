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
        <img src={src} alt={alt} className="h-auto w-full" loading="lazy" />
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
          <img src={src} alt={alt} className="h-auto w-full" loading="lazy" />
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

export function BlogArticle({ post }: { post: BlogPostPublic }) {
  const date = post.publishAt
    ? new Date(post.publishAt).toLocaleDateString(undefined, { dateStyle: "long" })
    : null;

  return (
    <article>
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#05080f] pb-10 pt-28 sm:pb-12 sm:pt-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.18), transparent 55%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative">
          <header className="mx-auto max-w-3xl">
            {post.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-0.5 text-xs font-medium text-orange-200"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">
              Expandova Insights
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-slate-300">{post.excerpt}</p>
            <p className="mt-4 text-sm text-slate-400">
              {post.author}
              {date ? ` · ${date}` : null}
            </p>
          </header>
        </Container>
      </section>

      <section className="bg-white pb-16 pt-10 sm:pt-12">
        <Container>
          {post.coverImage ? (
            <div className="relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <OptimizedImage
                src={post.coverImage}
                alt={post.coverImageAlt ?? post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                quality={75}
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
