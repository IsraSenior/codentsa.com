# Requirements: Codentsa.com

**Defined:** 2026-03-05
**Core Value:** Los profesionales dentales pueden encontrar, comparar y comprar instrumental dental de calidad de forma rapida y segura.

## v1.0 Requirements

Requirements para milestone de limpieza, reorganizacion y actualizacion.

### Documentacion

- [ ] **DOCS-01**: Docs desactualizados (architecture.md, components.md, directus-integration.md) estan actualizados y reflejan el codigo real
- [ ] **DOCS-02**: PNGs sueltos en la raiz del proyecto estan eliminados o movidos a su ubicacion correcta
- [ ] **DOCS-03**: .gitignore incluye .playwright-mcp/ para evitar trackear output de Playwright
- [ ] **DOCS-04**: CLAUDE.md refleja el estado real del proyecto despues de todos los cambios

### Configuracion Claude

- [ ] **CLDE-01**: .claude/rules/ contiene reglas modulares extraidas de CLAUDE.md (arquitectura, design tokens, convenciones)
- [ ] **CLDE-02**: .claude/settings.json configurado con permisos y MCP servers correctos
- [ ] **CLDE-03**: Playwright MCP configurado para output exclusivamente en .playwright-mcp/
- [ ] **CLDE-04**: CLAUDE.md en raiz es un indice ligero que referencia .claude/rules/

### Componentes

- [ ] **COMP-01**: Componentes reorganizados en layout/ (Header, Footer, AnnouncementBar, HeroBanner, Section, Logo)
- [ ] **COMP-02**: Componentes reorganizados en ui/ (Button, Pagination, Breadcrumbs, Carousel, Toast, Accordion, DateInput, OfferPopup)
- [ ] **COMP-03**: Componentes reorganizados en features/ (Product, Cart, Checkout, Bento, Brand, Staff, Testimonials, Legal, FAQ)
- [ ] **COMP-04**: Todas las referencias a componentes en paginas y otros componentes actualizadas al nuevo path

### Dependencias

- [ ] **DEPS-01**: Nuxt actualizado a 4.3.1
- [ ] **DEPS-02**: Todas las dependencias actualizadas a versiones compatibles con Nuxt 4.3.1
- [ ] **DEPS-03**: El proyecto compila (pnpm build) y funciona (pnpm dev) sin errores
- [ ] **DEPS-04**: Dependencias no utilizadas identificadas y removidas

## Future Requirements

Deferred to next milestone.

### CMS Integration

- **CMS-01**: Productos migrados de store hardcoded a Directus
- **CMS-02**: Colecciones de Directus creadas segun schema documentado
- **CMS-03**: Composable useDirectus conectado y funcional

### Authentication

- **AUTH-01**: Sistema de cuentas de usuario
- **AUTH-02**: Historial de pedidos por usuario

## Out of Scope

| Feature | Reason |
|---------|--------|
| Nuevas features de negocio | Milestone exclusivo de limpieza |
| Migracion a Directus | Milestone posterior |
| Nuevos metodos de pago | Requiere Redsys en produccion |
| App movil | Web-first |
| TypeScript migration | Proyecto JS por decision del equipo |
| Tests (Vitest/Playwright) | Milestone posterior, post-reorganizacion |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DEPS-01 | Phase 1 | Pending |
| DEPS-02 | Phase 1 | Pending |
| DEPS-03 | Phase 1 | Pending |
| DEPS-04 | Phase 1 | Pending |
| DOCS-01 | Phase 2 | Pending |
| DOCS-02 | Phase 2 | Pending |
| DOCS-03 | Phase 2 | Pending |
| CLDE-01 | Phase 3 | Pending |
| CLDE-02 | Phase 3 | Pending |
| CLDE-03 | Phase 3 | Pending |
| CLDE-04 | Phase 3 | Pending |
| COMP-01 | Phase 4 | Pending |
| COMP-02 | Phase 4 | Pending |
| COMP-03 | Phase 4 | Pending |
| COMP-04 | Phase 4 | Pending |
| DOCS-04 | Phase 5 | Pending |

**Coverage:**
- v1.0 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0

---
*Requirements defined: 2026-03-05*
*Last updated: 2026-03-05 after roadmap creation*
