# Codentsa - E-commerce de Instrumental Odontológico

<div align="center">

![Nuxt](https://img.shields.io/badge/Nuxt-4.2.1-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-3.5.24-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0.4-FFD43B?style=for-the-badge&logo=pinia&logoColor=black)

Plataforma de comercio electrónico especializada en la venta de instrumental odontológico de alto nivel para el mercado español.

[Características](#características) • [Stack Tecnológico](#stack-tecnológico) • [Instalación](#instalación) • [Estructura](#estructura-del-proyecto) • [Documentación](#documentación)

</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#sobre-el-proyecto)
- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Sistema de Diseño](#sistema-de-diseño)
- [Gestión de Estado](#gestión-de-estado)
- [Páginas y Rutas](#páginas-y-rutas)
- [Componentes Principales](#componentes-principales)
- [Estándares de Código](#estándares-de-código)
- [Roadmap](#roadmap)
- [Contribución](#contribución)

---

## 🎯 Sobre el Proyecto

Codentsa es una plataforma e-commerce moderna y escalable desarrollada con Nuxt 4 y Vue 3, diseñada específicamente para la venta de instrumental y equipamiento odontológico profesional. El proyecto enfatiza la experiencia de usuario, rendimiento y mantenibilidad del código.

### Objetivos del Proyecto

- ✅ Proporcionar una experiencia de compra fluida y profesional
- ✅ Catálogo de productos completo con filtrado avanzado
- ✅ Sistema de carrito y favoritos con persistencia local
- ✅ Diseño responsive y accesible
- ✅ SEO optimizado para motores de búsqueda
- ✅ Integración con CMS (Directus)
- ✅ Sistema de pagos (Redsys)
- ✅ Analytics multi-plataforma (Umami, GA4, Meta Pixel)

---

## ✨ Características

### Implementadas

- **🛍️ Catálogo de Productos**
  - 20+ productos con información detallada
  - Filtrado por categorías, precios, materiales y marcas
  - Ordenamiento múltiple (precio, nombre, relevancia)
  - Paginación con persistencia en URL
  - Layout especial con alternancia de grillas

- **❤️ Sistema de Favoritos**
  - Añadir/quitar productos de favoritos
  - Persistencia en localStorage
  - Página dedicada de favoritos
  - Indicadores visuales en cards

- **🛒 Carrito de Compras**
  - Añadir productos con opciones (color, tamaño, material)
  - Ajustar cantidades
  - Eliminar items
  - Cálculo automático de subtotal, envío e impuestos
  - Persistencia en localStorage

- **💳 Checkout**
  - Proceso en dos pasos (datos personales y pago)
  - Resumen de pedido en tiempo real
  - Empty state cuando no hay productos

- **🎨 Interfaz de Usuario**
  - Sistema de notificaciones toast (bottom-left)
  - Popup promocional con countdown
  - Skeletons para estados de carga
  - Empty states contextuales
  - Transiciones y animaciones suaves

- **🔍 SEO y Performance**
  - Meta tags dinámicos por página
  - URLs amigables y con parámetros
  - Lazy loading de componentes
  - Optimización de imágenes

- **💳 Pasarela de Pagos**
  - Integración con Redsys (tarjetas, Bizum)
  - Páginas de éxito y error personalizadas
  - Firma HMAC-SHA256 para seguridad
  - Soporte para entornos sandbox y producción

- **📊 CMS & Backend**
  - Integración con Directus CMS
  - SDK para gestión de productos y pedidos
  - Infraestructura lista para sincronización de datos

- **📈 Analytics**
  - Umami Analytics (privacy-first, sin cookies)
  - Google Analytics 4 (opcional, con consentimiento)
  - Meta Pixel (Facebook/Instagram tracking)
  - Tracking unificado de eventos de e-commerce

### Próximamente

- 🔄 Sistema de autenticación
- 🔄 Panel de administración
- 🔄 Emails transaccionales
- 🔄 PWA capabilities

---

## 🛠️ Stack Tecnológico

### Core

- **[Nuxt 4.2.1](https://nuxt.com/)** - Framework full-stack con SSR/SSG
- **[Vue 3.5.24](https://vuejs.org/)** - Framework JavaScript reactivo
- **[Vue Router 4.6.3](https://router.vuejs.org/)** - Sistema de enrutamiento

### Estilos

- **[Tailwind CSS 4.1.17](https://tailwindcss.com/)** - Framework CSS utility-first
- **[@tailwindcss/vite 4.1.17](https://tailwindcss.com/docs/installation/using-vite)** - Plugin de Vite para Tailwind v4

### Estado Global

- **[Pinia 3.0.4](https://pinia.vuejs.org/)** - Store management oficial
- **[@pinia/nuxt 0.11.3](https://pinia.vuejs.org/ssr/nuxt.html)** - Módulo de Nuxt para Pinia

### UI/UX

- **[Heroicons 2.2.0](https://heroicons.com/)** - Iconos SVG de Tailwind Labs
- **[Swiper](https://swiperjs.com/)** - Carruseles y sliders modernos

### Analytics

- **[nuxt-umami 3.2.1](https://github.com/ijkml/nuxt-umami)** - Umami Analytics (privacy-first)
- **[nuxt-gtag 4.1.0](https://github.com/johannschopplich/nuxt-gtag)** - Google Analytics 4
- **Meta Pixel** - Facebook/Instagram tracking

### CMS & Backend

- **[@directus/sdk 20.1.1](https://docs.directus.io/guides/sdk/)** - Directus Headless CMS SDK
- **Directus** - Headless CMS para gestión de contenido y productos

### Seguridad & Pagos

- **[crypto-js 4.2.0](https://github.com/brix/crypto-js)** - Cryptografía para firmas de pago
- **Redsys** - Pasarela de pagos española (tarjetas, Bizum)

### Calidad de Código

- **[ESLint 9.39.1](https://eslint.org/)** - Linter JavaScript/Vue
- **[@nuxt/eslint 1.10.0](https://eslint.nuxt.com/)** - Config ESLint para Nuxt
- **[Prettier 3.6.2](https://prettier.io/)** - Formateador de código
- **[EditorConfig](https://editorconfig.org/)** - Consistencia entre editores

---

## 📦 Instalación

### Prerrequisitos

- Node.js 18.x o superior
- pnpm 8.x (recomendado) o npm

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/codentsa.com.git
cd codentsa.com
```

2. **Instalar dependencias**

```bash
pnpm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales. Ver `.env.example` para la lista completa de variables disponibles:

```env
# Directus CMS
NUXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
NUXT_DIRECTUS_TOKEN=your_directus_static_token_here

# Redsys Payment Gateway
REDSYS_MERCHANT_CODE=999008881          # Código de comercio
REDSYS_TERMINAL=001                     # Terminal
REDSYS_SECRET_KEY=sq7HjrUOBfKmC576...  # Clave secreta
REDSYS_ENVIRONMENT=sandbox              # sandbox | production

# Analytics
NUXT_PUBLIC_UMAMI_ID=your-umami-website-id
NUXT_PUBLIC_UMAMI_HOST=https://cloud.umami.is
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NUXT_PUBLIC_META_PIXEL_ID=123456789012345

# Application
NUXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Nota**: Las credenciales de ejemplo son para el entorno sandbox de Redsys. En producción, usa tus credenciales reales.

4. **Iniciar servidor de desarrollo**

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Iniciar servidor de desarrollo

# Build
pnpm build        # Build para producción
pnpm generate     # Generar sitio estático (SSG)
pnpm preview      # Preview del build de producción

# Calidad de Código
pnpm lint         # Ejecutar ESLint
pnpm lint:fix     # Ejecutar ESLint con auto-fix
pnpm format       # Formatear código con Prettier
```

---

## 📁 Estructura del Proyecto

```
codentsa.com/
├── app/
│   ├── app.vue                      # Componente raíz
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css             # Estilos globales + Tailwind config
│   │   └── fonts/
│   │       └── blauer-nue/          # Fuente Blauer Nue (18 archivos)
│   ├── components/
│   │   ├── Base/                    # Componentes base (Button, Carousel)
│   │   ├── Bento/                   # Componentes Bento Grid
│   │   ├── Cart/                    # Componentes de carrito
│   │   ├── Checkout/                # Componentes de checkout
│   │   ├── Hero/                    # Hero banner
│   │   ├── Product/                 # Componentes de productos
│   │   ├── Testimonials/            # Reseñas
│   │   ├── Toast/                   # Sistema de notificaciones
│   │   ├── Footer.vue               # Footer global
│   │   ├── Header.vue               # Header con navegación
│   │   ├── Logo.vue                 # Logo SVG de Codentsa
│   │   ├── OfferPopup.vue           # Popup promocional
│   │   ├── Pagination.vue           # Paginación
│   │   └── Section.vue              # Wrapper de secciones
│   ├── layouts/
│   │   └── default.vue              # Layout principal
│   ├── pages/
│   │   ├── index.vue                # Homepage
│   │   ├── carrito.vue              # Página de carrito
│   │   ├── checkout.vue             # Página de checkout
│   │   ├── checkout-success.vue     # Pago exitoso
│   │   ├── checkout-error.vue       # Error en pago
│   │   ├── favoritos.vue            # Página de favoritos
│   │   └── productos/
│   │       ├── index.vue            # Listado de productos
│   │       └── [id].vue             # Detalle de producto
│   ├── stores/
│   │   ├── cart.js                  # Store del carrito
│   │   ├── favorites.js             # Store de favoritos
│   │   ├── index.js                 # Store de productos
│   │   ├── navigation.js            # Store de navegación
│   │   └── toast.js                 # Store de notificaciones
│   ├── composables/
│   │   └── useDirectus.js           # Composable de Directus
│   └── utils/                       # Utilidades y helpers
├── server/                          # Server-side code (Nitro)
│   ├── api/
│   │   └── redsys/                  # Endpoints de Redsys
│   │       ├── create-payment.post.js    # Crear pago
│   │       ├── notification.post.js      # Webhook de notificación
│   │       └── verify-payment.post.js    # Verificar resultado
│   └── utils/
│       ├── directus.js              # Utilidades Directus server-side
│       └── redsys.js                # Helper de Redsys con firmas
├── docs/                            # Documentación detallada
│   ├── analytics.md                 # Umami, GA4 y Meta Pixel
│   ├── directus-integration.md      # Integración con Directus
│   ├── directus-schemas.md          # Esquemas de Directus
│   └── redsys-integration.md        # Integración con Redsys
├── public/                          # Archivos estáticos
├── .editorconfig                    # Configuración de editor
├── .prettierrc                      # Configuración de Prettier
├── .prettierignore                  # Archivos ignorados por Prettier
├── eslint.config.js                 # Configuración de ESLint
├── nuxt.config.ts                   # Configuración de Nuxt
├── tailwind.config.js               # Configuración de Tailwind
├── package.json                     # Dependencias y scripts
├── pnpm-lock.yaml                   # Lock file de pnpm
├── CLAUDE.md                        # Documentación técnica detallada
└── README.md                        # Este archivo
```

---

## 🎨 Sistema de Diseño

### Tipografías

#### Títulos y Encabezados
- **Figtree** (Google Fonts)
- Variable font: 300-900
- Incluye versiones italic
- Clase Tailwind: `font-title`

#### Textos y Párrafos
- **Blauer Nue** (Custom font)
- 8 pesos: Thin (100) → Heavy (900)
- Incluye versiones italic
- Clase Tailwind: `font-body`

### Paleta de Colores

#### Primarios
```css
primary-50:  #FEF2F3
primary-100: #FDE5E7
primary-200: #FBCED3
primary-300: #F7A7B0
primary-400: #F27587
primary-500: #E71D35 /* Default */
primary-600: #D01729
primary-700: #A0091E
primary-800: #87071A
primary-900: #780716
```

#### Secundarios
```css
secondary-50:  #EFF6FF
secondary-100: #DBEAFE
secondary-200: #BFDBFE
secondary-300: #93C5FD
secondary-400: #60A5FA
secondary-500: #2463EB /* Default */
secondary-600: #1D4ED8
secondary-700: #163B8D
secondary-800: #1E3A8A
secondary-900: #07142F
```

#### Neutros
```css
neutral-0:   #FFFFFF
neutral-50:  #F7FCFC
neutral-100: #EFF9FA
neutral-200: #E0F3F5
neutral-300: #D0ECF0
neutral-400: #B1E0E6
neutral-500: #57888E
neutral-600: #487A80
neutral-700: #396B71
neutral-800: #2A5157
neutral-900: #162526
```

#### Sistema
```css
success: #22C393
warning: #FCCC4F
error:   #F04343
```

### Uso en Tailwind

```html
<!-- Primarios -->
<button class="bg-primary-500 hover:bg-primary-700 text-white">
  Primary Button
</button>

<!-- Con opacidades -->
<div class="bg-success/10 border border-success/30 text-success">
  Success Alert
</div>

<!-- Tipografías -->
<h1 class="font-title text-4xl font-bold">Título</h1>
<p class="font-body text-base">Párrafo de texto</p>
```

---

## 🗄️ Gestión de Estado

### Stores con Pinia

#### Products Store (`stores/index.js`)
```javascript
const productsStore = useProductsStore()

// Getters
productsStore.allProducts        // Todos los productos
productsStore.totalProducts      // Total de productos

// Métodos
productsStore.getProductById(id) // Obtener producto por ID
```

#### Cart Store (`stores/cart.js`)
```javascript
const cartStore = useCartStore()

// Getters
cartStore.items           // Items del carrito
cartStore.totalItems      // Total de items
cartStore.subtotal        // Subtotal
cartStore.shipping        // Costo de envío
cartStore.tax             // Impuestos
cartStore.total           // Total final
cartStore.isEmpty         // Carrito vacío

// Métodos
cartStore.addItem(item)           // Añadir item
cartStore.removeItem(id)          // Eliminar item
cartStore.incrementQuantity(id)   // Incrementar cantidad
cartStore.decrementQuantity(id)   // Decrementar cantidad
cartStore.clearCart()             // Vaciar carrito
cartStore.loadFromLocalStorage()  // Cargar desde localStorage
```

#### Favorites Store (`stores/favorites.js`)
```javascript
const favoritesStore = useFavoritesStore()

// Getters
favoritesStore.items           // Items favoritos
favoritesStore.totalFavorites  // Total de favoritos
favoritesStore.isEmpty         // Sin favoritos

// Métodos
favoritesStore.addFavorite(product)    // Añadir favorito
favoritesStore.removeFavorite(id)      // Eliminar favorito
favoritesStore.toggleFavorite(product) // Toggle favorito
favoritesStore.isFavorite(id)          // Verificar si es favorito
favoritesStore.loadFromLocalStorage()  // Cargar desde localStorage
```

#### Toast Store (`stores/toast.js`)
```javascript
const toastStore = useToastStore()

// Métodos
toastStore.success(message)  // Toast de éxito
toastStore.error(message)    // Toast de error
toastStore.warning(message)  // Toast de advertencia
toastStore.info(message)     // Toast informativo
```

---

## 🗺️ Páginas y Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `pages/index.vue` | Homepage con ofertas y testimonios |
| `/productos` | `pages/productos/index.vue` | Catálogo con filtros y paginación |
| `/productos/:id` | `pages/productos/[id].vue` | Detalle de producto |
| `/carrito` | `pages/carrito.vue` | Carrito de compras |
| `/checkout` | `pages/checkout.vue` | Proceso de checkout |
| `/checkout-success` | `pages/checkout-success.vue` | Confirmación de pago exitoso |
| `/checkout-error` | `pages/checkout-error.vue` | Error en el proceso de pago |
| `/favoritos` | `pages/favoritos.vue` | Lista de favoritos |

### Parámetros URL (Productos)

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `categoria` | Categorías seleccionadas | `?categoria=cirugia,ortodoncia` |
| `precio` | Rangos de precio | `?precio=price-10-50,price-50-100` |
| `material` | Material seleccionado | `?material=titanio` |
| `marca` | Marcas seleccionadas | `?marca=dentsply,3m` |
| `orden` | Orden de productos | `?orden=price-asc` |
| `pagina` | Número de página | `?pagina=2` |

---

## 🧩 Componentes Principales

### ProductCard
Tarjeta de producto con imagen, precio, botón de favoritos.

```vue
<ProductCard
  :id="1"
  title="Sealapex Cemento"
  brand="Sybron Endo"
  image="/product.jpg"
  description="Cemento sellador radicular..."
  :original-price="300"
  :price="250"
/>
```

### BaseCarousel
Carrusel reutilizable con Swiper.

```vue
<BaseCarousel
  :items="products"
  :slides-per-view="4"
  :space-between="16"
  :navigation="true"
  :loop="true"
>
  <template #default="{ item }">
    <ProductCard v-bind="item" />
  </template>
</BaseCarousel>
```

### ProductFilters
Sistema de filtrado avanzado con chips y dropdown.

```vue
<ProductFilters
  :total-products="120"
  :initial-filters="filters"
  :initial-sort="'relevance'"
  @filter-change="handleFilterChange"
  @sort-change="handleSortChange"
/>
```

### Toast System
Sistema de notificaciones automáticas.

```javascript
// En cualquier componente
const toastStore = useToastStore()

toastStore.success('Producto añadido al carrito')
toastStore.error('Error al procesar el pedido')
toastStore.warning('Stock limitado')
toastStore.info('Envío gratis en pedidos +50€')
```

---

## 📝 Estándares de Código

### Prettier

- **Indentación**: 2 espacios
- **Comillas**: Simples (`'`)
- **Punto y coma**: No (estilo Vue)
- **Trailing comma**: Sí (objetos/arrays multilínea)
- **Print width**: 100 caracteres

### ESLint

- Configuración base de `@nuxt/eslint`
- Reglas de stylistic integradas
- `vue/multi-word-component-names`: desactivada
- Indentación Vue HTML: 2 espacios
- Max 3 atributos por línea (single-line)
- 1 atributo por línea (multiline)

### Commits

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add product filtering by category
fix: resolve cart quantity update issue
chore: update dependencies
docs: improve README documentation
style: format code with prettier
refactor: simplify checkout logic
```

Todos los commits incluyen footer con Claude Code:

```
feat: add product detail page

Create product detail page with image gallery,
specifications, and add to cart functionality.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## 🗓️ Roadmap

### Fase 1: Setup Inicial ✅
- [x] Configurar Prettier y ESLint
- [x] Configurar sistema de colores en Tailwind
- [x] Configurar tipografías (Figtree + Blauer Nue)
- [x] Instalar dependencias base
- [x] Configurar módulos de Nuxt
- [x] Crear documentación inicial

### Fase 2: Componentes UI Base ✅
- [x] Button component
- [x] Carousel component
- [x] Typography components
- [x] Card components
- [x] Form components (Input, Select, Checkbox, Radio)
- [x] Toast notifications
- [x] Loading skeletons
- [x] Empty states

### Fase 3: Páginas Principales ✅
- [x] Homepage con ofertas y testimonios
- [x] Catálogo de productos con filtros
- [x] Detalle de producto
- [x] Carrito de compras
- [x] Checkout
- [x] Favoritos

### Fase 4: Funcionalidad E-commerce ✅
- [x] Sistema de carrito
- [x] Sistema de favoritos
- [x] Filtrado de productos
- [x] Ordenamiento de productos
- [x] Paginación
- [x] Persistencia en localStorage
- [x] URL state management

### Fase 5: Integración Directus ✅
- [x] Configurar SDK de Directus
- [x] Implementar composable y utilidades
- [x] Documentar esquemas y colecciones
- [ ] Crear colecciones en instancia de Directus
- [ ] Sincronizar productos desde Directus
- [ ] Gestión de imágenes
- [ ] SEO metadata dinámico

### Fase 6: Pagos & Checkout ✅
- [x] Integración Redsys
- [x] Endpoint de creación de pago
- [x] Endpoint de notificación de pago
- [x] Páginas de éxito y error
- [x] Firma HMAC-SHA256 para seguridad
- [ ] Métodos de pago manuales
- [ ] Validación de formularios avanzada
- [ ] Emails transaccionales

### Fase 7: SEO & Performance 🔄
- [ ] Meta tags dinámicos avanzados
- [ ] Structured data (JSON-LD)
- [ ] Sitemap XML
- [ ] Robots.txt
- [ ] Optimización de imágenes avanzada
- [ ] PWA capabilities

### Fase 8: Autenticación & Usuarios 🔄
- [ ] Sistema de registro/login
- [ ] Perfil de usuario
- [ ] Historial de pedidos
- [ ] Direcciones guardadas
- [ ] Wishlist personalizada

---

## 🤝 Contribución

### Workflow de Desarrollo

1. **Fork el proyecto**
2. **Crear rama de feature** (`git checkout -b feature/AmazingFeature`)
3. **Commit cambios** (`git commit -m 'feat: add amazing feature'`)
4. **Push a la rama** (`git push origin feature/AmazingFeature`)
5. **Abrir Pull Request**

### Convenciones

- Seguir los estándares de código (Prettier + ESLint)
- Escribir commits descriptivos con Conventional Commits
- Documentar nuevas características
- Añadir tests cuando sea aplicable
- Revisar que el build pase sin errores

---

## 📄 Documentación Adicional

Para información técnica más detallada, consulta:

- **[CLAUDE.md](./CLAUDE.md)** - Documentación técnica completa para desarrollo
- **[docs/](./docs/)** - Documentación específica de integraciones
  - `directus-integration.md` - Integración con Directus CMS
  - `directus-schemas.md` - Esquemas y estructura de datos de Directus
  - `redsys-integration.md` - Integración con Redsys Payment Gateway
  - `analytics.md` - Configuración de Umami, Google Analytics 4 y Meta Pixel

---

## 📞 Contacto y Soporte

Para dudas, sugerencias o reportar issues:

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/codentsa.com/issues)
- **Email**: isenior@neskeep.com
- **Documentación**: Revisar archivos en `/docs/`

---

## 📜 Licencia

Este proyecto es privado y propietario de Codentsa. Todos los derechos reservados.

---

<div align="center">

**Construido con ❤️ por el equipo de Tactico Studio**

Nuxt 4.2.1 • Vue 3.5.24 • Tailwind CSS 4.1.17 • Pinia 3.0.4

</div>
