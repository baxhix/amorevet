import { SPACE_ITEMS } from "./data";
import { Paw } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SectionHead } from "./ui";

/* spans para um layout bento */
const SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
];

export default function Space() {
  return (
    <section id="espaco" className="relative bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHead title={<span className="text-primary">Um espaço pensado no conforto do seu pet</span>}>
            Ambientes modernos, limpos e acolhedores — do acolhimento na recepção
            ao centro cirúrgico, tudo projetado para segurança e bem-estar.
          </SectionHead>
        </Reveal>

        <Stagger className="mt-14 grid auto-rows-[150px] grid-cols-2 gap-4 sm:grid-cols-4">
          {SPACE_ITEMS.map((item, i) => {
            const coral = item.tone === "coral";
            return (
              <StaggerItem key={item.label} className={`group ${SPANS[i] ?? ""}`}>
                <div
                  className={`relative flex h-full w-full items-end overflow-hidden rounded-[1.5rem] p-5 ring-1 ring-ink/5 ${
                    coral
                      ? "bg-gradient-to-br from-secondary-100 via-secondary-50 to-cream"
                      : "bg-gradient-to-br from-primary-100 via-primary-50 to-cream"
                  }`}
                >
                  <div className="nd-dotgrid absolute inset-0 opacity-30" />
                  <Paw
                    className={`absolute -right-4 -top-2 h-28 w-28 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                      coral ? "text-secondary/15" : "text-primary/15"
                    }`}
                  />
                  <div className="relative">
                    <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-[0.8rem] font-semibold text-ink backdrop-blur">
                      {item.label}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
