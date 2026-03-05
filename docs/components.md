# Inventario de Componentes

## Estructura

Los componentes siguen una organizacion **flat-by-domain**: componentes standalone en la raiz de `app/components/` y componentes agrupados por dominio funcional en subdirectorios. Nuxt auto-importa todos los componentes usando el nombre del directorio como prefijo (ej. `Product/Card.vue` se usa como `<ProductCard />`).

**Total: 42 componentes**

## Componentes Standalone (11)

| Componente | Archivo | Descripcion |
|---|---|---|
| `AnnouncementBar` | `AnnouncementBar.vue` | Barra de anuncios superior |
| `BaseCarousel` | `BaseCarousel.vue` | Carousel reutilizable (wrapper de Swiper) |
| `Breadcrumbs` | `Breadcrumbs.vue` | Navegacion breadcrumb (todas las paginas excepto home) |
| `Button` | `Button.vue` | Boton polimorfrico (button/NuxtLink/a) con variantes solid/outline/link |
| `Footer` | `Footer.vue` | Footer del sitio |
| `Header` | `Header.vue` | Header principal con navegacion |
| `HeroBanner` | `HeroBanner.vue` | Banner hero de la homepage |
| `Logo` | `Logo.vue` | Logo SVG con color dinamico via `fill="currentColor"` |
| `OfferPopup` | `OfferPopup.vue` | Popup de ofertas |
| `Pagination` | `Pagination.vue` | Paginacion del catalogo |
| `Section` | `Section.vue` | Wrapper de seccion reutilizable |

## Bento/ (2)

| Componente | Archivo | Uso como |
|---|---|---|
| `Card` | `Bento/Card.vue` | `<BentoCard />` |
| `SectionSolutions` | `Bento/SectionSolutions.vue` | `<BentoSectionSolutions />` |

## Brand/ (1)

| Componente | Archivo | Uso como |
|---|---|---|
| `Card` | `Brand/Card.vue` | `<BrandCard />` |

## Cart/ (3)

| Componente | Archivo | Uso como |
|---|---|---|
| `Item` | `Cart/Item.vue` | `<CartItem />` |
| `ItemSkeleton` | `Cart/ItemSkeleton.vue` | `<CartItemSkeleton />` |
| `Summary` | `Cart/Summary.vue` | `<CartSummary />` |

## Checkout/ (5)

| Componente | Archivo | Uso como |
|---|---|---|
| `CountrySelector` | `Checkout/CountrySelector.vue` | `<CheckoutCountrySelector />` |
| `OrderSummary` | `Checkout/OrderSummary.vue` | `<CheckoutOrderSummary />` |
| `PaymentMethod` | `Checkout/PaymentMethod.vue` | `<CheckoutPaymentMethod />` |
| `PersonalInfo` | `Checkout/PersonalInfo.vue` | `<CheckoutPersonalInfo />` |
| `StepAccordion` | `Checkout/StepAccordion.vue` | `<CheckoutStepAccordion />` |

## FAQ/ (2)

| Componente | Archivo | Uso como |
|---|---|---|
| `Accordion` | `FAQ/Accordion.vue` | `<FAQAccordion />` |
| `Skeleton` | `FAQ/Skeleton.vue` | `<FAQSkeleton />` |

## Form/ (1)

| Componente | Archivo | Uso como |
|---|---|---|
| `DateInput` | `Form/DateInput.vue` | `<FormDateInput />` |

## Legal/ (1)

| Componente | Archivo | Uso como |
|---|---|---|
| `Page` | `Legal/Page.vue` | `<LegalPage />` |

## Product/ (12)

| Componente | Archivo | Uso como |
|---|---|---|
| `Banner` | `Product/Banner.vue` | `<ProductBanner />` |
| `CTA` | `Product/CTA.vue` | `<ProductCTA />` |
| `Card` | `Product/Card.vue` | `<ProductCard />` |
| `CardSkeleton` | `Product/CardSkeleton.vue` | `<ProductCardSkeleton />` |
| `EmptyState` | `Product/EmptyState.vue` | `<ProductEmptyState />` |
| `Filters` | `Product/Filters.vue` | `<ProductFilters />` |
| `FloatingCart` | `Product/FloatingCart.vue` | `<ProductFloatingCart />` |
| `Gallery` | `Product/Gallery.vue` | `<ProductGallery />` |
| `ReviewModal` | `Product/ReviewModal.vue` | `<ProductReviewModal />` |
| `Reviews` | `Product/Reviews.vue` | `<ProductReviews />` |
| `Skeleton` | `Product/Skeleton.vue` | `<ProductSkeleton />` |
| `VariantAccordion` | `Product/VariantAccordion.vue` | `<ProductVariantAccordion />` |

## Staff/ (1)

| Componente | Archivo | Uso como |
|---|---|---|
| `Card` | `Staff/Card.vue` | `<StaffCard />` |

## Testimonials/ (1)

| Componente | Archivo | Uso como |
|---|---|---|
| `Card` | `Testimonials/Card.vue` | `<TestimonialsCard />` |

## Toast/ (2)

| Componente | Archivo | Uso como |
|---|---|---|
| `Container` | `Toast/Container.vue` | `<ToastContainer />` |
| `Index` | `Toast/Index.vue` | `<ToastIndex />` |

## Notas

- Esta es la estructura pre-reorganizacion. La Fase 4 del milestone v1.0 reestructurara los componentes en `ui/`, `layout/` y `features/`.
- Todos los componentes usan `<script setup>` (Composition API).
- Los iconos provienen de `@heroicons/vue` y se importan directamente en cada componente.
