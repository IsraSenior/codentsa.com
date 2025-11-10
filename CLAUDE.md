# Codentsa - E-commerce de Instrumental Odontológico

## Contexto del Proyecto

Codentsa es una plataforma de comercio electrónico especializada en la venta de instrumental odontológico de alto nivel para el mercado español. El proyecto está diseñado con un enfoque en la calidad, rendimiento y experiencia de usuario, utilizando tecnologías modernas para garantizar escalabilidad y mantenibilidad.

## Stack Tecnológico

### Frontend Framework
- **Nuxt 4.2.1** - Framework Vue.js full-stack con SSR/SSG
- **Vue 3.5.24** - Framework JavaScript reactivo
- **Vue Router 4.6.3** - Sistema de enrutamiento

### Estilos
- **Tailwind CSS 4.1.17** - Framework CSS utility-first (v4 con Vite plugin)
- **@tailwindcss/vite 4.1.17** - Plugin de Vite para Tailwind v4

### Estado Global
- **Pinia 3.0.4** - Store management (reemplazo oficial de Vuex)
- **@pinia/nuxt 0.11.3** - Módulo de Nuxt para Pinia

### Iconografía
- **Heroicons 2.2.0** - Librería de iconos SVG de Tailwind Labs

### Analytics & Tracking
- **nuxt-gtag 4.1.0** - Google Analytics 4 para Nuxt
- **Meta Pixel** - Facebook/Instagram tracking (configurado vía runtimeConfig)

### Code Quality
- **ESLint 9.39.1** - Linter para JavaScript/Vue
- **@nuxt/eslint 1.10.0** - Configuración de ESLint para Nuxt
- **Prettier 3.6.2** - Formateador de código
- **EditorConfig** - Consistencia entre editores

### CMS & Backend (Pendiente)
- **Directus** - Headless CMS para gestión de contenido y productos

### Pagos (Pendiente)
- **Redsys** - Pasarela de pagos principal (estándar en España)
- **Métodos manuales** - Transferencia bancaria, contra reembolso, etc.

## Decisiones Arquitectónicas

### 1. Tailwind CSS v4 con @theme
Se utiliza la nueva sintaxis de Tailwind v4 con la directiva `@theme` para definir variables CSS personalizadas. Esto permite una integración más nativa con CSS moderno y mejor rendimiento.

**Ventajas:**
- Menor tamaño de bundle
- Variables CSS nativas
- Mejor integración con herramientas de desarrollo
- Más flexible y mantenible

### 2. Estructura de Componentes Flat
Se mantiene una estructura plana de componentes en lugar de anidación profunda. Esto facilita la búsqueda y reduce la complejidad de imports.

**Estrategia:**
1. Componentes UI base primero (buttons, inputs, titles, texts)
2. Componentes complejos después (cards, secciones, layouts)
3. Componentes específicos de página al final

### 3. Pinia con Stores por Contexto
Los stores se organizan por contexto funcional:
- `stores/index.js` - Store principal/productos
- `stores/navigation.js` - Estado de navegación/menú
- `stores/cart.js` - Carrito de compras
- `stores/user.js` - Sesión y datos de usuario

### 4. Auto-imports de Nuxt
Se aprovechan los auto-imports de Nuxt 4 para:
- Componentes
- Composables
- Utilidades
- Stores de Pinia

### 5. Variables de Entorno Seguras
Configuración mediante `runtimeConfig` en Nuxt:
- **Private keys** (server-side): Directus, Redsys credentials
- **Public keys** (client-side): Analytics IDs, configuración pública

### 6. TypeScript vs JavaScript
El proyecto utiliza **JavaScript** en lugar de TypeScript para simplificar el desarrollo y reducir la curva de aprendizaje del equipo. Nuxt 4 proporciona type checking automático sin necesidad de escribir tipos explícitos.

## Sistema de Diseño

### Tipografías
- **Figtree** - Títulos y encabezados (Google Fonts)
  - Variable font: 300-900
  - Incluye versiones italic
  - Clase Tailwind: `font-title`

- **Blauer Nue** - Textos, párrafos, botones (Custom font)
  - 8 pesos: Thin (100) → Heavy (900)
  - Incluye versiones italic de todos los pesos
  - Clase Tailwind: `font-body`

