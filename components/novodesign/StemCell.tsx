import { STEM_CELL_INDICATIONS, CONTACT } from "./data";
import { Dna, Check } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { Lede, ButtonWhatsApp } from "./ui";

export default function StemCell() {
  return (
    <section id="celulas-tronco" className="relative overflow-hidden bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
          {/* Texto — mesma cor do fundo (sem box) */}
          <Reveal>
            <h2 className="text-[2rem] font-bold leading-[1.12] tracking-tight text-primary sm:text-[2.5rem]">
              Laboratório de<br />Terapia Celular
            </h2>
            <Lede className="mt-5 max-w-lg">
              Medicina regenerativa com células-tronco para reparar tecidos e
              auxiliar no tratamento de diversas doenças, trazendo qualidade de
              vida aos nossos pacientes. Contamos com banco de células-tronco de
              cães, gatos e equinos, além de serviço especializado para a decisão
              do melhor protocolo terapêutico.
            </Lede>
            <div className="mt-8">
              <ButtonWhatsApp href={CONTACT.whatsapp}>Saiba mais pelo WhatsApp</ButtonWhatsApp>
            </div>
            <div className="mt-9 grid max-w-md grid-cols-2 gap-6 border-t border-ink/10 pt-7">
              <div>
                <div className="flex items-center gap-2 text-primary">
                  <Dna className="h-5 w-5" />
                  <span className="text-[1.5rem] font-bold text-ink">Banco próprio</span>
                </div>
                <p className="mt-1 text-[0.82rem] text-ink/50">cães, gatos e equinos</p>
              </div>
              <div>
                <span className="text-[1.5rem] font-bold text-ink">Protocolo</span>
                <p className="mt-1 text-[0.82rem] text-ink/50">decisão especializada</p>
              </div>
            </div>
          </Reveal>

          {/* Indicações — lista limpa, sem caixas */}
          <Reveal delay={0.1}>
            <h3 className="text-lg font-semibold text-ink">Indicada para diversas condições</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/55">
              Ganhos reais de qualidade de vida em casos ortopédicos, neurológicos,
              renais e geriátricos.
            </p>
            <Stagger className="mt-7 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {STEM_CELL_INDICATIONS.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[0.9rem] leading-snug text-ink/70">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
