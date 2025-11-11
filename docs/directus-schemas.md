# Directus Schemas - Codentsa E-commerce

Esta documentación describe todas las colecciones (tablas) y campos necesarios en Directus para el correcto funcionamiento de la plataforma Codentsa.

## Índice

- [Configuración Inicial](#configuración-inicial)
- [Colección: products](#colección-products)
- [Colección: categories](#colección-categories)
- [Colección: brands](#colección-brands)
- [Colección: orders](#colección-orders)
- [Colección: reviews](#colección-reviews)
- [Colección: payment_logs](#colección-payment_logs)
- [Relaciones entre Colecciones](#relaciones-entre-colecciones)
- [Permisos y Roles](#permisos-y-roles)

---

## Configuración Inicial

### 1. Access Token

Crear un **Static Token** en Directus para operaciones del servidor:

1. Navegar a: **Settings → Access Tokens → Create Token**
2. Nombre: `Codentsa Server Token`
3. Permisos: **Admin** (o permisos específicos según necesidad)
4. Copiar el token generado a `.env` como `NUXT_DIRECTUS_TOKEN`

### 2. URL de Directus

Configurar la URL de la instancia de Directus en `.env`:

```env
NUXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
NUXT_DIRECTUS_TOKEN=tu_token_aqui
```

---

## Colección: `products`

Almacena información de todos los productos del catálogo.

### Campos

| Campo | Tipo | Interface | Requerido | Opciones | Descripción |
|-------|------|-----------|-----------|----------|-------------|
| `id` | UUID | Input | Sí | Primary Key | ID único del producto |
| `status` | String | Dropdown | Sí | `published`, `draft`, `archived` | Estado del producto |
| `name` | String | Input | Sí | Max 255 | Nombre del producto |
| `slug` | String | Input | Sí | Max 255, Unique | URL-friendly identifier |
| `description` | Text | Textarea | Sí | - | Descripción corta del producto |
| `long_description` | Text | WYSIWYG | No | - | Descripción detallada (HTML) |
| `price` | Decimal | Input | Sí | 10,2 | Precio actual |
| `original_price` | Decimal | Input | No | 10,2 | Precio original (para descuentos) |
| `sku` | String | Input | No | Max 100, Unique | Código SKU del producto |
| `stock` | Integer | Input | Sí | Default: 0 | Cantidad en inventario |
| `brand_id` | UUID | Many-to-One | No | → `brands` | Relación con marca |
| `category_id` | UUID | Many-to-One | No | → `categories` | Relación con categoría |
| `images` | JSON | Repeater | No | - | Array de URLs de imágenes |
| `specifications` | JSON | Code | No | - | Especificaciones técnicas |
| `colors` | JSON | Tags | No | - | Colores disponibles |
| `sizes` | JSON | Tags | No | - | Tallas/tamaños disponibles |
| `materials` | JSON | Tags | No | - | Materiales disponibles |
| `featured` | Boolean | Toggle | No | Default: false | Producto destacado |
| `rating_avg` | Decimal | Input | No | 3,2 | Calificación promedio |
| `rating_count` | Integer | Input | No | Default: 0 | Número de calificaciones |
| `views` | Integer | Input | No | Default: 0 | Número de vistas |
| `meta_title` | String | Input | No | Max 255 | Título SEO |
| `meta_description` | Text | Textarea | No | - | Descripción SEO |
| `created_at` | Timestamp | Datetime | Sí | Auto | Fecha de creación |
| `updated_at` | Timestamp | Datetime | Sí | Auto | Fecha de actualización |

### Ejemplo JSON - `images`

```json
[
  {
    "url": "https://cdn.directus.io/products/prod-1-main.jpg",
    "alt": "Turbina eléctrica - Vista frontal",
    "order": 1
  },
  {
    "url": "https://cdn.directus.io/products/prod-1-detail.jpg",
    "alt": "Turbina eléctrica - Detalle",
    "order": 2
  }
]
```

### Ejemplo JSON - `specifications`

```json
{
  "weight": "150g",
  "dimensions": "25x10x5 cm",
  "material": "Acero inoxidable 316L",
  "certification": "CE, FDA",
  "origin": "Alemania",
  "warranty": "2 años"
}
```

---

## Colección: `categories`

Categorías de productos.

### Campos

| Campo | Tipo | Interface | Requerido | Opciones | Descripción |
|-------|------|-----------|-----------|----------|-------------|
| `id` | UUID | Input | Sí | Primary Key | ID único |
| `name` | String | Input | Sí | Max 255 | Nombre de la categoría |
| `slug` | String | Input | Sí | Max 255, Unique | URL-friendly |
| `description` | Text | Textarea | No | - | Descripción |
| `image` | UUID | File | No | → `directus_files` | Imagen de la categoría |
| `parent_id` | UUID | Many-to-One | No | → `categories` | Categoría padre (subcategorías) |
| `order` | Integer | Input | No | Default: 0 | Orden de visualización |
| `status` | String | Dropdown | Sí | `published`, `draft` | Estado |
| `created_at` | Timestamp | Datetime | Sí | Auto | Fecha de creación |

### Ejemplo de Categorías

```
- Instrumental Quirúrgico (parent_id: null)
  - Bisturís (parent_id: 1)
  - Pinzas (parent_id: 1)
- Equipamiento (parent_id: null)
  - Turbinas (parent_id: 2)
  - Micromotores (parent_id: 2)
```

---

## Colección: `brands`

Marcas de productos.

### Campos

| Campo | Tipo | Interface | Requerido | Opciones | Descripción |
|-------|------|-----------|-----------|----------|-------------|
| `id` | UUID | Input | Sí | Primary Key | ID único |
| `name` | String | Input | Sí | Max 255 | Nombre de la marca |
| `slug` | String | Input | Sí | Max 255, Unique | URL-friendly |
| `description` | Text | Textarea | No | - | Descripción |
| `logo` | UUID | File | No | → `directus_files` | Logo de la marca |
| `website` | String | Input | No | Max 255 | URL del sitio web |
| `featured` | Boolean | Toggle | No | Default: false | Marca destacada |
| `order` | Integer | Input | No | Default: 0 | Orden de visualización |
| `status` | String | Dropdown | Sí | `published`, `draft` | Estado |
| `created_at` | Timestamp | Datetime | Sí | Auto | Fecha de creación |

---

## Colección: `orders`

Pedidos realizados por los clientes.

### Campos

| Campo | Tipo | Interface | Requerido | Opciones | Descripción |
|-------|------|-----------|-----------|----------|-------------|
| `id` | UUID | Input | Sí | Primary Key | ID interno |
| `order_id` | String | Input | Sí | Max 255, Unique | ID del pedido (desde Redsys) |
| `status` | String | Dropdown | Sí | Ver opciones* | Estado del pedido |
| `customer_email` | String | Input | Sí | Email | Email del cliente |
| `customer_name` | String | Input | Sí | Max 255 | Nombre completo |
| `customer_phone` | String | Input | No | Max 50 | Teléfono |
| `shipping_address` | JSON | Code | Sí | - | Dirección de envío |
| `billing_address` | JSON | Code | Sí | - | Dirección de facturación |
| `items` | JSON | Code | Sí | - | Items del carrito |
| `subtotal` | Decimal | Input | Sí | 10,2 | Subtotal |
| `shipping` | Decimal | Input | Sí | 10,2 | Costo de envío |
| `tax` | Decimal | Input | Sí | 10,2 | Impuestos |
| `total` | Decimal | Input | Sí | 10,2 | Total |
| `payment_method` | String | Input | Sí | Default: 'redsys' | Método de pago |
| `payment_data` | JSON | Code | No | - | Datos del pago (Redsys) |
| `notes` | Text | Textarea | No | - | Notas adicionales |
| `created_at` | Timestamp | Datetime | Sí | Auto | Fecha de creación |
| `updated_at` | Timestamp | Datetime | Sí | Auto | Fecha de actualización |

**Opciones de Status:**
- `pending` - Pendiente de pago
- `paid` - Pagado
- `processing` - En proceso
- `shipped` - Enviado
- `delivered` - Entregado
- `cancelled` - Cancelado
- `refunded` - Reembolsado

### Ejemplo JSON - `shipping_address`

```json
{
  "name": "María González",
  "address": "Calle Principal 123",
  "city": "Madrid",
  "province": "Madrid",
  "postal_code": "28001",
  "country": "España",
  "phone": "+34 612 345 678"
}
```

### Ejemplo JSON - `items`

```json
[
  {
    "id": 1,
    "product_id": "uuid-del-producto",
    "name": "Turbina eléctrica",
    "brand": "Dentsply Sirona",
    "image": "https://...",
    "price": 599.99,
    "original_price": 799.99,
    "quantity": 1,
    "selected_color": "Plateado",
    "selected_size": null,
    "selected_material": null
  }
]
```

### Ejemplo JSON - `payment_data`

```json
{
  "order_id": "20250111123456",
  "response_code": "0000",
  "authorisation_code": "123456",
  "masked_card": "****1234",
  "transaction_type": "0",
  "amount": "59999",
  "currency": "978",
  "merchant_code": "999008881",
  "terminal": "001",
  "timestamp": "2025-01-11T12:34:56Z"
}
```

---

## Colección: `reviews`

Reseñas de productos.

### Campos

| Campo | Tipo | Interface | Requerido | Opciones | Descripción |
|-------|------|-----------|-----------|----------|-------------|
| `id` | UUID | Input | Sí | Primary Key | ID único |
| `product_id` | UUID | Many-to-One | Sí | → `products` | Producto reseñado |
| `order_id` | UUID | Many-to-One | No | → `orders` | Pedido relacionado |
| `status` | String | Dropdown | Sí | `published`, `pending`, `rejected` | Estado |
| `rating` | Integer | Rating | Sí | 1-5 | Calificación |
| `title` | String | Input | No | Max 255 | Título de la reseña |
| `review` | Text | Textarea | Sí | - | Contenido de la reseña |
| `author_name` | String | Input | Sí | Max 255 | Nombre del autor |
| `author_email` | String | Input | Sí | Email | Email del autor |
| `verified_purchase` | Boolean | Toggle | No | Default: false | Compra verificada |
| `helpful_count` | Integer | Input | No | Default: 0 | Votos útiles |
| `created_at` | Timestamp | Datetime | Sí | Auto | Fecha de creación |
| `updated_at` | Timestamp | Datetime | Sí | Auto | Fecha de actualización |

---

## Colección: `payment_logs`

Logs de eventos de pago para auditoría.

### Campos

| Campo | Tipo | Interface | Requerido | Opciones | Descripción |
|-------|------|-----------|-----------|----------|-------------|
| `id` | UUID | Input | Sí | Primary Key | ID único |
| `order_id` | String | Input | Sí | Max 255 | ID del pedido |
| `event_type` | String | Dropdown | Sí | Ver opciones* | Tipo de evento |
| `status` | String | Dropdown | Sí | `success`, `error`, `pending` | Estado |
| `response_code` | String | Input | No | Max 50 | Código de respuesta |
| `raw_data` | JSON | Code | No | - | Datos completos de Redsys |
| `ip_address` | String | Input | No | Max 45 | IP del cliente |
| `created_at` | Timestamp | Datetime | Sí | Auto | Fecha de creación |

**Opciones de Event Type:**
- `payment_initiated` - Pago iniciado
- `payment_success` - Pago exitoso
- `payment_failed` - Pago fallido
- `payment_cancelled` - Pago cancelado
- `webhook_received` - Webhook recibido
- `refund_initiated` - Reembolso iniciado
- `refund_completed` - Reembolso completado

---

## Relaciones entre Colecciones

### Diagrama de Relaciones

```
products
├── Many-to-One → brands (brand_id)
├── Many-to-One → categories (category_id)
└── One-to-Many ← reviews (product_id)

categories
└── Many-to-One → categories (parent_id) [Recursivo]

orders
└── One-to-Many ← payment_logs (order_id via string match)

reviews
├── Many-to-One → products (product_id)
└── Many-to-One → orders (order_id)
```

### Configuración en Directus

#### 1. Relación products → brands

- **Colección**: `products`
- **Campo**: `brand_id`
- **Tipo de relación**: Many-to-One
- **Colección relacionada**: `brands`
- **Display Template**: `{{name}}`

#### 2. Relación products → categories

- **Colección**: `products`
- **Campo**: `category_id`
- **Tipo de relación**: Many-to-One
- **Colección relacionada**: `categories`
- **Display Template**: `{{name}}`

#### 3. Relación reviews → products

- **Colección**: `reviews`
- **Campo**: `product_id`
- **Tipo de relación**: Many-to-One
- **Colección relacionada**: `products`
- **Display Template**: `{{name}}`

#### 4. Relación reviews → orders

- **Colección**: `reviews`
- **Campo**: `order_id`
- **Tipo de relación**: Many-to-One
- **Colección relacionada**: `orders`
- **Display Template**: `{{order_id}}`

---

## Permisos y Roles

### Rol: Public (Usuario no autenticado)

Permisos de **lectura** en:

| Colección | Read | Fields |
|-----------|------|--------|
| `products` | ✅ | Todos excepto: `cost`, `supplier_info` |
| `categories` | ✅ | Todos con `status = published` |
| `brands` | ✅ | Todos con `status = published` |
| `reviews` | ✅ | Todos con `status = published` |

Reglas de filtro:
```json
{
  "status": {
    "_eq": "published"
  }
}
```

### Rol: Customer (Cliente autenticado)

**Heredar permisos de Public** +

| Colección | Create | Read | Update | Delete |
|-----------|--------|------|--------|--------|
| `reviews` | ✅ | ✅ | ✅* | ❌ |
| `orders` | ❌ | ✅** | ❌ | ❌ |

*Solo sus propias reviews
**Solo sus propios pedidos

### Rol: Admin

**Full access** a todas las colecciones y operaciones.

---

## Índices Recomendados

Para mejorar el rendimiento de las consultas:

### Colección `products`

- `slug` (Unique)
- `sku` (Unique)
- `status`
- `brand_id`
- `category_id`
- `featured`

### Colección `orders`

- `order_id` (Unique)
- `customer_email`
- `status`
- `created_at`

### Colección `reviews`

- `product_id`
- `status`
- `rating`

### Colección `payment_logs`

- `order_id`
- `event_type`
- `created_at`

---

## Migración de Datos Actuales

Los productos actuales están hardcodeados en `/app/stores/index.js` (20 productos). Para migrarlos a Directus:

1. **Exportar datos actuales** del store a JSON
2. **Crear marcas y categorías** primero en Directus
3. **Importar productos** mapeando las relaciones
4. **Actualizar composables** para usar `useDirectus()` en lugar del store

### Script de Migración (Futuro)

Crear `/scripts/migrate-products.js` para automatizar la migración.

---

## Testing

### 1. Testing de Conexión

```javascript
// En la consola del navegador
const { getProducts } = useDirectus()
const products = await getProducts({ limit: 5 })
console.log(products)
```

### 2. Testing de Creación de Orden

Ver `/docs/redsys-integration.md` para testing completo del flujo de pago.

---

## Troubleshooting

### Error: "Directus not configured"

**Solución**: Verificar que `.env` tenga correctamente configurado:
```env
NUXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
NUXT_DIRECTUS_TOKEN=tu_token_aqui
```

### Error: "401 Unauthorized"

**Solución**:
1. Verificar que el token sea válido
2. Verificar permisos del rol asociado al token
3. Regenerar token si es necesario

### Error: "Cannot read property 'request' of null"

**Solución**: El cliente no se inicializó correctamente. Verificar URL de Directus.

---

## Recursos Adicionales

- [Directus SDK Documentation](https://docs.directus.io/reference/sdk.html)
- [Directus Data Model](https://docs.directus.io/app/data-model.html)
- [Directus API Reference](https://docs.directus.io/reference/api.html)

---

**Última actualización**: 2025-01-11
**Versión de Directus SDK**: 20.1.1
