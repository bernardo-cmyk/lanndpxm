import { whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";

const points = [
  { title: "A tu medida", text: "Cualquier modelo de 10 a 60 cm de alto, en el acabado y color que elijas." },
  { title: "Diseños exclusivos", text: "Creamos piezas nuevas y personalizadas bajo pedido." },
  { title: "Mayoreo", text: "Pedidos de 15 piezas en adelante tienen descuento especial." },
  { title: "Arquitectos e interioristas", text: "Precio especial para proyectos. Escríbenos directo." },
];

export default function CustomOrders() {
  return (
    <section className="bg-arena-50 py-24 md:py-28">
      <div className="section grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-center">
        <Reveal>
          <p className="eyebrow">Pedidos especiales</p>
          <h2 className="mt-5 font-display text-4xl font-light text-cacao sm:text-5xl">
            ¿Tienes un proyecto? <em className="text-terracota">Lo hacemos contigo.</em>
          </h2>
          <a
            href={whatsappLink("Hola LANND, quiero cotizar un pedido especial.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            Cotizar pedido especial
          </a>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-pebble bg-cacao/10 sm:grid-cols-2">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="bg-arena-50 p-7">
              <p className="font-display text-2xl text-cacao">{p.title}</p>
              <p className="mt-2 text-sm font-light leading-relaxed text-cacao-soft">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
