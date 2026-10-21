"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const photos = [
  { src: "/assets/hero-coleccion-costa.webp", alt: "Colección LANND en escalones al sol", w: 566, h: 800 },
  { src: "/assets/productos/chuy-50-vidriado-naranja.webp", alt: "Chuy vidriado naranja", w: 317, h: 554 },
  { src: "/assets/productos/espinoza-40-vidriado-verde.webp", alt: "Espinoza vidriado verde", w: 314, h: 337 },
  { src: "/assets/productos/ramona-ahumado.webp", alt: "Ramona en barro ahumado", w: 470, h: 480 },
  { src: "/assets/productos/compa-2-ahumado.webp", alt: "Compa 2 bajo sombra de palmera", w: 324, h: 531 },
  { src: "/assets/productos/erizo-vidriado-amarillo.webp", alt: "Erizo vidriado amarillo", w: 600, h: 282 },
  { src: "/assets/productos/rasta-natural.webp", alt: "Rasta con planta colgante", w: 327, h: 326 },
  { src: "/assets/productos/omi-vidriado-verde.webp", alt: "Omi vidriado verde", w: 336, h: 477 },
  { src: "/assets/terracota-cactus.webp", alt: "Macetas de barro natural con cactus", w: 319, h: 450 },
  { src: "/assets/productos/tortuga-01-vidriado-verde.webp", alt: "Tortuga 01 vidriado verde", w: 300, h: 294 },
  { src: "/assets/productos/chuy-40-vidriado-verde.webp", alt: "Chuy vidriado verde", w: 276, h: 420 },
  { src: "/assets/productos/yael-ahumado.webp", alt: "Yael en barro ahumado", w: 282, h: 275 },
  { src: "/assets/productos/compa-1-ahumado.webp", alt: "Compa 1 en barro ahumado", w: 332, h: 531 },
  { src: "/assets/productos/serpiente-natural.webp", alt: "Serpiente en barro natural", w: 300, h: 294 },
  { src: "/assets/productos/tubo-40-vidriado-amarillo.webp", alt: "Tubo vidriado amarillo", w: 311, h: 308 },
  { src: "/assets/productos/chango-bigoton-ahumado.webp", alt: "Chango Bigotón al sol", w: 314, h: 323 },
];

export default function CoastGallery() {
  const [active, setActive] = useState<number | null>(null);

  const step = useCallback(
    (dir: number) => setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, step]);

  return (
    <section id="galeria" className="relative overflow-hidden bg-arena py-24 md:py-32">
      <div className="section">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Vida en la costa</p>
          <h2 className="mt-5 font-display text-4xl font-light text-cacao sm:text-5xl">
            Sol, sombra de palmera <em>y barro.</em>
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-cacao-soft">
            Así viven nuestras piezas: en terrazas, escalones y rincones con luz de tarde.
          </p>
        </Reveal>

        <div className="mt-14 columns-2 gap-4 md:columns-3 lg:columns-4">
          {photos.map((ph, i) => (
            <Reveal key={ph.src} delay={(i % 4) * 0.06} className="mb-4 break-inside-avoid">
              <button
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-3xl"
                aria-label={`Ver foto: ${ph.alt}`}
              >
                <Image
                  src={ph.src}
                  alt={ph.alt}
                  width={ph.w}
                  height={ph.h}
                  sizes="(min-width: 1024px) 23vw, (min-width: 768px) 30vw, 45vw"
                  className="h-auto w-full transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-cacao/0 transition-colors duration-500 group-hover:bg-cacao/10" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-cacao/90 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative max-h-[85vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[active].src}
                alt={photos[active].alt}
                width={photos[active].w}
                height={photos[active].h}
                className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain"
                sizes="90vw"
              />
              <p className="mt-3 text-center text-sm font-light text-arena">{photos[active].alt}</p>
            </motion.div>
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-arena/10 p-3 text-arena hover:bg-arena/20" aria-label="Anterior">‹</button>
            <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-arena/10 p-3 text-arena hover:bg-arena/20" aria-label="Siguiente">›</button>
            <button onClick={() => setActive(null)} className="absolute right-4 top-4 rounded-full p-2 text-arena" aria-label="Cerrar">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
