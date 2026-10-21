import Image from "next/image";
import { collections, products, type CollectionId } from "@/lib/products";
import Reveal from "./Reveal";

export default function Collections() {
  const ids = Object.keys(collections) as CollectionId[];
  return (
    <section id="colecciones" className="bg-arena py-24 md:py-32">
      <div className="section">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Colecciones</p>
          <h2 className="mt-5 font-display text-4xl font-light text-cacao sm:text-5xl">
            Tres familias, <em>un mismo barro.</em>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ids.map((id, i) => {
            const c = collections[id];
            const count = products.filter((p) => p.collection === id).length;
            return (
              <Reveal key={id} delay={i * 0.12}>
                <a href={`#coleccion-${id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-pebble">
                    <Image
                      src={c.cover}
                      alt={`Colección ${c.name}`}
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cacao/90 via-cacao/35 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-arena-50">
                      <span className="mb-3 block h-1 w-10 rounded-full" style={{ background: c.accent }} />
                      <p className="text-[0.7rem] uppercase tracking-widest2 opacity-80">Colección · {count} piezas</p>
                      <p className="mt-2 font-display text-4xl">“{c.name}”</p>
                      <p className="mt-2 max-w-xs text-sm font-light leading-relaxed opacity-90">{c.description}</p>
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
