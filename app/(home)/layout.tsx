import type { Metadata } from "next";
import Nav from "@/components/novodesign/Nav";
import Footer from "@/components/novodesign/Footer";
import WhatsAppFab from "@/components/novodesign/WhatsAppFab";
import { HeroThemeProvider } from "@/components/novodesign/HeroTheme";

export const metadata: Metadata = {
  title: { absolute: "Amor&Vet — Clínica Veterinária em Londrina | Pronto atendimento 24h" },
  description:
    "Há cinco anos cuidando de cães, gatos e exóticos em Londrina. Pronto atendimento 24h, centro cirúrgico, exames, especialidades e terapia com células-tronco.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
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
