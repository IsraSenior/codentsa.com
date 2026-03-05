# Codentsa.com

## What This Is

E-commerce de instrumental dental profesional para clinicas y profesionales del sector odontologico en Espana. Construido con Nuxt 4.3.1, Vue 3.5.29, Tailwind CSS v4.2.1 y Pinia, con Directus como CMS headless y Redsys para pagos.

## Core Value

Los profesionales dentales pueden encontrar, comparar y comprar instrumental dental de calidad de forma rapida y segura.

## Requirements

### Validated

- Catalogo de productos con filtros (categoria, precio, material, marca, orden, paginacion)
- Detalle de producto con galeria, variantes y reviews
- Carrito de compras persistente en localStorage
- Sistema de favoritos persistente en localStorage
- Checkout con integracion Redsys (tarjeta/transferencia)
- Paginas legales (aviso legal, terminos, privacidad, cambios/devoluciones, soporte)
- Analytics: Google Analytics (GA4) + Umami + Meta Pixel
- Pagina de mantenimiento con acceso por clave
- Design system: tipografias (Figtree/Blauer Nue), colores (primary rojo, secondary azul, neutral gris-teal)
- Limpieza y reorganizacion del proyecto (docs, componentes, configuracion) -- v1.0
- Actualizacion a Nuxt 4.3.1 y todas las dependencias -- v1.0
- Estructura de .claude/ con best practices (rules, settings) -- v1.0
- Reorganizacion de componentes (layout/ui/features) -- v1.0
- Documentacion actualizada y sincronizada con el codigo real -- v1.0

### Active

- [ ] Productos migrados de store hardcoded a Directus
- [ ] Colecciones de Directus creadas segun schema documentado
- [ ] Composable useDirectus conectado y funcional
- [ ] Sistema de cuentas de usuario
- [ ] Historial de pedidos por usuario

### Out of Scope

- App movil -- web-first, PWA como alternativa futura
- TypeScript migration -- proyecto JS por decision del equipo
- Nuevos metodos de pago (Bizum, Google Pay) -- cuando Redsys produccion este activo
- Offline mode -- real-time y conectividad son core

## Context

Shipped v1.0 con 9,825 LOC (Vue/JS).
Tech stack: Nuxt 4.3.1, Vue 3.5.29, Tailwind CSS 4.2.1, Pinia 3.0.4.
42 componentes organizados en layout/ (6), ui/ (6), features/ (30 across 10 subdirectories).
Productos actualmente hardcoded en Pinia store, preparado para migracion a Directus.
.claude/rules/ con documentacion modular (architecture, design-tokens, conventions).

## Constraints

- **Tech stack**: Nuxt 4.3.1 + Vue 3.5.29 + Tailwind CSS v4.2.1 + Pinia (JavaScript, no TypeScript)
- **CMS**: Directus (headless)
- **Pagos**: Redsys con HMAC-SHA256
- **Hosting**: Docker (Dockerfile existente)
- **Package manager**: pnpm
- **Node**: v22.x

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| JavaScript sobre TypeScript | Simplicidad del equipo, proyecto JS desde inicio | Good |
| Tailwind CSS v4 (no v3) | Adoptado temprano, funciona correctamente | Good |
| Productos hardcoded en store | Temporal hasta migracion a Directus | Revisit |
| Pinia sin persistedstate plugin | localStorage manual en cart/favorites | Pending |
| Reorganizacion layout/ui/features | Separacion clara por responsabilidad | Good |
| Toast/Accordion en features/ (no ui/) | Name collisions con pathPrefix:false, domain-specific | Good |
| CLAUDE.md modular en .claude/rules/ | Contexto eficiente, reglas separadas por dominio | Good |
| @directus/sdk en v20.x | v21 breaking changes, no urgente | Pending |
| eslint en v9.x | v10 incompatible con @nuxt/eslint | Pending |
| vue-router removido | Nuxt lo gestiona internamente | Good |

---
*Last updated: 2026-03-05 after v1.0 milestone*
