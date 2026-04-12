"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">

      {/* ── TOP BAR ─────────────────────────────────────── */}
      <div className="bg-dark text-white/70 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-1">
              <a
                href="mailto:contato.amorevet@gmail.com"
                className="flex items-center gap-1.5 hover:text-secondary-light transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 flex-shrink-0">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                contato.amorevet@gmail.com
              </a>
              <a
                href="tel:+5543988631862"
                className="flex items-center gap-1.5 hover:text-secondary-light transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 flex-shrink-0">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (43) 98863-1862
              </a>
              <span className="hidden md:flex items-center gap-1.5 opacity-50">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 flex-shrink-0">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Av. Aminthas de Barros, 475 — Londrina/PR
              </span>
            </div>
            <span className="hidden sm:flex items-center gap-1 text-secondary-light font-medium">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Pronto Atendimento 24h
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ─────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <Image
                src="/logoamorevet.webp"
                alt="Amor&Vet Clínica Veterinária"
                width={52}
                height={52}
                className="object-contain"
                priority
              />
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-dark leading-none">
                  Amor<span className="text-secondary">&</span>Vet
                </span>
                <span className="block text-xs font-normal text-dark-400 tracking-wide mt-0.5">
                  Clínica Veterinária
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-dark-600 hover:text-dark font-medium transition-colors text-sm rounded-lg hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/5543993777792"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 bg-secondary text-white px-5 py-2.5 rounded-xl hover:bg-secondary-dark transition-all font-semibold text-sm shadow-sm hover:shadow-md active:scale-95"
              >
                Agendar Consulta
              </a>
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl text-dark-600 hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 mt-1">
              <nav className="flex flex-col gap-1 pt-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2.5 text-dark-600 hover:text-dark hover:bg-gray-50 rounded-lg font-medium transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://wa.me/5543993777792"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 bg-secondary text-white px-5 py-3 rounded-xl hover:bg-secondary-dark transition-colors font-semibold text-sm text-center"
                >
                  Agendar Consulta
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
