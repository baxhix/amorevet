import Image from "next/image";
import { SPACE_ITEMS } from "./data";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SectionHead } from "./ui";

/* spans para um layout bento com 8 fotos (4 colunas no desktop) */
const SPANS = [
  "sm:col-span-2 sm:row-span-2", // 0 — destaque
  "",                            // 1
  "",                            // 2
  "",                            // 3
  "",                            // 4
  "sm:col-span-2",               // 5 — largo
  "",                            // 6
  "",                            // 7
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

        <Stagger className="mt-14 grid auto-rows-[150px] grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[160px]">
          {SPACE_ITEMS.map((item, i) => (
            <StaggerItem key={item.label} className={`group ${SPANS[i] ?? ""}`}>
              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] ring-1 ring-ink/5">
                <Image
                  src={item.photo}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-[0.8rem] font-semibold text-ink backdrop-blur">
                    {item.label}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
