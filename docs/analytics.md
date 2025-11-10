# Analytics y Tracking

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

### Composable Unificado

```javascript
// composables/useTracking.js
export const useTracking = () => {
  const config = useRuntimeConfig()
  const { gtag } = useGtag()

  const trackEvent = (eventName, data) => {
    // Google Analytics
    if (gtag) {
      gtag('event', eventName, data.google)
    }

    // Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      fbq('track', eventName, data.meta)
    }
  }

  const trackProductView = (product) => {
    trackEvent('ViewContent', {
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

    trackEvent('AddToCart', {
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

  const trackPurchase = (order) => {
    trackEvent('Purchase', {
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

  return {
    trackProductView,
    trackAddToCart,
    trackPurchase
  }
}
```

## Dashboards Recomendados

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

## GDPR y Consentimiento

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
