import Link from "next/link";
import { CalendarClock, FileText, PenLine, Plus, Sparkles } from "lucide-react";

import { AdminListHeader } from "@/components/admin/AdminListHeader";
import { BlogTable, type BlogRow } from "@/components/admin/BlogTable";
import { prisma } from "@/lib/prisma";

export default async function AdminBlogListPage() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];

  try {
    posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
  } catch {
    // Database not initialized.
  }

  const total = posts.length;
  const published = posts.filter((post) => post.status === "PUBLISHED").length;
  const drafts = posts.filter((post) => post.status === "DRAFT").length;
  const scheduled = posts.filter((post) => post.status === "SCHEDULED").length;

  const rows: BlogRow[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    status: post.status,
    publishAt: post.publishAt ? post.publishAt.toISOString() : null,
    updatedAt: post.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-5 overflow-x-hidden">
      <AdminListHeader
        eyebrow="Content"
        title="Blog posts"
        description="Draft, schedule, and publish articles on /blog."
        icon={FileText}
        actions={
          <>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 transition hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              New post
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              View /blog
            </Link>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-14px_rgba(15,23,42,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <FileText className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Total
              </p>
              <p className="text-xl font-semibold tabular-nums text-slate-900">{total}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-14px_rgba(15,23,42,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Published
              </p>
              <p className="text-xl font-semibold tabular-nums text-slate-900">{published}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-14px_rgba(15,23,42,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <PenLine className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Drafts
              </p>
              <p className="text-xl font-semibold tabular-nums text-slate-900">{drafts}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-14px_rgba(15,23,42,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
              <CalendarClock className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Scheduled
              </p>
              <p className="text-xl font-semibold tabular-nums text-slate-900">{scheduled}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)]">
        {total === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 ring-1 ring-slate-200/80">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-base font-semibold text-slate-900">No blog posts yet</p>
            <p className="mt-1.5 max-w-sm text-sm text-slate-500">
              Create your first article to publish on /blog.
            </p>
            <Link
              href="/admin/blog/new"
              className="mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #f97316, #fb923c)",
                boxShadow: "0 10px 24px -8px rgba(249,115,22,0.45)",
              }}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Create post
            </Link>
          </div>
        ) : (
          <BlogTable posts={rows} />
        )}
      </section>
    </div>
  );
}
