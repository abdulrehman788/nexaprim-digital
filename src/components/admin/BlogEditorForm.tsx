"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { BlogPostInput } from "@/lib/schemas/admin";
import { slugify } from "@/lib/content/utils";
import {
  AdminInput,
  AdminLabel,
  AdminTextarea,
} from "@/components/admin/ui/AdminFields";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminFormSection } from "@/components/admin/ui/AdminFormSection";
import { AdminPublishPanel } from "@/components/admin/ui/AdminPublishPanel";

const STATUS_OPTIONS = [
  { value: "DRAFT" as const, label: "Draft" },
  { value: "SCHEDULED" as const, label: "Scheduled" },
  { value: "PUBLISHED" as const, label: "Published" },
  { value: "ARCHIVED" as const, label: "Archived" },
];

interface BlogEditorFormProps {
  initial?: Partial<BlogPostInput> & { id?: string };
}

function toDatetimeLocal(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function BlogEditorForm({ initial }: BlogEditorFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(initial?.coverImageAlt ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "NexaPrime Digital");
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [status, setStatus] = useState<BlogPostInput["status"]>(initial?.status ?? "DRAFT");
  const [publishAt, setPublishAt] = useState(toDatetimeLocal(initial?.publishAt ?? undefined));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const previewSlug = slug || (title ? slugify(title) : "");
  const previewUrl =
    isEdit && previewSlug && (status === "PUBLISHED" || status === "SCHEDULED")
      ? `/blog/${previewSlug}`
      : undefined;

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEdit && !slug) {
      setSlug(slugify(value));
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload: BlogPostInput = {
      title,
      slug: slug || slugify(title),
      excerpt,
      content,
      coverImage: coverImage || undefined,
      coverImageAlt: coverImageAlt || undefined,
      author,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status,
      publishAt: publishAt ? new Date(publishAt).toISOString() : null,
    };

    const url = isEdit ? `/api/admin/blog/${initial!.id}` : "/api/admin/blog";
    const method = isEdit ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Failed to save post");
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <AdminCard>
            <AdminFormSection title="Post details" description="Title, slug, and author">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <AdminLabel>Title</AdminLabel>
                  <AdminInput
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="mt-1.5"
                    placeholder="How we improved local SEO for…"
                    required
                  />
                </div>
                <div>
                  <AdminLabel>URL slug</AdminLabel>
                  <div className="mt-1.5 flex rounded-lg border border-zinc-200 bg-white shadow-sm focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20">
                    <span className="flex items-center border-r border-zinc-200 bg-zinc-50 px-3 text-xs text-zinc-400">
                      /blog/
                    </span>
                    <AdminInput
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="border-0 shadow-none focus:ring-0 font-mono text-xs"
                      required
                    />
                  </div>
                </div>
                <div>
                  <AdminLabel>Author</AdminLabel>
                  <AdminInput value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <AdminLabel>Excerpt</AdminLabel>
                  <AdminTextarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={2}
                    className="mt-1.5 min-h-0"
                    placeholder="Short summary shown in listings and search results"
                    required
                  />
                </div>
              </div>
            </AdminFormSection>
          </AdminCard>

          <AdminCard>
            <AdminFormSection title="Content" description="Write your article in Markdown">
              <AdminTextarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={18}
                className="font-mono text-xs leading-relaxed"
                placeholder="Start writing your article…"
                required
              />
            </AdminFormSection>
          </AdminCard>

          <AdminCard>
            <AdminFormSection title="Media & tags" description="Cover image and categorization">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <AdminLabel>Cover image URL</AdminLabel>
                  <AdminInput value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <AdminLabel>Cover image alt text</AdminLabel>
                  <AdminInput value={coverImageAlt} onChange={(e) => setCoverImageAlt(e.target.value)} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <AdminLabel>Tags</AdminLabel>
                  <AdminInput
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="mt-1.5"
                    placeholder="SEO, Local business, Marketing"
                  />
                </div>
              </div>
            </AdminFormSection>
          </AdminCard>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>

        <AdminPublishPanel
          status={status}
          onStatusChange={setStatus}
          publishAt={publishAt}
          onPublishAtChange={setPublishAt}
          statusOptions={STATUS_OPTIONS}
          saving={saving}
          isEdit={isEdit}
          saveLabel={isEdit ? "Save post" : "Create post"}
          previewUrl={previewUrl}
          onCancel={() => router.push("/admin/blog")}
        />
      </div>
    </form>
  );
}
