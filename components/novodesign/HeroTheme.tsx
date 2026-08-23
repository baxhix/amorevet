"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/* navLight = true → a navbar (no topo, sem scroll) usa texto claro (sobre hero escuro/colorido).
   navLight = false → texto escuro (sobre a slide branca). */
const HeroThemeCtx = createContext<{
  navLight: boolean;
  setNavLight: (v: boolean) => void;
}>({ navLight: true, setNavLight: () => {} });

export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [navLight, setNavLight] = useState(true);
  return (
    <HeroThemeCtx.Provider value={{ navLight, setNavLight }}>
      {children}
    </HeroThemeCtx.Provider>
  );
}

export const useHeroTheme = () => useContext(HeroThemeCtx);
