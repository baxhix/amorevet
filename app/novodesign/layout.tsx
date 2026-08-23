import type { Metadata } from "next";
import Nav from "@/components/novodesign/Nav";
import Footer from "@/components/novodesign/Footer";
import WhatsAppFab from "@/components/novodesign/WhatsAppFab";
import { HeroThemeProvider } from "@/components/novodesign/HeroTheme";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amorevet.letshub.com.br";

export const metadata: Metadata = {
  title: "Amor&Vet — Clínica Veterinária em Londrina | Cuidado com amor 24h",
  description:
    "Há mais de 10 anos cuidando de cães, gatos e exóticos em Londrina. Pronto atendimento 24h, centro cirúrgico, exames, especialidades e terapia com células-tronco.",
  alternates: { canonical: `${SITE_URL}/novodesign` },
  robots: { index: false, follow: false },
};

export default function NovoDesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nd min-h-screen">
      <HeroThemeProvider>
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </HeroThemeProvider>
    </div>
  );
}
