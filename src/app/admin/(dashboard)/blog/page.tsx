import Link from "next/link";
import { FileText, Plus } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { BlogTable, type BlogRow } from "@/components/admin/BlogTable";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

const cardShadow =
  "shadow-[0_1px_3px_rgba(16,24,40,0.04),0_12px_28px_-14px_rgba(16,24,40,0.12)]";

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

  const stats = [
    { label: "Total", value: total, dot: "bg-violet-500", bar: "from-violet-500 to-indigo-500" },
    { label: "Published", value: published, dot: "bg-emerald-500", bar: "from-emerald-500 to-teal-500" },
    { label: "Drafts", value: drafts, dot: "bg-zinc-400", bar: "from-zinc-400 to-zinc-500" },
    { label: "Scheduled", value: scheduled, dot: "bg-blue-500", bar: "from-blue-500 to-indigo-500" },
  ];

  return (
    <div>
      <AdminPageHeader
        eyebrow="Content"
        title="Blog posts"
        icon={FileText}
        description={
          total > 0
            ? `${total} article${total === 1 ? "" : "s"} · /blog`
            : "Articles published on /blog"
        }
        action={{ label: "New post", href: "/admin/blog/new" }}
      />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-4",
              cardShadow,
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                stat.bar,
              )}
              aria-hidden="true"
            />
            <div className="flex items-center gap-1.5">
              <span
                className={cn("h-1.5 w-1.5 rounded-full", stat.dot)}
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-gray-500">{stat.label}</span>
            </div>
            <p className="mt-1.5 text-2xl font-bold tracking-tight tabular-nums text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <AdminCard>
        {total === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-500 ring-1 ring-inset ring-violet-100">
              <FileText className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-semibold text-gray-900">No blog posts yet</p>
            <p className="mt-1 text-xs text-gray-500">
              Create your first article to get started.
            </p>
            <Link
              href="/admin/blog/new"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-200 transition-colors hover:bg-violet-700"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Create post
            </Link>
          </div>
        ) : (
          <BlogTable posts={rows} />
        )}
      </AdminCard>
    </div>
  );
}
