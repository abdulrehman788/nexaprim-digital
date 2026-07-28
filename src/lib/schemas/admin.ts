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

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1).max(200_000),
  coverImage: safeImageSrcSchema.optional().or(z.literal("")),
  coverImageAlt: z.string().max(200).optional(),
  author: z.string().min(1).max(100).optional(),
  tags: z.array(z.string().min(1).max(40)).max(12).optional(),
  status: contentStatusSchema,
  publishAt: z.string().datetime().optional().nullable(),
});

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
