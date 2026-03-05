# Codentsa.com

## What This Is

E-commerce de instrumental dental profesional para clinicas y profesionales del sector odontologico en Espana. Construido con Nuxt 4, Vue 3, Tailwind CSS v4 y Pinia, con Directus como CMS headless y Redsys para pagos.

## Core Value

Los profesionales dentales pueden encontrar, comparar y comprar instrumental dental de calidad de forma rapida y segura.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- Catalogo de productos con filtros (categoria, precio, material, marca, orden, paginacion)
- Detalle de producto con galeria, variantes y reviews
- Carrito de compras persistente en localStorage
- Sistema de favoritos persistente en localStorage
- Checkout con integracion Redsys (tarjeta/transferencia)
- Paginas legales (aviso legal, terminos, privacidad, cambios/devoluciones, soporte)
- Analytics: Google Analytics (GA4) + Umami + Meta Pixel
- Pagina de mantenimiento con acceso por clave
- Design system: tipografias (Figtree/Blauer Nue), colores (primary rojo, secondary azul, neutral gris-teal)

### Active

<!-- Current scope. Building toward these. -->

- [ ] Limpieza y reorganizacion del proyecto (docs, componentes, configuracion)
- [ ] Actualizacion a Nuxt 4.3.1 y todas las dependencias
- [ ] Estructura de .claude/ con best practices (rules, settings, commands)
- [ ] Reorganizacion de componentes (ui/layout/features)
- [ ] Documentacion actualizada y sincronizada con el codigo real

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Nuevas features de negocio — Este milestone es exclusivamente de limpieza y actualizacion
- Migracion de datos a Directus — Se hara en un milestone posterior
- Nuevos metodos de pago (Bizum, Google Pay) — Cuando Redsys produccion este activo
- App movil — Web-first, movil despues
- Sistema de autenticacion de usuarios — Posterior al CMS

## Context

- Proyecto con ~6 meses sin trabajo formal. Codigo funcional pero desorganizado.
- Documentacion en docs/ parcialmente desactualizada (3 archivos criticos de 15)
- Estructura de componentes plana, sin separacion ui/layout/features
- Mezcla de .js y .ts en server/ sin convencion clara
- CLAUDE.md monolitico en raiz con todo mezclado
- .claude/ casi vacio (solo settings.local.json)
- Productos hardcoded en store, preparado para Directus pero no migrado
- Screenshots de Playwright cayendo en raiz en vez de .playwright-mcp/
- 3 PNGs sin trackear en raiz del proyecto

## Constraints

- **Tech stack**: Nuxt 4 + Vue 3 + Tailwind CSS v4 + Pinia (JavaScript, no TypeScript)
- **CMS**: Directus (headless)
- **Pagos**: Redsys con HMAC-SHA256
- **Hosting**: Docker (Dockerfile existente)
- **Package manager**: pnpm
- **Node**: v22.x

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| JavaScript sobre TypeScript | Simplicidad del equipo, proyecto JS desde inicio | -- Pending |
| Tailwind CSS v4 (no v3) | Adoptado temprano, funciona correctamente | -- Good |
| Productos hardcoded en store | Temporal hasta migracion a Directus | -- Revisit |
| Pinia sin persistedstate plugin | localStorage manual en cart/favorites | -- Pending |
| Estructura plana de componentes | Decision inicial, necesita reorganizacion | -- Revisit |

## Current Milestone: v1.0 Cleanup & Update

**Goal:** Limpiar, reorganizar y actualizar el proyecto para retomar desarrollo profesional y estructurado.

**Target features:**
- Limpieza de documentacion desactualizada
- Configuracion de .claude/ con best practices
- Reorganizacion de componentes (ui/layout/features)
- Actualizacion de dependencias a Nuxt 4.3.1
- CLAUDE.md limpio y modular

---
*Last updated: 2026-03-05 after milestone v1.0 initialization*
