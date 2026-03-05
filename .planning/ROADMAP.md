# Roadmap: Codentsa.com

## Overview

Milestone v1.0 brings a dormant but functional e-commerce project back to professional standards. We start by updating all dependencies to establish a stable foundation, then clean up stale docs and loose files, configure the .claude/ directory with modular rules, reorganize 42 components into a structured hierarchy, and finish with a final CLAUDE.md that accurately reflects the transformed project.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Dependencies Update** - Update Nuxt to 4.3.1, all deps to compatible versions, remove unused packages
- [x] **Phase 2: Docs Cleanup** - Clean stale docs, remove loose files, fix .gitignore (completed 2026-03-05)
- [ ] **Phase 3: Claude Config** - Set up .claude/rules/ with modular rules, configure settings and MCP
- [ ] **Phase 4: Components Reorg** - Reorganize 42 components into ui/layout/features structure
- [ ] **Phase 5: Final Validation** - Update CLAUDE.md to reflect all changes from phases 1-4

## Phase Details

### Phase 1: Dependencies Update
**Goal**: Project runs on current Nuxt 4.3.1 with all dependencies up to date and no dead packages
**Depends on**: Nothing (first phase)
**Requirements**: DEPS-01, DEPS-02, DEPS-03, DEPS-04
**Success Criteria** (what must be TRUE):
  1. Running `pnpm dev` starts the dev server without errors or deprecation warnings
  2. Running `pnpm build` completes successfully and produces a working build
  3. Nuxt version reported in dev server output is 4.3.1
  4. No unused packages remain in package.json (dependencies and devDependencies are lean)
**Plans:** 2 plans

Plans:
- [ ] 01-01-PLAN.md — Update Nuxt to 4.3.1 and all dependencies to latest compatible versions
- [ ] 01-02-PLAN.md — Remove unused dependencies and verify full build/dev functionality

### Phase 2: Docs Cleanup
**Goal**: Project documentation is accurate, and the repository root is free of stray files
**Depends on**: Phase 1
**Requirements**: DOCS-01, DOCS-02, DOCS-03
**Success Criteria** (what must be TRUE):
  1. docs/architecture.md, docs/components.md, and docs/directus-integration.md reflect the actual code and file structure
  2. No PNG files exist in the project root directory
  3. .gitignore contains an entry for .playwright-mcp/ and git status shows no tracked Playwright output
**Plans:** 1/1 plans complete

Plans:
- [ ] 02-01-PLAN.md — Remove root PNGs, add .playwright-mcp/ to .gitignore, update stale docs

### Phase 3: Claude Config
**Goal**: .claude/ directory contains modular, well-organized rules and correct tool configuration
**Depends on**: Phase 2
**Requirements**: CLDE-01, CLDE-02, CLDE-03, CLDE-04
**Success Criteria** (what must be TRUE):
  1. .claude/rules/ contains separate rule files for architecture, design tokens, and coding conventions
  2. .claude/settings.json has correct permissions and MCP server configuration
  3. Playwright MCP screenshots are written exclusively to .playwright-mcp/ (not project root)
  4. CLAUDE.md in project root is a lightweight index that points to .claude/rules/ for details
**Plans:** 1 plan

Plans:
- [ ] 03-01-PLAN.md — Create .claude/rules/ modular files, settings.json, and slim CLAUDE.md index

### Phase 4: Components Reorg
**Goal**: All components live in a structured hierarchy and every reference in the codebase is updated
**Depends on**: Phase 1
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04
**Success Criteria** (what must be TRUE):
  1. app/components/layout/ contains Header, Footer, AnnouncementBar, HeroBanner, Section, Logo
  2. app/components/ui/ contains Button, Pagination, Breadcrumbs, Carousel, Toast, Accordion, DateInput, OfferPopup
  3. app/components/features/ contains subdirectories for Product, Cart, Checkout, Bento, Brand, Staff, Testimonials, Legal, FAQ
  4. Running `pnpm dev` and navigating every page shows no broken component references
  5. Running `pnpm build` completes without component resolution errors
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Final Validation
**Goal**: CLAUDE.md is the single source of truth for the project's current state after all cleanup
**Depends on**: Phase 3, Phase 4
**Requirements**: DOCS-04
**Success Criteria** (what must be TRUE):
  1. CLAUDE.md accurately documents the new component structure (ui/layout/features)
  2. CLAUDE.md references match actual file paths and available commands after dependency updates
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Dependencies Update | 0/2 | Planning complete | - |
| 2. Docs Cleanup | 1/1 | Complete   | 2026-03-05 |
| 3. Claude Config | 0/1 | Planning complete | - |
| 4. Components Reorg | 0/? | Not started | - |
| 5. Final Validation | 0/? | Not started | - |
