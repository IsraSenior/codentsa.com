# Sistema de Diseño y Estilos

## Tailwind CSS v4

Codentsa utiliza Tailwind CSS v4 con la nueva sintaxis `@theme` para definir el sistema de diseño mediante CSS variables nativas.

## Tipografías

### Figtree (Títulos)
**Fuente**: Google Fonts Variable
**Uso**: Títulos, encabezados, destacados
**Clase**: `font-title`

**Características:**
- Variable font (300-900)
- Incluye itálicas
- Optimizada para legibilidad en pantalla
- Carga optimizada vía Google Fonts CDN

**Ejemplo de uso:**
```html
<h1 class="font-title text-4xl font-bold">Título Principal</h1>
<h2 class="font-title text-2xl font-semibold">Subtítulo</h2>
```

### Blauer Nue (Cuerpo)
**Fuente**: Custom (self-hosted)
**Uso**: Párrafos, botones, UI en general
**Clase**: `font-body`

**Características:**
- 8 pesos disponibles: 100, 200, 300, 400, 500, 600, 700, 800, 900
- Versiones italic de todos los pesos
- Formatos: WOFF2, WOFF, TTF
- Optimizada con `font-display: swap`

**Ejemplo de uso:**
```html
<p class="font-body text-base">Texto de párrafo normal</p>
<button class="font-body font-semibold">Botón</button>
<span class="font-body font-light italic">Texto light cursiva</span>
```

**Pesos disponibles:**
```html
<p class="font-thin">Thin - 100</p>
<p class="font-extralight">Extra Light - 200</p>
<p class="font-light">Light - 300</p>
<p class="font-normal">Regular - 400</p>
<p class="font-medium">Medium - 500</p>
<p class="font-semibold">Semi Bold - 600</p>
<p class="font-bold">Bold - 700</p>
<p class="font-extrabold">Extra Bold - 800</p>
<p class="font-black">Heavy - 900</p>
```

## Paleta de Colores

Todos los colores siguen una **escala estandarizada** de 50-900 para facilitar la maquetación con una lógica consistente.

### Colores Primarios (Rojo Codentsa)
Color principal de la marca, usado para CTAs, enlaces importantes, y elementos destacados.

| Variable | Hex | Clase Tailwind | Descripción |
|----------|-----|----------------|-------------|
| `--color-primary-50` | #FEF2F3 | `bg-primary-50`, `text-primary-50` | Muy claro |
| `--color-primary-100` | #FDE5E7 | `bg-primary-100`, `text-primary-100` | Claro |
| `--color-primary-200` | #FBCED3 | `bg-primary-200`, `text-primary-200` | Claro medio |
| `--color-primary-300` | #F7A7B0 | `bg-primary-300`, `text-primary-300` | Medio claro |
| `--color-primary-400` | #F27587 | `bg-primary-400`, `text-primary-400` | Medio |
| `--color-primary-500` | #E71D35 | `bg-primary-500`, `text-primary-500` | **Default** |
| `--color-primary-600` | #D01729 | `bg-primary-600`, `text-primary-600` | Medio oscuro |
| `--color-primary-700` | #A0091E | `bg-primary-700`, `text-primary-700` | Oscuro |
| `--color-primary-800` | #87071A | `bg-primary-800`, `text-primary-800` | Muy oscuro |
| `--color-primary-900` | #780716 | `bg-primary-900`, `text-primary-900` | Extra oscuro |

**Alias de conveniencia:**
- `bg-primary` = `bg-primary-500`
- `text-primary` = `text-primary-500`

**Ejemplo:**
```html
<button class="bg-primary hover:bg-primary-700 text-white">
  Comprar Ahora
</button>

<div class="bg-primary-50 text-primary-900">
  Fondo muy claro con texto oscuro
</div>
```

### Colores Secundarios (Azul)
Color de soporte, usado para información, enlaces secundarios, y elementos complementarios.

