"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import type { CaseStudyInput } from "@/lib/schemas/admin";
import { slugify } from "@/lib/content/utils";
import type { CaseStudyStat } from "@/types";
import {
  AdminButton,
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

interface StoryEditorFormProps {
  initial?: Partial<CaseStudyInput> & { id?: string };
}

function toDatetimeLocal(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const defaultStats: CaseStudyStat[] = [
  { label: "Key metric", value: "+100%" },
  { label: "Timeline", value: "12 weeks" },
];

export function StoryEditorForm({ initial }: StoryEditorFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [client, setClient] = useState(initial?.client ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [industry, setIndustry] = useState(initial?.industry ?? "");
  const [headline, setHeadline] = useState(initial?.headline ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [imageAlt, setImageAlt] = useState(initial?.imageAlt ?? "");
  const [stats, setStats] = useState<CaseStudyStat[]>(initial?.stats ?? defaultStats);
  const [challenge, setChallenge] = useState(initial?.challenge ?? "");
  const [approach, setApproach] = useState((initial?.approach ?? [""]).join("\n"));
  const [outcome, setOutcome] = useState(initial?.outcome ?? "");
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [quoteAuthor, setQuoteAuthor] = useState(initial?.quoteAuthor ?? "");
  const [status, setStatus] = useState<CaseStudyInput["status"]>(initial?.status ?? "DRAFT");
  const [publishAt, setPublishAt] = useState(toDatetimeLocal(initial?.publishAt ?? undefined));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const previewSlug = slug || (client ? slugify(client) : "");
  const previewUrl =
    isEdit && previewSlug && (status === "PUBLISHED" || status === "SCHEDULED")
      ? `/case-studies/${previewSlug}`
      : undefined;

  function handleClientChange(value: string) {
    setClient(value);
    if (!isEdit && !slug) {
      setSlug(slugify(value));
    }
  }

  function updateStat(index: number, field: keyof CaseStudyStat, value: string) {
    setStats((prev) => prev.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat)));
  }

  function removeStat(index: number) {
    setStats((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload: CaseStudyInput = {
      client,
      slug: slug || slugify(client),
      industry,
      headline,
      summary,
      image,
      imageAlt,
      stats: stats.filter((s) => s.label && s.value),
      challenge,
      approach: approach.split("\n").map((line) => line.trim()).filter(Boolean),
      outcome,
      quote: quote || "",
      quoteAuthor: quoteAuthor || "",
      status,
      publishAt: publishAt ? new Date(publishAt).toISOString() : null,
    };

    const url = isEdit ? `/api/admin/stories/${initial!.id}` : "/api/admin/stories";
    const method = isEdit ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Failed to save story");
      return;
    }

    router.push("/admin/stories");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <AdminCard>
            <AdminFormSection title="Client overview" description="Who this case study is about">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <AdminLabel>Client name</AdminLabel>
                  <AdminInput
                    value={client}
                    onChange={(e) => handleClientChange(e.target.value)}
                    className="mt-1.5"
                    required
                  />
                </div>
                <div>
                  <AdminLabel>Industry</AdminLabel>
                  <AdminInput
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="mt-1.5"
                    required
                  />
                </div>
                <div>
                  <AdminLabel>URL slug</AdminLabel>
                  <div className="mt-1.5 flex rounded-lg border border-zinc-200 bg-white shadow-sm focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20">
                    <span className="flex items-center border-r border-zinc-200 bg-zinc-50 px-2 text-[10px] text-zinc-400 sm:px-3 sm:text-xs">
                      /case-studies/
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
                  <AdminLabel>Headline</AdminLabel>
                  <AdminInput
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="mt-1.5"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminLabel>Summary</AdminLabel>
                  <AdminTextarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={2}
                    className="mt-1.5 min-h-0"
                    required
                  />
                </div>
              </div>
            </AdminFormSection>
          </AdminCard>

          <AdminCard>
            <AdminFormSection title="Hero & metrics" description="Visual and key results">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <AdminLabel>Hero image URL</AdminLabel>
                  <AdminInput value={image} onChange={(e) => setImage(e.target.value)} className="mt-1.5" required />
                </div>
                <div>
                  <AdminLabel>Image alt text</AdminLabel>
                  <AdminInput value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} className="mt-1.5" required />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <AdminLabel>Key stats</AdminLabel>
                {stats.map((stat, index) => (
                  <div key={index} className="flex gap-2">
                    <AdminInput
                      value={stat.label}
                      onChange={(e) => updateStat(index, "label", e.target.value)}
                      placeholder="Label"
                      className="flex-1"
                    />
                    <AdminInput
                      value={stat.value}
                      onChange={(e) => updateStat(index, "value", e.target.value)}
                      placeholder="Value"
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeStat(index)}
                      className="rounded-lg p-2.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      aria-label="Remove stat"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <AdminButton
                  type="button"
                  variant="ghost"
                  onClick={() => setStats((prev) => [...prev, { label: "", value: "" }])}
                  className="!px-0"
                >
                  <Plus className="h-4 w-4" />
                  Add stat
                </AdminButton>
              </div>
            </AdminFormSection>
          </AdminCard>

          <AdminCard>
            <AdminFormSection title="Story content" description="Challenge, approach, and outcome">
              <div className="space-y-5">
                <div>
                  <AdminLabel>Challenge</AdminLabel>
                  <AdminTextarea
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    rows={4}
                    className="mt-1.5"
                    required
                  />
                </div>
                <div>
                  <AdminLabel>Approach</AdminLabel>
                  <AdminTextarea
                    value={approach}
                    onChange={(e) => setApproach(e.target.value)}
                    rows={5}
                    className="mt-1.5"
                    placeholder="One step per line"
                    required
                  />
                </div>
                <div>
                  <AdminLabel>Outcome</AdminLabel>
                  <AdminTextarea
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                    rows={3}
                    className="mt-1.5"
                    required
                  />
                </div>
              </div>
            </AdminFormSection>
          </AdminCard>

          <AdminCard>
            <AdminFormSection title="Client quote" description="Optional testimonial">
              <div className="space-y-5">
                <div>
                  <AdminLabel>Quote</AdminLabel>
                  <AdminTextarea value={quote} onChange={(e) => setQuote(e.target.value)} rows={2} className="mt-1.5" />
                </div>
                <div>
                  <AdminLabel>Quote author</AdminLabel>
                  <AdminInput value={quoteAuthor} onChange={(e) => setQuoteAuthor(e.target.value)} className="mt-1.5" />
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
          saveLabel={isEdit ? "Save story" : "Create story"}
          previewUrl={previewUrl}
          onCancel={() => router.push("/admin/stories")}
        />
      </div>
    </form>
  );
}
