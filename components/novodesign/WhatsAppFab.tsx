"use client";

import { motion } from "motion/react";
import { CONTACT } from "./data";
import { WhatsApp } from "./icons";

export default function WhatsAppFab() {
  return (
    <motion.a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2"
    >
      <span className="pointer-events-none hidden rounded-full bg-ink px-3.5 py-2 text-[0.8rem] font-medium text-white nd-shadow-lg group-hover:block">
        Fale conosco
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,.8)]">
        <span className="nd-pulse-ring absolute inset-0 rounded-full bg-[#25D366]" />
        <WhatsApp className="relative h-7 w-7" />
      </span>
    </motion.a>
  );
}
