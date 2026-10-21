import Image from "next/image";
import { whatsappLink } from "@/lib/site";
import BeforeAfterSlider from "./BeforeAfterSlider";
import LeadForm from "./LeadForm";
import Reveal from "./Reveal";
import Wave from "./Wave";

const steps = [
  { n: "01", title: "Visita", text: "Conocemos tu espacio, la luz, el viento y la sal. Escuchamos lo que imaginas." },
  { n: "02", title: "Diseño", text: "Proponemos plantas nativas y costeras, piedra, madera y piezas LANND hechas a medida." },
  { n: "03", title: "Instalación", text: "Lo construimos y te dejamos una guía de cuidados para que crezca sano." },
];

const projects = ["/assets/paisajismo-proyecto-2.webp", "/assets/paisajismo-proyecto-3.webp", "/assets/paisajismo-proyecto-4.webp"];

export default function LandscapingSection() {
  return (
    <section id="paisajismo" className="relative scroll-mt-16 bg-mar text-arena-50">
      <Wave className="absolute inset-x-0 top-0 text-arena" flip />
      <div className="section py-28 md:py-36">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-widest2 text-arena/70">Paisajismo</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight sm:text-5xl">
              Jardines que respiran <em className="text-barro">como la costa.</em>
            </h2>
            <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-arena/80">
              Diseñamos e instalamos jardines, terrazas y patios en Puerto Escondido y la costa de
              Oaxaca: plantas que aguantan el sol y la brisa del mar, texturas naturales y macetas
              hechas a la medida de cada rincón.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n}>
                  <p className="font-display text-3xl text-barro">{s.n}</p>
                  <p className="mt-1 text-sm uppercase tracking-wider2">{s.title}</p>
                  <p className="mt-2 text-sm font-light leading-relaxed text-arena/75">{s.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <BeforeAfterSlider
              before="/assets/paisajismo-proyecto-1-antes.webp"
              after="/assets/paisajismo-proyecto-1-despues.webp"
              alt="Terraza en Puerto Escondido"
            />
          </Reveal>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {projects.map((src, i) => (
            <Reveal key={src} delay={i * 0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={src} alt={`Proyecto de paisajismo ${i + 1}`} fill sizes="(min-width: 640px) 30vw, 90vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 grid gap-10 rounded-pebble bg-arena/5 p-6 ring-1 ring-arena/10 sm:p-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-display text-3xl">Cuéntanos de tu espacio</p>
            <p className="mt-3 text-sm font-light leading-relaxed text-arena/75">
              Escríbenos por WhatsApp con un par de fotos del lugar, o deja tus datos y te contactamos
              para agendar la visita.
            </p>
            <a
              href={whatsappLink("Hola LANND, quiero cotizar un proyecto de paisajismo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-6 bg-arena-50 text-mar hover:bg-arena"
            >
              Cotizar por WhatsApp
            </a>
          </div>
          <LeadForm dark />
        </Reveal>
      </div>
      <Wave className="absolute inset-x-0 bottom-0 text-arena-50" />
    </section>
  );
}
