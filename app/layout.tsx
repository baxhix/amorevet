import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amorevet.letshub.com.br";

export const metadata: Metadata = {
  title: {
    default: "Amor&Vet - Clínica Veterinária",
    template: "%s | Amor&Vet",
  },
  description:
    "Clínica veterinária com mais de 10 anos de experiência. Consultas, vacinas, cirurgias, exames e muito mais para cães, gatos e animais exóticos.",
  keywords: [
    "clínica veterinária",
    "veterinário",
    "pet",
    "animais",
    "consulta veterinária",
    "vacinação pets",
    "cirurgia veterinária",
    "saúde animal",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Amor&Vet",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/logoamorevet.webp`,
        width: 800,
        height: 600,
        alt: "Amor&Vet Clínica Veterinária",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
