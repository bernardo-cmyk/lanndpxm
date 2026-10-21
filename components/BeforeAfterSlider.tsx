"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function BeforeAfterSlider({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[3/2] select-none overflow-hidden rounded-pebble"
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      onPointerDown={(e) => move(e.clientX)}
    >
      <Image src={after} alt={`${alt}, después`} fill sizes="(min-width: 768px) 50vw, 90vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${alt}, antes`} fill sizes="(min-width: 768px) 50vw, 90vw" className="object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-arena-50" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-arena-50 text-cacao shadow-lg">
          ‹›
        </span>
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-cacao/60 px-3 py-1 text-[10px] uppercase tracking-wider2 text-arena-50">Antes</span>
      <span className="absolute right-4 top-4 rounded-full bg-cacao/60 px-3 py-1 text-[10px] uppercase tracking-wider2 text-arena-50">Después</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 h-full w-full cursor-ew-resize opacity-0"
        aria-label="Comparar antes y después"
      />
    </div>
  );
}