| Variable | Hex | Clase Tailwind | Descripción |
|----------|-----|----------------|-------------|
| `--color-secondary-50` | #EFF6FF | `bg-secondary-50`, `text-secondary-50` | Muy claro |
| `--color-secondary-100` | #DBEAFE | `bg-secondary-100`, `text-secondary-100` | Claro |
| `--color-secondary-200` | #BFDBFE | `bg-secondary-200`, `text-secondary-200` | Claro medio |
| `--color-secondary-300` | #93C5FD | `bg-secondary-300`, `text-secondary-300` | Medio claro |
| `--color-secondary-400` | #60A5FA | `bg-secondary-400`, `text-secondary-400` | Medio |
| `--color-secondary-500` | #2463EB | `bg-secondary-500`, `text-secondary-500` | **Default** |
| `--color-secondary-600` | #1D4ED8 | `bg-secondary-600`, `text-secondary-600` | Medio oscuro |
| `--color-secondary-700` | #163B8D | `bg-secondary-700`, `text-secondary-700` | Oscuro |
| `--color-secondary-800` | #1E3A8A | `bg-secondary-800`, `text-secondary-800` | Muy oscuro |
| `--color-secondary-900` | #07142F | `bg-secondary-900`, `text-secondary-900` | Extra oscuro |

**Alias de conveniencia:**
- `bg-secondary` = `bg-secondary-500`
- `text-secondary` = `text-secondary-500`

**Ejemplo:**
```html
<a href="#" class="text-secondary hover:text-secondary-700">
  Más información
</a>

<div class="bg-secondary-100 border border-secondary-300">
  Tarjeta informativa
</div>
```

### Colores Neutros
Escala de grises para fondos, textos, bordes y elementos estructurales.

| Variable | Hex | Clase Tailwind | Uso Recomendado |
|----------|-----|----------------|-----------------|
| `--color-neutral-0` | #FFFFFF | `bg-neutral-0`, `text-neutral-0` | Blanco puro |
| `--color-neutral-50` | #F7FCFC | `bg-neutral-50`, `text-neutral-50` | Fondos muy claros |
| `--color-neutral-100` | #EFF9FA | `bg-neutral-100`, `text-neutral-100` | Fondos claros |
| `--color-neutral-200` | #E0F3F5 | `bg-neutral-200`, `text-neutral-200` | Bordes suaves |
| `--color-neutral-300` | #D0ECF0 | `bg-neutral-300`, `text-neutral-300` | Separadores |
| `--color-neutral-400` | #B1E0E6 | `bg-neutral-400`, `text-neutral-400` | Textos secundarios claros |
| `--color-neutral-500` | #57888E | `bg-neutral-500`, `text-neutral-500` | Textos secundarios |
| `--color-neutral-600` | #487A80 | `bg-neutral-600`, `text-neutral-600` | Textos terciarios |
| `--color-neutral-700` | #396B71 | `bg-neutral-700`, `text-neutral-700` | Textos oscuros |
| `--color-neutral-800` | #2A5157 | `bg-neutral-800`, `text-neutral-800` | Textos muy oscuros |
| `--color-neutral-900` | #162526 | `bg-neutral-900`, `text-neutral-900` | Textos principales |

**Ejemplo:**
```html
<div class="bg-neutral-50 border border-neutral-200">
  <h3 class="text-neutral-900">Título</h3>
  <p class="text-neutral-700">Descripción del producto</p>
  <span class="text-neutral-500">Información secundaria</span>
</div>
```

### Colores del Sistema
Colores semánticos para feedback y estados. Solo incluyen el color default.

**Nota**: Para variantes claras u oscuras, usar opacidades con Tailwind:
- Claro: `bg-success/20` (20% de opacidad)
- Default: `bg-success`
- Oscuro: `bg-success` con `brightness-75` o similar

#### Success (Verde)
| Variable | Hex | Clase Tailwind |
|----------|-----|----------------|
| `--color-success` | #22C393 | `bg-success`, `text-success` |

