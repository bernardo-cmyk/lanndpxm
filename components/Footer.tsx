import Image from "next/image";
import { site, whatsappLink } from "@/lib/site";
import LeadForm from "./LeadForm";

export default function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-16 bg-cacao text-arena">
      <div className="section grid gap-14 py-20 md:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image src="/assets/logo-lannd-sm.webp" alt="" width={56} height={53} className="rounded-full ring-1 ring-arena/30" />
            <div>
              <p className="text-2xl font-light tracking-widest2">LANND</p>
              <p className="text-[0.65rem] uppercase tracking-widest2 text-arena/60">{site.tagline}</p>
            </div>
          </div>
          <p className="mt-8 font-display text-3xl font-light">Escríbenos, nos encanta platicar de barro.</p>
          <ul className="mt-8 space-y-3 text-sm font-light text-arena/80">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-barro">{site.email}</a>
            </li>
            <li>
              <a href={whatsappLink("Hola LANND")} target="_blank" rel="noopener noreferrer" className="hover:text-barro">
                WhatsApp {site.phones[0]}
              </a>
            </li>
            <li>{site.phones[1]}</li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-barro">
                Instagram {site.instagramHandle}
              </a>
            </li>
            <li>{site.location}</li>
          </ul>
          <p className="mt-8 text-xs uppercase tracking-wider2 text-arena/50">También nos encuentras en</p>
          <p className="mt-2 text-sm font-light text-arena/80">{site.stockists.join(" · ")}</p>
        </div>
        <div>
          <p className="text-[0.7rem] uppercase tracking-widest2 text-arena/60">Contacto</p>
          <div className="mt-6">
            <LeadForm dark />
          </div>
        </div>
      </div>
      <div className="border-t border-arena/10">
        <div className="section flex flex-col justify-between gap-2 py-6 text-xs font-light text-arena/50 sm:flex-row">
          <p>© {new Date().getFullYear()} LANND PXM · Hecho a mano en Oaxaca</p>
          <p>Aviso de privacidad · Términos y condiciones</p>
        </div>
      </div>
    </footer>
  );
}
