const items = [
  "Hechas a mano en Oaxaca",
  "Materiales 100% naturales",
  "Para interior y exterior",
  "Envíos a todo México",
  "Pago seguro con tarjeta u OXXO",
];

export default function TrustBar() {
  return (
    <div className="overflow-hidden border-y border-cacao/10 bg-arena-50 py-5">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-12 motion-reduce:animate-none">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="eyebrow flex items-center gap-12 whitespace-nowrap">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-barro" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </div>
  );
}