```html
<!-- Fondo claro con opacidad -->
<div class="bg-success/10 text-success border border-success/30 p-4 rounded">
  ✓ Producto añadido al carrito
</div>

<!-- Fondo normal -->
<div class="bg-success text-white p-4 rounded">
  ✓ Pedido confirmado
</div>
```

#### Warning (Amarillo)
| Variable | Hex | Clase Tailwind |
|----------|-----|----------------|
| `--color-warning` | #FCCC4F | `bg-warning`, `text-warning` |

```html
<div class="bg-warning/10 text-warning border border-warning/30 p-4 rounded">
  ⚠ Stock limitado
</div>
```

#### Error (Rojo)
| Variable | Hex | Clase Tailwind |
|----------|-----|----------------|
| `--color-error` | #F04343 | `bg-error`, `text-error` |

```html
<div class="bg-error/10 text-error border border-error/30 p-4 rounded">
  ✗ Error al procesar el pago
</div>
```

## Espaciado

Tailwind incluye una escala de espaciado predeterminada. Preferir múltiplos de 4px para consistencia:

```html
<!-- Padding -->
<div class="p-4">Padding 16px</div>
<div class="px-6 py-4">Padding horizontal 24px, vertical 16px</div>

<!-- Margin -->
<div class="mt-8">Margin top 32px</div>
<div class="mx-auto">Margin horizontal auto (centrado)</div>

<!-- Gap (Flexbox/Grid) -->
<div class="flex gap-4">Gap 16px entre items</div>
```

**Escala recomendada:**
- `2` = 8px - Espaciado mínimo
- `4` = 16px - Espaciado estándar pequeño
- `6` = 24px - Espaciado estándar medio
- `8` = 32px - Espaciado estándar grande
- `12` = 48px - Secciones
- `16` = 64px - Separación de bloques grandes

## Tipografía

### Escala de Tamaños

```html
<p class="text-xs">Extra Small - 12px</p>
<p class="text-sm">Small - 14px</p>
<p class="text-base">Base - 16px</p> <!-- Default -->
<p class="text-lg">Large - 18px</p>
<p class="text-xl">Extra Large - 20px</p>
<p class="text-2xl">2XL - 24px</p>
<p class="text-3xl">3XL - 30px</p>
<p class="text-4xl">4XL - 36px</p>
<p class="text-5xl">5XL - 48px</p>
```

### Jerarquía de Títulos

```html
<h1 class="font-title text-5xl font-bold text-neutral-900">
  H1 - Título Principal
</h1>

<h2 class="font-title text-4xl font-bold text-neutral-900">
  H2 - Título de Sección
</h2>

<h3 class="font-title text-3xl font-semibold text-neutral-900">
  H3 - Subtítulo
</h3>

<h4 class="font-title text-2xl font-semibold text-neutral-700">
  H4 - Título Menor
</h4>

<h5 class="font-title text-xl font-medium text-neutral-700">
  H5 - Título Pequeño
</h5>

<h6 class="font-title text-lg font-medium text-neutral-600">
  H6 - Título Mínimo
</h6>
```

### Párrafos y Textos

```html
<!-- Párrafo normal -->
<p class="font-body text-base text-neutral-700 leading-relaxed">
  Texto de párrafo estándar con buen espaciado de línea.
</p>

<!-- Texto destacado -->
<p class="font-body text-lg text-neutral-900 font-medium">
  Texto destacado para información importante.
</p>

<!-- Texto secundario -->
<p class="font-body text-sm text-neutral-500">
  Texto secundario para información complementaria.
</p>

<!-- Texto pequeño -->
<p class="font-body text-xs text-neutral-400">
  Texto pequeño para notas al pie o metadata.
</p>
```

## Sombras

```html
<!-- Sombra suave -->
<div class="shadow-sm">Sombra pequeña</div>

<!-- Sombra estándar -->
<div class="shadow">Sombra normal</div>

<!-- Sombra media -->
<div class="shadow-md">Sombra mediana</div>

<!-- Sombra grande -->
<div class="shadow-lg">Sombra grande</div>

<!-- Sombra muy grande -->
<div class="shadow-xl">Sombra extra grande</div>
```

