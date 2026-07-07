import { BookOpen } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StoryEditorForm } from "@/components/admin/StoryEditorForm";

export default function NewStoryPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Case study"
        title="New case study"
        icon={BookOpen}
        iconClassName="from-rose-500 to-pink-600 shadow-rose-500/25"
        description="Document a client engagement and publish it as a solution story."
        back={{ label: "Case studies", href: "/admin/stories" }}
      />
      <StoryEditorForm />
    </div>
  );
}
