import Image from "next/image";
import Reveal from "./Reveal";

const values = [
  { title: "Hechas a mano", text: "Cada rostro, espina y anillo se modela a mano. No hay dos piezas iguales." },
  { title: "100% naturales", text: "Barro, cuarzo y esmaltes; nada más. Envejecen bonito, al sol y a la sal." },
  { title: "Interior y exterior", text: "Resisten la terraza frente al mar igual que la sala." },
  { title: "Diseños atemporales", text: "Formas que no pasan de moda, pensadas para durar años." },
];

const finishes = [
  { group: "Barro", colors: [["Natural", "#D99A6C"], ["Ahumado", "#4F4236"]] },
  { group: "Pulido con cuarzo", colors: [["Chocolate", "#AE4A15"], ["Negro", "#222222"]] },
  {
    group: "Vidriado",
    colors: [["Verde", "#3A6B35"], ["Amarillo", "#E3A812"], ["Azul", "#0E3A5C"], ["Rojo", "#B0301A"], ["Naranja", "#D35414"]],
  },
];

export default function Story() {
  return (
    <section id="origen" className="relative bg-arena-50 py-24 md:py-32">
      <div className="section grid items-center gap-16 md:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-pebble">
            <Image
              src="/assets/terracota-cactus.webp"
              alt="Macetas de barro natural con cactus y suculentas, marcadas con la huella LANND"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 w-36 overflow-hidden rounded-full shadow-xl shadow-cacao/20 sm:w-44">
            <Image src="/assets/logo-lannd.webp" alt="Sello LANND grabado en barro" width={536} height={508} />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Diseño con origen</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight text-cacao sm:text-5xl">
              Hecho en Oaxaca, <em className="text-terracota">pensado para la costa.</em>
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-cacao-soft">
              Cada maceta LANND nace del barro oaxaqueño y de manos que conocen el oficio. La huella
              en espiral que llevan todas es nuestro sello: un recordatorio de que lo hecho a mano
              tiene origen, tiempo y carácter.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <p className="font-display text-xl text-cacao">{v.title}</p>
                <p className="mt-1 text-sm font-light leading-relaxed text-cacao-soft">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal className="section mt-28">
        <div className="rounded-pebble border border-cacao/10 bg-arena px-6 py-10 sm:px-12">
          <div className="flex flex-col gap-2 text-center">
            <p className="eyebrow">Acabados</p>
            <p className="font-display text-2xl text-cacao sm:text-3xl">
              Cualquier pieza, en el tamaño, acabado y color que imagines.
            </p>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {finishes.map((f) => (
              <div key={f.group} className="text-center">
                <p className="eyebrow">{f.group}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  {f.colors.map(([name, hex]) => (
                    <div key={name} className="flex flex-col items-center gap-2">
                      <span className="h-12 w-12 rounded-full shadow-inner ring-1 ring-cacao/10" style={{ background: hex }} />
                      <span className="text-[11px] font-light text-cacao-soft">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
