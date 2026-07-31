"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Bold,
  ChevronDown,
  ExternalLink,
  Heading2,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Upload,
  X,
} from "lucide-react";

import { ContentStatusBadge } from "@/components/admin/ContentStatusBadge";
import { uploadAdminImage } from "@/lib/admin/upload-image";
import type { BlogPostInput } from "@/lib/schemas/admin";
import { slugify } from "@/lib/content/utils";
import { cn } from "@/lib/utils";

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

function MetaBox({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5 text-left"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
          {title}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 text-slate-400 transition", open ? "rotate-0" : "-rotate-90")}
          aria-hidden="true"
        />
      </button>
      {open ? <div className="space-y-3 p-4">{children}</div> : null}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-slate-600">{children}</label>;
}

function fieldClassName(extra?: string) {
  return cn(
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10",
    extra,
  );
}

type WrapKind = "bold" | "italic" | "h2" | "link" | "ul" | "ol" | "quote";

function wrapSelection(
  value: string,
  start: number,
  end: number,
  kind: WrapKind,
): { next: string; cursor: number } {
  const selected = value.slice(start, end) || "text";
  const before = value.slice(0, start);
  const after = value.slice(end);

  const map: Record<WrapKind, { insert: string; cursorOffset: number }> = {
    bold: { insert: `**${selected}**`, cursorOffset: 2 + selected.length + 2 },
    italic: { insert: `*${selected}*`, cursorOffset: 1 + selected.length + 1 },
    h2: { insert: `\n## ${selected}\n`, cursorOffset: 4 + selected.length },
    link: {
      insert: `[${selected}](https://)`,
      cursorOffset: 1 + selected.length + 10,
    },
    ul: {
      insert: `\n- ${selected.split("\n").join("\n- ")}\n`,
      cursorOffset: 3 + selected.length,
    },
    ol: {
      insert: `\n1. ${selected.split("\n").join("\n1. ")}\n`,
      cursorOffset: 4 + selected.length,
    },
    quote: {
      insert: `\n> ${selected.split("\n").join("\n> ")}\n`,
      cursorOffset: 3 + selected.length,
    },
  };

  const { insert, cursorOffset } = map[kind];
  return { next: before + insert + after, cursor: start + cursorOffset };
}

function insertAtCursor(
  value: string,
  start: number,
  end: number,
  insert: string,
): { next: string; cursor: number } {
  const safeStart = Math.max(0, Math.min(start, value.length));
  const safeEnd = Math.max(safeStart, Math.min(end, value.length));
  return {
    next: value.slice(0, safeStart) + insert + value.slice(safeEnd),
    cursor: safeStart + insert.length,
  };
}

/** Strip chars that break markdown image syntax: ![alt](url) */
function safeMarkdownAlt(name: string) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/[\[\]()!]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80) || "Image";
}

function extractContentImages(markdown: string) {
  const images: { alt: string; src: string }[] = [];
  const re = /!\[([^\]]*)\]\(([^)\s]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(markdown)) !== null) {
    const src = match[2];
    if (!src) continue;
    images.push({ alt: match[1] || "Image", src });
  }
  return images;
}