### Paleta de Colores

#### Primarios
- `primary-50`: #DE6B7B
- `primary-100`: #D33B50
- `primary-200`: #D33B50
- `primary` / `primary-500`: #E71D35 (Default)
- `primary-700`: #A0091E
- `primary-900`: #780716

#### Secundarios
- `secondary-50`: #D3E0FB
- `secondary-100`: #7CA1F3
- `secondary` / `secondary-500`: #2463EB (Default)
- `secondary-700`: #163B8D
- `secondary-900`: #07142F

#### Neutros
- `neutral-0`: #FFFFFF
- `neutral-50`: #F7FCFC
- `neutral-100`: #EFF9FA
- `neutral-200`: #E0F3F5
- `neutral-300`: #D0ECF0
- `neutral-400`: #B1E0E6
- `neutral-500`: #57888E
- `neutral-600`: #487A80
- `neutral-700`: #396B71
- `neutral-900`: #162526
- `neutral-1000`: #070C0D

#### Sistema
- `success-light`: #4ECFA9
- `success` / `success-dark`: #22C393
- `warning-light`: #FDE5A7
- `warning` / `warning-dark`: #FCCC4F
- `error-light`: #F68E8E
- `error` / `error-dark`: #F04343

### Uso en Tailwind
```html
<!-- Colores -->
<div class="bg-primary text-neutral-0">Primary background</div>
<div class="text-secondary-700">Secondary text</div>
<div class="bg-success text-white">Success message</div>

<!-- Tipografías -->
<h1 class="font-title text-4xl font-bold">Título Principal</h1>
<p class="font-body text-base">Texto de párrafo</p>
<button class="font-body font-semibold">Botón</button>
```

## Estándares de Código

### Prettier
- 2 espacios de indentación
- Comillas simples ('') para strings
- Sin punto y coma (estilo Vue)
- Trailing comma en objetos/arrays multilínea
- Print width: 100 caracteres

### ESLint
- Configuración base de @nuxt/eslint
- Reglas de stylistic integradas
- `vue/multi-word-component-names`: desactivada
- Indentación Vue HTML: 2 espacios
- Max 3 atributos por línea en single-line, 1 en multiline

### Scripts NPM
```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm generate     # Generar sitio estático
pnpm preview      # Preview del build
pnpm lint         # Ejecutar ESLint
pnpm lint:fix     # Ejecutar ESLint y auto-fix
pnpm format       # Formatear con Prettier
```

## Estructura del Proyecto

```
/codentsa.com/
├── app/
│   ├── app.vue                 # Componente raíz
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css        # Estilos globales + Tailwind config
│   │   └── fonts/
│   │       └── blauer-nue/     # Fuente Blauer Nue (18 archivos)
│   ├── components/
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   └── Logo.vue            # Logo SVG de Codentsa
│   ├── composables/            # Lógica reutilizable
│   ├── layouts/
│   │   └── default.vue         # Layout principal
│   ├── pages/
│   │   └── index.vue           # Página de inicio
│   ├── stores/                 # Pinia stores
│   └── utils/                  # Utilidades y helpers
├── docs/                       # Documentación detallada
├── public/                     # Archivos estáticos
├── .editorconfig
├── .prettierrc
├── .prettierignore
├── eslint.config.js
├── nuxt.config.ts
├── package.json
├── pnpm-lock.yaml
└── CLAUDE.md                   # Este archivo
```

## Workflow de Git

### Commits
- Seguir conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Commits descriptivos y atómicos
- Incluir footer con Claude Code attribution
- **NO PUSH** - Todos los commits son locales hasta indicación contraria

