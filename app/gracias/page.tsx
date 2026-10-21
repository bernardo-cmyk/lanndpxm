import Link from "next/link";
import Navbar from "@/components/Navbar";
import ClearCart from "@/components/ClearCart";

export const metadata = { title: "Gracias por tu compra · LANND" };

export default function Gracias() {
  return (
    <>
      <Navbar overHero={false} />
      <ClearCart />
      <main className="flex min-h-[80vh] items-center justify-center bg-arena px-5 pt-24 text-center">
        <div className="max-w-lg">
          <p className="eyebrow">Pedido recibido</p>
          <h1 className="mt-5 font-display text-5xl font-light text-cacao">
            Gracias. <em className="text-terracota">Tu barro va en camino.</em>
          </h1>
          <p className="mt-6 text-sm font-light leading-relaxed text-cacao-soft">
            Te enviamos la confirmación por correo. Si pagaste en OXXO, empacamos tu pedido en cuanto
            se acredite el pago. Cualquier duda, escríbenos por WhatsApp.
          </p>
          <Link href="/" className="btn-primary mt-10">
            Volver al inicio
          </Link>
        </div>
      </main>
    </>
  );
}