export function BlogEditorForm({ initial }: BlogEditorFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const contentValueRef = useRef(initial?.content ?? "");
  const selectionRef = useRef<{ start: number; end: number }>({
    start: (initial?.content ?? "").length,
    end: (initial?.content ?? "").length,
  });
  const featuredInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);
  const [slugOpen, setSlugOpen] = useState(false);
  const [showCoverUrl, setShowCoverUrl] = useState(Boolean(initial?.coverImage));

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(initial?.coverImageAlt ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "Expandova");
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [status, setStatus] = useState<BlogPostInput["status"]>(initial?.status ?? "DRAFT");
  const [publishAt, setPublishAt] = useState(toDatetimeLocal(initial?.publishAt ?? undefined));
  const [error, setError] = useState("");
  const [uploadNotice, setUploadNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);

  useEffect(() => {
    contentValueRef.current = content;
  }, [content]);

  const previewSlug = slug || (title ? slugify(title) : "");
  const previewUrl =
    isEdit && previewSlug && (status === "PUBLISHED" || status === "SCHEDULED")
      ? `/blog/${previewSlug}`
      : undefined;

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const contentImages = extractContentImages(content);

  function rememberSelection() {
    const el = contentRef.current;
    if (!el) return;
    selectionRef.current = { start: el.selectionStart, end: el.selectionEnd };
  }

  function updateContent(next: string, cursor?: number) {
    contentValueRef.current = next;
    setContent(next);
    if (typeof cursor === "number") {
      selectionRef.current = { start: cursor, end: cursor };
      requestAnimationFrame(() => {
        const el = contentRef.current;
        if (!el) return;
        el.focus();
        el.setSelectionRange(cursor, cursor);
      });
    }
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEdit && !slug) {
      setSlug(slugify(value));
    }
  }

  function applyFormat(kind: WrapKind) {
    const el = contentRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const { next, cursor } = wrapSelection(contentValueRef.current, start, end, kind);
    updateContent(next, cursor);
  }

  function insertMarkdown(snippet: string, at?: { start: number; end: number }) {
    const value = contentValueRef.current;
    const start = at?.start ?? selectionRef.current.start ?? value.length;
    const end = at?.end ?? selectionRef.current.end ?? value.length;
    const { next, cursor } = insertAtCursor(value, start, end, snippet);
    updateContent(next, cursor);
  }

  async function handleFeaturedUpload(file: File | null | undefined) {
    if (!file) return;
    setUploadingFeatured(true);
    setError("");
    setUploadNotice("");
    try {
      const url = await uploadAdminImage(file);
      setCoverImage(url);
      if (!coverImageAlt) {
        setCoverImageAlt(safeMarkdownAlt(file.name) || title || "Cover image");
      }
      setUploadNotice("Featured image uploaded.");
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") return;
      setError(err instanceof Error ? err.message : "Featured image upload failed");
    } finally {
      setUploadingFeatured(false);
      if (featuredInputRef.current) featuredInputRef.current.value = "";
    }
  }

  async function handleContentImageUpload(file: File | null | undefined) {
    if (!file) return;

    // Capture cursor before the async upload (file picker steals focus).
    rememberSelection();
    const anchor = { ...selectionRef.current };

    setUploadingInline(true);
    setError("");
    setUploadNotice("");
    try {
      const url = await uploadAdminImage(file);
      const alt = safeMarkdownAlt(file.name);
      const snippet = `\n\n![${alt}](${url})\n\n`;
      insertMarkdown(snippet, anchor);
      setUploadNotice("Image added to content.");
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") return;
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploadingInline(false);
      if (contentImageInputRef.current) contentImageInputRef.current.value = "";
    }
  }

  async function savePost(statusOverride?: BlogPostInput["status"]) {
    setSaving(true);
    setError("");

    const nextStatus = statusOverride ?? status;
    if (statusOverride) setStatus(statusOverride);

    const nextTitle = title.trim() || (nextStatus === "DRAFT" ? "Untitled" : title.trim());
    const nextSlug =
      slug.trim() ||
      slugify(nextTitle) ||
      (nextStatus === "DRAFT" ? `untitled-${Date.now().toString(36)}` : "");
    const nextExcerpt =
      excerpt.trim() ||
      (nextStatus === "DRAFT" ? "Draft — no excerpt yet." : excerpt.trim());
    const latestContent = contentValueRef.current;
    const nextContent =
      latestContent.trim().length > 0
        ? latestContent
        : nextStatus === "DRAFT"
          ? " "
          : latestContent;

    // Ignore garbage datetime-local values (e.g. year 52026).
    let nextPublishAt: string | null = null;
    if (publishAt.trim()) {
      const date = new Date(publishAt);
      const year = date.getFullYear();
      if (!Number.isNaN(date.getTime()) && year >= 2000 && year <= 2100) {
        nextPublishAt = date.toISOString();
      } else {
        setPublishAt("");
      }
    }

    if (nextStatus !== "DRAFT") {
      if (!nextTitle) {
        setSaving(false);
        setError("Add a title before publishing.");
        return;
      }
      if (!nextExcerpt.trim() || nextExcerpt === "Draft — no excerpt yet.") {
        setSaving(false);
        setError("Add an excerpt before publishing.");
        return;
      }
      if (!nextContent.trim()) {
        setSaving(false);
        setError("Add some content before publishing.");
        return;
      }
    }

    // Keep UI in sync with what we persist for drafts.
    if (nextStatus === "DRAFT") {
      if (!title.trim()) setTitle(nextTitle);
      if (!slug.trim()) setSlug(nextSlug);
      if (!excerpt.trim()) setExcerpt(nextExcerpt);
    }

    const payload: BlogPostInput = {
      title: nextTitle,
      slug: nextSlug,
      excerpt: nextExcerpt,
      content: nextContent,
      coverImage: coverImage || undefined,
      coverImageAlt: coverImageAlt || undefined,
      author: author.trim() || "Expandova",
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: nextStatus,
      publishAt: nextPublishAt,
    };

    const url = isEdit ? `/api/admin/blog/${initial!.id}` : "/api/admin/blog";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Failed to save post");
        setSaving(false);
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Network error — could not save post.");
      setSaving(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await savePost();
  }

  const toolbar = [
    { kind: "bold" as const, icon: Bold, label: "Bold" },
    { kind: "italic" as const, icon: Italic, label: "Italic" },
    { kind: "h2" as const, icon: Heading2, label: "Heading" },
    { kind: "link" as const, icon: Link2, label: "Link" },
    { kind: "ul" as const, icon: List, label: "Bullet list" },
    { kind: "ol" as const, icon: ListOrdered, label: "Numbered list" },
    { kind: "quote" as const, icon: Quote, label: "Quote" },
  ];

  return (
    <form id="blog-editor-form" onSubmit={handleSubmit} className="space-y-4 overflow-x-hidden">
      <input
        ref={featuredInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => void handleFeaturedUpload(e.target.files?.[0])}
      />
      <input
        ref={contentImageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => void handleContentImageUpload(e.target.files?.[0])}
      />

      <div className="sticky top-0 z-20 -mx-1 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.35)] backdrop-blur">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">All Posts</span>
          </Link>
          <span className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden="true" />
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
              {isEdit ? "Edit Post" : "Add New Post"}
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              {wordCount.toLocaleString()} word{wordCount === 1 ? "" : "s"} · Markdown
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ContentStatusBadge status={status} publishAt={publishAt || null} />
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:inline-flex"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-slate-900 transition hover:brightness-110 disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #f97316, #fb923c)",
              boxShadow: "0 8px 20px -8px rgba(249,115,22,0.55)",
            }}
          >
            {saving ? "Saving…" : isEdit ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {uploadNotice ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {uploadNotice}
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-18px_rgba(15,23,42,0.12)]">
          <div className="border-b border-slate-100 px-5 pb-4 pt-6 sm:px-8 sm:pt-8">
            <input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Add title"
              className="w-full border-0 bg-transparent text-3xl font-semibold leading-tight tracking-tight text-slate-900 outline-none placeholder:text-slate-300 sm:text-4xl"
            />

            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
              <span className="font-medium text-slate-400">Permalink:</span>
              <span className="font-mono text-slate-600">/blog/{previewSlug || "…"}</span>
              <button
                type="button"
                onClick={() => setSlugOpen((v) => !v)}
                className="font-semibold text-orange-600 hover:underline"
              >
                {slugOpen ? "Done" : "Edit"}
              </button>
              {previewUrl ? (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-orange-600 hover:underline"
                >
                  View post
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              ) : null}
            </div>

            {slugOpen ? (
              <div className="mt-3 flex max-w-lg overflow-hidden rounded-lg border border-slate-200 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-500/10">
                <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-400">
                  /blog/
                </span>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="min-w-0 flex-1 border-0 bg-white px-3 py-2 font-mono text-xs text-slate-800 outline-none"
                />
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-100 bg-slate-50/90 px-2 py-1.5 sm:px-3">
            {toolbar.map(({ kind, icon: Icon, label }) => (
              <button
                key={kind}
                type="button"
                title={label}
                aria-label={label}
                onClick={() => applyFormat(kind)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition hover:bg-white hover:text-slate-900 hover:shadow-sm"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            ))}
            <span className="mx-1 hidden h-5 w-px bg-slate-200 sm:block" aria-hidden="true" />
            <button
              type="button"
              title="Insert image"
              aria-label="Insert image"
              disabled={uploadingInline}
              onMouseDown={rememberSelection}
              onClick={() => {
                rememberSelection();
                contentImageInputRef.current?.click();
              }}
              className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-slate-600 transition hover:bg-white hover:text-slate-900 hover:shadow-sm disabled:opacity-50"
            >
              {uploadingInline ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <ImageIcon className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="hidden text-xs font-semibold sm:inline">
                {uploadingInline ? "Uploading…" : "Image"}
              </span>
            </button>
            <span className="ml-auto hidden px-2 text-[11px] font-medium text-slate-400 sm:inline">
              Markdown supported
            </span>
          </div>

          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => {
              contentValueRef.current = e.target.value;
              setContent(e.target.value);
              selectionRef.current = {
                start: e.target.selectionStart,
                end: e.target.selectionEnd,
              };
            }}
            onSelect={rememberSelection}
            onKeyUp={rememberSelection}
            onClick={rememberSelection}
            placeholder={"Start writing…\n\n## Heading\n\nUse the Image button to upload photos into the article."}
            className="min-h-[28rem] w-full resize-y border-0 bg-white px-5 py-5 font-mono text-[13px] leading-7 text-slate-800 outline-none placeholder:text-slate-300 sm:min-h-[34rem] sm:px-8 sm:py-6 sm:text-sm"
            onPaste={(e) => {
              const file = Array.from(e.clipboardData.files).find((f) => f.type.startsWith("image/"));
              if (!file) return;
              e.preventDefault();
              rememberSelection();
              void handleContentImageUpload(file);
            }}
            onDragOver={(e) => {
              if (Array.from(e.dataTransfer.types).includes("Files")) {
                e.preventDefault();
              }
            }}
            onDrop={(e) => {
              const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith("image/"));
              if (!file) return;
              e.preventDefault();
              rememberSelection();
              void handleContentImageUpload(file);
            }}
          />

          {contentImages.length > 0 ? (
            <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-3 sm:px-8">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Images in content ({contentImages.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {contentImages.map((image, index) => (
                  <a
                    key={`${image.src}-${index}`}
                    href={image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-16 w-24 overflow-hidden rounded-lg ring-1 ring-slate-200 transition hover:ring-orange-300"
                    title={image.alt}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <aside className="space-y-3 lg:sticky lg:top-20 lg:self-start">
          <MetaBox title="Publish">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
              <span className="text-xs font-medium text-slate-500">Status</span>
              <ContentStatusBadge status={status} publishAt={publishAt || null} />
            </div>
            <div>
              <FieldLabel>Visibility</FieldLabel>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BlogPostInput["status"])}
                className={cn(fieldClassName(), "mt-1.5")}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Publish date</FieldLabel>
              <input
                type="datetime-local"
                value={publishAt}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value) {
                    setPublishAt("");
                    return;
                  }
                  const date = new Date(value);
                  const year = date.getFullYear();
                  if (Number.isNaN(date.getTime()) || year < 2000 || year > 2100) {
                    setPublishAt("");
                    setError("Publish date looks invalid — cleared. Leave empty for drafts.");
                    return;
                  }
                  setPublishAt(value);
                }}
                className={cn(fieldClassName(), "mt-1.5")}
              />
              <p className="mt-1.5 text-[11px] text-slate-400">
                Leave empty for drafts. Set a future date for scheduled posts.
              </p>
            </div>
            <div className="flex flex-col gap-2 border-t border-slate-100 pt-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:brightness-110 disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #f97316, #fb923c)",
                  boxShadow: "0 8px 20px -8px rgba(249,115,22,0.45)",
                }}
              >
                {saving ? "Saving…" : isEdit ? "Update" : "Publish"}
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => void savePost("DRAFT")}
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/blog")}
                className="inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
              >
                Cancel
              </button>
            </div>
          </MetaBox>

          <MetaBox title="Featured image">
            {coverImage ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt={coverImageAlt || "Cover preview"}
                  className="aspect-video w-full rounded-lg object-cover ring-1 ring-slate-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCoverImage("");
                    setCoverImageAlt("");
                  }}
                  className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70 text-white transition hover:bg-slate-900"
                  aria-label="Remove featured image"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled={uploadingFeatured}
                onClick={() => featuredInputRef.current?.click()}
                className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-500 transition hover:border-orange-300 hover:bg-orange-50/50 hover:text-orange-700 disabled:opacity-50"
              >
                {uploadingFeatured ? (
                  <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
                ) : (
                  <Upload className="h-6 w-6" aria-hidden="true" />
                )}
                <span className="mt-2 text-xs font-semibold">
                  {uploadingFeatured ? "Uploading…" : "Set featured image"}
                </span>
                <span className="mt-0.5 text-[10px] text-slate-400">JPEG, PNG, WebP, GIF · max 5MB</span>
              </button>
            )}

            {coverImage ? (
              <button
                type="button"
                disabled={uploadingFeatured}
                onClick={() => featuredInputRef.current?.click()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                {uploadingFeatured ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                ) : (
                  <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                Replace image
              </button>
            ) : null}

            <div>
              <FieldLabel>Alt text</FieldLabel>
              <input
                value={coverImageAlt}
                onChange={(e) => setCoverImageAlt(e.target.value)}
                className={cn(fieldClassName(), "mt-1.5")}
                placeholder="Describe the image"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowCoverUrl((v) => !v)}
              className="text-[11px] font-semibold text-orange-600 hover:underline"
            >
              {showCoverUrl ? "Hide image URL" : "Or paste image URL"}
            </button>
            {showCoverUrl ? (
              <input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://… or /images/…"
                className={fieldClassName()}
              />
            ) : null}
          </MetaBox>

          <MetaBox title="Excerpt">
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={4}
              placeholder="Write an excerpt (optional for drafts)…"
              className={cn(fieldClassName("min-h-[96px] resize-y"))}
            />
          </MetaBox>

          <MetaBox title="Tags" defaultOpen={false}>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="SEO, Local business, Marketing"
              className={fieldClassName()}
            />
            <p className="text-[11px] text-slate-400">Separate tags with commas.</p>
          </MetaBox>

          <MetaBox title="Author" defaultOpen={false}>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={fieldClassName()}
            />
          </MetaBox>
        </aside>
      </div>
    </form>
  );
}
