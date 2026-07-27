"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { catalogCategories } from "@/data/growth-catalog";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type Filter = "all" | (typeof catalogCategories)[number]["id"];

export function ServicesCatalog() {
  const [filter, setFilter] = useState<Filter>("all");

  const visibleCategories = useMemo(
    () => (filter === "all" ? catalogCategories : catalogCategories.filter((c) => c.id === filter)),
    [filter],
  );

  return (
    <section
      aria-labelledby="services-catalog-heading"
      className="bg-white py-20 lg:py-28"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            The catalog
          </p>
          <h2
            id="services-catalog-heading"
            className="mt-3 font-display text-display-sm font-bold text-slate-900 sm:text-display-md"
          >
            Everything you need to expand
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Five capabilities, one accountable team. Pick individual services and build a proposal
            with a live total, or bundle them into a package.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              filter === "all"
                ? "border-accent bg-accent text-white"
                : "border-slate-300 text-slate-600 hover:border-accent/60 hover:text-slate-900",
            )}
          >
            All
          </button>
          {catalogCategories.map((category) => {
            const Icon = category.icon;
            const isActive = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-slate-300 text-slate-600 hover:border-accent/60 hover:text-slate-900",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="mt-14 space-y-16">
          {visibleCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id}>
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-muted text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-500">{category.tagline}</p>
                  </div>
                </div>

                <ul className="mt-8 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {category.services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href="/pricing"
                        className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_-24px_rgba(139,92,246,0.5)]"
                      >
                        <span className="font-display text-lg font-bold text-slate-900">
                          {service.name}
                        </span>
                        <span className="mt-6 flex items-end justify-between">
                          <span className="text-sm text-slate-500">
                            From{" "}
                            <span className="font-semibold text-slate-900">
                              {currency.format(service.price)}
                              {service.unit === "month" ? "/mo" : ""}
                            </span>
                          </span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-hover:bg-accent group-hover:text-white">
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 text-center sm:px-10 sm:py-14">
          <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Build your custom proposal
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Add any mix of services and watch your estimate update in real time.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-accent px-10 py-3.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-accent-hover sm:text-base"
          >
            Open the quote builder
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
