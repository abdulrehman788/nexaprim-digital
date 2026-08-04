import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Sitemap",
  description: "Browse all main Expandova pages and service details in one place.",
  path: "/sitemap",
});

const mainPages = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact Us", href: "/contact" },
] as const;

export default function HtmlSitemapPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20 pt-28 sm:pt-32">
      <Container>
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">
            Site map
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Sitemap
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Quick links to our main pages and every service we offer.
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-bold text-slate-900">Main pages</h2>
            <ul className="mt-5 space-y-2.5">
              {mainPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="group flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-violet-600"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500"
                      aria-hidden="true"
                    />
                    <span className="underline-offset-2 group-hover:underline">{page.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-slate-500">
              Machine-readable version:{" "}
              <a href="/sitemap.xml" className="font-medium text-violet-600 hover:underline">
                sitemap.xml
              </a>
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-bold text-slate-900">Services</h2>
            <ul className="mt-5 max-h-[28rem] space-y-2 overflow-y-auto pr-1">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="group flex items-start gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-violet-600"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400"
                      aria-hidden="true"
                    />
                    <span className="underline-offset-2 group-hover:underline">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </main>
  );
}
