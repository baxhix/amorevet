"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FAQS, CONTACT } from "./data";
import { Plus } from "./icons";
import { Reveal } from "./motion";
import { SectionTitle, Lede, ButtonWhatsApp } from "./ui";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-white py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        {/* Intro */}
        <Reveal className="lg:sticky lg:top-28">
          <SectionTitle><span className="text-primary">Perguntas<br />frequentes</span></SectionTitle>
          <Lede className="mt-5">
            Não encontrou o que procurava? Fale com a nossa equipe — respondemos
            com carinho e clareza.
          </Lede>
          <div className="mt-7">
            <ButtonWhatsApp href={CONTACT.whatsapp}>Falar no WhatsApp</ButtonWhatsApp>
          </div>
        </Reveal>

        {/* Lista */}
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl bg-cream transition-all ${
                    isOpen ? "nd-shadow-sm" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[1rem] font-semibold text-ink">{f.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-secondary text-white" : "bg-ink/5 text-ink/60"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-[0.92rem] leading-relaxed text-ink/60">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
