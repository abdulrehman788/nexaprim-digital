import { z } from "zod";

export const contentStatusSchema = z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]);

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

/** HTTPS remote URLs or same-origin /images paths — blocks javascript: and http SSRF tricks. */
const safeImageSrcSchema = z
  .string()
  .max(2048)
  .refine((value) => {
    if (!value) return true;
    if (value.startsWith("/images/")) return !value.includes("..");
    try {
      const url = new URL(value);
      return url.protocol === "https:";
    } catch {
      return false;
    }
  }, "Image must be an https URL or a /images/ path");

export const blogPostSchema = z
  .object({
    title: z.string().max(200),
    slug: z
      .string()
      .min(1)
      .max(120)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
    excerpt: z.string().max(500),
    content: z.string().max(200_000),
    coverImage: safeImageSrcSchema.optional().or(z.literal("")),
    coverImageAlt: z.string().max(200).optional(),
    author: z.string().min(1).max(100).optional(),
    tags: z.array(z.string().min(1).max(40)).max(12).optional(),
    status: contentStatusSchema,
    publishAt: z.string().datetime().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    const isDraft = data.status === "DRAFT";
    if (!data.title.trim()) {
      ctx.addIssue({ code: "custom", path: ["title"], message: "Title is required" });
    }
    if (!isDraft && !data.excerpt.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["excerpt"],
        message: "Excerpt is required before publishing",
      });
    }
    if (!isDraft && !data.content.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["content"],
        message: "Content is required before publishing",
      });
    }
  });

/** Normalize blog payloads so Save Draft works like WordPress (empty fields OK). */
export function normalizeBlogPostInput(raw: Record<string, unknown>): Record<string, unknown> {
  const status =
    raw.status === "SCHEDULED" ||
    raw.status === "PUBLISHED" ||
    raw.status === "ARCHIVED" ||
    raw.status === "DRAFT"
      ? raw.status
      : "DRAFT";
  const isDraft = status === "DRAFT";

  const titleRaw = typeof raw.title === "string" ? raw.title.trim() : "";
  const title = titleRaw || (isDraft ? "Untitled" : titleRaw);

  const slugRaw = typeof raw.slug === "string" ? raw.slug.trim() : "";
  let slug = slugRaw;
  if (!slug && title) {
    slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80);
  }
  if (!slug && isDraft) {
    slug = `untitled-${Date.now().toString(36)}`;
  }

  const excerptRaw = typeof raw.excerpt === "string" ? raw.excerpt.trim() : "";
  const excerpt = excerptRaw || (isDraft ? "Draft — no excerpt yet." : excerptRaw);

  const contentRaw = typeof raw.content === "string" ? raw.content : "";
  const content = contentRaw.trim() ? contentRaw : isDraft ? " " : contentRaw;

  let publishAt: string | null = null;
  if (typeof raw.publishAt === "string" && raw.publishAt.trim()) {
    const date = new Date(raw.publishAt);
    const year = date.getFullYear();
    if (!Number.isNaN(date.getTime()) && year >= 2000 && year <= 2100) {
      publishAt = date.toISOString();
    }
  }

  return {
    ...raw,
    title,
    slug,
    excerpt,
    content,
    status,
    publishAt,
    author:
      typeof raw.author === "string" && raw.author.trim()
        ? raw.author.trim()
        : "Expandova",
  };
}

export const caseStudySchema = z.object({
  client: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  industry: z.string().min(1).max(100),
  headline: z.string().min(1).max(200),
  summary: z.string().min(1).max(500),
  image: safeImageSrcSchema,
  imageAlt: z.string().min(1).max(200),
  stats: z
    .array(
      z.object({
        label: z.string().min(1).max(80),
        value: z.string().min(1).max(40),
      }),
    )
    .min(1)
    .max(6),
  challenge: z.string().min(1).max(20_000),
  approach: z.array(z.string().min(1).max(2000)).min(1).max(12),
  outcome: z.string().min(1).max(20_000),
  quote: z.string().max(500).optional().or(z.literal("")),
  quoteAuthor: z.string().max(200).optional().or(z.literal("")),
  status: contentStatusSchema,
  publishAt: z.string().datetime().optional().nullable(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type CaseStudyInput = z.infer<typeof caseStudySchema>;
