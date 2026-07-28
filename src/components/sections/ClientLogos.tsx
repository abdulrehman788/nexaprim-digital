import { ClientLogoItem } from "@/components/ui/ClientLogoItem";
import { Container } from "@/components/ui/Container";
import { clients, clientLogosHeading } from "@/data/clients";

export function ClientLogos() {
  return (
    <section aria-label="Client logos" className="bg-slate-50 py-10 sm:py-12">
      <Container>
        <div className="w-full rounded-2xl border border-slate-200/80 bg-white px-5 py-8 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.08)] sm:px-8 sm:py-9 lg:px-10">
          <p className="mb-7 text-center text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-500 sm:mb-8 sm:text-xs">
            {clientLogosHeading}
          </p>

          <ul className="grid grid-cols-1 items-center gap-8 sm:grid-cols-3 sm:gap-0">
            {clients.map((client, index) => (
              <li
                key={client.id}
                className={`w-full ${
                  index > 0 ? "sm:border-l sm:border-slate-200/80" : ""
                }`}
              >
                <ClientLogoItem
                  name={client.name}
                  logo={client.logo}
                  logoAlt={client.logoAlt}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
