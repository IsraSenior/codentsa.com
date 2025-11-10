# SEO - Optimización para Motores de Búsqueda

## Importancia del SEO para E-commerce

El SEO es crucial para un e-commerce porque:
- 44% del tráfico orgánico proviene de búsquedas
- Mayor ROI que publicidad pagada a largo plazo
- Construye autoridad y confianza
- Tráfico cualificado con intención de compra

## Meta Tags Básicos

### useHead en Nuxt

```vue
<script setup>
useHead({
  title: 'Instrumental Odontológico de Alta Calidad | Codentsa',
  meta: [
    {
      name: 'description',
      content: 'Compra instrumental odontológico profesional de las mejores marcas. Envío rápido a toda España. Más de 20 años de experiencia.'
    },
    {
      name: 'keywords',
      content: 'instrumental odontológico, material dental, equipamiento dental, instrumental quirúrgico dental'
    },
    // Open Graph (Facebook, LinkedIn)
    {
      property: 'og:title',
      content: 'Codentsa - Instrumental Odontológico Profesional'
    },
    {
      property: 'og:description',
      content: 'Equipamiento odontológico de alta calidad para profesionales'
    },
    {
      property: 'og:image',
      content: '/og-image.jpg'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    // Twitter Card
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Codentsa - Instrumental Odontológico'
    },
    {
      name: 'twitter:description',
      content: 'Equipamiento odontológico de alta calidad'
    },
    {
      name: 'twitter:image',
      content: '/og-image.jpg'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://codentsa.com'
    }
  ]
})
</script>
```

### Composable SEO Reutilizable

```javascript
// composables/useSEO.js
export const useSEO = () => {
  const config = useRuntimeConfig()
  const route = useRoute()

  const setPageMeta = (options) => {
    const {
      title,
      description,
      keywords,
      image = '/og-image.jpg',
      type = 'website',
      canonical
    } = options

    const fullTitle = title ? `${title} | Codentsa` : 'Codentsa - Instrumental Odontológico'
    const canonicalUrl = canonical || `${config.public.baseUrl}${route.path}`

    useHead({
      title: fullTitle,
      meta: [
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
        // Open Graph
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: description },
        { property: 'og:image', content: `${config.public.baseUrl}${image}` },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:type', content: type },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: `${config.public.baseUrl}${image}` }
      ],
      link: [
        { rel: 'canonical', href: canonicalUrl }
      ]
    })
  }

  const setProductMeta = (product) => {
    setPageMeta({
      title: product.seo_title || product.name,
      description: product.seo_description || product.short_description,
      keywords: product.seo_keywords?.join(', '),
      image: product.images[0]?.image,
      type: 'product'
    })
  }

  const setCategoryMeta = (category) => {
    setPageMeta({
      title: category.seo_title || category.name,
      description: category.seo_description || category.description,
      image: category.image,
      type: 'website'
    })
  }

  return {
    setPageMeta,
    setProductMeta,
    setCategoryMeta
  }
}
```

**Uso en páginas:**

```vue
<!-- pages/products/[slug].vue -->
<script setup>
const route = useRoute()
const { setProductMeta } = useSEO()

const { data: product } = await useFetch(`/api/products/${route.params.slug}`)

setProductMeta(product.value)
</script>
```

## Structured Data (JSON-LD)

### Product Schema

```vue
<script setup>
const productSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.value.name,
  description: product.value.description,
  image: product.value.images.map(img => getDirectusImageUrl(img.image)),
  sku: product.value.sku,
  brand: {
    '@type': 'Brand',
    name: product.value.brand || 'Codentsa'
  },
  offers: {
    '@type': 'Offer',
    url: `https://codentsa.com/products/${product.value.slug}`,
    priceCurrency: 'EUR',
    price: product.value.price,
    availability: product.value.stock > 0
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    seller: {
      '@type': 'Organization',
      name: 'Codentsa'
    }
  }
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(productSchema.value)
    }
  ]
})
</script>
```

### Breadcrumb Schema

```vue
<script setup>
const breadcrumbSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: 'https://codentsa.com'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: category.value.name,
      item: `https://codentsa.com/products/category/${category.value.slug}`
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: product.value.name,
      item: `https://codentsa.com/products/${product.value.slug}`
    }
  ]
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(breadcrumbSchema.value)
    }
  ]
})
</script>
```

### Organization Schema

```vue
<!-- layouts/default.vue -->
<script setup>
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Codentsa',
  url: 'https://codentsa.com',
  logo: 'https://codentsa.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+34-XXX-XXX-XXX',
    contactType: 'customer service',
    areaServed: 'ES',
    availableLanguage: 'Spanish'
  },
  sameAs: [
    'https://www.facebook.com/codentsa',
    'https://www.instagram.com/codentsa',
    'https://www.linkedin.com/company/codentsa'
  ]
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(organizationSchema)
    }
  ]
})
</script>
```

## Sitemap XML

### Generar Sitemap Automáticamente

```javascript
// server/routes/sitemap.xml.get.js
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  // Obtener productos y categorías desde Directus
  const products = await fetchAllProducts()
  const categories = await fetchAllCategories()

  const urls = [
    // Páginas estáticas
    { loc: baseUrl, changefreq: 'daily', priority: 1.0 },
    { loc: `${baseUrl}/products`, changefreq: 'daily', priority: 0.9 },
    { loc: `${baseUrl}/about`, changefreq: 'monthly', priority: 0.5 },
    { loc: `${baseUrl}/contact`, changefreq: 'monthly', priority: 0.5 },

    // Categorías
    ...categories.map(cat => ({
      loc: `${baseUrl}/products/category/${cat.slug}`,
      changefreq: 'weekly',
      priority: 0.8
    })),

    // Productos
    ...products.map(product => ({
      loc: `${baseUrl}/products/${product.slug}`,
      lastmod: product.updated_at,
      changefreq: 'weekly',
      priority: 0.7
    }))
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})
```

## Robots.txt

```
# public/robots.txt
User-agent: *
Allow: /

