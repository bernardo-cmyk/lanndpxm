"use client";

import { useState } from "react";

const spaces = ["Terraza o balcón", "Jardín de casa", "Hotel o restaurante", "Villa o desarrollo", "Otro"];

export default function LeadForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);
    if (res?.ok) {
      setStatus("sent");
      e.currentTarget?.reset();
    } else {
      setError((await res?.json().catch(() => null))?.error ?? "No se pudo enviar. Intenta por WhatsApp.");
      setStatus("error");
    }
  }

  const field = `w-full rounded-2xl border bg-transparent px-4 py-3 text-sm font-light outline-none transition-colors ${
    dark
      ? "border-arena/25 text-arena-50 placeholder:text-arena/50 focus:border-arena/70"
      : "border-cacao/15 text-cacao placeholder:text-cacao/40 focus:border-terracota"
  }`;

  if (status === "sent") {
    return (
      <div className={`rounded-pebble border p-8 text-center ${dark ? "border-arena/25" : "border-cacao/15"}`}>
        <p className="font-display text-3xl">¡Gracias!</p>
        <p className="mt-2 text-sm font-light opacity-80">Te escribimos en menos de 24 horas para agendar.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
      <input name="name" required placeholder="Tu nombre" className={field} />
      <input name="phone" required inputMode="tel" placeholder="WhatsApp (10 dígitos)" className={field} />
      <input name="city" placeholder="Ciudad o zona" className={field} />
      <select name="space" defaultValue="" className={`${field} ${dark ? "[&>option]:text-cacao" : ""}`}>
        <option value="" disabled>
          Tipo de espacio
        </option>
        {spaces.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <textarea
        name="message"
        rows={3}
        placeholder="Cuéntanos de tu espacio: metros aproximados, sol o sombra, qué te imaginas…"
        className={`${field} sm:col-span-2`}
      />
      {status === "error" && <p className="text-sm text-barro sm:col-span-2">{error}</p>}
      <button disabled={status === "sending"} className="btn-primary sm:col-span-2">
        {status === "sending" ? "Enviando…" : "Agendar visita"}
      </button>
    </form>
  );
}
