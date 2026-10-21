import Image from "next/image";
import { site } from "@/lib/site";

// Fotos del catálogo mientras se conecta el feed real de Instagram.
const shots = [
  "/assets/productos/roldan-vidriado-azul.webp",
  "/assets/productos/lilii-ahumado-natural.webp",
  "/assets/productos/tortuga-02-vidriado-verde.webp",
  "/assets/productos/martina-negro-achapado.webp",
  "/assets/productos/mix-natural.webp",
  "/assets/productos/birlo-vidriado-amarillo.webp",
];

export default function InstagramStrip() {
  return (
    <section className="bg-arena-50 pt-24">
      <div className="section flex flex-col items-center gap-3 text-center">
        <p className="eyebrow">Síguenos</p>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="font-display text-3xl text-cacao hover:text-terracota">
          {site.instagramHandle}
        </a>
      </div>
      <div className="mt-10 grid grid-cols-3 md:grid-cols-6">
        {shots.map((src) => (
          <a key={src} href={site.instagram} target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden">
            <Image src={src} alt="Foto de LANND en Instagram" fill sizes="(min-width: 768px) 16vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          </a>
        ))}
      </div>
    </section>
  );
}
