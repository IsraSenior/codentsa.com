# Architecture

## Arquitectura

- **Stack**: Nuxt 4 + Vue 3 + Tailwind CSS v4 + Pinia, JavaScript (no TypeScript)
- **Frontend**: `app/` (pages, components, composables, stores, assets)
- **Backend**: `server/api/` (Nitro server routes)
- **Estado**: Pinia stores en `app/stores/` (products, cart, favorites, toast)
- **Productos**: hardcoded en `stores/products.js` (preparado para Directus)
- **Persistencia**: cart y favorites en localStorage
- **Pagos**: `server/api/redsys/` con HMAC-SHA256 (create-payment, verify-payment, notification)
- **CMS**: Directus via `composables/useDirectus.js` + `server/utils/directus.js`
- **Analytics**: nuxt-gtag (GA4) + nuxt-umami + Meta Pixel (runtimeConfig)

## Flujo de Datos

- **Productos**: `useProductsStore()` -> componentes (filtrado por URL query params: categoria, precio, material, marca, orden, pagina)
- **Carrito**: `useCartStore().addItem()` -> localStorage -> calculos reactivos (subtotal, envio 15€, IVA 21%)
- **Pagos**: `checkout.vue` -> `/api/redsys/create-payment` -> Redsys redirect -> `/api/redsys/notification` webhook
- **Directus**: `useDirectus()` composable para cliente, `server/utils/directus.js` para servidor
