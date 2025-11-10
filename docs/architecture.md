# Arquitectura del Proyecto

## Visión General

Codentsa está construido como una aplicación Nuxt 4 moderna con arquitectura modular, separación de responsabilidades y énfasis en la reutilización de código.

## Estructura de Directorios

```
/codentsa.com/
├── app/                          # Aplicación principal
│   ├── app.vue                   # Componente raíz
│   ├── assets/                   # Assets estáticos procesados
│   │   ├── css/
│   │   │   └── main.css          # Estilos globales + Tailwind
│   │   └── fonts/                # Fuentes personalizadas
│   │       └── blauer-nue/
│   ├── components/               # Componentes Vue reutilizables
│   │   ├── ui/                   # Componentes UI base
│   │   ├── product/              # Componentes de productos
│   │   ├── cart/                 # Componentes del carrito
│   │   └── layout/               # Componentes de layout
│   ├── composables/              # Composables de Vue
│   │   ├── useCart.js
│   │   ├── useProduct.js
│   │   └── useAuth.js
│   ├── layouts/                  # Layouts de página
│   │   ├── default.vue
│   │   └── checkout.vue
│   ├── pages/                    # Páginas (file-based routing)
│   │   ├── index.vue
│   │   ├── products/
│   │   ├── cart.vue
│   │   └── checkout/
│   ├── stores/                   # Pinia stores
│   │   ├── index.js              # Store principal
│   │   ├── navigation.js
│   │   ├── cart.js
│   │   └── user.js
│   ├── utils/                    # Utilidades y helpers
│   │   ├── format.js
│   │   ├── validation.js
│   │   └── constants.js
│   └── middleware/               # Middleware de Nuxt
│       ├── auth.js
│       └── analytics.js
├── docs/                         # Documentación
├── public/                       # Assets estáticos (no procesados)
│   ├── favicon.ico
│   └── robots.txt
├── server/                       # Server routes (API)
│   ├── api/
│   └── middleware/
└── [config files]
```

## Patrones Arquitectónicos

### 1. Composables (Lógica Reutilizable)

Los composables encapsulan lógica reutilizable siguiendo el patrón de Composition API.

**Ejemplo: useCart.js**
```javascript
export const useCart = () => {
  const cartStore = useCartStore()

  const addToCart = (product, quantity = 1) => {
    cartStore.addItem(product, quantity)
  }

  const removeFromCart = (productId) => {
    cartStore.removeItem(productId)
  }

  const totalItems = computed(() => cartStore.items.length)
  const totalPrice = computed(() => cartStore.total)

  return {
    addToCart,
    removeFromCart,
    totalItems,
    totalPrice,
  }
}
```

**Uso en componente:**
```vue
<script setup>
const { addToCart, totalItems } = useCart()
</script>
```

### 2. Pinia Stores (Estado Global)

Organización por contexto funcional:

#### stores/index.js - Store Principal
```javascript
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    products: [],
    categories: [],
    loading: false,
  }),

  getters: {
    featuredProducts: (state) => state.products.filter(p => p.featured),
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        // Fetch from API
      } finally {
        this.loading = false
      }
    },
  },
})
```

#### stores/navigation.js - Navegación
```javascript
export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    mobileMenuOpen: false,
    searchOpen: false,
  }),

  actions: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeAllMenus() {
      this.mobileMenuOpen = false
      this.searchOpen = false
    },
  },
})
```

#### stores/cart.js - Carrito
```javascript
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    total: (state) => {
      return state.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity)
      }, 0)
    },
    itemCount: (state) => state.items.length,
  },

  actions: {
    addItem(product, quantity) {
      const existingItem = this.items.find(i => i.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ ...product, quantity })
      }
    },
    removeItem(productId) {
      this.items = this.items.filter(i => i.id !== productId)
    },
    clearCart() {
      this.items = []
    },
  },

  persist: true, // Persistir en localStorage
})
```

#### stores/user.js - Usuario
```javascript
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    setUser(userData) {
      this.user = userData
      this.isAuthenticated = true
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
    },
  },
})
```

### 3. Componentes UI Base

Filosofía: **Atomic Design simplificado**

#### Nivel 1: Componentes Atómicos
Elementos básicos no divisibles:
- `Button.vue`
- `Input.vue`
- `Badge.vue`
- `Icon.vue`

#### Nivel 2: Componentes Moleculares
Combinación de átomos:
- `SearchBar.vue` (Input + Button + Icon)
- `ProductCard.vue` (Image + Title + Price + Button)
- `FormField.vue` (Label + Input + Error)

#### Nivel 3: Componentes Organizacionales
Secciones completas:
- `ProductGrid.vue`
- `CheckoutForm.vue`
- `Navigation.vue`

