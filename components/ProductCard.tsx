"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { formatMXN } from "@/lib/format";
import type { Product } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const p = product;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <Link href={`/macetas/${p.slug}`} className="relative block aspect-square overflow-hidden rounded-3xl bg-arena-200">
        <Image
          src={p.image}
          alt={`Maceta ${p.name}, ${p.finish.toLowerCase()}, ${p.heightCm} x ${p.diameterCm} cm`}
          fill
          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
          className={`object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06] ${
            p.soldOut ? "opacity-80 saturate-[0.8]" : ""
          }`}
        />
        {p.soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-arena-50/90 px-3 py-1 text-[10px] uppercase tracking-wider2 text-cacao">
            Agotado · bajo pedido
          </span>
        )}
      </Link>

      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div>
          <Link href={`/macetas/${p.slug}`}>
            <h3 className="font-display text-xl leading-none text-cacao sm:text-2xl">{p.name}</h3>
          </Link>
          <p className="mt-2 flex items-center gap-2 text-xs font-light text-cacao-soft">
            <span className="h-3 w-3 rounded-full ring-1 ring-cacao/10" style={{ background: p.swatch }} />
            {p.finish}
          </p>
          <p className="mt-1 text-xs font-light text-cacao-soft">
            {p.heightCm} alto × {p.diameterCm} cm
          </p>
        </div>
        <p className="whitespace-nowrap text-sm text-cacao sm:pt-1">{formatMXN(p.price)}</p>
      </div>
      <div className="min-h-4 flex-1" />

      {p.soldOut ? (
        <a
          href={whatsappLink(`Hola LANND, me interesa ${p.name} (${p.finish}, ${p.code}) bajo pedido.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost mt-auto w-full px-2 py-2.5 text-[10px] text-cacao sm:text-xs"
        >
          Pedir por WhatsApp
        </a>
      ) : (
        <button onClick={() => add(p.slug)} className="btn-primary mt-auto w-full px-2 py-2.5 text-[10px] sm:text-xs">
          Agregar al carrito
        </button>
      )}
    </motion.article>
  );
}
