import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StoryEditorForm } from "@/components/admin/StoryEditorForm";
import { parseContentStatus, parseJsonArray } from "@/lib/content/utils";
import { prisma } from "@/lib/prisma";
import type { CaseStudyStat } from "@/types";

interface EditStoryPageProps {
  params: { id: string };
}

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const story = await prisma.caseStudy.findUnique({ where: { id: params.id } });
  if (!story) notFound();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Case study"
        title="Edit case study"
        icon={BookOpen}
        iconClassName="from-rose-500 to-pink-600 shadow-rose-500/25"
        description={story.client}
        back={{ label: "Case studies", href: "/admin/stories" }}
      />
      <StoryEditorForm
        initial={{
          id: story.id,
          client: story.client,
          slug: story.slug,
          industry: story.industry,
          headline: story.headline,
          summary: story.summary,
          image: story.image,
          imageAlt: story.imageAlt,
          stats: parseJsonArray<CaseStudyStat>(story.stats),
          challenge: story.challenge,
          approach: parseJsonArray<string>(story.approach),
          outcome: story.outcome,
          quote: story.quote ?? "",
          quoteAuthor: story.quoteAuthor ?? "",
          status: parseContentStatus(story.status),
          publishAt: story.publishAt?.toISOString() ?? null,
        }}
      />
    </div>
  );
}
