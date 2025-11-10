# Integración con Directus CMS

## Qué es Directus

Directus es un headless CMS open-source que proporciona una interfaz administrativa para gestionar contenido y una API REST/GraphQL para consumirlo.

**Ventajas para Codentsa:**
- Gestión visual de productos, categorías, y contenido
- API REST y GraphQL automáticas
- Control de permisos granular
- Workflow de publicación
- Gestión de archivos y medios
- Extensible con custom fields

## Setup Inicial

### 1. Instalación de Directus

**Opción A: Docker (Recomendado para desarrollo)**
```yaml
# docker-compose.yml
version: '3'
services:
  database:
    image: postgis/postgis:13-master
    environment:
      POSTGRES_USER: directus
      POSTGRES_PASSWORD: directus
      POSTGRES_DB: directus

  directus:
    image: directus/directus:latest
    ports:
      - 8055:8055
    depends_on:
      - database
    environment:
      KEY: '255d861b-5ea1-5996-9aa3-922530ec40b1'
      SECRET: '6116487b-cda1-52c2-b5b5-c8022c45e263'
      DB_CLIENT: 'pg'
      DB_HOST: 'database'
      DB_PORT: '5432'
      DB_DATABASE: 'directus'
      DB_USER: 'directus'
      DB_PASSWORD: 'directus'
      ADMIN_EMAIL: 'admin@example.com'
      ADMIN_PASSWORD: 'admin'
```

```bash
docker-compose up -d
```

**Opción B: Cloud Hosting**
- Directus Cloud (oficial)
- Railway
- DigitalOcean
- AWS/GCP

### 2. Configuración en Nuxt

**Instalar SDK:**
```bash
pnpm add @directus/sdk
```

**Crear utilidad Directus:**
```javascript
// utils/directus.js
import { createDirectus, rest, authentication } from '@directus/sdk'

export const useDirectusClient = () => {
  const config = useRuntimeConfig()

  const directus = createDirectus(config.directus.url)
    .with(rest())
    .with(authentication('json'))

  return directus
}
```

**Variables de entorno (.env):**
```env
NUXT_DIRECTUS_URL=http://localhost:8055
NUXT_DIRECTUS_TOKEN=your_static_token_here
```

## Estructura de Colecciones

### Productos (products)

