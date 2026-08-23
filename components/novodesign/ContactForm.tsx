"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight } from "./icons";

const field =
  "w-full rounded-xl border border-white/12 bg-white/[0.05] px-4 py-3 text-[0.92rem] text-white placeholder:text-white/35 outline-none transition-all focus:border-primary-light focus:bg-white/[0.08] focus:ring-4 focus:ring-primary/20";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Contato pelo site (novo design)" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-white nd-shadow-teal">
              <Check className="h-8 w-8" />
            </span>
            <p className="mt-5 text-[1.15rem] font-semibold text-white">Mensagem enviada!</p>
            <p className="mt-1 text-[0.9rem] text-white/60">Retornaremos em breve. Obrigado pelo contato 💛</p>
            <button onClick={() => setStatus("idle")} className="mt-6 text-[0.85rem] font-semibold text-primary-light underline">
              Enviar outra mensagem
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <h3 className="text-[1.15rem] font-semibold text-white">Envie uma mensagem</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[0.8rem] font-medium text-white/60">Nome *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Seu nome" className={field} />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.8rem] font-medium text-white/60">Telefone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(43) 00000-0000" className={field} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[0.8rem] font-medium text-white/60">E-mail *</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="seu@email.com" className={field} />
            </div>
            <div>
              <label className="mb-1.5 block text-[0.8rem] font-medium text-white/60">Mensagem *</label>
              <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Como podemos ajudar você e o seu pet?" className={`${field} resize-none`} />
            </div>
            {status === "error" && <p className="text-[0.85rem] text-secondary-light">Erro ao enviar. Tente novamente.</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-secondary px-7 py-3.5 text-[0.95rem] font-semibold text-white nd-shadow-coral transition-[transform,background-color] hover:bg-secondary-dark active:scale-[0.98] disabled:opacity-60"
            >
              {status === "loading" ? "Enviando…" : "Enviar mensagem"}
              {status !== "loading" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
