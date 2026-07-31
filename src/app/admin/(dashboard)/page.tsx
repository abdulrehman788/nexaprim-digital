import { BookOpen, FileText } from "lucide-react";

import { formatRelativeDate } from "@/components/admin/ContentStatusBadge";
import { Calendar, type CalendarEvent } from "@/components/admin/dashboard/Calendar";
import { OverviewCard } from "@/components/admin/dashboard/OverviewCard";
import { RecentContent, type RecentItem } from "@/components/admin/dashboard/RecentContent";
import { OpsSummaryCards } from "@/components/admin/ops/OpsSummaryCards";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  let blog = { total: 0, published: 0, draft: 0, scheduled: 0 };
  let story = { total: 0, published: 0, draft: 0, scheduled: 0 };
  let recentBlog: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  let recentStories: Awaited<ReturnType<typeof prisma.caseStudy.findMany>> = [];
  let events: CalendarEvent[] = [];

  try {
    const [
      blogTotal,
      blogPublished,
      blogDraft,
      blogScheduled,
      storyTotal,
      storyPublished,
      storyDraft,
      storyScheduled,
      recentBlogRows,
      recentStoryRows,
      blogDates,
      storyDates,
    ] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.blogPost.count({ where: { status: "DRAFT" } }),
      prisma.blogPost.count({ where: { status: "SCHEDULED" } }),
      prisma.caseStudy.count(),
      prisma.caseStudy.count({ where: { status: "PUBLISHED" } }),
      prisma.caseStudy.count({ where: { status: "DRAFT" } }),
      prisma.caseStudy.count({ where: { status: "SCHEDULED" } }),
      prisma.blogPost.findMany({ take: 5, orderBy: { updatedAt: "desc" } }),
      prisma.caseStudy.findMany({ take: 5, orderBy: { updatedAt: "desc" } }),
      prisma.blogPost.findMany({ where: { publishAt: { not: null } }, select: { publishAt: true } }),
      prisma.caseStudy.findMany({ where: { publishAt: { not: null } }, select: { publishAt: true } }),
    ]);

    blog = { total: blogTotal, published: blogPublished, draft: blogDraft, scheduled: blogScheduled };
    story = {
      total: storyTotal,
      published: storyPublished,
      draft: storyDraft,
      scheduled: storyScheduled,
    };
    recentBlog = recentBlogRows;
    recentStories = recentStoryRows;
    events = [
      ...blogDates
        .filter((row) => row.publishAt)
        .map((row) => ({ date: (row.publishAt as Date).toISOString(), type: "blog" as const })),
      ...storyDates
        .filter((row) => row.publishAt)
        .map((row) => ({ date: (row.publishAt as Date).toISOString(), type: "story" as const })),
    ];
  } catch {
    // Database not initialized yet — render zero state.
  }

  const blogItems: RecentItem[] = recentBlog.map((post) => ({
    id: post.id,
    title: post.title,
    status: post.status,
    dateLabel: `Updated ${formatRelativeDate(post.updatedAt)}`,
    href: `/admin/blog/${post.id}`,
  }));

  const storyItems: RecentItem[] = recentStories.map((item) => ({
    id: item.id,
    title: item.client,
    status: item.status,
    dateLabel: `Updated ${formatRelativeDate(item.updatedAt)}`,
    href: `/admin/stories/${item.id}`,
  }));

  return (
    <div className="relative space-y-6 overflow-x-hidden pb-2">
      <OpsSummaryCards userName="Admin" />

      <section className="min-w-0 space-y-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-600">
            Content
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
            Publishing performance
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Blog and case-study health at a glance.
          </p>
        </div>
        <div className="grid min-w-0 gap-4 lg:grid-cols-2">
          <OverviewCard
            title="Blog"
            icon={FileText}
            total={blog.total}
            totalLabel="Total posts"
            viewAllHref="/admin/blog"
            viewAllLabel="View all"
            stats={[
              { label: "Published", value: blog.published, dot: "bg-emerald-500" },
              { label: "Drafts", value: blog.draft, dot: "bg-slate-400" },
              { label: "Scheduled", value: blog.scheduled, dot: "bg-orange-500" },
            ]}
          />
          <OverviewCard
            title="Stories"
            icon={BookOpen}
            total={story.total}
            totalLabel="Total case studies"
            viewAllHref="/admin/stories"
            viewAllLabel="View all"
            stats={[
              { label: "Published", value: story.published, dot: "bg-emerald-500" },
              { label: "Drafts", value: story.draft, dot: "bg-slate-400" },
              { label: "Scheduled", value: story.scheduled, dot: "bg-orange-500" },
            ]}
          />
        </div>
      </section>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <RecentContent blogs={blogItems} stories={storyItems} />
        <Calendar events={events} />
      </div>
    </div>
  );
}
