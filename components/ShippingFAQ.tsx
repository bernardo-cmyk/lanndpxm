import { zones } from "@/lib/shipping";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "¿Cómo empacan las macetas?",
    a: "Cada pieza viaja en caja doble con esquineros y relleno. Si llega dañada, mándanos foto en las primeras 48 horas y la reponemos.",
  },
  {
    q: "¿Cómo se calcula el envío?",
    a: "Con tu código postal y el tamaño de la caja: las paqueterías cobran el mayor entre el peso real y el peso volumétrico. Lo ves antes de pagar.",
  },
  {
    q: "¿Cómo puedo pagar?",
    a: "En línea con tarjeta de crédito o débito, o en efectivo en OXXO. También aceptamos transferencia para pedidos especiales.",
  },
  {
    q: "¿Sirven para exterior?",
    a: "Sí. Son de barro y materiales naturales. Recomendamos un plato o piedras en la base para el drenaje.",
  },
  {
    q: "¿Puedo pedir una pieza agotada?",
    a: "Sí, todas se hacen bajo pedido. Escríbenos por WhatsApp y te damos tiempo de entrega.",
  },
];

export default function ShippingFAQ() {
  return (
    <section id="envios" className="bg-arena py-24 md:py-32">
      <div className="section grid gap-14 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Envíos a toda la República</p>
          <h2 className="mt-5 font-display text-4xl font-light text-cacao sm:text-5xl">
            De la costa <em>a tu puerta.</em>
          </h2>
          <ul className="mt-10 divide-y divide-cacao/10 border-y border-cacao/10">
            {Object.values(zones).map((z) => (
              <li key={z.label} className="flex items-center justify-between gap-4 py-4 text-sm">
                <span className="font-light text-cacao">{z.label}</span>
                <span className="whitespace-nowrap text-cacao-soft">{z.days}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-light text-cacao-soft">Días hábiles a partir de que sale el pedido.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-cacao/10 border-y border-cacao/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl text-cacao">
                  {f.q}
                  <span className="text-terracota transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm font-light leading-relaxed text-cacao-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
