import { CONTACT } from "./data";
import { Pin, ArrowRight } from "./icons";
import { Reveal } from "./motion";
import { SectionTitle, Lede } from "./ui";
import ContactForm from "./ContactForm";

const INFO = [
  { label: "Endereço", value: CONTACT.address, sub: `CEP ${CONTACT.cep}` },
  { label: "Telefones", value: `${CONTACT.phone1Label} · ${CONTACT.phone2Label}` },
  { label: "E-mail", value: CONTACT.email },
  { label: "Horário", value: "Pronto atendimento 24 horas" },
];

export default function Contact() {
  return (
    <section id="contato" className="relative overflow-hidden bg-ink py-24 text-white sm:py-28">
      <div className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          {/* Informações */}
          <Reveal>
            <SectionTitle light>Vamos cuidar do seu pet juntos</SectionTitle>
            <Lede light className="mt-5 max-w-md">
              Chame no WhatsApp ou preencha o formulário — nossa equipe responde
              com toda a atenção que você e o seu pet merecem.
            </Lede>

            <div className="mt-9 grid gap-8 sm:grid-cols-2">
              {INFO.map((item) => (
                <div key={item.label}>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary-light">{item.label}</p>
                  <p className="mt-2 text-[0.98rem] font-medium text-white/90">{item.value}</p>
                  {item.sub && <p className="text-[0.82rem] text-white/45">{item.sub}</p>}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Formulário */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>

      {/* ── Mapa protagonista ─────────────────────────────── */}
      <Reveal delay={0.05} className="relative mx-auto mt-16 max-w-7xl px-6 sm:px-8">
        <div className="relative h-[440px] overflow-hidden rounded-[2rem] nd-shadow-lg ring-1 ring-white/10 sm:h-[560px]">
          <iframe
            title="Localização da Amor&Vet em Londrina"
            src={`https://maps.google.com/maps?q=${CONTACT.mapsQuery}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
          />
          {/* Card de endereço */}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-8 sm:left-8 sm:max-w-sm">
            <div className="pointer-events-auto rounded-2xl bg-white p-6 nd-shadow-lg">
              <div className="flex items-center gap-2 text-primary">
                <Pin className="h-5 w-5" />
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]">Onde estamos</span>
              </div>
              <p className="mt-3 text-[1.05rem] font-bold leading-snug text-ink">
                Av. Aminthas de Barros, 475
              </p>
              <p className="mt-1 text-[0.9rem] text-ink/60">Ipanema, Londrina/PR · CEP {CONTACT.cep}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${CONTACT.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[0.9rem] font-semibold text-white nd-shadow-teal transition-transform hover:scale-[1.02] active:scale-95"
              >
                Como chegar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
