import { z } from "zod";

export const CONTACT_MAX_BODY_BYTES = 32_768;

export const contactPayloadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(30).optional(),
  intent: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(5000),
  preferredDate: z.string().trim().max(20).optional(),
  preferredTime: z.string().trim().max(20).optional(),
  timezone: z.string().trim().max(64).optional(),
  website: z
    .string()
    .max(0, "Invalid submission")
    .optional()
    .or(z.literal("")),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  company: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(30).optional(),
  intent: z.string().trim().min(1, "Please select a topic").max(80),
  message: z
    .string()
    .trim()
    .min(10, "Please share a few more details (at least 10 characters)")
    .max(5000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