```javascript
{
  id: UUID,
  status: 'published' | 'draft' | 'archived',
  name: String,             // Nombre del producto
  slug: String,             // URL-friendly name
  description: Text,        // Descripción completa
  short_description: Text,  // Descripción corta para cards
  sku: String,              // Código único
  price: Decimal,           // Precio en EUR
  compare_price: Decimal,   // Precio anterior (para descuentos)
  stock: Integer,           // Cantidad en inventario
  low_stock_threshold: Integer, // Alerta de stock bajo
  images: O2M,              // Relación a product_images
  category: M2O,            // Relación a categories
  tags: M2M,                // Relación a tags
  featured: Boolean,        // Producto destacado
  seo_title: String,
  seo_description: Text,
  seo_keywords: Array,
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### Categorías (categories)

```javascript
{
  id: UUID,
  status: 'published' | 'draft',
  name: String,
  slug: String,
  description: Text,
  image: File,
  parent_category: M2O,     // Para categorías anidadas
  sort_order: Integer,
  seo_title: String,
  seo_description: Text
}
```

### Imágenes de Producto (product_images)

```javascript
{
  id: UUID,
  product: M2O,             // Relación a products
  image: File,
  alt_text: String,
  sort_order: Integer,
  is_primary: Boolean
}
```

### Tags (tags)

```javascript
{
  id: UUID,
  name: String,
  slug: String,
  color: String             // Hex color para badge
}
```

### Órdenes (orders)

```javascript
{
  id: UUID,
  order_number: String,     // Auto-generado
  user_email: String,
  user_phone: String,
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  items: O2M,               // Relación a order_items
  subtotal: Decimal,
  shipping_cost: Decimal,
  tax: Decimal,
  total: Decimal,
  payment_method: String,
  payment_status: String,
  shipping_address: JSON,
  billing_address: JSON,
  notes: Text,
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### Items de Orden (order_items)

```javascript
{
  id: UUID,
  order: M2O,
  product: M2O,
  product_name: String,     // Snapshot del nombre
  product_sku: String,      // Snapshot del SKU
  quantity: Integer,
  unit_price: Decimal,
  total_price: Decimal
}
```

## API Endpoints

### Obtener Productos

**Server API Route:**
```javascript
// server/api/products/index.get.js
export default defineEventHandler(async (event) => {
  const directus = useDirectusClient()
  const query = getQuery(event)

  try {
    const response = await directus.request(
      readItems('products', {
        filter: {
          status: { _eq: 'published' },
          ...(query.category && { category: { _eq: query.category } })
        },
        fields: [
          'id',
          'name',
          'slug',
          'short_description',
          'price',
          'compare_price',
          'stock',
          'featured',
          'images.image',
          'images.alt_text',
          'category.name',
          'category.slug',
          'tags.tags_id.name'
        ],
        sort: query.sort || '-created_at',
        limit: parseInt(query.limit) || 12,
        page: parseInt(query.page) || 1
      })
    )

    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error fetching products'
    })
  }
})
```

**Uso en componente:**
```vue
<script setup>
const { data: products, pending } = await useFetch('/api/products', {
  query: {
    category: 'instrumental-quirurgico',
    limit: 12
  }
})
</script>
```

### Obtener Producto por Slug

```javascript
// server/api/products/[slug].get.js
export default defineEventHandler(async (event) => {
  const directus = useDirectusClient()
  const slug = getRouterParam(event, 'slug')

  const products = await directus.request(
    readItems('products', {
      filter: {
        slug: { _eq: slug },
        status: { _eq: 'published' }
      },
      fields: ['*', 'images.*', 'category.*', 'tags.tags_id.*'],
      limit: 1
    })
  )

  if (!products.length) {
    throw createError({
      statusCode: 404,
      message: 'Product not found'
    })
  }

  return products[0]
})
```

### Crear Orden

```javascript
// server/api/orders/create.post.js
export default defineEventHandler(async (event) => {
  const directus = useDirectusClient()
  const body = await readBody(event)

  try {
    // Generar número de orden
    const orderNumber = `ORD-${Date.now()}`

    // Crear orden
    const order = await directus.request(
      createItem('orders', {
        order_number: orderNumber,
        user_email: body.email,
        user_phone: body.phone,
        status: 'pending',
        subtotal: body.subtotal,
        shipping_cost: body.shippingCost,
        tax: body.tax,
        total: body.total,
        payment_method: body.paymentMethod,
        shipping_address: body.shippingAddress,
        billing_address: body.billingAddress
      })
    )

    // Crear items de orden
    for (const item of body.items) {
      await directus.request(
        createItem('order_items', {
          order: order.id,
          product: item.productId,
          product_name: item.name,
          product_sku: item.sku,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity
        })
      )
    }

    return { success: true, orderId: order.id, orderNumber }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error creating order'
    })
  }
})
```

## Composables

### useProducts.js

```javascript
export const useProducts = () => {
  const fetchProducts = async (filters = {}) => {
    return await $fetch('/api/products', {
      query: filters
    })
  }

  const fetchProduct = async (slug) => {
    return await $fetch(`/api/products/${slug}`)
  }

  const searchProducts = async (query) => {
    return await $fetch('/api/products/search', {
      query: { q: query }
    })
  }

  return {
    fetchProducts,
    fetchProduct,
    searchProducts
  }
}
```

## Gestión de Imágenes

### Obtener URL de Imagen

```javascript
// utils/directus-assets.js
export const getDirectusAssetUrl = (fileId) => {
  const config = useRuntimeConfig()
  if (!fileId) return ''

  return `${config.public.directusUrl}/assets/${fileId}`
}

export const getDirectusImageUrl = (fileId, options = {}) => {
  const config = useRuntimeConfig()
  if (!fileId) return ''

  const params = new URLSearchParams({
    width: options.width || '',
    height: options.height || '',
    quality: options.quality || 80,
    fit: options.fit || 'cover'
  }).toString()

  return `${config.public.directusUrl}/assets/${fileId}?${params}`
}
```

**Uso en componente:**
```vue
<template>
  <NuxtImg
    :src="getDirectusImageUrl(product.images[0].image, { width: 400, quality: 85 })"
    :alt="product.images[0].alt_text"
    width="400"
    height="400"
  />
</template>
```

## Seguridad

### 1. Variables de Entorno

**NUNCA** exponer el token de Directus en el cliente. Usar solo en server-side.

```javascript
// ✅ CORRECTO - Server API Route
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig() // Acceso a variables privadas
  // ...
})

// ❌ INCORRECTO - Cliente
const config = useRuntimeConfig() // Solo variables públicas
```

### 2. Permisos en Directus

Configurar roles y permisos:
- **Public**: Solo lectura de productos, categorías (status: published)
- **Authenticated**: Crear órdenes, ver sus propias órdenes
- **Admin**: Acceso completo

### 3. Rate Limiting

Implementar rate limiting en las API routes para prevenir abuso.

## Webhooks (Opcional)

Directus puede notificar cambios mediante webhooks:

```javascript
// server/api/webhooks/directus.post.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Verificar signature
  const signature = getHeader(event, 'directus-webhook-signature')

  if (body.collection === 'products' && body.action === 'update') {
    // Invalidar cache, reindexar, etc.
  }

  return { received: true }
})
```

## Migración de Datos

### Script de importación

```javascript
// scripts/import-products.js
import { createDirectus, rest, createItems } from '@directus/sdk'

const directus = createDirectus('http://localhost:8055').with(rest())

const products = [
  {
    name: 'Producto 1',
    slug: 'producto-1',
    price: 99.99,
    // ...
  }
]

for (const product of products) {
  await directus.request(createItems('products', product))
}
```

## Próximos Pasos

1. Configurar instancia de Directus
2. Crear colecciones según el schema definido
3. Importar productos iniciales
4. Configurar permisos y roles
5. Integrar API endpoints en Nuxt
6. Probar flujo completo de producto a orden
