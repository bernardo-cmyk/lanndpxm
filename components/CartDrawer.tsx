"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { formatMXN } from "@/lib/format";
import type { ShippingQuote } from "@/lib/shipping";
import { whatsappLink } from "@/lib/site";

export default function CartDrawer() {
  const { items, subtotal, isOpen, close, setQuantity } = useCart();
  const [postalCode, setPostalCode] = useState("");
  const [quote, setQuote] = useState<ShippingQuote | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const lines = items.map((i) => ({ slug: i.product.slug, quantity: i.quantity }));
  const linesKey = JSON.stringify(lines);

  // Recalcula el envío cuando cambia el carrito o el código postal.
  useEffect(() => {
    setQuote(null);
    if (!/^\d{5}$/.test(postalCode) || lines.length === 0) return;
    const ctrl = new AbortController();
    fetch("/api/shipping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postalCode, items: lines }),
      signal: ctrl.signal,
    })
      .then((r) => r.json())
      .then((d) => (d.error ? setError(d.error) : (setError(""), setQuote(d))))
      .catch(() => {});
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postalCode, linesKey]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const whatsappOrder = whatsappLink(
    `Hola LANND, quiero hacer este pedido:\n${items
      .map((i) => `• ${i.quantity} x ${i.product.name} (${i.product.finish}, ${i.product.code})`)
      .join("\n")}\nC.P. ${postalCode || "por definir"}`,
  );

  async function checkout() {
    setBusy(true);
    setError("");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postalCode, items: lines }),
    }).catch(() => null);
    const data = await res?.json().catch(() => null);
    if (data?.url) {
      window.location.href = data.url;
      return;
    }
    setError(data?.error ?? "No se pudo iniciar el pago.");
    setBusy(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-cacao/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-arena-50 shadow-2xl"
            role="dialog"
            aria-label="Carrito"
          >
            <div className="flex items-center justify-between border-b border-cacao/10 px-6 py-5">
              <p className="font-display text-2xl text-cacao">Tu carrito</p>
              <button onClick={close} className="rounded-full p-2 text-cacao hover:bg-cacao/5" aria-label="Cerrar">
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="font-display text-2xl text-cacao-soft">Aún no hay macetas aquí.</p>
                <a href="/#tienda" onClick={close} className="btn-ghost text-cacao">
                  Ver la tienda
                </a>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-cacao/10 overflow-y-auto px-6">
                  {items.map(({ product: p, quantity }) => (
                    <li key={p.slug} className="flex gap-4 py-5">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                        <Image src={p.image} alt="" fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <p className="font-display text-xl leading-none text-cacao">{p.name}</p>
                          <p className="text-sm text-cacao">{formatMXN(p.price * quantity)}</p>
                        </div>
                        <p className="mt-1 text-xs font-light text-cacao-soft">
                          {p.finish} · {p.heightCm} × {p.diameterCm} cm
                        </p>
                        <div className="mt-auto flex items-center gap-3 pt-2">
                          <button onClick={() => setQuantity(p.slug, quantity - 1)} className="h-7 w-7 rounded-full border border-cacao/20 text-cacao" aria-label="Quitar uno">
                            −
                          </button>
                          <span className="text-sm">{quantity}</span>
                          <button onClick={() => setQuantity(p.slug, quantity + 1)} className="h-7 w-7 rounded-full border border-cacao/20 text-cacao" aria-label="Agregar uno">
                            +
                          </button>
                          <button onClick={() => setQuantity(p.slug, 0)} className="ml-auto text-xs text-cacao-soft underline-offset-4 hover:underline">
                            Quitar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 border-t border-cacao/10 px-6 py-6">
                  <label className="block">
                    <span className="eyebrow">Código postal de entrega</span>
                    <input
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                      inputMode="numeric"
                      placeholder="Ej. 71980"
                      className="mt-2 w-full rounded-2xl border border-cacao/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-terracota"
                    />
                  </label>

                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="font-light text-cacao-soft">Subtotal</dt>
                      <dd>{formatMXN(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-light text-cacao-soft">
                        Envío {quote && <span className="block text-xs">{quote.zoneLabel} · {quote.days}</span>}
                      </dt>
                      <dd>{quote ? formatMXN(quote.amount) : "Escribe tu C.P."}</dd>
                    </div>
                    <div className="flex justify-between border-t border-cacao/10 pt-3 text-base">
                      <dt>Total</dt>
                      <dd className="font-medium">{formatMXN(subtotal + (quote?.amount ?? 0))}</dd>
                    </div>
                  </dl>

                  {error && (
                    <p className="rounded-2xl bg-terracota/10 p-3 text-xs text-terracota-dark">{error}</p>
                  )}

                  <button onClick={checkout} disabled={!quote || busy} className="btn-primary w-full disabled:opacity-50">
                    {busy ? "Abriendo pago…" : "Pagar con tarjeta u OXXO"}
                  </button>
                  <a href={whatsappOrder} target="_blank" rel="noopener noreferrer" className="block text-center text-xs text-cacao-soft underline underline-offset-4">
                    Prefiero terminar mi pedido por WhatsApp
                  </a>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
