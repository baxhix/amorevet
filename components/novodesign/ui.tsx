import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, WhatsApp } from "./icons";

/* Pequeno rótulo de seção */
export function Eyebrow({
  children,
  tone = "coral",
  className = "",
}: {
  children: ReactNode;
  tone?: "coral" | "teal" | "light";
  className?: string;
}) {
  const map = {
    coral: "text-secondary-dark bg-secondary-50 ring-secondary-100",
    teal: "text-primary-dark bg-primary-50 ring-primary-100",
    light: "text-primary-light bg-white/10 ring-white/15",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset ${map[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* Título de seção — escala única e consistente (h2) */
export function SectionTitle({
  children,
  className = "",
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <h2
      className={`text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-[2.5rem] ${
        light ? "text-white" : "text-ink"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

/* Cabeçalho de seção: título à esquerda, conteúdo à direita (empilha no mobile) */
export function SectionHead({
  title,
  children,
  light = false,
  className = "",
}: {
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12 ${className}`}>
      <SectionTitle light={light}>{title}</SectionTitle>
      {children && <Lede light={light} className="max-w-xl lg:pb-1">{children}</Lede>}
    </div>
  );
}

/* Subtítulo / texto de apoio da seção */
export function Lede({
  children,
  className = "",
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p className={`text-[1.05rem] leading-relaxed ${light ? "text-white/70" : "text-ink/60"} ${className}`}>
      {children}
    </p>
  );
}

type BtnProps = {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
  icon?: ReactNode;
};

/* Botão primário (coral) — CTA principal */
export function ButtonPrimary({ children, href, external, className = "", icon }: BtnProps) {
  const cls =
    "group inline-flex items-center justify-center gap-2.5 rounded-full bg-secondary px-7 py-3.5 text-[0.95rem] font-semibold text-white nd-shadow-coral transition-[transform,background-color] duration-200 hover:bg-secondary-dark active:scale-[0.97]";
  const inner = (
    <>
      {icon}
      {children}
      <span className="grid place-items-center transition-transform duration-200 group-hover:translate-x-1">
        <ArrowRight className="h-4 w-4" />
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} ${className}`}>{inner}</a>
  ) : (
    <Link href={href} className={`${cls} ${className}`}>{inner}</Link>
  );
}

/* Botão secundário (contorno) */
export function ButtonGhost({ children, href, external, className = "", icon }: BtnProps) {
  const cls =
    "inline-flex items-center justify-center gap-2.5 rounded-full border border-ink/12 bg-white/60 px-7 py-3.5 text-[0.95rem] font-semibold text-ink transition-all duration-200 hover:border-primary/40 hover:bg-white hover:text-primary-dark active:scale-[0.97]";
  const inner = (<>{icon}{children}</>);
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} ${className}`}>{inner}</a>
  ) : (
    <Link href={href} className={`${cls} ${className}`}>{inner}</Link>
  );
}

/* Botão de WhatsApp (verde) reutilizável */
export function ButtonWhatsApp({ children, href, className = "" }: { children: ReactNode; href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,.7)] transition-[transform,background-color] duration-200 hover:bg-[#1eb858] active:scale-[0.97] ${className}`}
    >
      <WhatsApp className="h-5 w-5" />
      {children}
    </a>
  );
}
