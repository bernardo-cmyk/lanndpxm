import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { collections, getProduct, products } from "@/lib/products";
import { formatMXN } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} · ${p.finish} · LANND`,
    description: `Maceta ${p.name} de la colección ${collections[p.collection].name}, ${p.finish.toLowerCase()}, ${p.heightCm} x ${p.diameterCm} cm. Hecha a mano en Oaxaca.`,
    openGraph: { images: [p.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const collection = collections[p.collection];
  const related = products.filter((x) => x.collection === p.collection && x.slug !== p.slug && !x.soldOut).slice(0, 4);

  return (
    <>
      <Navbar overHero={false} />
      <main className="bg-arena-50 pb-24 pt-28">
        <div className="section">
          <Link href="/#tienda" className="eyebrow hover:text-terracota">
            ← Tienda
          </Link>
          <div className="mt-8 grid gap-12 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-pebble bg-arena-200">
              <Image src={p.image} alt={`Maceta ${p.name}, ${p.finish}`} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow">Colección “{collection.name}”</p>
              <h1 className="mt-4 font-display text-5xl font-light text-cacao sm:text-6xl">{p.name}</h1>
              <p className="mt-4 text-2xl text-cacao">{formatMXN(p.price)}</p>
              <dl className="mt-8 divide-y divide-cacao/10 border-y border-cacao/10 text-sm">
                {[
                  ["Acabado", p.finish],
                  ["Medidas", `${p.heightCm} cm de alto × ${p.diameterCm} cm de diámetro`],
                  ["Código", p.code],
                  ["Uso", "Interior y exterior"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3">
                    <dt className="font-light text-cacao-soft">{k}</dt>
                    <dd className="text-right text-cacao">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm font-light leading-relaxed text-cacao-soft">
                {collection.description} Hecha a mano en Oaxaca con materiales 100% naturales; cada pieza
                es única y puede variar ligeramente de la foto.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {p.soldOut ? (
                  <a
                    href={whatsappLink(`Hola LANND, me interesa ${p.name} (${p.finish}, ${p.code}) bajo pedido.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Agotado · pedir por WhatsApp
                  </a>
                ) : (
                  <AddToCartButton slug={p.slug} />
                )}
                <a
                  href={whatsappLink(`Hola LANND, ¿me pueden hacer ${p.name} en otro color o tamaño?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-cacao"
                >
                  Otro color o tamaño
                </a>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-28">
              <p className="eyebrow">También de “{collection.name}”</p>
              <div className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((r) => (
                  <ProductCard key={r.slug} product={r} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
