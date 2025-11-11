# Analytics y Tracking

Esta documentación cubre la integración de tres plataformas de analytics:
- **Umami Analytics** (Privacy-focused, open source, GDPR compliant)
- **Google Analytics 4** (Analytics completo de Google)
- **Meta Pixel** (Facebook/Instagram tracking)

---

## Umami Analytics

Umami es una solución de analytics de código abierto, enfocada en privacidad, que cumple con GDPR sin necesidad de banners de cookies.

### Por qué Umami

✅ **Privacy-first**: No recolecta datos personales
✅ **GDPR Compliant**: No requiere cookie banner
✅ **Open Source**: Auditable y self-hosted
✅ **Lightweight**: Script de ~2KB
✅ **Real-time**: Datos en tiempo real
✅ **Sin cookies de terceros**: Alternativa ética a GA4

### Setup

**Variables de entorno (.env):**
```env
# Website ID de tu sitio en Umami
NUXT_PUBLIC_UMAMI_ID=your-umami-website-id

# URL de tu instancia de Umami
# Cloud: https://cloud.umami.is
# Self-hosted: https://analytics.tudominio.com
NUXT_PUBLIC_UMAMI_HOST=https://cloud.umami.is
```

**Configuración en nuxt.config.ts:**
```javascript
export default defineNuxtConfig({
  modules: ['nuxt-umami'],

  umami: {
    id: process.env.NUXT_PUBLIC_UMAMI_ID,
    host: process.env.NUXT_PUBLIC_UMAMI_HOST,
    autoTrack: true,
    ignoreLocalhost: true,
    version: 2,
  },
})
```

### Uso Básico

#### Auto-tracking
Umami hace auto-tracking de pageviews automáticamente con `autoTrack: true`.

#### Tracking Manual de Eventos

```vue
<script setup>
const { umTrackEvent } = useUmami()

// Evento simple
const trackClick = () => {
  umTrackEvent('button-click')
}

// Evento con datos
const trackProductView = (product) => {
  umTrackEvent('product-view', {
    product_id: product.id,
    product_name: product.name,
    category: product.category,
    price: product.price
  })
}

// Evento de e-commerce
const trackAddToCart = (product, quantity) => {
  umTrackEvent('add-to-cart', {
    product_id: product.id,
    product_name: product.name,
    quantity,
    value: product.price * quantity
  })
}
</script>
```

### Eventos E-commerce en Umami

```javascript
// composables/useUmamiEcommerce.js
export const useUmamiEcommerce = () => {
  const { umTrackEvent } = useUmami()

  const trackProductView = (product) => {
    umTrackEvent('product_view', {
      id: product.id,
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price
    })
  }

  const trackAddToCart = (product, quantity) => {
    umTrackEvent('add_to_cart', {
      id: product.id,
      name: product.name,
      quantity,
      value: product.price * quantity
    })
  }

  const trackRemoveFromCart = (item) => {
    umTrackEvent('remove_from_cart', {
      id: item.id,
      name: item.name,
      quantity: item.quantity
    })
  }

  const trackBeginCheckout = (cart) => {
    umTrackEvent('begin_checkout', {
      items_count: cart.items.length,
      value: cart.total
    })
  }

  const trackPurchase = (order) => {
    umTrackEvent('purchase', {
      order_id: order.orderNumber,
      value: order.total,
      tax: order.tax,
      shipping: order.shipping,
      items_count: order.items.length
    })
  }

  const trackSearch = (query, resultsCount) => {
    umTrackEvent('search', {
      query,
      results_count: resultsCount
    })
  }

  return {
    trackProductView,
    trackAddToCart,
    trackRemoveFromCart,
    trackBeginCheckout,
    trackPurchase,
    trackSearch
  }
}
```

### Self-Hosting Umami

Para self-host Umami en tu propio servidor:

1. **Con Docker:**
```bash
git clone https://github.com/umami-software/umami.git
cd umami
docker-compose up -d
```

