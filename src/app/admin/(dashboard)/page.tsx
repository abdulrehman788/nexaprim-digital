import { BookOpen, FileText } from "lucide-react";

import { formatRelativeDate } from "@/components/admin/ContentStatusBadge";
import { Calendar, type CalendarEvent } from "@/components/admin/dashboard/Calendar";
import { OverviewCard } from "@/components/admin/dashboard/OverviewCard";
import { RecentContent, type RecentItem } from "@/components/admin/dashboard/RecentContent";
import { WelcomeBanner } from "@/components/admin/dashboard/WelcomeBanner";
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
    <div className="space-y-6">
      <WelcomeBanner userName="Admin" />

      <div className="grid gap-6 lg:grid-cols-2">
        <OverviewCard
          title="Blog Overview"
          icon={FileText}
          accent="violet"
          total={blog.total}
          totalLabel="Total Blog Posts"
          viewAllHref="/admin/blog"
          viewAllLabel="View all Blogs"
          stats={[
            { label: "Published", value: blog.published, dot: "bg-emerald-500" },
            { label: "Drafts", value: blog.draft, dot: "bg-gray-400" },
            { label: "Scheduled", value: blog.scheduled, dot: "bg-blue-500" },
            { label: "Views", value: 0, dot: "bg-violet-500" },
          ]}
        />
        <OverviewCard
          title="Stories Overview"
          icon={BookOpen}
          accent="rose"
          total={story.total}
          totalLabel="Total Stories"
          viewAllHref="/admin/stories"
          viewAllLabel="View all Stories"
          stats={[
            { label: "Published", value: story.published, dot: "bg-emerald-500" },
            { label: "Drafts", value: story.draft, dot: "bg-gray-400" },
            { label: "Scheduled", value: story.scheduled, dot: "bg-blue-500" },
            { label: "Views", value: 0, dot: "bg-rose-500" },
          ]}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentContent blogs={blogItems} stories={storyItems} />
        <Calendar events={events} />
      </div>
    </div>
  );
}
