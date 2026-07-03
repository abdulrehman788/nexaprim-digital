"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import {
  contactIntentOptions,
  contactSection,
} from "@/data/contact";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  intent: z.string().min(1, "Please select a topic"),
  message: z
    .string()
    .min(10, "Please share a few more details (at least 10 characters)"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type ContactFormTheme = "dark" | "light";

interface ContactFormProps {
  defaultIntent?: string;
  theme?: ContactFormTheme;
}

const themeStyles = {
  dark: {
    form: "rounded-2xl border border-border-subtle bg-surface-elevated p-6 shadow-card sm:p-8",
    input:
      "w-full rounded-lg border border-border bg-surface-primary px-4 py-3 text-sm text-content-primary placeholder:text-content-muted transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
    label: "mb-2 block text-sm font-medium text-content-primary",
    success:
      "flex flex-col items-center rounded-2xl border border-accent/30 bg-accent-muted px-6 py-12 text-center",
    successTitle: "mt-4 font-display text-xl font-bold text-content-primary",
    successMessage: "mt-2 max-w-sm text-sm leading-relaxed text-content-secondary",
    chevron: "text-accent",
  },
  light: {
    form: "rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8",
    input:
      "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20",
    label: "mb-2 block text-sm font-medium text-slate-900",
    success:
      "flex flex-col items-center rounded-2xl border border-gold-200 bg-gold-50 px-6 py-12 text-center",
    successTitle: "mt-4 font-display text-xl font-bold text-slate-900",
    successMessage: "mt-2 max-w-sm text-sm leading-relaxed text-slate-600",
    chevron: "text-gold-600",
  },
} as const;

export function ContactForm({ defaultIntent, theme = "dark" }: ContactFormProps) {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      intent: defaultIntent ?? "",
      company: "",
      phone: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSubmitState("success");
      reset({ intent: defaultIntent ?? "", company: "", phone: "" });
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  const styles = themeStyles[theme];

  if (submitState === "success") {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 className="h-12 w-12 text-accent" aria-hidden="true" />
        <h3 className={styles.successTitle}>{contactSection.successTitle}</h3>
        <p className={styles.successMessage}>{contactSection.successMessage}</p>
        <Button
          type="button"
          variant="outline"
          className={cn("mt-6", theme === "light" && "border-slate-200 text-slate-900")}
          onClick={() => setSubmitState("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="contact-name" className={styles.label}>
            Full name <span className="text-accent">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            className={cn(styles.input, errors.name && "border-red-400 focus:border-red-400")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="contact-email" className={styles.label}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            className={cn(styles.input, errors.email && "border-red-400 focus:border-red-400")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="contact-company" className={styles.label}>
            Company
          </label>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            className={styles.input}
            {...register("company")}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="contact-phone" className={styles.label}>
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            className={styles.input}
            {...register("phone")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-intent" className={styles.label}>
            How can we help? <span className="text-accent">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-intent"
              className={cn(
                styles.input,
                "appearance-none pr-10",
                errors.intent && "border-red-400 focus:border-red-400",
              )}
              aria-invalid={Boolean(errors.intent)}
              aria-describedby={errors.intent ? "contact-intent-error" : undefined}
              {...register("intent")}
            >
              <option value="">Select a topic</option>
              {contactIntentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={cn("pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2", styles.chevron)}
              aria-hidden="true"
            />
          </div>
          {errors.intent ? (
            <p id="contact-intent-error" className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.intent.message}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={styles.label}>
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            className={cn(
              styles.input,
              "resize-y",
              errors.message && "border-red-400 focus:border-red-400",
            )}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            {...register("message")}
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        pill
        className="mt-6 w-full sm:w-auto"
        disabled={submitState === "loading"}
        icon={
          submitState === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : undefined
        }
      >
        {submitState === "loading" ? "Sending..." : contactSection.submitLabel}
      </Button>
    </form>
  );
}
