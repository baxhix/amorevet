import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Amor&Vet - Clínica Veterinária",
    template: "%s | Amor&Vet",
  },
  description:
    "Cuidado veterinário com amor e profissionalismo. Consultas, vacinas, cirurgias e muito mais.",
  keywords: ["clínica veterinária", "veterinário", "pet", "animais"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Amor&Vet",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
