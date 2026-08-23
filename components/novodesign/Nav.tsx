"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CONTACT } from "./data";
import { WhatsApp } from "./icons";
import { useHeroTheme } from "./HeroTheme";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#equipe", label: "Equipe" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

export default function Nav() {
  const { navLight } = useHeroTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // texto claro quando scrollado (barra verde) ou sobre slides coloridas; escuro sobre a slide branca
  const lightText = scrolled || navLight;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2 transition-all duration-300 sm:px-5 ${
          scrolled ? "bg-primary/90 backdrop-blur-xl ring-1 ring-white/15 nd-shadow-lg" : ""
        }`}
      >
        {/* Logo */}
        <Link href="#topo" aria-label="Amor&Vet — início" className="flex items-center">
          <Image
            src="/logoamorevet.webp"
            alt="Amor&Vet"
            width={128}
            height={128}
            priority
            className={`object-contain transition-all duration-300 ${scrolled ? "h-10 w-10" : "h-24 w-24 sm:h-28 sm:w-28"} ${
              lightText ? "drop-shadow-[0_3px_10px_rgba(0,0,0,0.3)]" : "[filter:brightness(0)_opacity(0.82)]"
            }`}
          />
        </Link>

        {/* Links desktop */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-[0.9rem] font-semibold transition-colors ${
                lightText ? "text-white/85 hover:bg-white/10 hover:text-white" : "text-ink/75 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-[0.85rem] font-semibold text-white nd-shadow-coral transition-[transform,background-color] hover:bg-secondary-dark active:scale-95"
          >
            <WhatsApp className="h-4 w-4" />
            Agendar
          </a>
        </div>

        {/* Hambúrguer mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className={`grid h-10 w-10 place-items-center rounded-xl transition-colors lg:hidden ${
            lightText ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/5"
          }`}
        >
          <div className="relative h-4 w-5">
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-all ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </div>
        </button>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl bg-primary/95 backdrop-blur-xl nd-shadow-lg ring-1 ring-white/15 lg:hidden"
          >
            <div className="flex flex-col p-3">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="rounded-xl px-4 py-3 text-[0.95rem] font-semibold text-white/85 transition-colors hover:bg-white/10"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-3.5 text-[0.95rem] font-semibold text-white"
              >
                <WhatsApp className="h-5 w-5" /> Agendar pelo WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