2. **Variables de entorno necesarias:**
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/umami
HASH_SALT=your-random-salt
```

3. **Acceder a:**
```
https://your-domain.com
Usuario: admin
Password: umami
```

### Umami Cloud vs Self-Hosted

| Feature | Cloud | Self-Hosted |
|---------|-------|-------------|
| Costo | $9-20/mes | Gratis (hosting aparte) |
| Setup | Inmediato | Requiere configuración |
| Mantenimiento | Automático | Manual |
| Control | Limitado | Total |
| Datos | En sus servidores | En tu servidor |

---

## Google Analytics 4

### Setup

El proyecto ya tiene configurado `nuxt-gtag` para Google Analytics 4.

**Variables de entorno (.env):**
```env
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

**Configuración en nuxt.config.ts:**
```javascript
export default defineNuxtConfig({
  modules: ['nuxt-gtag'],

  gtag: {
    id: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },
})
```

### Eventos E-commerce

#### View Item List (Lista de Productos)
```vue
<script setup>
const { gtag } = useGtag()

const trackProductList = (products, listName) => {
  gtag('event', 'view_item_list', {
    item_list_id: listName,
    item_list_name: listName,
    items: products.map((product, index) => ({
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      index: index
    }))
  })
}

onMounted(() => {
  trackProductList(products.value, 'Homepage Featured')
})
</script>
```

#### View Item (Detalle de Producto)
```vue
<script setup>
const { gtag } = useGtag()

const trackProductView = (product) => {
  gtag('event', 'view_item', {
    currency: 'EUR',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price
    }]
  })
}

onMounted(() => {
  trackProductView(product.value)
})
</script>
```

#### Add to Cart
```vue
<script setup>
const { gtag } = useGtag()

const addToCart = (product, quantity) => {
  // Añadir al store
  cartStore.addItem(product, quantity)

  // Track evento
  gtag('event', 'add_to_cart', {
    currency: 'EUR',
    value: product.price * quantity,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      quantity: quantity
    }]
  })
}
</script>
```

#### Remove from Cart
```vue
<script setup>
const { gtag } = useGtag()

const removeFromCart = (item) => {
  gtag('event', 'remove_from_cart', {
    currency: 'EUR',
    value: item.price * item.quantity,
    items: [{
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity
    }]
  })

  cartStore.removeItem(item.id)
}
</script>
```

#### Begin Checkout
```vue
<script setup>
const { gtag } = useGtag()

const beginCheckout = () => {
  const items = cartStore.items

  gtag('event', 'begin_checkout', {
    currency: 'EUR',
    value: cartStore.total,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity
    }))
  })

  navigateTo('/checkout')
}
</script>
```

#### Purchase (Conversión)
```vue
<script setup>
const { gtag } = useGtag()

const trackPurchase = (order) => {
  gtag('event', 'purchase', {
    transaction_id: order.orderNumber,
    value: order.total,
    tax: order.tax,
    shipping: order.shippingCost,
    currency: 'EUR',
    items: order.items.map(item => ({
      item_id: item.productId,
      item_name: item.productName,
      price: item.unitPrice,
      quantity: item.quantity
    }))
  })
}

// Llamar después de pago exitoso
onMounted(() => {
  if (route.query.order) {
    fetchOrder(route.query.order).then(order => {
      trackPurchase(order)
    })
  }
})
</script>
```

### Composable Reutilizable

```javascript
// composables/useAnalytics.js
export const useAnalytics = () => {
  const { gtag } = useGtag()

  const trackProductView = (product) => {
    gtag('event', 'view_item', {
      currency: 'EUR',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price
      }]
    })
  }

  const trackAddToCart = (product, quantity) => {
    gtag('event', 'add_to_cart', {
      currency: 'EUR',
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity
      }]
    })
  }

  const trackPurchase = (order) => {
    gtag('event', 'purchase', {
      transaction_id: order.orderNumber,
      value: order.total,
      tax: order.tax,
      shipping: order.shippingCost,
      currency: 'EUR',
      items: order.items.map(item => ({
        item_id: item.productId,
        item_name: item.productName,
        price: item.unitPrice,
        quantity: item.quantity
      }))
    })
  }

  const trackSearch = (searchTerm) => {
    gtag('event', 'search', {
      search_term: searchTerm
    })
  }

  return {
    trackProductView,
    trackAddToCart,
    trackPurchase,
    trackSearch
  }
}
```

