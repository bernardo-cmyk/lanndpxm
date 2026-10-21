"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { collections, products, type CollectionId, type FinishKind } from "@/lib/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

const finishFilters: Array<{ id: FinishKind | "todos"; label: string }> = [
  { id: "todos", label: "Todos" },
  { id: "ahumado", label: "Ahumado" },
  { id: "natural", label: "Natural" },
  { id: "negro", label: "Negro" },
  { id: "vidriado", label: "Vidriado" },
];

export default function ProductGrid() {
  const [collection, setCollection] = useState<CollectionId | "todas">("todas");
  const [finish, setFinish] = useState<FinishKind | "todos">("todos");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Los enlaces de Colecciones usan #coleccion-<id> para filtrar la tienda.
  useEffect(() => {
    const fromHash = () => {
      const c = window.location.hash.replace("#coleccion-", "");
      if (window.location.hash.startsWith("#coleccion-") && c in collections) {
        setCollection(c as CollectionId);
        document.getElementById("tienda")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const visible = useMemo(
    () =>
      products
        .filter((p) => collection === "todas" || p.collection === collection)
        .filter((p) => finish === "todos" || p.finishKind === finish)
        .filter((p) => !onlyAvailable || !p.soldOut)
        // Disponibles primero
        .sort((a, b) => Number(a.soldOut) - Number(b.soldOut)),
    [collection, finish, onlyAvailable],
  );

  const tabs: Array<{ id: CollectionId | "todas"; label: string }> = [
    { id: "todas", label: "Todas" },
    ...(Object.keys(collections) as CollectionId[]).map((id) => ({ id, label: collections[id].name })),
  ];

  return (
    <section id="tienda" className="scroll-mt-20 bg-arena-50 py-24 md:py-32">
      <div className="section">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Tienda</p>
            <h2 className="mt-5 font-display text-4xl font-light text-cacao sm:text-5xl">
              Elige la tuya. <em>Te la llevamos a casa.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-cacao-soft">
            Medidas en centímetros (alto × diámetro). Las piezas agotadas se pueden hacer bajo pedido
            en el acabado y color que quieras.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-5 border-b border-cacao/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setCollection(t.id)}
                className={`relative rounded-full px-5 py-2 text-xs uppercase tracking-wider2 transition-colors ${
                  collection === t.id ? "text-arena-50" : "text-cacao hover:bg-cacao/5"
                }`}
              >
                {collection === t.id && (
                  <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-cacao" />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {finishFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFinish(f.id)}
                className={`rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-wider2 transition-colors ${
                  finish === f.id ? "border-terracota bg-terracota/10 text-terracota" : "border-cacao/15 text-cacao-soft hover:border-cacao/40"
                }`}
              >
                {f.label}
              </button>
            ))}
            <label className="ml-2 flex cursor-pointer items-center gap-2 text-xs font-light text-cacao-soft">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="accent-terracota"
              />
              Solo disponibles
            </label>
          </div>
        </div>

        <p className="mt-6 text-xs font-light text-cacao-soft">{visible.length} piezas</p>

        <motion.div layout className="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="py-20 text-center font-display text-2xl text-cacao-soft">
            No hay piezas con esos filtros.
          </p>
        )}
      </div>
    </section>
  );
}
