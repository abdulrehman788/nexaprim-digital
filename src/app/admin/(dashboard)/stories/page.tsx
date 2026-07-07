import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { StoriesTable, type StoryRow } from "@/components/admin/StoriesTable";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

const cardShadow =
  "shadow-[0_1px_3px_rgba(16,24,40,0.04),0_12px_28px_-14px_rgba(16,24,40,0.12)]";

export default async function AdminStoriesListPage() {
  let stories: Awaited<ReturnType<typeof prisma.caseStudy.findMany>> = [];

  try {
    stories = await prisma.caseStudy.findMany({ orderBy: { updatedAt: "desc" } });
  } catch {
    // Database not initialized.
  }

  const total = stories.length;
  const published = stories.filter((story) => story.status === "PUBLISHED").length;
  const drafts = stories.filter((story) => story.status === "DRAFT").length;
  const scheduled = stories.filter((story) => story.status === "SCHEDULED").length;

  const rows: StoryRow[] = stories.map((story) => ({
    id: story.id,
    client: story.client,
    slug: story.slug,
    industry: story.industry,
    status: story.status,
    publishAt: story.publishAt ? story.publishAt.toISOString() : null,
  }));

  const stats = [
    { label: "Total", value: total, dot: "bg-rose-500", bar: "from-rose-500 to-pink-500" },
    { label: "Published", value: published, dot: "bg-emerald-500", bar: "from-emerald-500 to-teal-500" },
    { label: "Drafts", value: drafts, dot: "bg-zinc-400", bar: "from-zinc-400 to-zinc-500" },
    { label: "Scheduled", value: scheduled, dot: "bg-blue-500", bar: "from-blue-500 to-indigo-500" },
  ];

  return (
    <div>
      <AdminPageHeader
        eyebrow="Content"
        title="Case studies"
        icon={BookOpen}
        iconClassName="from-rose-500 to-pink-600 shadow-rose-500/25"
        description={
          total > 0
            ? `${total} ${total === 1 ? "story" : "stories"} · /case-studies`
            : "Solution stories on /case-studies"
        }
        action={{ label: "New story", href: "/admin/stories/new" }}
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
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 ring-1 ring-inset ring-rose-100">
              <BookOpen className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-semibold text-gray-900">No case studies in database</p>
            <p className="mt-1 text-xs text-gray-500">
              Run <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">npm run db:seed</code> or
              add a new story.
            </p>
            <Link
              href="/admin/stories/new"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-200 transition-colors hover:bg-violet-700"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add case study
            </Link>
          </div>
        ) : (
          <StoriesTable stories={rows} />
        )}
      </AdminCard>
    </div>
  );
}