**Uso:**
```vue
<script setup>
const { trackAddToCart } = useAnalytics()

const handleAddToCart = () => {
  trackAddToCart(product.value, quantity.value)
  cartStore.addItem(product.value, quantity.value)
}
</script>
```

## Meta Pixel (Facebook/Instagram)

### Setup Manual

```vue
<!-- layouts/default.vue -->
<script setup>
const config = useRuntimeConfig()

onMounted(() => {
  if (config.public.metaPixelId && typeof window !== 'undefined') {
    // Cargar Meta Pixel
    ; (function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

    fbq('init', config.public.metaPixelId)
    fbq('track', 'PageView')
  }
})
</script>

<template>
  <div>
    <!-- ... -->
  </div>
</template>
```

### Eventos de Meta Pixel

#### ViewContent
```javascript
fbq('track', 'ViewContent', {
  content_ids: [product.id],
  content_name: product.name,
  content_category: product.category,
  content_type: 'product',
  value: product.price,
  currency: 'EUR'
})
```

#### AddToCart
```javascript
fbq('track', 'AddToCart', {
  content_ids: [product.id],
  content_name: product.name,
  content_type: 'product',
  value: product.price * quantity,
  currency: 'EUR'
})
```

#### InitiateCheckout
```javascript
fbq('track', 'InitiateCheckout', {
  content_ids: items.map(i => i.id),
  contents: items.map(i => ({
    id: i.id,
    quantity: i.quantity
  })),
  value: cartTotal,
  currency: 'EUR',
  num_items: items.length
})
```

#### Purchase
```javascript
fbq('track', 'Purchase', {
  content_ids: order.items.map(i => i.productId),
  content_type: 'product',
  value: order.total,
  currency: 'EUR'
})
```

### Composable Unificado (Umami + GA4 + Meta Pixel)

```javascript
// composables/useTracking.js
export const useTracking = () => {
  const config = useRuntimeConfig()
  const { gtag } = useGtag()
  const { umTrackEvent } = useUmami()

  const trackEvent = (eventName, data) => {
    // Umami Analytics
    if (umTrackEvent && data.umami) {
      umTrackEvent(eventName, data.umami)
    }

    // Google Analytics
    if (gtag && data.google) {
      gtag('event', eventName, data.google)
    }

    // Meta Pixel
    if (typeof window !== 'undefined' && window.fbq && data.meta) {
      fbq('track', eventName, data.meta)
    }
  }

  const trackProductView = (product) => {
    trackEvent('product_view', {
      umami: {
        id: product.id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price
      },
      google: {
        currency: 'EUR',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price
        }]
      },
      meta: {
        content_ids: [product.id],
        content_name: product.name,
        content_category: product.category,
        content_type: 'product',
        value: product.price,
        currency: 'EUR'
      }
    })
  }

  const trackAddToCart = (product, quantity) => {
    const value = product.price * quantity

    trackEvent('add_to_cart', {
      umami: {
        id: product.id,
        name: product.name,
        quantity,
        value
      },
      google: {
        currency: 'EUR',
        value,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity
        }]
      },
      meta: {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        value,
        currency: 'EUR'
      }
    })
  }

  const trackBeginCheckout = (cart) => {
    trackEvent('begin_checkout', {
      umami: {
        items_count: cart.items.length,
        value: cart.total
      },
      google: {
        currency: 'EUR',
        value: cart.total,
        items: cart.items.map(item => ({
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: item.quantity
        }))
      },
      meta: {
        content_ids: cart.items.map(i => i.id),
        contents: cart.items.map(i => ({
          id: i.id,
          quantity: i.quantity
        })),
        value: cart.total,
        currency: 'EUR',
        num_items: cart.items.length
      }
    })
  }

  const trackPurchase = (order) => {
    trackEvent('purchase', {
      umami: {
        order_id: order.orderNumber,
        value: order.total,
        tax: order.tax,
        shipping: order.shippingCost,
        items_count: order.items.length
      },
      google: {
        transaction_id: order.orderNumber,
        value: order.total,
        tax: order.tax,
        shipping: order.shippingCost,
        currency: 'EUR',
        items: order.items.map(item => ({
          item_id: item.productId,
          item_name: item.productName,
          price: item.unitPrice,
          quantity: item.quantity
        }))
      },
      meta: {
        content_ids: order.items.map(i => i.productId),
        content_type: 'product',
        value: order.total,
        currency: 'EUR'
      }
    })
  }

  const trackSearch = (query, resultsCount) => {
    trackEvent('search', {
      umami: {
        query,
        results_count: resultsCount
      },
      google: {
        search_term: query
      },
      meta: {
        search_string: query
      }
    })
  }

  return {
    trackProductView,
    trackAddToCart,
    trackBeginCheckout,
    trackPurchase,
    trackSearch
  }
}
```

