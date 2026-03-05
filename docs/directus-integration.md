# Integracion con Directus CMS

## Vision General

Codentsa utiliza Directus como headless CMS para gestionar productos, categorias, marcas, resenas y pedidos. La integracion se divide en dos capas: un composable client-side (`app/composables/useDirectus.js`) y utilidades server-side (`server/utils/directus.js`).

**SDK:** `@directus/sdk` v20.3.0 (mantenido intencionalmente en v20.x por compatibilidad; ver decisiones de Fase 1).

## Composable Client-Side: `useDirectus()`

**Archivo:** `app/composables/useDirectus.js`

Proporciona acceso de solo lectura a Directus desde el cliente. Usa `createDirectus()` con el plugin `rest()`, sin autenticacion (acceso publico).

### Inicializacion

El cliente se crea como singleton (`directusClient`) usando la URL publica de `runtimeConfig.public.directusUrl`. Si la URL no esta configurada, todas las funciones devuelven arrays vacios o `null` y registran un warning en consola.

```javascript
import { createDirectus, rest, readItems, readItem } from '@directus/sdk'

// Se inicializa una unica vez (singleton)
const client = createDirectus(directusUrl).with(rest())
```

### Funciones Exportadas

| Funcion | Parametros | Retorno | Descripcion |
|---|---|---|---|
| `getProducts(options)` | `{ filter, sort, limit, fields }` | `Promise<Array>` | Obtiene productos. Default: sin filtro, ordenados por `-created_at`, sin limite, todos los campos. |
| `getProductById(id)` | `id: string\|number` | `Promise<Object\|null>` | Obtiene un producto por ID. |
| `getCategories()` | ninguno | `Promise<Array>` | Obtiene categorias ordenadas por nombre. |
| `getBrands()` | ninguno | `Promise<Array>` | Obtiene marcas ordenadas por nombre. |
| `getProductReviews(productId)` | `productId: string\|number` | `Promise<Array>` | Obtiene resenas publicadas de un producto, ordenadas por `-created_at`. |
| `searchProducts(query)` | `query: string` | `Promise<Array>` | Busca productos por nombre o descripcion (filtro `_contains`). |

El composable tambien expone `client` (la instancia de Directus) para uso directo si fuera necesario.

### Uso

```javascript
const { getProducts, getProductById, searchProducts } = useDirectus()

// Obtener todos los productos
const products = await getProducts()

// Con opciones
const featured = await getProducts({
  filter: { featured: { _eq: true } },
  limit: 6,
})

// Buscar
const results = await searchProducts('fresa')
```

## Utilidades Server-Side: `server/utils/directus.js`

**Archivo:** `server/utils/directus.js`

Proporciona acceso autenticado a Directus desde server routes de Nitro. Usa un token estatico (`runtimeConfig.directusToken`) para operaciones de escritura.

### Inicializacion

```javascript
import { createDirectus, rest, readItems, readItem, createItem, updateItem } from '@directus/sdk'

// Singleton con autenticacion por token estatico
const client = createDirectus(directusUrl)
  .with(rest())
  .with(() => ({
    beforeRequest: (options) => {
      options.headers.Authorization = `Bearer ${directusToken}`
      return options
    },
  }))
```

### Funciones Exportadas

| Funcion | Parametros | Retorno | Descripcion |
|---|---|---|---|
| `useDirectusServer()` | ninguno | `Object\|null` | Devuelve la instancia autenticada del cliente Directus. |
| `createOrder(orderData)` | `orderData: Object` | `Promise<Object\|null>` | Crea un pedido en Directus tras un pago exitoso. |
| `updateOrderStatus(orderId, status, additionalData)` | `orderId: string`, `status: string`, `additionalData: Object` | `Promise<Object\|null>` | Actualiza el estado de un pedido (busca por `order_id`, no por PK). |
| `getOrderById(orderId)` | `orderId: string` | `Promise<Object\|null>` | Obtiene un pedido por su `order_id`. |
| `updateProductStock(items)` | `items: Array<{ productId, quantity }>` | `Promise<boolean>` | Decrementa el stock de productos tras una compra. |
| `logPaymentEvent(eventData)` | `eventData: Object` | `Promise<Object\|null>` | Registra eventos de pago en la coleccion `payment_logs` para auditoria. |

### Estructura de `orderData`

```javascript
{
  orderId: string,
  status: string,
  customerEmail: string,
  customerName: string,
  customerPhone: string,
  shippingAddress: Object,
  billingAddress: Object,
  items: Array,          // JSON con items del carrito
  subtotal: number,
  shipping: number,
  tax: number,
  total: number,
  paymentMethod: string, // Default: 'redsys'
  paymentData: Object,   // Respuesta completa de Redsys
}
```

## Variables de Entorno

| Variable | Scope | Descripcion |
|---|---|---|
| `NUXT_PUBLIC_DIRECTUS_URL` | Publico (cliente + servidor) | URL base de la instancia Directus |
| `NUXT_DIRECTUS_TOKEN` | Privado (solo servidor) | Token estatico para operaciones autenticadas |

**Seguridad:** El token de Directus NUNCA se expone al cliente. Solo se accede via `runtimeConfig.directusToken` en server routes y utilidades.

## Flujo de Datos

```
[Cliente]                              [Servidor]
useDirectus().getProducts()            server/utils/directus.js
  → createDirectus(url).rest()           → createDirectus(url).rest() + Bearer token
  → readItems('products', ...)           → createItem('orders', ...)
  → Solo lectura publica                 → Lectura/escritura autenticada
```

## Estado Actual

- Los productos estan hardcoded en `app/stores/products.js` (preparado para migracion a Directus).
- El composable `useDirectus()` y las utilidades server-side estan implementados y listos para conectarse a una instancia de Directus.
- La integracion con Redsys usa las funciones server-side (`createOrder`, `updateOrderStatus`, `logPaymentEvent`) en el flujo de pago.
