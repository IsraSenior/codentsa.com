# Conventions

## Convenciones de Codigo

- **Prettier**: sin semicolons, comillas simples, 2 espacios, trailing comma, width 100
- **ESLint**: `@nuxt/eslint` base, `vue/multi-word-component-names` desactivada
- **Commits**: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`), NO push automatico
- **Footer de commits**: `Co-Authored-By: Claude <noreply@anthropic.com>`
- **Seguridad**: nunca commitear `.env`, variables sensibles solo en runtimeConfig privado

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

**Componentes** (estructura jerarquica en `app/components/`):
- `layout/`: AnnouncementBar, Footer, Header, HeroBanner, Logo, Section
- `ui/`: BaseCarousel, Breadcrumbs, Button, DateInput, OfferPopup, Pagination
- `features/`: Bento/, Brand/, Cart/, Checkout/, FAQ/, Legal/, Product/, Staff/, Testimonials/, Toast/
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