Disallow: /checkout/
Disallow: /account/
Disallow: /api/

Sitemap: https://codentsa.com/sitemap.xml
```

## URLs Amigables

### Estructura Recomendada

```
✅ CORRECTO:
/products/instrumental-quirurgico-basico
/products/category/endodoncia
/blog/cuidado-instrumental-dental

❌ INCORRECTO:
/products?id=123
/product-detail/SKU-12345
/cat?c=3
```

### Slugs en Directus

Al crear productos/categorías en Directus:
1. Campo `slug` debe ser URL-friendly
2. Usar guiones `-` en lugar de espacios
3. Solo minúsculas
4. Sin caracteres especiales

```javascript
// utils/slug.js
export const createSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplazar no alfanuméricos
    .replace(/^-+|-+$/g, '') // Trim guiones
}
```

## Optimización de Imágenes

### Nombres de Archivo Descriptivos

```
✅ instrumental-quirurgico-basico-codentsa.jpg
❌ IMG_12345.jpg
```

### Alt Text

```vue
<NuxtImg
  :src="product.images[0].image"
  :alt="`${product.name} - Instrumental odontológico profesional | Codentsa`"
  width="600"
  height="600"
/>
```

### Lazy Loading

```vue
<NuxtImg
  :src="image"
  :alt="altText"
  loading="lazy"
/>
```

## Performance SEO

### Core Web Vitals

**1. Largest Contentful Paint (LCP)**
- Target: < 2.5s
- Optimizar carga de imágenes hero
- Usar SSR de Nuxt

**2. First Input Delay (FID)**
- Target: < 100ms
- Minimizar JavaScript

**3. Cumulative Layout Shift (CLS)**
- Target: < 0.1
- Definir width/height en imágenes
- Evitar inserción dinámica de contenido

### Optimizaciones Nuxt

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  // Prerender rutas estáticas
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },

  // Optimización de fuentes
  experimental: {
    inlineSSRStyles: false
  },

  // Comprimir respuestas
  nitro: {
    compressPublicAssets: true
  }
})
```

## Contenido SEO

### Títulos (H1-H6)

- **Una sola H1** por página
- Incluir palabra clave principal
- H2-H6 para jerarquía semántica

```vue
<template>
  <div>
    <h1 class="font-title text-4xl font-bold">
      {{ product.name }} - Instrumental Odontológico Profesional
    </h1>

    <h2 class="font-title text-2xl font-semibold mt-8">
      Características del Producto
    </h2>

    <h3 class="font-title text-xl font-medium mt-4">
      Materiales de Fabricación
    </h3>
  </div>
</template>
```

### Descripciones de Producto

**Mínimo 300 palabras** únicas por producto:
- Beneficios del producto
- Casos de uso
- Características técnicas
- Comparación con alternativas

### Evitar Contenido Duplicado

- Canonical tags en variantes de producto
- Parámetros de URL ignorados por SEO
- Contenido único para cada categoría

## Link Building Interno

```vue
<template>
  <div>
    <!-- Breadcrumb -->
    <nav>
      <NuxtLink to="/">Inicio</NuxtLink> /
      <NuxtLink :to="`/products/category/${product.category.slug}`">
        {{ product.category.name }}
      </NuxtLink> /
      <span>{{ product.name }}</span>
    </nav>

    <!-- Related Products -->
    <section>
      <h2>Productos Relacionados</h2>
      <ProductCard
        v-for="related in relatedProducts"
        :key="related.id"
        :product="related"
      />
    </section>

    <!-- Category Links -->
    <aside>
      <h3>Categorías</h3>
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="`/products/category/${cat.slug}`"
      >
        {{ cat.name }}
      </NuxtLink>
    </aside>
  </div>
</template>
```

## SEO Checklist

### Pre-lanzamiento
- [ ] Sitemap XML configurado
- [ ] Robots.txt creado
- [ ] Meta tags en todas las páginas
- [ ] Structured data implementado
- [ ] URLs amigables
- [ ] Alt text en todas las imágenes
- [ ] Core Web Vitals optimizados
- [ ] Mobile responsive
- [ ] HTTPS configurado
- [ ] Canonical tags implementados

### Post-lanzamiento
- [ ] Google Search Console configurado
- [ ] Bing Webmaster Tools configurado
- [ ] Google Analytics funcionando
- [ ] Schema validator sin errores
- [ ] Mobile-friendly test aprobado
- [ ] PageSpeed Insights > 90
- [ ] Monitoreo de posiciones
- [ ] Backlinks strategy

## Herramientas Recomendadas

- **Google Search Console**: Monitoreo y errores
- **Google Analytics**: Tráfico orgánico
- **Screaming Frog**: Auditoría técnica
- **Ahrefs/SEMrush**: Keywords y backlinks
- **Schema Markup Validator**: Validar JSON-LD
- **PageSpeed Insights**: Performance
