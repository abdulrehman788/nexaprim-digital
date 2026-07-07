import type { ReactNode } from "react";

export function AdminFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-zinc-100 px-6 py-5 last:border-b-0 sm:px-8 sm:py-6">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
        {description ? <p className="mt-0.5 text-xs text-zinc-500">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