### Ejemplo de commit message
```
feat: add product card component

- Create reusable ProductCard component
- Add image, title, price, and CTA
- Implement hover states with Tailwind
- Add responsive layout

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Roadmap de Desarrollo

### Fase 1: Setup Inicial ✅
- [x] Configurar Prettier y ESLint
- [x] Configurar sistema de colores en Tailwind
- [x] Configurar tipografías (Figtree + Blauer Nue)
- [x] Instalar dependencias (Heroicons, Pinia, Analytics)
- [x] Configurar módulos de Nuxt
- [x] Crear documentación inicial

### Fase 2: Componentes UI Base (Pendiente)
- [ ] Button component (primary, secondary, outline, ghost)
- [ ] Input component (text, email, tel, etc.)
- [ ] Select component
- [ ] Textarea component
- [ ] Checkbox y Radio components
- [ ] Typography components (H1-H6, Paragraph, etc.)
- [ ] Badge/Tag component
- [ ] Card base component

### Fase 3: Componentes Complejos (Pendiente)
- [ ] ProductCard component
- [ ] SearchBar component
- [ ] Navigation/Menu components
- [ ] Footer sections
- [ ] Breadcrumb component
- [ ] Pagination component
- [ ] Modal/Dialog component
- [ ] Toast notifications

### Fase 4: Páginas (Pendiente)
- [ ] Homepage
- [ ] Catálogo de productos
- [ ] Detalle de producto
- [ ] Carrito de compras
- [ ] Checkout
- [ ] Confirmación de pedido
- [ ] Mi cuenta
- [ ] Login/Registro

### Fase 5: Integración Directus (Pendiente)
- [ ] Configurar SDK de Directus
- [ ] Crear colecciones en Directus
- [ ] Implementar API endpoints
- [ ] Sincronizar productos
- [ ] Gestión de imágenes
- [ ] SEO metadata

### Fase 6: Pagos & Checkout (Pendiente)
- [ ] Integración Redsys
- [ ] Métodos de pago manuales
- [ ] Validación de formularios
- [ ] Proceso de checkout
- [ ] Emails transaccionales

### Fase 7: SEO & Performance (Pendiente)
- [ ] Meta tags dinámicos
- [ ] Structured data (JSON-LD)
- [ ] Sitemap XML
- [ ] Robots.txt
- [ ] Optimización de imágenes
- [ ] Lazy loading
- [ ] PWA capabilities

### Fase 8: Analytics & Testing (Pendiente)
- [ ] Configurar Google Analytics events
- [ ] Configurar Meta Pixel events
- [ ] Testing E2E
- [ ] Testing unitario de componentes
- [ ] Lighthouse audit

## Integraciones Futuras

### Directus CMS
**Documentación**: `/docs/directus-integration.md`

Headless CMS para gestión de:
- Productos e inventario
- Categorías y atributos
- Contenido estático (About, FAQs, etc.)
- Blog/Noticias
- Configuración del sitio

### Redsys Payment Gateway
**Documentación**: `/docs/redsys-integration.md`

Pasarela de pagos líder en España:
- Tarjetas de crédito/débito
- Bizum
- Integración segura con HMAC-SHA256
- Entorno de pruebas y producción

### Google Analytics 4
**Documentación**: `/docs/analytics.md`

Tracking de:
- Pageviews
- Events (add_to_cart, purchase, etc.)
- User behavior
- Conversions

### Meta Pixel
**Documentación**: `/docs/analytics.md`

Tracking para Facebook/Instagram:
- ViewContent
- AddToCart
- Purchase
- Custom conversions

## Notas Importantes

### Seguridad
- Nunca commitear archivos `.env`
- Usar `.env.example` como template
- Variables sensibles solo en runtimeConfig privado
- Validar inputs en servidor y cliente
- Sanitizar datos de usuario

### Performance
- Lazy loading de componentes pesados
- Optimización de imágenes (WebP, AVIF)
- Code splitting automático de Nuxt
- Usar `<NuxtImg>` para imágenes optimizadas
- Implementar caching estratégico

### Accesibilidad
- Usar HTML semántico
- ARIA labels cuando sea necesario
- Contraste de colores según WCAG 2.1
- Navegación por teclado
- Textos alternativos en imágenes

### SEO
- Meta tags descriptivos
- Structured data
- URLs amigables
- Sitemap actualizado
- Canonical URLs

## Contacto y Soporte

Para dudas o sugerencias sobre el proyecto, revisar la documentación en `/docs/` o consultar este archivo para contexto general.

---

**Última actualización**: 2025-11-10
**Versión de Nuxt**: 4.2.1
**Versión de Tailwind**: 4.1.17
