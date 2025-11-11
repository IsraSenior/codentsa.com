<script setup>
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'

// Meta tags
useHead({
  title: 'Carrito de compra - Codentsa',
  meta: [
    {
      name: 'description',
      content: 'Revisa y completa tu pedido de instrumental odontológico',
    },
  ],
})

// State
const isLoading = ref(false)

// Cart items (in production this would come from Pinia store)
const cartItems = ref([
  {
    id: 1,
    name: 'Sealapex Cemento Sellador Radicular',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    price: 250,
    originalPrice: 300,
    quantity: 1,
    selectedColor: null,
    selectedSize: null,
    selectedMaterial: null,
  },
  {
    id: 2,
    name: 'Sealapex Cemento Sellador Radicular',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    price: 250,
    originalPrice: 300,
    quantity: 1,
    selectedColor: null,
    selectedSize: null,
    selectedMaterial: null,
  },
  {
    id: 3,
    name: 'Sealapex Cemento Sellador Radicular',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    price: 250,
    originalPrice: 300,
    quantity: 1,
    selectedColor: null,
    selectedSize: null,
    selectedMaterial: null,
  },
])

// Computed
const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const shipping = computed(() => 15)
const tax = computed(() => subtotal.value * 0.021) // 2.1% IVA en España

const isEmpty = computed(() => cartItems.value.length === 0)

// Methods
const incrementQuantity = (id) => {
  const item = cartItems.value.find((item) => item.id === id)
  if (item) {
    item.quantity++
  }
}

const decrementQuantity = (id) => {
  const item = cartItems.value.find((item) => item.id === id)
  if (item && item.quantity > 1) {
    item.quantity--
  }
}

const removeItem = (id) => {
  const index = cartItems.value.findIndex((item) => item.id === id)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const router = useRouter()

const handleCheckout = () => {
  if (!isEmpty.value) {
    router.push('/checkout')
  }
}

const handleApplyPromo = (code) => {
  console.log('Applying promo code:', code)
  // In production, validate and apply promo code
}
</script>

<template>
  <div>
    <Section class="!pt-0">
      <!-- Back Link -->
      <!-- <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 font-body text-base text-primary hover:underline mb-6"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Volver a la tienda</span>
      </NuxtLink> -->

      <!-- Header -->
      <div class="flex items-center justify-between mb-8 md:mb-12">
        <h1 class="font-title text-3xl md:text-4xl lg:text-5xl text-black font-normal">
          Carrito de compra
        </h1>
        <div v-if="!isEmpty" class="font-body text-base md:text-lg text-neutral-600">
          {{ totalItems }} {{ totalItems === 1 ? 'Item' : 'Items' }}
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
        <div class="space-y-4">
          <CartItemSkeleton v-for="i in 3" :key="i" />
        </div>
        <div class="h-96 bg-neutral-100 rounded-lg animate-pulse" />
      </div>

      <!-- Empty State -->
      <div v-else-if="isEmpty" class="text-center py-16 md:py-24">
        <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-neutral-100 rounded-full">
          <ShoppingCartIcon class="w-12 h-12 text-black" :stroke-width="1.5" />
        </div>
        <h2 class="font-title text-2xl md:text-3xl text-black font-normal mb-4">
          Tu carrito está vacío
        </h2>
        <p class="font-body text-base md:text-lg text-neutral-600 mb-8 max-w-md mx-auto">
          Parece que aún no has agregado ningún producto a tu carrito. Explora nuestro catálogo y encuentra el instrumental odontológico que necesitas.
        </p>
        <NuxtLink
          to="/productos"
          class="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-body text-base hover:bg-neutral-800 transition-colors"
        >
          <span>Ver productos</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
        <!-- Left: Cart Items -->
        <div class="space-y-4">
          <CartItem
            v-for="item in cartItems"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            :brand="item.brand"
            :image="item.image"
            :price="item.price"
            :original-price="item.originalPrice"
            :quantity="item.quantity"
            :selected-color="item.selectedColor"
            :selected-size="item.selectedSize"
            :selected-material="item.selectedMaterial"
            @increment="incrementQuantity(item.id)"
            @decrement="decrementQuantity(item.id)"
            @remove="removeItem(item.id)"
          />
        </div>

        <!-- Right: Summary -->
        <div>
          <CartSummary
            :subtotal="subtotal"
            :shipping="shipping"
            :tax="tax"
            @checkout="handleCheckout"
            @apply-promo="handleApplyPromo"
          />
        </div>

        <!-- Subtotal at Bottom (Mobile) -->
        <div class="lg:hidden border-t border-neutral-200 pt-6">
          <div class="flex items-center justify-between font-title text-xl text-black mb-4">
            <span>Subtotal ({{ totalItems }} {{ totalItems === 1 ? 'producto' : 'productos' }}):</span>
            <span>{{ new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(subtotal) }}</span>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>
