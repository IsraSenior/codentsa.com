---
phase: 04-components-reorg
plan: 01
subsystem: ui
tags: [nuxt, vue, components, auto-imports, reorganization]

# Dependency graph
requires:
  - phase: 03-claude-config
    provides: Project conventions and rules documentation
provides:
  - Three-tier component hierarchy (layout/ui/features)
  - nuxt.config.ts components array with per-directory pathPrefix settings
  - Clean auto-import names preserved for all 42 components
affects: [05-final-validation]

# Tech tracking
tech-stack:
  added: []
  patterns: [three-tier component hierarchy, pathPrefix-based auto-import naming]

key-files:
  created: []
  modified:
    - nuxt.config.ts
    - app/pages/cambios-devoluciones.vue
    - app/pages/quienes-somos.vue

key-decisions:
  - "Kept Toast and Accordion in features/ instead of ui/ to avoid name collisions and because they are domain-specific"
  - "Removed explicit Section.vue import in quienes-somos.vue, relying on Nuxt auto-import"

patterns-established:
  - "Layout components (app-shell primitives) in app/components/layout/ with pathPrefix: false"
  - "UI components (reusable widgets) in app/components/ui/ with pathPrefix: false"
  - "Feature components (domain-specific) in app/components/features/ with pathPrefix: true"

requirements-completed: [COMP-01, COMP-02, COMP-03, COMP-04]

# Metrics
duration: 2min
completed: 2026-03-05
---

# Phase 4 Plan 1: Components Reorg Summary

**Reorganized 42 components into three-tier hierarchy (layout/ui/features) with Nuxt pathPrefix auto-import configuration**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-05T15:43:32Z
- **Completed:** 2026-03-05T15:45:16Z
- **Tasks:** 2
- **Files modified:** 44

## Accomplishments
- Moved 6 layout components (Header, Footer, AnnouncementBar, HeroBanner, Logo, Section) to app/components/layout/
- Moved 6 UI components (BaseCarousel, Breadcrumbs, Button, DateInput, OfferPopup, Pagination) to app/components/ui/
- Moved 28 feature components across 10 subdirectories to app/components/features/
- Configured nuxt.config.ts with three-entry components array preserving all auto-import names
- Renamed FormDateInput to DateInput (only intentional name change)
- pnpm build passes without errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure nuxt.config.ts and move all 42 components** - `78446cd` (refactor)
2. **Task 2: Verify build and clean up** - `b5c0f80` (fix)

## Files Created/Modified
- `nuxt.config.ts` - Added three-entry components config with pathPrefix settings
- `app/components/layout/` - 6 layout components (AnnouncementBar, Footer, Header, HeroBanner, Logo, Section)
- `app/components/ui/` - 6 UI components (BaseCarousel, Breadcrumbs, Button, DateInput, OfferPopup, Pagination)
- `app/components/features/` - 10 subdirectories with 28 feature components
- `app/pages/cambios-devoluciones.vue` - Updated FormDateInput references to DateInput
- `app/pages/quienes-somos.vue` - Removed hardcoded Section.vue import

## Decisions Made
- Kept Toast in features/ (not ui/) because its 2 files (Container.vue, Index.vue) would cause name collisions with pathPrefix: false
- Kept FAQ/Accordion and Checkout/StepAccordion in features/ because no generic Accordion component exists
- Removed explicit import of Section.vue in quienes-somos.vue, relying on Nuxt auto-import from layout/

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Removed hardcoded Section.vue import in quienes-somos.vue**
- **Found during:** Task 2 (Build verification)
- **Issue:** Build failed with ENOENT for ~/components/Section.vue because quienes-somos.vue had an explicit import from the old path
- **Fix:** Removed the explicit import statement; Nuxt auto-import resolves Section from layout/
- **Files modified:** app/pages/quienes-somos.vue
- **Verification:** pnpm build passes without errors
- **Committed in:** b5c0f80

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential fix for build to pass. No scope creep.

## Issues Encountered
None beyond the deviation documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Component hierarchy is complete and verified
- Ready for Phase 5: Final Validation (update CLAUDE.md to reflect new structure)
- No blockers or concerns

---
*Phase: 04-components-reorg*
*Completed: 2026-03-05*

## Self-Check: PASSED
- layout/Header.vue: FOUND
- ui/Button.vue: FOUND
- features/Product/Card.vue: FOUND
- Commit 78446cd: FOUND
- Commit b5c0f80: FOUND
