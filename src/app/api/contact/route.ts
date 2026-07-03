import { NextResponse } from "next/server";
import { z } from "zod";

const contactPayloadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  intent: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const data = contactPayloadSchema.parse(body);

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
        body: JSON.stringify(data),
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
