# Phase 4: Components Reorg - Research

**Researched:** 2026-03-05
**Domain:** Nuxt 4 component auto-imports, directory reorganization
**Confidence:** HIGH

## Summary

This phase reorganizes 42 Vue components from a flat/domain structure into a three-tier hierarchy: `layout/`, `ui/`, and `features/`. The primary challenge is that Nuxt auto-imports generate component names from directory paths by default. Moving `Header.vue` into `layout/Header.vue` would change its auto-import name from `<Header>` to `<LayoutHeader>`, breaking all template references.

The solution involves configuring `nuxt.config.ts` with a multi-directory `components` array that uses `pathPrefix: false` for `layout/` and `ui/` (since those contain unique filenames), while keeping path prefixing enabled for `features/` (which contains duplicate filenames like `Card.vue` in 5 subdirectories). This approach preserves all existing auto-import names while achieving the desired folder structure.

**Primary recommendation:** Configure `components` in `nuxt.config.ts` with three entries using different `pathPrefix` settings, then move files. No template changes needed if config is correct.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| COMP-01 | Layout components (Header, Footer, AnnouncementBar, HeroBanner, Section, Logo) in `layout/` | pathPrefix: false config keeps auto-import names unchanged |
| COMP-02 | UI components (Button, Pagination, Breadcrumbs, Carousel, Toast, Accordion, DateInput, OfferPopup) in `ui/` | pathPrefix: false config keeps auto-import names unchanged |
| COMP-03 | Feature components in `features/` subdirs (Product, Cart, Checkout, Bento, Brand, Staff, Testimonials, Legal, FAQ) | Default pathPrefix keeps domain prefixes (e.g., ProductCard) |
| COMP-04 | All references updated - no broken imports | With correct nuxt.config.ts, zero template changes needed |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Nuxt | 4.3.1 | Framework | Already installed, provides component auto-imports |

No additional libraries needed. This is purely a file reorganization + config change.

## Architecture Patterns

### Target Component Structure
```
app/components/
  layout/
    AnnouncementBar.vue
    Footer.vue
    Header.vue
    HeroBanner.vue
    Logo.vue
    Section.vue
  ui/
    BaseCarousel.vue
    Breadcrumbs.vue
    Button.vue
    DateInput.vue          (was Form/DateInput.vue)
    OfferPopup.vue
    Pagination.vue
  features/
    Bento/
      Card.vue
      SectionSolutions.vue
    Brand/
      Card.vue
    Cart/
      Item.vue
      ItemSkeleton.vue
      Summary.vue
    Checkout/
      CountrySelector.vue
      OrderSummary.vue
      PaymentMethod.vue
      PersonalInfo.vue
      StepAccordion.vue
    FAQ/
      Accordion.vue
      Skeleton.vue
    Legal/
      Page.vue
    Product/
      Banner.vue
      Card.vue
      CardSkeleton.vue
      CTA.vue
      EmptyState.vue
      Filters.vue
      FloatingCart.vue
      Gallery.vue
      ReviewModal.vue
      Reviews.vue
      Skeleton.vue
      VariantAccordion.vue
    Staff/
      Card.vue
    Testimonials/
      Card.vue
    Toast/
      Container.vue
      Index.vue
```

### Critical: nuxt.config.ts components Configuration

The entire reorganization hinges on this config. Order matters -- more specific paths must come first:

```javascript
export default defineNuxtConfig({
  // ... existing config ...
  components: [
    {
      path: '~/components/features',
      pathPrefix: true,    // keeps ProductCard, BentoCard, etc.
    },
    {
      path: '~/components/layout',
      pathPrefix: false,   // Header stays <Header>, not <LayoutHeader>
    },
    {
      path: '~/components/ui',
      pathPrefix: false,   // Button stays <Button>, not <UiButton>
    },
  ],
})
```