## Dashboards Recomendados

### Umami Dashboard

El dashboard de Umami incluye:

1. **Real-time:**
   - Visitantes en tiempo real
   - Páginas activas
   - Referrers

2. **Metrics:**
   - Page views
   - Unique visitors
   - Bounce rate
   - Average visit duration

3. **Events:**
   - Custom events tracking
   - Event properties y valores
   - Conversion funnels

4. **Filters:**
   - Por país, dispositivo, navegador
   - Por rango de fechas
   - Por UTM parameters

**Panel de ejemplo:**
```
https://analytics.umami.is/share/xxx/codentsa.com
```

### Google Analytics 4

1. **Dashboard Principal:**
   - Usuarios activos
   - Tasa de conversión
   - Ingresos totales
   - Productos más vendidos

2. **E-commerce:**
   - Revenue by product
   - Cart abandonment rate
   - Average order value
   - Purchase funnel

3. **Acquisition:**
   - Traffic sources
   - Campaign performance
   - Social media ROI

### Meta Events Manager

1. **Conversions:**
   - Purchase events
   - Add to cart rate
   - Checkout initiation

2. **Audiences:**
   - Producto viewers
   - Cart abandoners
   - Purchasers

---

## GDPR y Consentimiento

### Con Umami: Sin Banner de Cookies Necesario

**Umami es GDPR compliant por diseño:**
- ✅ No usa cookies de terceros
- ✅ No almacena datos personales
- ✅ No requiere consentimiento explícito
- ✅ Cumple con ePrivacy Directive
- ✅ Solo usa localStorage opcional para sesiones

**Implementación simple:**
```vue
<!-- No se necesita banner para Umami -->
<template>
  <div>
    <!-- Tu contenido -->
  </div>
</template>
```

### Con Google Analytics y Meta Pixel: Banner Requerido

### Cookie Banner

```vue
<script setup>
const cookieConsent = useCookie('cookie-consent', {
  maxAge: 60 * 60 * 24 * 365 // 1 año
})

const showBanner = ref(!cookieConsent.value)

const acceptCookies = () => {
  cookieConsent.value = 'accepted'
  showBanner.value = false

  // Activar tracking
  initializeTracking()
}

const declineCookies = () => {
  cookieConsent.value = 'declined'
  showBanner.value = false
}

const initializeTracking = () => {
  // Solo cargar si el usuario aceptó
  if (cookieConsent.value === 'accepted') {
    // Inicializar GA y Meta Pixel
  }
}

onMounted(() => {
  if (cookieConsent.value === 'accepted') {
    initializeTracking()
  }
})
</script>

<template>
  <div v-if="showBanner" class="fixed bottom-0 left-0 right-0 bg-neutral-900 text-white p-4 z-50">
    <div class="container mx-auto flex items-center justify-between">
      <p class="text-sm">
        Utilizamos cookies para mejorar tu experiencia y analizar el tráfico del sitio.
        <NuxtLink to="/privacy" class="underline">Más información</NuxtLink>
      </p>
      <div class="flex gap-4">
        <Button variant="outline" size="sm" @click="declineCookies">
          Rechazar
        </Button>
        <Button variant="primary" size="sm" @click="acceptCookies">
          Aceptar
        </Button>
      </div>
    </div>
  </div>
</template>
```

## Debugging

### Google Tag Assistant

Instalar extensión: [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)

### Meta Pixel Helper

Instalar extensión: [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)

### Console Logs

