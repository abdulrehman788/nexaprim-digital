import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui/Container";
import { ctaLinks } from "@/lib/constants";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#05080f]/95 backdrop-blur-md">
      <Container as="div" className="relative flex h-[72px] items-center">
        <Logo />

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <Navbar />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <a
            href={ctaLinks.consultation}
            className="hidden shrink-0 items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(249,115,22,0.85)] transition hover:bg-orange-400 lg:inline-flex"
          >
            Book a Free Call
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