**Source:** [Nuxt 4 Components Directory Structure](https://nuxt.com/docs/4.x/directory-structure/app/components)

### Name Collision Analysis (CRITICAL)

Duplicate filenames that PREVENT using global `pathPrefix: false`:

| Filename | Locations | Auto-import Name |
|----------|-----------|-----------------|
| `Card.vue` | Bento, Brand, Product, Staff, Testimonials | `BentoCard`, `BrandCard`, `ProductCard`, `StaffCard`, `TestimonialsCard` |
| `Skeleton.vue` | FAQ, Product | `FAQSkeleton`, `ProductSkeleton` |

These must keep their directory-based prefixes. That is why `features/` uses `pathPrefix: true`.

### Special Case: Form/DateInput.vue

Currently at `Form/DateInput.vue`, referenced as `<FormDateInput>`. Moving to `ui/DateInput.vue` with `pathPrefix: false` would change the auto-import name from `<FormDateInput>` to `<DateInput>`.

**Decision needed:** Either:
1. Move to `ui/DateInput.vue` and update 2 references in `cambios-devoluciones.vue` from `<FormDateInput>` to `<DateInput>` (RECOMMENDED -- cleaner)
2. Keep the `Form/` subdirectory under features -- but Form is not in the target structure

### Special Case: Toast components

Currently `Toast/Container.vue` and `Toast/Index.vue`, referenced as `<ToastContainer>` and `<Toast>`. Moving to `features/Toast/` preserves these names with `pathPrefix: true` on `features/`.

### Special Case: FAQ/Accordion.vue

Currently referenced as `<FAQAccordion>`. The `FAQ` directory prefix collapses correctly with Nuxt's auto-import. Under `features/FAQ/Accordion.vue` with `pathPrefix: true` on `features/`, the name becomes `<FeaturesF-a-qAccordion>` -- NO, Nuxt uses PascalCase path joining, so `features/FAQ/Accordion.vue` becomes `<FeaturesFaqAccordion>`.

**This is a problem.** With `pathPrefix: true` on the `features/` directory, ALL feature components get a `Features` prefix added:
- `features/Product/Card.vue` -> `<FeaturesProductCard>` (was `<ProductCard>`)
- `features/Bento/Card.vue` -> `<FeaturesBentoCard>` (was `<BentoCard>`)

### CORRECTED Configuration

The `features/` path must ALSO use `pathPrefix: false` to avoid adding the `Features` prefix. But then the domain subdirectories (Product/, Cart/, etc.) still need to contribute their prefix. With `pathPrefix: false`, only the filename is used -- losing `Product`, `Cart`, etc.

**Actual solution:** Do NOT scan `features/` directly. Instead, scan each subdirectory individually, OR use `pathPrefix` at the features level with `prefix: ''`.

After further analysis, the correct approach:

```javascript
components: [
    {
      path: '~/components/layout',
      pathPrefix: false,
    },
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
    // features/ subdirs scanned with pathPrefix true so
    // Product/Card.vue -> ProductCard (path = features/Product, prefix from "Product" dir)
    // But we need to NOT include "features" in the prefix
    {
      path: '~/components/features',
      pathPrefix: true,
      // With pathPrefix: true, features/Product/Card.vue -> FeaturesProductCard
      // This is WRONG
    },
  ],
```

**The real solution:** Set `pathPrefix: false` on all three, BUT the `features/` subdirectories inherently have `pathPrefix: true` behavior because Nuxt walks subdirectories with default path prefixing within a scanned root.

Let me correct this based on how Nuxt actually works:

When you configure `path: '~/components/features'` with `pathPrefix: false`:
- `features/Product/Card.vue` -> The scan root is `features/`, so relative path is `Product/Card.vue`
- With `pathPrefix: false`: name is just `Card` (COLLISION!)
- With `pathPrefix: true`: name is `ProductCard` -- but the `features/` part of path is NOT included since it IS the scan root

**FINAL CORRECT ANSWER:**

```javascript
components: [
    {
      path: '~/components/layout',
      pathPrefix: false,   // Header.vue -> <Header>
    },
    {
      path: '~/components/ui',
      pathPrefix: false,   // Button.vue -> <Button>
    },
    {
      path: '~/components/features',
      pathPrefix: true,    // Product/Card.vue -> <ProductCard> (scan root = features/)
    },
  ],
```

With `path: '~/components/features'` and `pathPrefix: true`:
- The scan root is `features/` itself
- Relative paths are `Product/Card.vue`, `Cart/Item.vue`, etc.
- Auto-import names: `ProductCard`, `CartItem`, `BentoCard`, etc.
- The word "features" is NOT part of the component name because it's the scan root, not a subdirectory within the scan root

This preserves ALL existing auto-import names.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Component name mapping | Manual import statements | Nuxt `components` config with `pathPrefix` | Auto-imports handle everything |
| Bulk file moves | Manual mv commands one by one | `git mv` for each file | Preserves git history |
| Reference updates | Find-and-replace in templates | Correct `nuxt.config.ts` config | With right config, zero template changes needed (except FormDateInput) |

## Common Pitfalls

### Pitfall 1: The Features Prefix Trap
**What goes wrong:** Configuring `path: '~/components'` (root) with `pathPrefix: true` causes ALL reorganized components to get `Layout`, `Ui`, or `Features` prefixes added to their names.
**Why it happens:** Nuxt uses relative path from scan root to build component names.
**How to avoid:** Configure THREE separate scan paths, one per category. The `features/` directory becomes the scan root, so `Product/Card.vue` correctly becomes `<ProductCard>`.

### Pitfall 2: Removing Default Component Scanning
**What goes wrong:** When you provide a `components` array in nuxt.config.ts, Nuxt stops scanning the default `~/components` directory.
**Why it happens:** Explicit configuration replaces default behavior.
**How to avoid:** Make sure ALL three directories (layout, ui, features) are listed. Do NOT also include `~/components` as a fourth entry or components will be double-registered.

### Pitfall 3: Forgetting git mv
**What goes wrong:** Using `mv` instead of `git mv` loses git history for moved files.
**Why it happens:** Regular mv creates a delete + new file in git.
**How to avoid:** Always use `git mv` for moving component files. Git can usually track renames with regular mv too, but `git mv` makes it explicit.

### Pitfall 4: Form/DateInput Special Case
**What goes wrong:** Moving `Form/DateInput.vue` to `ui/DateInput.vue` changes its auto-import name from `<FormDateInput>` to `<DateInput>`.
**Why it happens:** The `Form/` prefix was part of the old path-based name.
**How to avoid:** Update the 2 references in `cambios-devoluciones.vue` from `<FormDateInput>` to `<DateInput>` after moving.

### Pitfall 5: Order of Operations
**What goes wrong:** Moving files before updating nuxt.config.ts causes build failures during development.
**Why it happens:** The default scan of `~/components` won't find files in the new subdirectories without explicit config.
**How to avoid:** Update `nuxt.config.ts` FIRST with the new component paths, THEN move files. Or do both atomically in the same commit.

## Code Examples

### nuxt.config.ts Component Configuration
```javascript
// Source: https://nuxt.com/docs/4.x/directory-structure/app/components
export default defineNuxtConfig({
  // ... existing config preserved ...

  components: [
    {
      path: '~/components/layout',
      pathPrefix: false,
    },
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
    {
      path: '~/components/features',
      pathPrefix: true,
    },
  ],

  // ... rest of config ...
})
```

### Complete File Move Mapping

**To `layout/` (6 files, all currently at root level):**
| Current Path | New Path | Auto-import Name |
|-------------|----------|-----------------|
| `AnnouncementBar.vue` | `layout/AnnouncementBar.vue` | `<AnnouncementBar>` (unchanged) |
| `Footer.vue` | `layout/Footer.vue` | `<Footer>` (unchanged) |
| `Header.vue` | `layout/Header.vue` | `<Header>` (unchanged) |
| `HeroBanner.vue` | `layout/HeroBanner.vue` | `<HeroBanner>` (unchanged) |
| `Logo.vue` | `layout/Logo.vue` | `<Logo>` (unchanged) |
| `Section.vue` | `layout/Section.vue` | `<Section>` (unchanged) |

**To `ui/` (8 files, mix of root and subdirectory):**
| Current Path | New Path | Auto-import Name Change |
|-------------|----------|------------------------|
| `BaseCarousel.vue` | `ui/BaseCarousel.vue` | `<BaseCarousel>` (unchanged) |
| `Breadcrumbs.vue` | `ui/Breadcrumbs.vue` | `<Breadcrumbs>` (unchanged) |
| `Button.vue` | `ui/Button.vue` | `<Button>` (unchanged) |
| `Form/DateInput.vue` | `ui/DateInput.vue` | `<FormDateInput>` -> `<DateInput>` (CHANGED, 2 refs to update) |
| `OfferPopup.vue` | `ui/OfferPopup.vue` | `<OfferPopup>` (unchanged) |
| `Pagination.vue` | `ui/Pagination.vue` | `<Pagination>` (unchanged) |

Note: The requirements list "Accordion" under ui/ but the actual `FAQ/Accordion.vue` is a feature-specific component (fetches FAQ data from Directus). It should stay in `features/FAQ/`. The `Checkout/StepAccordion.vue` is also feature-specific. There is no generic `Accordion` UI component in the codebase.

**To `features/` (28 files, all currently in domain subdirectories):**
All existing domain subdirectories (`Bento/`, `Brand/`, `Cart/`, `Checkout/`, `FAQ/`, `Legal/`, `Product/`, `Staff/`, `Testimonials/`, `Toast/`) move as-is under `features/`. Auto-import names remain unchanged because `features/` is the scan root with `pathPrefix: true`.

### Template Reference Updates (MINIMAL)

Only 2 references need updating in the entire codebase:

```html
<!-- app/pages/cambios-devoluciones.vue (2 occurrences) -->
<!-- Before: -->
<FormDateInput ... />
<!-- After: -->
<DateInput ... />
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single flat components dir | Multi-dir with pathPrefix config | Nuxt 3+ | Allows organized hierarchy without name changes |
| Manual imports | Auto-imports from configured paths | Nuxt 3+ | Zero import statements needed |
| Global pathPrefix setting | Per-directory pathPrefix | Nuxt 3+ | Different naming strategies per directory |

## Open Questions

1. **Accordion component placement**
   - What we know: Requirements list "Accordion" under ui/. The codebase has `FAQ/Accordion.vue` (feature-specific, fetches data) and `Checkout/StepAccordion.vue` (feature-specific).
   - What's unclear: There is no generic reusable Accordion component. Is the requirement asking to extract one?
   - Recommendation: Keep both in `features/` since they are domain-specific. If a generic accordion is needed later, create it in `ui/`. The planner should note this deviation from requirements.

2. **Toast components in ui/ vs features/**
   - What we know: Requirements list "Toast" under ui/. The codebase has `Toast/Container.vue` and `Toast/Index.vue`.
   - What's unclear: Toast is used globally (in default layout) but has 2 files that reference each other.
   - Recommendation: Move to `features/Toast/` since there are 2 files with shared logic. If both moved to ui/ individually, they would become `<Container>` and `<Index>` (name collision risk with pathPrefix: false). Keeping in features/ preserves `<ToastContainer>` and `<Toast>` names.

3. **Verification approach**
   - What we know: Success criteria require `pnpm dev` and `pnpm build` to work.
   - Recommendation: Run `pnpm build` after all moves as the definitive test. Build will fail on any unresolved component reference.

## Sources

### Primary (HIGH confidence)
- [Nuxt 4 Components Directory Structure](https://nuxt.com/docs/4.x/directory-structure/app/components) - pathPrefix configuration, multi-directory scanning, auto-import naming rules
- Project codebase analysis - all 42 component files cataloged, all template references mapped

### Secondary (MEDIUM confidence)
- [Nuxt 4 Auto-imports Concepts](https://nuxt.com/docs/4.x/guide/concepts/auto-imports) - general auto-import behavior

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - no new libraries, pure reorganization
- Architecture: HIGH - nuxt.config.ts pathPrefix behavior verified against official Nuxt 4 docs
- Pitfalls: HIGH - name collision analysis done exhaustively on actual codebase files

**Research date:** 2026-03-05
**Valid until:** 2026-04-05 (stable - Nuxt component system is mature)
