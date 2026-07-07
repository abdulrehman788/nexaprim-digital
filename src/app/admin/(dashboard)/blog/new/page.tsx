import { FileText } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BlogEditorForm } from "@/components/admin/BlogEditorForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Blog"
        title="New blog post"
        icon={FileText}
        description="Draft now, publish or schedule when ready."
        back={{ label: "Blog posts", href: "/admin/blog" }}
      />
      <BlogEditorForm />
    </div>
  );
}
