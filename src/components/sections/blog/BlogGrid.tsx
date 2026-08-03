import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ctaLinks } from "@/lib/constants";
import {
  getPublishedBlogPosts,
  type BlogPostSummary,
} from "@/lib/content/blog";
import { cn } from "@/lib/utils";

function formatDate(value: Date | null) {
  if (!value) return null;
  return value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function cleanExcerpt(excerpt: string, max = 160) {
  const flat = excerpt.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max).replace(/\s+\S*$/, "")}â€¦`;
}

function FeaturedPost({ post }: { post: BlogPostSummary }) {
  const date = formatDate(post.publishAt);

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[#0b1220] shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)]">
      <div className="grid lg:grid-cols-2">
        <Link
          href={`/blog/${post.slug}`}
          className="relative block min-h-[240px] overflow-hidden sm:min-h-[320px] lg:min-h-[420px]"
        >
          {post.coverImage ? (
            <OptimizedImage
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              fill
              priority
              quality={72}
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 560px"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #7c3aed 140%)",
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0b1220]/40" />
        </Link>

        <div className="relative flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-300 ring-1 ring-inset ring-violet-400/30">
              Featured
            </span>
            {date ? (
              <time className="text-xs font-medium text-slate-400">{date}</time>
            ) : null}
            {post.tags[0] ? (
              <span className="text-xs font-medium text-slate-500">Â· {post.tags[0]}</span>
            ) : null}
          </div>

          <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            <Link href={`/blog/${post.slug}`} className="transition hover:text-violet-300">
              {post.title}
            </Link>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {cleanExcerpt(post.excerpt, 200)}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Read article
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="text-xs text-slate-500">By {post.author}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function PostRow({ post, index }: { post: BlogPostSummary; index: number }) {
  const date = formatDate(post.publishAt);
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group grid gap-5 border-b border-slate-200 py-8 last:border-0 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8">
      <span className="font-display text-3xl font-bold tabular-nums text-slate-200 transition group-hover:text-violet-300 sm:w-14">
        {number}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          {date ? <time>{date}</time> : null}
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-violet-50 px-2 py-0.5 font-semibold text-violet-700 ring-1 ring-inset ring-violet-100"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-slate-900 transition group-hover:text-violet-700 sm:text-2xl">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {cleanExcerpt(post.excerpt)}
        </p>
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition group-hover:border-violet-300 group-hover:bg-violet-50 group-hover:text-violet-700"
        aria-label={`Read ${post.title}`}
      >
        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </article>
  );
}

function PostCard({ post }: { post: BlogPostSummary }) {
  const date = formatDate(post.publishAt);

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="relative mb-5 block aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900"
      >
        {post.coverImage ? (
          <OptimizedImage
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            fill
            quality={68}
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(145deg, #1e293b, #0f172a 60%, #7c3aed)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
      </Link>

      {date ? <time className="text-xs font-medium text-slate-500">{date}</time> : null}
      <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-slate-900 transition group-hover:text-violet-700">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {cleanExcerpt(post.excerpt, 120)}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 transition hover:text-violet-500"
      >
        Read article
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}

export async function BlogGrid() {
  const posts = await getPublishedBlogPosts();

  if (posts.length === 0) {
    return (
      <section id="articles" className="bg-[#f7f5f1] py-20 lg:py-28">
        <Container className="max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-600">
            Coming soon
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900">
            New articles are on the way
          </h2>
          <p className="mt-3 text-slate-600">
            Weâ€™re drafting the next round of growth playbooks. Meanwhile, book a call and weâ€™ll
            dig into your funnel live.
          </p>
          <Link
            href={ctaLinks.consultation}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Book a free strategy call
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    );
  }

  const featured = posts[0]!;
  const rest = posts.slice(1);
  const useMagazine = rest.length > 0 && rest.length <= 4;
  const useCards = rest.length > 4;

  return (
    <>
      <section id="articles" className="relative bg-[#f7f5f1] py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-600">
                Latest
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                From the Expandova desk
              </h2>
            </div>
            <p className="max-w-sm text-sm text-slate-500">
              {posts.length} article{posts.length === 1 ? "" : "s"} Â· Updated as we ship campaigns
              and learn in market.
            </p>
          </div>

          <FeaturedPost post={featured} />

          {rest.length > 0 ? (
            <div className="mt-14 sm:mt-16">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
                  More reading
                </h3>
                <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
              </div>

              {useMagazine && !useCards ? (
                <div className="mt-2">
                  {rest.map((post, index) => (
                    <PostRow key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <li key={post.id}>
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#05080f] py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(124,58,237,0.22), transparent 55%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
              Next step
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Want this thinking applied to your funnel?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              Bring your goals, traffic, and offers. Weâ€™ll map a clear growth path in one focused
              call.
            </p>
          </div>
          <Link
            href={ctaLinks.consultation}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-white",
              "shadow-glow transition hover:opacity-90",
            )}
          >
            Book a free strategy call
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </>
  );
}
