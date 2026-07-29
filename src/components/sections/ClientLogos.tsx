import { ClientLogoItem } from "@/components/ui/ClientLogoItem";
import { Container } from "@/components/ui/Container";
import { clients, clientLogosHeading } from "@/data/clients";

/**
 * Fully dark partners strip — black surface end-to-end so any logo
 * sits on the same ground as the rest of the homepage.
 */
export function ClientLogos() {
  return (
    <section aria-label="Client logos" className="bg-[#050505] py-12 sm:py-14">
      <Container>
        <div className="w-full rounded-2xl border border-white/10 bg-black px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <p className="mb-8 text-center text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-400 sm:mb-9 sm:text-xs">
            {clientLogosHeading}
          </p>

          <ul className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-3 sm:gap-5">
            {clients.map((client) => (
              <li key={client.id} className="w-full">
                <div className="flex h-full min-h-[5.5rem] items-center justify-center rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-4 sm:min-h-[6.25rem] sm:px-5">
                  <ClientLogoItem
                    name={client.name}
                    logo={client.logo}
                    logoAlt={client.logoAlt}
                    size={client.logoSize}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
