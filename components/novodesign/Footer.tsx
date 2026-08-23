import Image from "next/image";
import { CONTACT } from "./data";
import { Pin, Phone, Mail, Clock, WhatsApp, Instagram, Facebook, ArrowRight } from "./icons";

const NAV = [
  { href: "#servicos", label: "Serviços" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#celulas-tronco", label: "Células-tronco" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Dúvidas frequentes" },
  { href: "#contato", label: "Contato" },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <Image src="/logoamorevet.webp" alt="Amor&Vet" width={112} height={112} className="h-24 w-24 object-contain" />

            <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-white/55">
              Há mais de 10 anos cuidando<br />
              com amor da saúde e do bem-estar dos pets de Londrina e região.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[
                { href: CONTACT.whatsapp, Icon: WhatsApp, label: "WhatsApp" },
                { href: CONTACT.instagram, Icon: Instagram, label: "Instagram" },
                { href: CONTACT.facebook, Icon: Facebook, label: "Facebook" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] text-white/70 transition-colors hover:bg-secondary hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/40">Navegação</h3>
            <ul className="mt-5 space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group inline-flex items-center gap-1.5 text-[0.9rem] text-white/65 transition-colors hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/40">Contato</h3>
            <ul className="mt-5 space-y-3.5 text-[0.88rem] text-white/65">
              <li className="flex items-start gap-2.5">
                <Pin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span>{CONTACT.address}<br />CEP {CONTACT.cep}</span>
              </li>
              <li>
                <a href={CONTACT.phone1} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-secondary" /> {CONTACT.phone1Label}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-secondary" /> {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-secondary" /> Atendimento 24 horas
              </li>
            </ul>
          </div>
        </div>

        {/* Base */}
        <div className="mt-14 flex flex-col items-center gap-2 border-t border-white/10 pt-7 text-center text-[0.78rem] text-white/40 sm:flex-row sm:justify-between sm:text-left">
          <p>© 2024 Amor&Vet — Clínica Veterinária · CNPJ 43.350.042/0001-65</p>
          <p>Resp. Técnica: Gabriela N. Dantas — CRMV-PR 16.143</p>
        </div>
      </div>
    </footer>
  );
}
