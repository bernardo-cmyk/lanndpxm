"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/#tienda", label: "Tienda" },
  { href: "/#colecciones", label: "Colecciones" },
  { href: "/#origen", label: "Origen" },
  { href: "/#paisajismo", label: "Paisajismo" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar({ overHero = true }: { overHero?: boolean }) {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(!overHero);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  const solid = scrolled || menu;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid ? "bg-arena/90 py-3 shadow-[0_1px_0_rgba(59,42,32,0.08)] backdrop-blur-md" : "bg-transparent py-5"
      }`}
    >
      <nav className="section flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMenu(false)}>
          <Image src="/assets/logo-lannd-sm.webp" alt="" width={40} height={38} className="h-9 w-auto rounded-full" priority />
          <span className="font-sans text-lg font-light tracking-widest2 text-cacao">LANND</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="eyebrow text-cacao transition-colors hover:text-terracota">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            className="relative rounded-full p-2 text-cacao transition-colors hover:bg-cacao/5"
            aria-label={`Abrir carrito (${count} piezas)`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracota px-1 text-[10px] font-medium text-arena-50"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            className="rounded-full p-2 text-cacao md:hidden"
            onClick={() => setMenu((m) => !m)}
            aria-label="Menú"
            aria-expanded={menu}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              {menu ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="section overflow-hidden md:hidden"
          >
            {links.map((l) => (
              <li key={l.href} className="border-b border-cacao/10 py-4">
                <Link href={l.href} onClick={() => setMenu(false)} className="eyebrow text-cacao">
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
