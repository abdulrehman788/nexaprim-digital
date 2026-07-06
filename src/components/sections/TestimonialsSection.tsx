import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { testimonials, testimonialsSection } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <Section variant="dark" aria-labelledby="testimonials-heading">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2
              id="testimonials-heading"
              className="font-display text-display-sm text-content-primary sm:text-display-md"
            >
              {testimonialsSection.title}
            </h2>
            <p className="mt-4 text-base text-content-secondary">
              {testimonialsSection.description}
            </p>
          </div>
          <Button href={testimonialsSection.ctaHref} variant="outline">
            {testimonialsSection.ctaLabel}
          </Button>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.id}>
              <article className="group relative overflow-hidden rounded-xl">
                <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {item.industry}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-content-primary sm:text-2xl">
                      {item.headline}
                    </h3>
                    <p className="mt-2 text-sm text-content-secondary line-clamp-2">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex items-center gap-1 rounded-lg border border-border bg-navy-900/60 px-4 py-2 text-sm font-semibold text-content-primary backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      View Case Study
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
