import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { packages } from "@/data/packages";

export function PackagesGrid() {
  return (
    <Section variant="light" aria-labelledby="packages-grid-heading" divider={false}>
      <Container>
        <h2 id="packages-grid-heading" className="sr-only">
          All packages
        </h2>

        <ul className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <li key={pkg.id}>
                <Card
                  featured={pkg.featured}
                  className="relative flex h-full flex-col border-slate-200 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-14px_rgba(15,23,42,0.18)]"
                >
                  {pkg.badge ? (
                    <Badge className="absolute -top-3 left-5">{pkg.badge}</Badge>
                  ) : null}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{pkg.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{pkg.description}</p>
                  <p className="mt-3 text-xs font-medium text-slate-500">{pkg.timeline}</p>
                  <Link
                    href={pkg.href}
                    className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gold-600"
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Card>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
