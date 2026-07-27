"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Plus, X } from "lucide-react";

import { catalogCategories } from "@/data/growth-catalog";
import type { CatalogService } from "@/data/growth-catalog";
import { ctaLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const serviceLookup = new Map<string, CatalogService & { category: string }>();
for (const category of catalogCategories) {
  for (const service of category.services) {
    serviceLookup.set(service.id, { ...service, category: category.name });
  }
}

export function QuoteBuilder() {
  const [activeCategory, setActiveCategory] = useState(catalogCategories[0]!.id);
  const [selected, setSelected] = useState<string[]>([]);

  const current = catalogCategories.find((c) => c.id === activeCategory)!;

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const { projectTotal, monthlyTotal } = useMemo(() => {
    let project = 0;
    let monthly = 0;
    for (const id of selected) {
      const svc = serviceLookup.get(id);
      if (!svc) continue;
      if (svc.unit === "month") monthly += svc.price;
      else project += svc.price;
    }
    return { projectTotal: project, monthlyTotal: monthly };
  }, [selected]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(300px,360px)] lg:gap-8">
      {/* Catalog */}
      <div>
        <div className="flex flex-wrap gap-2">
          {catalogCategories.map((category) => {
            const Icon = category.icon;
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-border text-content-secondary hover:border-accent/50 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {category.name}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-content-muted">{current.tagline}</p>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {current.services.map((service) => {
            const isSelected = selected.includes(service.id);
            return (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => toggle(service.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left transition-all",
                    isSelected
                      ? "border-accent/60 bg-accent-muted shadow-glow"
                      : "border-border-subtle bg-surface-elevated hover:border-accent/40",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-bold text-white">
                      {service.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-content-muted">
                      From {currency.format(service.price)}
                      {service.unit === "month" ? "/mo" : ""}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                      isSelected
                        ? "border-accent bg-accent text-white"
                        : "border-border text-content-secondary",
                    )}
                    aria-hidden="true"
                  >
                    {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Live summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-surface-secondary p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-white">Your proposal</h3>
            {selected.length > 0 ? (
              <button
                type="button"
                onClick={() => setSelected([])}
                className="text-xs font-semibold text-content-muted transition-colors hover:text-accent"
              >
                Clear all
              </button>
            ) : null}
          </div>

          {selected.length === 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-content-muted">
              Add services to build your custom proposal. Your estimated total updates instantly.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
              {selected.map((id) => {
                const svc = serviceLookup.get(id);
                if (!svc) return null;
                return (
                  <li
                    key={id}
                    className="flex items-center justify-between gap-2 rounded-lg bg-surface-elevated px-3 py-2"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-content-primary">
                        {svc.name}
                      </span>
                      <span className="text-xs text-content-muted">
                        {currency.format(svc.price)}
                        {svc.unit === "month" ? "/mo" : ""}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggle(id)}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-content-muted transition-colors hover:bg-white/10 hover:text-white"
                      aria-label={`Remove ${svc.name}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <dl className="mt-5 space-y-2 border-t border-border-subtle pt-5">
            {projectTotal > 0 ? (
              <div className="flex items-baseline justify-between">
                <dt className="text-sm text-content-secondary">One-time from</dt>
                <dd className="font-display text-xl font-bold text-white">
                  {currency.format(projectTotal)}
                </dd>
              </div>
            ) : null}
            {monthlyTotal > 0 ? (
              <div className="flex items-baseline justify-between">
                <dt className="text-sm text-content-secondary">Monthly from</dt>
                <dd className="font-display text-xl font-bold text-white">
                  {currency.format(monthlyTotal)}
                  <span className="text-sm font-medium text-content-muted">/mo</span>
                </dd>
              </div>
            ) : null}
            {projectTotal === 0 && monthlyTotal === 0 ? (
              <div className="flex items-baseline justify-between">
                <dt className="text-sm text-content-secondary">Estimated total</dt>
                <dd className="font-display text-xl font-bold text-white">$0</dd>
              </div>
            ) : null}
          </dl>

          <Link
            href={ctaLinks.consultation}
            className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-accent-hover"
          >
            {selected.length > 0 ? "Request this proposal" : "Book a free consultation"}
          </Link>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-content-muted">
            Indicative starting prices. We&apos;ll tailor a final quote to your scope.
          </p>
        </div>
      </aside>
    </div>
  );
}
