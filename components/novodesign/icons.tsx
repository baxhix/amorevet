import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const Stethoscope = (p: P) => (
  <svg {...base(p)}><path d="M5 3v5a4 4 0 008 0V3" /><path d="M5 3H4M9 3H8" /><path d="M9 12a6 6 0 006 6 4 4 0 004-4v-2" /><circle cx="19" cy="9" r="2.2" /></svg>
);
export const Ambulance = (p: P) => (
  <svg {...base(p)}><path d="M3 7h11v8H3zM14 10h3.5l2.5 3v2H14z" /><circle cx="7" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" /><path d="M7 4.5v3M5.5 6h3" /></svg>
);
export const Microscope = (p: P) => (
  <svg {...base(p)}><path d="M6 18h10M9 18l-1-2M14 4l3 3-5 5-3-3z" /><path d="M9 12a5 5 0 105 5" /></svg>
);
export const Scan = (p: P) => (
  <svg {...base(p)}><path d="M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3" /><path d="M4 12h16" /></svg>
);
export const Heart = (p: P) => (
  <svg {...base(p)}><path d="M12 20s-7-4.4-9.2-8.5C1.3 8.6 2.8 5.5 6 5.5c1.9 0 3.2 1.1 4 2.3.8-1.2 2.1-2.3 4-2.3 3.2 0 4.7 3.1 3.2 6C19 15.6 12 20 12 20z" /></svg>
);
export const Surgery = (p: P) => (
  <svg {...base(p)}><path d="M4 4l9 9M4 4l3 .5L8 7M13 13l6.5 6.5a1.4 1.4 0 01-2 2L11 15" /><path d="M14 5l5 5M16.5 3.5l4 4" /></svg>
);
export const Leaf = (p: P) => (
  <svg {...base(p)}><path d="M5 19c0-7 5-12 14-13 .5 7-3 14-11 14-2 0-3-1-3-1z" /><path d="M5 19c3-4 6-6 9-7" /></svg>
);
export const Paw = (p: P) => (
  <svg {...base(p)}><ellipse cx="6" cy="11" rx="1.6" ry="2.1" /><ellipse cx="10" cy="8.5" rx="1.6" ry="2.2" /><ellipse cx="14" cy="8.5" rx="1.6" ry="2.2" /><ellipse cx="18" cy="11" rx="1.6" ry="2.1" /><path d="M12 13c-2.2 0-4 1.6-4 3.4 0 1.5 1.3 2.6 3 2.6.7 0 1-.3 1-.3s.3.3 1 .3c1.7 0 3-1.1 3-2.6 0-1.8-1.8-3.4-4-3.4z" /></svg>
);
export const ShieldCheck = (p: P) => (
  <svg {...base(p)}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
);
export const Users = (p: P) => (
  <svg {...base(p)}><circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0111 0" /><path d="M16 5.5a3 3 0 010 6M17 14.5a5.5 5.5 0 013.5 5.5" /></svg>
);
export const Sparkle = (p: P) => (
  <svg {...base(p)}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></svg>
);
export const Building = (p: P) => (
  <svg {...base(p)}><path d="M4 21V6l8-3 8 3v15" /><path d="M9 21v-5h6v5M8 9h2M14 9h2M8 12.5h2M14 12.5h2" /></svg>
);
export const Brain = (p: P) => (
  <svg {...base(p)}><path d="M9 5a2.5 2.5 0 00-2.5 2.5A2.5 2.5 0 005 12a2.5 2.5 0 002 4 2.2 2.2 0 004 0V5.5A2 2 0 009 5z" /><path d="M15 5a2.5 2.5 0 012.5 2.5A2.5 2.5 0 0119 12a2.5 2.5 0 01-2 4 2.2 2.2 0 01-4 0" /></svg>
);
export const Eye = (p: P) => (
  <svg {...base(p)}><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="2.5" /></svg>
);
export const Ribbon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="9" r="5" /><path d="M9.5 13.5L7 21l5-2.5L17 21l-2.5-7.5" /></svg>
);
export const Bone = (p: P) => (
  <svg {...base(p)}><path d="M7 9a2 2 0 10-2-2 2 2 0 10-1 3.7L9 15l3.3 3.3A2 2 0 1015 17a2 2 0 102-3.7L13 9 9.7 5.7" /></svg>
);
export const Dna = (p: P) => (
  <svg {...base(p)}><path d="M7 4c0 5 10 6 10 11M17 4c0 5-10 6-10 11M7 20c0-2 10-3 10-5M17 20c0-2-10-3-10-5" /><path d="M8 7h8M8.5 17h7" /></svg>
);
export const Phone = (p: P) => (
  <svg {...base(p)}><path d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5V21a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" /></svg>
);
export const Mail = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 5 8-5" /></svg>
);
export const Pin = (p: P) => (
  <svg {...base(p)}><path d="M12 21s-6.5-5.3-6.5-10.2A6.5 6.5 0 0112 4.3a6.5 6.5 0 016.5 6.5C18.5 15.7 12 21 12 21z" /><circle cx="12" cy="10.5" r="2.3" /></svg>
);
export const Clock = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Plus = (p: P) => (
  <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
);
export const Check = (p: P) => (
  <svg {...base(p)}><path d="M5 12l4.5 4.5L19 7" /></svg>
);
export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9z" /></svg>
);
export const Quote = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M9 6c-3 1-5 4-5 8v4h6v-6H6.5C6.7 9 8 7.5 10 7zM20 6c-3 1-5 4-5 8v4h6v-6h-3.5c.2-3 1.5-4.5 3.5-5z" /></svg>
);
export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37s-1.04 1.02-1.04 2.48 1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.07-.12-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.88-9.89 9.88M20.46 3.49A11.81 11.81 0 0012.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 00-3.48-8.42" /></svg>
);
export const Instagram = (p: P) => (
  <svg {...base(p)}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></svg>
);
export const Facebook = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0022 12z" /></svg>
);

export const ICONS = {
  Stethoscope, Ambulance, Microscope, Scan, Heart, Surgery, Leaf, Paw,
  ShieldCheck, Users, Sparkle, Building, Brain, Eye, Ribbon, Bone, Dna,
} as const;

export type IconName = keyof typeof ICONS;
