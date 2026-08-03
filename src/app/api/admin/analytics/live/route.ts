import { countLiveVisitors } from "@/lib/analytics/rollup";
import { assertAdminApi } from "@/lib/security/guards";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Server-Sent Events stream of live visitor counts. */
export async function GET() {
  const denied = await assertAdminApi();
  if (denied) return denied;

  const encoder = new TextEncoder();
  let closed = false;
  let interval: ReturnType<typeof setInterval> | undefined;
  let heartbeat: ReturnType<typeof setInterval> | undefined;

  const cleanup = () => {
    closed = true;
    if (interval) clearInterval(interval);
    if (heartbeat) clearInterval(heartbeat);
    interval = undefined;
    heartbeat = undefined;
  };

  const stream = new ReadableStream({
    async start(controller) {
      const send = async () => {
        if (closed) return;
        try {
          const visitors = await countLiveVisitors();
          const payload = `data: ${JSON.stringify({
            count: visitors.length,
            visitors: visitors.slice(0, 30),
            at: new Date().toISOString(),
          })}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch {
          cleanup();
          try {
            controller.close();
          } catch {
            // already closed
          }
        }
      };

      await send();
      if (closed) return;

      interval = setInterval(() => {
        void send();
      }, 5000);
      heartbeat = setInterval(() => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`: ping\n\n`));
        } catch {
          cleanup();
        }
      }, 15000);
    },
    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