### 4. Layouts

Layouts reutilizables para diferentes tipos de páginas:

**layouts/default.vue**
```vue
<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
```

**layouts/checkout.vue**
```vue
<template>
  <div class="min-h-screen bg-neutral-50">
    <HeaderMinimal />
    <main class="container mx-auto py-8">
      <slot />
    </main>
  </div>
</template>
```

### 5. File-based Routing

Nuxt genera rutas automáticamente desde `/pages`:

```
pages/
├── index.vue                     → /
├── products/
│   ├── index.vue                 → /products
│   ├── [slug].vue                → /products/:slug
│   └── category/
│       └── [category].vue        → /products/category/:category
├── cart.vue                      → /cart
├── checkout/
│   ├── index.vue                 → /checkout
│   ├── shipping.vue              → /checkout/shipping
│   └── payment.vue               → /checkout/payment
└── account/
    ├── index.vue                 → /account
    ├── orders.vue                → /account/orders
    └── settings.vue              → /account/settings
```

### 6. Server Routes (API)

API endpoints en `/server/api`:

```javascript
// server/api/products/[id].get.js
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const config = useRuntimeConfig()

  // Fetch from Directus
  const product = await $fetch(
    `${config.directus.url}/items/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${config.directus.token}`
      }
    }
  )

  return product
})
```

## Auto-imports

Nuxt 4 importa automáticamente:

### Componentes
```vue
<!-- No necesitas import -->
<template>
  <Button>Click me</Button>
  <ProductCard :product="product" />
</template>
```

### Composables
```vue
<script setup>
// Auto-importado de composables/useCart.js
const { addToCart } = useCart()

// Auto-importado de stores/cart.js
const cartStore = useCartStore()
</script>
```

### Utilidades de Vue y Nuxt
```javascript
// Todas auto-importadas
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { data } = await useFetch('/api/products')
const count = ref(0)
const double = computed(() => count.value * 2)
```

## Data Fetching

### useFetch (SSR-friendly)
```vue
<script setup>
const { data: products, pending, error } = await useFetch('/api/products')
</script>
```

### useAsyncData (Más control)
```vue
<script setup>
const { data: product } = await useAsyncData(
  'product-detail',
  () => $fetch(`/api/products/${route.params.id}`)
)
</script>
```

### $fetch (Client-side)
```vue
<script setup>
const searchProducts = async (query) => {
  const results = await $fetch('/api/products/search', {
    params: { q: query }
  })
  return results
}
</script>
```

## Middleware

### Route Middleware
```javascript
// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

  if (!userStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
```

**Uso en página:**
```vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

## Mejores Prácticas

### 1. Naming Conventions
- **Componentes**: PascalCase (`ProductCard.vue`)
- **Composables**: camelCase con prefijo use (`useCart.js`)
- **Stores**: camelCase con sufijo Store (`cartStore`)
- **Utilidades**: camelCase (`formatPrice.js`)

### 2. Estructura de Componentes
```vue
<script setup>
// 1. Imports (si es necesario override auto-import)
// 2. Props
const props = defineProps({
  product: Object
})

// 3. Emits
const emit = defineEmits(['add-to-cart'])

// 4. Composables y stores
const { addToCart } = useCart()

// 5. State local
const quantity = ref(1)

// 6. Computed
const totalPrice = computed(() => props.product.price * quantity.value)

// 7. Methods
const handleAddToCart = () => {
  addToCart(props.product, quantity.value)
  emit('add-to-cart')
}

// 8. Lifecycle hooks
onMounted(() => {
  // ...
})
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Solo si necesitas estilos específicos */
</style>
```

### 3. Gestión de Estado
- **Local**: `ref()`, `reactive()` para estado del componente
- **Compartido**: Composables para lógica compartida
- **Global**: Pinia stores para estado de la aplicación

### 4. Performance
- Lazy loading de componentes pesados
- `<ClientOnly>` para componentes client-only
- Prefetch de rutas críticas
- Optimización de imágenes con `<NuxtImg>`

## Integraciones

### Directus CMS
```javascript
// utils/directus.js
import { createDirectus, rest } from '@directus/sdk'

const directus = createDirectus(useRuntimeConfig().directus.url)
  .with(rest())

export { directus }
```

### Redsys
```javascript
// utils/redsys.js
export const generateRedsysForm = (orderData) => {
  const config = useRuntimeConfig()
  // Lógica de integración Redsys
}
```

## Testing (Futuro)

```
tests/
├── unit/
│   ├── components/
│   └── composables/
└── e2e/
    └── checkout.spec.js
```
