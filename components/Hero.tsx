"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Wave from "./Wave";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-arena pb-24 pt-28 md:min-h-[100svh] md:pt-32">
      {/* Luz cálida de atardecer */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-barro/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-mar-light/20 blur-3xl" />

      <div className="section relative grid items-center gap-12 md:grid-cols-[1.05fr_1fr]">
        <motion.div style={{ y: textY }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="eyebrow"
          >
            Puerto Escondido · Oaxaca
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-5xl font-light leading-[1.05] text-cacao sm:text-6xl lg:text-7xl"
          >
            Barro de Oaxaca,
            <br />
            <em className="text-terracota">alma de playa.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 max-w-md text-base font-light leading-relaxed text-cacao-soft"
          >
            Macetas modeladas a mano por artesanos oaxaqueños, con acabados naturales y vidriados que
            se sienten como una tarde frente al Pacífico. Enviamos a toda la República.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link href="#tienda" className="btn-primary">
              Ver macetas
            </Link>
            <Link href="#paisajismo" className="btn-ghost text-cacao">
              Diseña tu jardín
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md md:max-w-none"
        >
          <div className="relative aspect-[566/800] overflow-hidden rounded-t-[999px] rounded-b-pebble shadow-2xl shadow-cacao/20">
            <motion.div style={{ y: photoY }} className="absolute inset-[-6%]">
              <Image
                src="/assets/hero-coleccion-costa.webp"
                alt="Macetas LANND al sol: Erizo naranja, Roldán azul, Tubo amarillo, Mix natural y un Cuate con planta"
                fill
                priority
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="absolute -bottom-6 -left-4 rounded-2xl bg-arena-50/95 px-5 py-4 shadow-xl shadow-cacao/10 backdrop-blur sm:-left-10"
          >
            <p className="eyebrow">Hecho a mano</p>
            <p className="mt-1 font-display text-2xl text-cacao">37 piezas · 3 colecciones</p>
          </motion.div>
        </motion.div>
      </div>

      <Wave className="absolute inset-x-0 bottom-0 text-arena-50" />
    </section>
  );
}
