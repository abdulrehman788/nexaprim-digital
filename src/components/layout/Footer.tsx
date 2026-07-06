import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import {
  footerQuickLinks,
  footerServiceLinks,
  footerTagline,
  siteConfig,
  socialLinks,
} from "@/lib/constants";

const socialStyles: Record<string, string> = {
  Instagram: "bg-gradient-to-br from-pink-500 to-purple-600",
  LinkedIn: "bg-[#0A66C2]",
  Facebook: "bg-[#1877F2]",
  YouTube: "bg-[#FF0000]",
  Twitter: "bg-[#1DA1F2]",
};

export function Footer() {
  const { address } = siteConfig;
  const locationLine = `${address.city}, ${address.region} ${address.postalCode}`;

  return (
    <footer className="bg-black py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="NexaPrime Digital — Home">
              <span className="bg-gold-gradient flex h-12 w-12 items-center justify-center rounded-lg font-display text-xl font-extrabold text-black shadow-glow">
                N
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
                  NexaPrime
                </span>
                <span className="text-gold-gradient font-display text-sm font-bold uppercase tracking-[0.2em]">
                  Digital
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-content-secondary">{footerTagline}</p>

            <ul className="mt-8 flex flex-wrap gap-3" aria-label="Social media links">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90 ${socialStyles[social.label] ?? "bg-surface-elevated"}`}
                  >
                    <SocialIcon name={social.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-base font-bold text-white">Quick Links</h2>
            <ul className="mt-5 space-y-3">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2.5 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-accent"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-base font-bold text-white">Our Services</h2>
            <ul className="mt-5 space-y-3">
              {footerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-start gap-2.5 text-sm text-content-secondary transition-colors hover:text-accent"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-base font-bold text-white">Get in Touch</h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${address.street}, ${address.city}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-content-secondary transition-colors hover:text-accent"
                >
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    {address.street}
                    <br />
                    {locationLine}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-content-secondary transition-colors hover:text-accent"
                >
                  <Mail className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-content-secondary transition-colors hover:text-accent"
                >
                  <Phone className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-content-muted">
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-sm text-content-muted">Strategy, Creative &amp; Growth</p>
        </div>
      </Container>
    </footer>
  );
}
