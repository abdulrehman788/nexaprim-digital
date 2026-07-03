import Link from "next/link";
import { Camera, Globe, Link2, Share2 } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { footerColumns, siteConfig, socialLinks } from "@/lib/constants";

const socialIcons = {
  LinkedIn: Link2,
  Twitter: Share2,
  Instagram: Camera,
  Facebook: Globe,
} as const;

export function Footer() {
  const { address } = siteConfig;
  const fullAddress = `${address.street}, ${address.city}, ${address.region} ${address.postalCode}`;

  return (
    <footer className="border-t border-border-subtle bg-surface-primary py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label="NexaPrime Digital — Home">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent font-display text-lg font-extrabold text-content-inverse">
                N
              </span>
              <span className="font-display text-sm font-bold uppercase tracking-wider text-content-primary">
                NexaPrime <span className="text-accent">Digital</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-content-secondary">
              {siteConfig.description}
            </p>
            <address className="mt-6 not-italic text-sm text-content-muted">
              <p>{fullAddress}</p>
              <p className="mt-1">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                  {siteConfig.email}
                </a>
              </p>
              <p className="mt-1">
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {siteConfig.phone}
                </a>
              </p>
            </address>
            <ul className="mt-6 flex gap-3" aria-label="Social media links">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons] ?? Globe;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-content-secondary transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-content-primary">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-content-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-sm text-content-muted">
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-sm text-content-muted">
            Digital marketing agency — Strategy, Creative &amp; Growth
          </p>
        </div>
      </Container>
    </footer>
  );
}
