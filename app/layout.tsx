import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const sans = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "LANND · Macetas artesanales de barro hechas a mano en Oaxaca",
  description:
    "Macetas de barro hechas a mano por artesanos oaxaqueños y paisajismo en Puerto Escondido. Envíos a toda la República Mexicana.",
  openGraph: {
    title: "LANND · Diseño con origen",
    description: "Macetas artesanales de barro y paisajismo desde Puerto Escondido, Oaxaca.",
    images: ["/assets/hero-coleccion-costa.webp"],
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${display.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
