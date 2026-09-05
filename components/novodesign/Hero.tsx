"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CONTACT } from "./data";
import { ArrowRight, Star, Clock } from "./icons";
import Counter from "./Counter";
import { useHeroTheme } from "./HeroTheme";

const EASE = [0.22, 1, 0.36, 1] as const;

const HERO_STATS = [
  { to: 10, suffix: "+", label: "anos cuidando" },
  { to: 6, suffix: " mil+", label: "pacientes atendidos" },
  { to: 30, suffix: "+", label: "veterinários" },
  { to: 24, suffix: "h", label: "pronto atendimento" },
];

type Slide = {
  theme: "green" | "coral" | "white";
  light: boolean; // fundo claro → texto escuro
  bg: string;
  badge: string;
  title: ReactNode;
  text: string;
  cta: { label: string; href: string; external?: boolean };
};

const SLIDES: Slide[] = [
  {
    theme: "green",
    light: false,
    bg: "linear-gradient(158deg, #2C807F 0%, #318687 42%, #49A3A2 100%)",
    badge: "Pronto atendimento 24 horas",
    title: (
      <>
        O cuidado que seu pet merece, com{" "}
        <span className="text-secondary-light">amor de verdade</span>.
      </>
    ),
    text: "Há mais de 10 anos cuidando de pets em Londrina, com estrutura completa e muito carinho.",
    cta: { label: "Conhecer a clínica", href: "#servicos" },
  },
  {
    theme: "coral",
    light: false,
    bg: "linear-gradient(158deg, #E4634E 0%, #E96A55 42%, #F0836F 100%)",
    badge: "Equipe especializada",
    title: (
      <>
        Medicina veterinária de excelência, do exame à{" "}
        <span className="underline decoration-white/50 underline-offset-4">cirurgia</span>.
      </>
    ),
    text: "Consultas, exames, centro cirúrgico e internação — tudo num só lugar, com tecnologia de ponta.",
    cta: { label: "Ver serviços", href: "#servicos" },
  },
  {
    theme: "white",
    light: true,
    bg: "#FBF8F4",
    badge: "Inovação & tecnologia",
    title: (
      <>
        Da rotina à <span className="text-primary">terapia com células-tronco</span>.
      </>
    ),
    text: "Tratamentos avançados e medicina regenerativa para uma vida longa e saudável ao lado do seu pet.",
    cta: { label: "Falar no WhatsApp", href: CONTACT.whatsapp, external: true },
  },
];

const N = SLIDES.length;

