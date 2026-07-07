import { z } from "zod";

export const contentStatusSchema = z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]);

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal("")),
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
  image: z.string().url(),
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
  challenge: z.string().min(1),
  approach: z.array(z.string().min(1)).min(1).max(12),
  outcome: z.string().min(1),
  quote: z.string().max(500).optional().or(z.literal("")),
  quoteAuthor: z.string().max(200).optional().or(z.literal("")),
  status: contentStatusSchema,
  publishAt: z.string().datetime().optional().nullable(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type CaseStudyInput = z.infer<typeof caseStudySchema>;
