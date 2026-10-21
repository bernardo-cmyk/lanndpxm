# LANND · Landing y tienda

Landing page y tienda en línea de LANND (Puerto Escondido, Oaxaca): macetas de barro hechas a mano, paisajismo y envíos a toda la República.

Stack: Next.js 15 (App Router) · React 19 · Tailwind CSS · Framer Motion · Stripe Checkout.

## Arrancar

```bash
npm install
cp .env.example .env.local   # opcional: llaves de Stripe y WhatsApp
npm run dev                  # http://localhost:3000
```

Para producción: `npm run build && npm start`, o importar el repositorio en Vercel.

## Qué hay

| Ruta | Qué es |
| --- | --- |
| `/` | Landing: hero, origen y acabados, colecciones, tienda con filtros, galería "Vida en la costa", paisajismo (antes/después + formulario), pedidos especiales, envíos y preguntas, Instagram, contacto |
| `/macetas/[slug]` | Ficha de cada una de las 37 piezas |
| `/gracias` | Confirmación después de pagar |
| `POST /api/shipping` | Cotiza envío por código postal |
| `POST /api/checkout` | Crea la sesión de Stripe (recalcula precios y envío en el servidor) |
| `POST /api/webhooks/stripe` | Recibe la confirmación de pago (tarjeta u OXXO) |
| `POST /api/leads` | Formularios de paisajismo y contacto |

Archivos clave:

- `lib/products.ts`: el catálogo LANND 2026 completo (37 piezas, 3 colecciones). Las agotadas se muestran como "bajo pedido" con botón a WhatsApp.
- `lib/shipping.ts`: zonas por código postal, peso volumétrico (L × A × H / 5000) y tarifas de referencia.
- `tailwind.config.js`: paleta tomada del catálogo (arena, barro, terracota, ahumado, olivo, mar, mostaza).
- `public/assets/`: fotos extraídas del PDF del catálogo, logo y placeholders de paisajismo.

## Activar pagos con Stripe

1. Crear la cuenta en Stripe a nombre del negocio y activar tarjeta y OXXO en *Settings → Payment methods*.
2. Poner `STRIPE_SECRET_KEY` y `NEXT_PUBLIC_SITE_URL` en `.env.local` (o en Vercel).
3. Crear un webhook a `https://TU-DOMINIO/api/webhooks/stripe` con los eventos `checkout.session.completed`, `checkout.session.async_payment_succeeded` y `checkout.session.async_payment_failed`; copiar su secreto a `STRIPE_WEBHOOK_SECRET`.

Sin llaves, el sitio funciona igual y el carrito ofrece terminar el pedido por WhatsApp.

## Pendientes

- Fotos en alta resolución: las del PDF miden unos 300 px y se ven algo suaves en pantallas grandes.
- Fotos reales de proyectos de paisajismo (hoy son placeholders: `public/assets/paisajismo-*.jpg`).
- Peso real empacado de cada pieza y tarifas reales de paquetería (hoy son estimaciones en `lib/shipping.ts`).
- Guardar pedidos y leads y mandar correos (marcado con `TODO` en las rutas de API).
- Feed real de Instagram, aviso de privacidad y dominio.
