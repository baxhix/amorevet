import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Quando NOVODESIGN_ROOT=1 (ex.: no deploy da Vercel), a raiz "/" mostra o novo design.
  // Sem a variável, o site funciona normalmente e /novodesign continua acessível.
  async rewrites() {
    if (process.env.NOVODESIGN_ROOT === "1") {
      return [{ source: "/", destination: "/novodesign" }];
    }
    return [];
  },
};

export default nextConfig;
