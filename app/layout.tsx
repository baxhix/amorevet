import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Amor&Vet — Clínica Veterinária em Londrina",
    template: "%s | Amor&Vet",
  },
  description:
    "Clínica veterinária em Londrina com pronto atendimento 24h. Consultas, cirurgias, exames, especialidades e terapia com células-tronco para cães, gatos e exóticos.",
  applicationName: SITE_NAME,
  keywords: [
    "clínica veterinária Londrina",
    "veterinário 24h Londrina",
    "pronto atendimento veterinário",
    "cirurgia veterinária",
    "exames veterinários",
    "células-tronco veterinária",
    "emergência pet Londrina",
    "cães gatos exóticos",
  ],
  authors: [{ name: SITE_NAME }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Amor&Vet — Clínica Veterinária em Londrina",
    description: "Pronto atendimento 24h, centro cirúrgico, exames e especialidades. Cuidado com amor para o seu pet.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Amor&Vet — Clínica Veterinária em Londrina" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amor&Vet — Clínica Veterinária em Londrina",
    description: "Pronto atendimento 24h, centro cirúrgico, exames e especialidades. Cuidado com amor para o seu pet.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
