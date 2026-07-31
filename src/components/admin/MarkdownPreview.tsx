import { cn } from "@/lib/utils";

const IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(IMAGE_RE.source, "g");

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const alt = match[1] ?? "";
    const src = match[2] ?? "";
    if (src) {
      parts.push(
        <span
          key={`${src}-${match.index}`}
          className="my-3 block overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="h-auto w-full" loading="lazy" decoding="async" />
          {alt ? (
            <span className="block border-t border-slate-100 px-3 py-1.5 text-center text-xs text-slate-500">
              {alt}
            </span>
          ) : null}
        </span>,
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts.length > 0 ? parts : text;
}

export function MarkdownPreview({
  content,
  className,
  emptyMessage = "Nothing to preview yet. Switch to Write and add some content.",
}: {
  content: string;
  className?: string;
  emptyMessage?: string;
}) {
  const trimmed = content.trim();
  if (!trimmed) {
    return (
      <p className={cn("py-16 text-center text-sm text-slate-400", className)}>{emptyMessage}</p>
    );
  }

  const blocks = content.split(/\n\n+/).map((block, index) => {
    const text = block.trim();
    if (!text) return null;

    const soloImage = text.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)$/);
    if (soloImage) {
      const alt = soloImage[1] ?? "";
      const src = soloImage[2] ?? "";
      return (
        <figure
          key={`img-${index}`}
          className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="h-auto w-full" loading="lazy" decoding="async" />
          {alt ? (
            <figcaption className="border-t border-slate-100 px-3 py-2 text-center text-xs text-slate-500">
              {alt}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    if (text.startsWith("### ")) {
      return (
        <h3 key={`h3-${index}`} className="text-lg font-semibold text-slate-900">
          {text.slice(4)}
        </h3>
      );
    }
    if (text.startsWith("## ")) {
      return (
        <h2 key={`h2-${index}`} className="text-xl font-semibold text-slate-900">
          {text.slice(3)}
        </h2>
      );
    }
    if (text.startsWith("# ")) {
      return (
        <h2 key={`h1-${index}`} className="text-xl font-semibold text-slate-900">
          {text.slice(2)}
        </h2>
      );
    }
    if (text.startsWith("> ")) {
      return (
        <blockquote
          key={`q-${index}`}
          className="border-l-4 border-orange-400 pl-4 text-slate-600 italic"
        >
          {text
            .split("\n")
            .map((line) => line.replace(/^>\s?/, ""))
            .join("\n")}
        </blockquote>
      );
    }
    if (/^[-*]\s/.test(text) || /^\d+\.\s/.test(text)) {
      const ordered = /^\d+\.\s/.test(text);
      const Tag = ordered ? "ol" : "ul";
      const items = text.split("\n").filter(Boolean);
      return (
        <Tag
          key={`list-${index}`}
          className={cn(
            "space-y-1 pl-5 text-slate-700",
            ordered ? "list-decimal" : "list-disc",
          )}
        >
          {items.map((item, i) => (
            <li key={i}>{item.replace(/^([-*]|\d+\.)\s+/, "")}</li>
          ))}
        </Tag>
      );
    }

    return (
      <p key={`p-${index}`} className="text-base leading-relaxed text-slate-700">
        {renderInline(text)}
      </p>
    );
  });

  return <div className={cn("space-y-4", className)}>{blocks}</div>;
}