export default function Hero() {
  const reduce = useReducedMotion();
  const { setNavLight } = useHeroTheme();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((d: number) => setCurrent((c) => (c + d + N) % N), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % N), 7000);
    return () => clearInterval(id);
  }, [paused]);

  // informa a navbar se o texto deve ser claro (slides coloridos) ou escuro (slide branca)
  useEffect(() => {
    setNavLight(!SLIDES[current].light);
    return () => setNavLight(true);
  }, [current, setNavLight]);

  const activeLight = SLIDES[current].light;

  return (
    <section id="topo" className="relative bg-cream">
      {/* Carrossel */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex"
          animate={{ x: `-${current * 100}%` }}
          transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
        >
          {SLIDES.map((s, i) => (
            <div key={i} className="w-full shrink-0" style={{ background: s.bg }}>
              <SlideContent slide={s} active={i === current} onPrev={() => go(-1)} onNext={() => go(1)} />
            </div>
          ))}
        </motion.div>

        {/* Setas laterais (desktop) */}
        <button
          onClick={() => go(-1)}
          aria-label="Slide anterior"
          className={`absolute left-3 top-[42%] z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full backdrop-blur transition sm:left-6 sm:grid ${
            activeLight ? "bg-ink/10 text-ink hover:bg-ink/20" : "bg-white/20 text-white hover:bg-white/35"
          }`}
        >
          <ArrowRight className="h-5 w-5 rotate-180" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Próximo slide"
          className={`absolute right-3 top-[42%] z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full backdrop-blur transition sm:right-6 sm:grid ${
            activeLight ? "bg-ink/10 text-ink hover:bg-ink/20" : "bg-white/20 text-white hover:bg-white/35"
          }`}
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Contador + dots */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ir para slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? activeLight ? "w-6 bg-ink" : "w-6 bg-white"
                    : activeLight ? "w-2 bg-ink/30" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
          <span className={`text-[0.8rem] font-semibold tabular-nums ${activeLight ? "text-ink/70" : "text-white/80"}`}>
            0{current + 1} / 0{N}
          </span>
        </div>
      </div>

      {/* Barra de indicadores (compartilhada) */}
      <div className="relative z-10 mx-auto -mt-10 max-w-7xl px-6 pb-16 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-white nd-shadow-lg">
          <div className="flex flex-col items-center justify-center gap-2 bg-secondary px-6 py-3.5 text-center text-white sm:flex-row sm:gap-3">
            <span className="flex items-center gap-1 text-white">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </span>
            <p className="text-[0.88rem] text-white/90">
              <span className="font-semibold text-white">98% de satisfação</span> · 6 mil+ pacientes atendidos
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {HERO_STATS.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 py-7 text-center ${i > 0 ? "border-l border-ink/8" : ""} ${
                  i === 2 ? "border-l-0 sm:border-l" : ""
                } ${i >= 2 ? "border-t border-ink/8 sm:border-t-0" : ""}`}
              >
                <p className="text-[2rem] font-bold leading-none text-primary">
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[0.82rem] font-medium text-ink/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Conteúdo de uma slide (mesma estrutura, texto/tema variam) ── */
function SlideContent({
  slide,
  active,
  onPrev,
  onNext,
}: {
  slide: Slide;
  active: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  const reduce = useReducedMotion();
  const light = slide.light;
  const arrowCls = `grid h-11 w-11 shrink-0 place-items-center rounded-full transition ${
    light ? "bg-ink/10 text-ink hover:bg-ink/20" : "bg-white/20 text-white hover:bg-white/35"
  }`;

  const fade = (delay: number) =>
    active
      ? {
          initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE, delay },
        }
      : { initial: false as const, animate: { opacity: 1, y: 0 } };

  return (
    <div className="relative overflow-hidden pt-32 pb-20 sm:pt-48 sm:pb-24">
      {/* patas no fundo */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`nd-paws absolute inset-0 ${light ? "opacity-[0.05] [filter:invert(1)]" : "opacity-[0.06]"}`} />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Texto */}
        <div>
          <motion.span
            {...fade(0)}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold ${
              light ? "bg-primary-50 text-primary-dark ring-1 ring-inset ring-primary-100" : "bg-white/95 text-ink"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="nd-pulse-ring absolute inline-flex h-full w-full rounded-full bg-secondary" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
            </span>
            {slide.badge}
          </motion.span>

          <motion.h1
            {...fade(0.08)}
            className={`mt-6 max-w-md text-[2.1rem] font-bold leading-[1.08] tracking-tight sm:text-[2.7rem] lg:text-[3rem] ${
              light ? "text-ink" : "text-white"
            }`}
          >
            {slide.title}
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className={`mt-6 max-w-md text-[1.05rem] leading-relaxed ${light ? "text-ink/60" : "text-white/75"}`}
          >
            {slide.text}
          </motion.p>

          <motion.div {...fade(0.24)} className="mt-9 flex items-center gap-3">
            <a
              href={slide.cta.href}
              target={slide.cta.external ? "_blank" : undefined}
              rel={slide.cta.external ? "noopener noreferrer" : undefined}
              className={`group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-semibold transition-transform hover:scale-[1.02] active:scale-[0.97] ${
                light ? "bg-secondary text-white nd-shadow-coral" : "bg-white text-ink"
              }`}
            >
              {slide.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Setas ao lado do CTA (mobile) */}
            <div className="flex items-center gap-2 sm:hidden">
              <button onClick={onPrev} aria-label="Slide anterior" className={arrowCls}>
                <ArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <button onClick={onNext} aria-label="Próximo slide" className={arrowCls}>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={active && !reduce ? { opacity: 0, scale: 0.94 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div
            className={`relative aspect-square overflow-hidden rounded-[2.4rem] ring-1 ${
              light ? "bg-primary-50 ring-primary-100" : "bg-white/10 ring-white/15"
            } backdrop-blur-sm`}
          >
            <div className={`nd-paws absolute inset-0 ${light ? "opacity-[0.04] [filter:invert(1)]" : "opacity-[0.12]"}`} />
            <div className="absolute inset-0 grid place-items-center">
              <div className="nd-float-slow relative">
                <div className={`absolute -inset-5 rounded-full border-2 border-dashed ${light ? "border-primary/25" : "border-white/30"}`} />
                <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full ring-4 ring-white/60 nd-shadow-lg sm:h-[340px] sm:w-[340px]">
                  <Image src="/hero-equipe.jpg" alt="Equipe Amor&Vet" fill priority sizes="340px" className="object-cover" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 rounded-2xl bg-white/95 px-4 py-2.5 ring-1 ring-ink/5">
              <p className="text-[0.72rem] font-medium uppercase tracking-wide text-ink/45">Onde estamos</p>
              <p className="text-[0.9rem] font-semibold text-ink">Ipanema · Londrina/PR</p>
            </div>
          </div>

          {/* Card flutuante — emergência */}
          <div
            className={`nd-float absolute -left-3 top-8 flex items-center gap-3 rounded-2xl px-4 py-3 nd-shadow-lg sm:-left-7 ${
              slide.theme === "coral" ? "bg-ink text-white" : "bg-secondary text-white"
            }`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 text-white">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[0.9rem] font-bold leading-none text-white">Emergência 24h</p>
              <p className="mt-1 text-[0.75rem] text-white/80">todos os dias</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