```javascript
// Activar en desarrollo
if (process.dev) {
  gtag('config', config.public.googleAnalyticsId, {
    debug_mode: true
  })
}
```

### Umami Debug

Umami registra eventos en la consola cuando `ignoreLocalhost` está activo:

```javascript
// Ver eventos en consola
// Los eventos Umami se ven en Network tab como llamadas a /api/send
```

---

## Estrategia Recomendada

### Opción 1: Solo Umami (Privacy-First)

**Ideal para:**
- Startups enfocadas en privacidad
- Cumplimiento estricto de GDPR
- Simplicidad y bajo costo

**Configuración:**
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-umami'],
  umami: {
    id: process.env.NUXT_PUBLIC_UMAMI_ID,
    host: process.env.NUXT_PUBLIC_UMAMI_HOST,
    autoTrack: true,
    ignoreLocalhost: true,
  }
})
```

### Opción 2: Umami + Google Analytics (Recomendado)

**Ideal para:**
- E-commerce que necesita analytics detallado
- Análisis de funnel de conversión profundo
- Remarketing opcional (con consentimiento)

**Ventajas:**
- Umami para métricas básicas sin cookies
- GA4 solo para usuarios que aceptan cookies
- Doble respaldo de datos
- Flexibilidad en reportes

**Configuración:**
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-umami', 'nuxt-gtag'],
  umami: {
    id: process.env.NUXT_PUBLIC_UMAMI_ID,
    host: process.env.NUXT_PUBLIC_UMAMI_HOST,
    autoTrack: true,
  },
  gtag: {
    id: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    // Solo iniciar si hay consentimiento
    enabled: false, // Activar manualmente después de consentimiento
  }
})
```

### Opción 3: Triple Stack (Máximo Tracking)

**Ideal para:**
- E-commerce maduro con presupuesto de marketing
- Campañas de Facebook/Instagram activas
- Remarketing agresivo

**Incluye:**
- Umami (siempre activo, sin cookies)
- GA4 (con consentimiento)
- Meta Pixel (con consentimiento)

**Uso del composable unificado:**
```vue
<script setup>
const { trackAddToCart } = useTracking()

const addToCart = () => {
  // Envía evento a los 3 sistemas automáticamente
  trackAddToCart(product.value, quantity.value)
  cartStore.addItem(product.value, quantity.value)
}
</script>
```

---

## Comparativa Rápida

| Feature | Umami | Google Analytics | Meta Pixel |
|---------|-------|-----------------|------------|
| **Privacidad** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ |
| **GDPR Compliance** | ✅ Por defecto | ⚠️ Requiere consentimiento | ⚠️ Requiere consentimiento |
| **Cookie Banner** | ❌ No necesario | ✅ Necesario | ✅ Necesario |
| **E-commerce Tracking** | ✅ Custom events | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Funnel Analysis** | ✅ Básico | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Real-time Data** | ✅ | ✅ | ✅ |
| **Remarketing** | ❌ | ✅ | ✅ |
| **Costo** | Gratis/Low | Gratis | Gratis |
| **Setup Complexity** | ⭐ Fácil | ⭐⭐⭐ Medio | ⭐⭐ Medio |
| **Data Ownership** | ✅ Tuyo | ❌ Google | ❌ Meta |

---

## Recomendación para Codentsa

**Configuración Actual:** Umami + Google Analytics (Opcional)

**Por qué:**
1. ✅ Umami tracking sin fricciones (no requiere consentimiento)
2. ✅ Cumplimiento GDPR desde el día 1
3. ✅ Google Analytics disponible para análisis profundo (opt-in)
4. ✅ Flexibilidad para activar Meta Pixel en el futuro
5. ✅ Doble backup de datos críticos

**Next Steps:**
1. Configurar cuenta en [Umami Cloud](https://cloud.umami.is) o self-host
2. Agregar Website ID a `.env`
3. Deploy y verificar tracking en dashboard
4. (Opcional) Implementar cookie banner para GA4
5. (Opcional) Agregar Meta Pixel cuando haya campañas activas

---

**Última actualización**: 2025-01-11
**Módulos**: nuxt-umami@3.2.1, nuxt-gtag@4.1.0
