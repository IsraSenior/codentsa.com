# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos de Desarrollo

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de produccion
pnpm generate     # Generar sitio estatico
pnpm preview      # Preview del build
pnpm lint         # Ejecutar ESLint
pnpm lint:fix     # ESLint con auto-fix
pnpm format       # Formatear con Prettier
```

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

## Tokens de Diseno

### Tipografias

| Clase Tailwind | Fuente | Origen | Pesos |
|---|---|---|---|
| `font-title` | Figtree | Google Fonts | 300-900 (variable) |
| `font-body` | Blauer Nue | `app/assets/css/fonts.css` | 100-900 (8 pesos + italics) |

### Colores

> `--color-*: initial` resetea todos los colores de Tailwind. Solo existen los definidos aqui.

**Primary (rojo):**
| Token | Hex |
|---|---|
| `primary-50` | #fef2f3 |
| `primary-100` | #fde5e7 |
| `primary-200` | #fbced3 |
| `primary-300` | #f7a7b0 |
| `primary-400` | #f27587 |
| `primary-500` / `primary` | #e71d35 |
| `primary-600` | #d01729 |
| `primary-700` | #a0091e |
| `primary-800` | #87071a |
| `primary-900` | #780716 |

**Secondary (azul):**
| Token | Hex |
|---|---|
| `secondary-50` | #eff6ff |
| `secondary-100` | #dbeafe |
| `secondary-200` | #bfdbfe |
| `secondary-300` | #93c5fd |
| `secondary-400` | #60a5fa |
| `secondary-500` / `secondary` | #2463eb |
| `secondary-600` | #1d4ed8 |
| `secondary-700` | #163b8d |
| `secondary-800` | #1e3a8a |
| `secondary-900` | #07142f |

**Neutral (gris-teal):**
| Token | Hex |
|---|---|
| `neutral-0` / `white` | #ffffff |
| `neutral-50` | #f7fcfc |
| `neutral-100` | #eff9fa |
| `neutral-200` | #e0f3f5 |
| `neutral-300` | #d0ecf0 |
| `neutral-400` | #b1e0e6 |
| `neutral-500` | #57888e |
| `neutral-600` | #487a80 |
| `neutral-700` | #396b71 |
| `neutral-800` | #2a5157 |
| `neutral-900` / `black` | #162526 |

**Sistema (sin escala, usar opacidades para variantes):**
| Token | Hex |
|---|---|
| `success` | #22c393 |
| `warning` | #fccc4f |
| `error` | #f04343 |

### Uso de Tokens

```html
bg-primary-500  text-secondary-700  border-neutral-300
bg-success/10  text-error  border-warning/30
font-title font-bold  font-body font-medium
```

## Agentes Especializados (OBLIGATORIO)

**SIEMPRE usar el agente especializado del proyecto cuando la tarea coincida con su descripcion.** No resolver manualmente lo que un agente puede hacer mejor:

| Agente | Usar para |
|---|---|
| `nuxt-ui-engineer` | Componentes Vue, estilos Tailwind, validacion visual con Playwright |
| `nuxt-logic-architect` | Composables, services, server routes, integracion CMS/APIs |
| `nuxt-seo-architect` | Meta tags, structured data, sitemap, robots.txt, indexacion |
| `email-template-engineer` | Templates de email transaccional con Resend |
| `puppeteer-pdf-engineer` | Generacion de PDFs con Puppeteer en Nuxt |
| `web-scraping-architect` | Extraccion estructurada de datos de sitios externos |
| `context-steward` | Actualizar documentacion (CLAUDE.md, README) tras cambios arquitectonicos |

## Componentes y Paginas

**Componentes** (estructura flat por dominio): Product/, Cart/, Checkout/, Toast/, Bento/, Brand/, Staff/, FAQ/, Form/, Legal/
- Auto-imports de Nuxt activos para componentes, composables y utils

**Paginas principales:**
- `/` - Homepage
- `/productos` - Catalogo con filtros (query params)
- `/productos/[id]` - Detalle de producto
- `/carrito` - Carrito de compras
- `/checkout` - Proceso de pago
- `/checkout-success` y `/checkout-error` - Resultado del pago
- `/favoritos`, `/cuenta`, `/ofertas`, `/quienes-somos`
- Paginas legales: aviso-legal, terminos-condiciones, politicas-privacidad, cambios-devoluciones, soporte-tecnico

## Convenciones de Codigo

- **Prettier**: sin semicolons, comillas simples, 2 espacios, trailing comma, width 100
- **ESLint**: `@nuxt/eslint` base, `vue/multi-word-component-names` desactivada
- **Commits**: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`), NO push automatico
- **Footer de commits**: `Co-Authored-By: Claude <noreply@anthropic.com>`
- **Seguridad**: nunca commitear `.env`, variables sensibles solo en runtimeConfig privado
