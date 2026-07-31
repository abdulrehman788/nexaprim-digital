import { NextResponse } from "next/server";
import { z } from "zod";

import {
  CONTACT_MAX_BODY_BYTES,
  contactPayloadSchema,
} from "@/lib/contact-schema";
import { formNameForIntent, isStrategyCallIntent } from "@/lib/forms/intent";
import { siteConfig } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { isAllowedRequestOrigin } from "@/lib/security/origin";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

/** Inbox that receives contact-form submissions */
function getContactInbox(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email;
}

const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  if (!isAllowedRequestOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(
    `contact:${clientIp}`,
    RATE_LIMIT,
    RATE_LIMIT_WINDOW_MS,
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: rateLimit.retryAfterSeconds
          ? { "Retry-After": String(rateLimit.retryAfterSeconds) }
          : undefined,
      },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > CONTACT_MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  try {
    const body: unknown = await request.json();
    const data = contactPayloadSchema.parse(body);

    const { website: honeypot, ...submission } = data;

    if (honeypot?.trim()) {
      return NextResponse.json({ success: true });
    }

    const isCallBooking = isStrategyCallIntent(submission.intent);
    const formName = formNameForIntent(submission.intent);

    await prisma.$transaction(async (tx) => {
      if (isCallBooking) {
        await tx.callBooking.create({
          data: {
            name: submission.name,
            email: submission.email,
            phone: submission.phone ?? null,
            preferredDate: submission.preferredDate ?? null,
            preferredTime: submission.preferredTime ?? null,
            timezone: submission.timezone ?? null,
            topic: submission.message.slice(0, 500),
            status: "PENDING",
            notes: submission.company ? `Company: ${submission.company}` : null,
          },
        });
      } else {
        await tx.contactSubmission.create({
          data: {
            name: submission.name,
            email: submission.email,
            phone: submission.phone ?? null,
            company: submission.company ?? null,
            intent: submission.intent,
            message: submission.message,
          },
        });
      }

      await tx.formSubmission.create({
        data: {
          formName,
          data: JSON.stringify(submission),
        },
      });

      await tx.formFunnelEvent.create({
        data: {
          formName,
          event: "submitted",
        },
      });
    });

    const inbox = getContactInbox();
    const customEndpoint = process.env.CONTACT_FORM_ENDPOINT?.trim();
    const endpoint =
      customEndpoint || `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(process.env.CONTACT_FORM_API_KEY
            ? { Authorization: `Bearer ${process.env.CONTACT_FORM_API_KEY}` }
            : {}),
        },
        body: JSON.stringify({
          ...submission,
          to: inbox,
          _to: inbox,
          _replyto: submission.email,
          _subject: `Expandova contact — ${submission.intent}`,
        }),
      });

      if (!response.ok) {
        console.error("Contact email delivery failed", response.status);
      }
    } catch (emailError) {
      console.error("Contact email delivery error", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Please check your form entries and try again." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
