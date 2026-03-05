# Arquitectura del Proyecto

## Vision General

Codentsa es una aplicacion e-commerce de instrumental dental construida con Nuxt 4.3.1, Vue 3.5.29, Tailwind CSS v4 y Pinia. Utiliza JavaScript (no TypeScript) en toda la capa de aplicacion, con una unica excepcion en un endpoint de salud del servidor.

## Stack Tecnologico

| Capa | Tecnologia | Version |
|------|-----------|---------|
| Framework | Nuxt | 4.3.1 |
| UI | Vue | 3.5.29 |
| Estilos | Tailwind CSS | 4.2.1 |
| Estado | Pinia | 3.0.4 |
| CMS | Directus (SDK) | 20.3.0 |
| Pagos | Redsys (HMAC-SHA256) | - |
| Carousel | Swiper | 12.1.2 |
| Iconos | @heroicons/vue | 2.2.0 |
| Analytics | nuxt-gtag (GA4), nuxt-umami, Meta Pixel | - |
| Linting | ESLint (@nuxt/eslint) + Prettier | 9.x / 3.8.x |

## Estructura de Directorios

```
codentsa.com/
├── app/                              # Aplicacion principal (Nuxt 4 app dir)
│   ├── app.vue                       # Componente raiz
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css              # Estilos globales + Tailwind v4
│   │   │   └── fonts.css             # Definiciones @font-face Blauer Nue
│   │   └── fonts/
│   │       └── blauer-nue/           # Fuente custom (8 pesos + italics)
│   ├── components/                   # 42 componentes Vue (flat-by-domain)
│   │   ├── AnnouncementBar.vue
│   │   ├── BaseCarousel.vue
│   │   ├── Breadcrumbs.vue
│   │   ├── Button.vue
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   ├── HeroBanner.vue
│   │   ├── Logo.vue
│   │   ├── OfferPopup.vue
│   │   ├── Pagination.vue
│   │   ├── Section.vue
│   │   ├── Bento/                    # Bento grid sections
│   │   ├── Brand/                    # Brand cards
│   │   ├── Cart/                     # Carrito (Item, ItemSkeleton, Summary)
│   │   ├── Checkout/                 # Checkout (5 componentes)
│   │   ├── FAQ/                      # FAQ (Accordion, Skeleton)
│   │   ├── Form/                     # Formularios (DateInput)
│   │   ├── Legal/                    # Legal (Page)
│   │   ├── Product/                  # Productos (12 componentes)
│   │   ├── Staff/                    # Equipo (Card)
│   │   ├── Testimonials/             # Testimonios (Card)
│   │   └── Toast/                    # Notificaciones (Container, Index)
│   ├── composables/
│   │   └── useDirectus.js            # Cliente Directus (client-side)
│   ├── layouts/
│   │   └── default.vue               # Layout unico: Header + Breadcrumbs + NuxtPage + Footer + Toast
│   ├── pages/                        # File-based routing
│   │   ├── index.vue                 # Homepage
│   │   ├── productos/
│   │   │   ├── index.vue             # Catalogo con filtros (query params)
│   │   │   └── [id].vue              # Detalle de producto
│   │   ├── carrito.vue
│   │   ├── checkout.vue
│   │   ├── checkout-success.vue
│   │   ├── checkout-error.vue
│   │   ├── favoritos.vue
│   │   ├── cuenta.vue
│   │   ├── ofertas.vue
│   │   ├── quienes-somos.vue
│   │   ├── aviso-legal.vue
│   │   ├── terminos-condiciones.vue
│   │   ├── politicas-privacidad.vue
│   │   ├── cambios-devoluciones.vue
│   │   └── soporte-tecnico.vue
│   └── stores/                       # Pinia stores
│       ├── products.js               # Catalogo de productos (hardcoded, preparado para Directus)
│       ├── cart.js                    # Carrito con persistencia localStorage
│       ├── favorites.js              # Favoritos con persistencia localStorage
│       └── toast.js                  # Sistema de notificaciones toast
├── server/                           # Nitro server
│   ├── api/
│   │   ├── health.ts                 # Health check endpoint (unico archivo TS)
│   │   ├── verify-maintenance-access.post.js  # Verificacion de acceso en mantenimiento
│   │   └── redsys/                   # Integracion de pagos Redsys
│   │       ├── create-payment.post.js    # Genera formulario de pago
│   │       ├── verify-payment.post.js    # Verifica resultado del pago
│   │       └── notification.post.js      # Webhook de notificacion Redsys
│   └── utils/
│       ├── directus.js               # Cliente Directus server-side (con token auth)
│       └── redsys.js                 # Utilidades Redsys (HMAC-SHA256)
├── public/                           # Assets estaticos
│   ├── clients-logos/                # Logos de clientes
│   └── ...
├── nuxt.config.ts                    # Configuracion Nuxt
├── package.json
└── eslint.config.mjs
```

## Flujos de Datos

### Productos

Los productos estan hardcoded en `app/stores/products.js` (preparado para migracion futura a Directus). El store `useProductsStore()` expone los datos a los componentes. El filtrado se realiza mediante URL query params en la pagina de catalogo: categoria, precio, material, marca, orden y pagina.

### Carrito

`useCartStore().addItem()` persiste en localStorage. Los calculos reactivos incluyen subtotal, envio (15 EUR) e IVA (21%). El flujo completo: `checkout.vue` -> `/api/redsys/create-payment` -> redirect a Redsys -> `/api/redsys/notification` webhook.

### Favoritos

`useFavoritesStore()` persiste en localStorage de forma similar al carrito.

## Configuracion Nuxt

Modulos activos: `@pinia/nuxt`, `nuxt-gtag`, `nuxt-umami`, `@nuxt/eslint`.

Tailwind CSS v4 se integra via plugin Vite (`@tailwindcss/vite`) en lugar de modulo Nuxt.

Variables de entorno sensibles (tokens de Directus, claves Redsys) se configuran exclusivamente via `runtimeConfig` privado, nunca expuestas al cliente.

## Auto-imports

Nuxt 4 importa automaticamente:
- **Componentes** desde `app/components/` (con prefijo de directorio: `BentoCard`, `CartItem`, `ProductCard`, etc.)
- **Composables** desde `app/composables/` (`useDirectus()`)
- **Stores** via `@pinia/nuxt` (`useCartStore()`, `useProductsStore()`, etc.)
- **Utilidades de Vue/Nuxt** (`ref`, `computed`, `useRoute`, `useFetch`, etc.)
