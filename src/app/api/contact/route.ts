import { NextResponse } from "next/server";
import { z } from "zod";

import {
  CONTACT_MAX_BODY_BYTES,
  contactPayloadSchema,
} from "@/lib/contact-schema";
import { isAllowedRequestOrigin } from "@/lib/security/origin";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

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

    if (honeypot) {
      return NextResponse.json({ success: true });
    }
    const endpoint = process.env.CONTACT_FORM_ENDPOINT;

    if (endpoint) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.CONTACT_FORM_API_KEY
            ? { Authorization: `Bearer ${process.env.CONTACT_FORM_API_KEY}` }
            : {}),
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: "Unable to send your message right now. Please try again later." },
          { status: 502 },
        );
      }
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