## Bordes y Radios

### Border Radius
```html
<div class="rounded-none">Sin redondeo</div>
<div class="rounded-sm">Pequeño - 2px</div>
<div class="rounded">Normal - 4px</div>
<div class="rounded-md">Medio - 6px</div>
<div class="rounded-lg">Grande - 8px</div>
<div class="rounded-xl">Extra grande - 12px</div>
<div class="rounded-2xl">2XL - 16px</div>
<div class="rounded-full">Circular/Pill</div>
```

### Bordes
```html
<div class="border border-neutral-200">Borde normal</div>
<div class="border-2 border-primary">Borde 2px primary</div>
<div class="border-t border-neutral-300">Borde solo arriba</div>
```

## Componentes UI - Guía de Estilos

### Botones

```html
<!-- Primary Button -->
<button class="bg-primary hover:bg-primary-700 text-white font-body font-semibold px-6 py-3 rounded-lg transition-colors">
  Botón Primario
</button>

<!-- Secondary Button -->
<button class="bg-secondary hover:bg-secondary-700 text-white font-body font-semibold px-6 py-3 rounded-lg transition-colors">
  Botón Secundario
</button>

<!-- Outline Button -->
<button class="border-2 border-primary text-primary hover:bg-primary hover:text-white font-body font-semibold px-6 py-3 rounded-lg transition-all">
  Botón Outline
</button>

<!-- Ghost Button -->
<button class="text-neutral-700 hover:bg-neutral-100 font-body font-medium px-4 py-2 rounded-md transition-colors">
  Botón Ghost
</button>
```

### Inputs

```html
<!-- Text Input -->
<input
  type="text"
  class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body"
  placeholder="Ingrese su email"
>

<!-- Input con error -->
<input
  type="text"
  class="w-full px-4 py-2 border-2 border-error rounded-md focus:outline-none focus:ring-2 focus:ring-error font-body"
>
<p class="text-error text-sm mt-1">Este campo es requerido</p>
```

### Cards

```html
<div class="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
  <!-- Card header con imagen -->
  <img src="..." alt="..." class="w-full h-48 object-cover">

  <!-- Card body -->
  <div class="p-6">
    <h3 class="font-title text-xl font-semibold text-neutral-900 mb-2">
      Título del Card
    </h3>
    <p class="font-body text-neutral-700 text-sm mb-4">
      Descripción del contenido del card.
    </p>
    <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
      Ver más
    </button>
  </div>
</div>
```

### Badges

```html
<!-- Badge primario -->
<span class="inline-block bg-primary text-white text-xs font-body font-semibold px-3 py-1 rounded-full">
  Nuevo
</span>

<!-- Badge secundario -->
<span class="inline-block bg-secondary-50 text-secondary-700 text-xs font-body font-medium px-3 py-1 rounded-full">
  En stock
</span>

<!-- Badge success -->
<span class="inline-block bg-success-light text-success-dark text-xs font-body font-medium px-3 py-1 rounded-full">
  Disponible
</span>
```

## Responsive Design

### Breakpoints
```javascript
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px
```

### Ejemplo Mobile-First
```html
<div class="
  w-full        <!-- Mobile: full width -->
  md:w-1/2      <!-- Tablet: 50% width -->
  lg:w-1/3      <!-- Desktop: 33% width -->
  p-4           <!-- Mobile: padding 16px -->
  lg:p-8        <!-- Desktop: padding 32px -->
">
  Contenido responsivo
</div>
```

## Mejores Prácticas

1. **Consistencia**: Usar siempre las mismas clases para elementos similares
2. **Mobile-First**: Diseñar primero para móvil, luego escalar
3. **Spacing**: Preferir múltiplos de 4px (scale de Tailwind)
4. **Colores**: Usar colores del sistema de diseño, no colores arbitrarios
5. **Accesibilidad**: Mantener contraste adecuado (WCAG 2.1 AA mínimo)
6. **Performance**: Evitar estilos inline, usar clases de Tailwind
