<script setup>
import { HeartIcon } from '@heroicons/vue/24/outline'

// Meta tags
useHead({
  title: 'Favoritos - Codentsa',
  meta: [
    {
      name: 'description',
      content: 'Tus productos favoritos de instrumental odontológico',
    },
  ],
})

// Favorites store
const favoritesStore = useFavoritesStore()

// Load favorites on mount
onMounted(() => {
  favoritesStore.loadFromLocalStorage()
})
</script>

<template>
  <div>
    <Section class="!pt-0">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8 md:mb-12">
        <h1 class="font-title text-3xl md:text-4xl lg:text-5xl text-black font-normal">
          Mis favoritos
        </h1>
        <div v-if="!favoritesStore.isEmpty" class="font-body text-base md:text-lg text-neutral-600">
          {{ favoritesStore.totalFavorites }} {{ favoritesStore.totalFavorites === 1 ? 'producto' : 'productos' }}
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="favoritesStore.isEmpty" class="text-center py-16 md:py-24">
        <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-neutral-100 rounded-full">
          <HeartIcon class="w-12 h-12 text-black" :stroke-width="1.5" />
        </div>
        <h2 class="font-title text-2xl md:text-3xl text-black font-normal mb-4">
          No tienes favoritos aún
        </h2>
        <p class="font-body text-base md:text-lg text-neutral-600 mb-8 max-w-md mx-auto">
          Comienza a agregar productos a tu lista de favoritos para encontrarlos más fácilmente después.
        </p>
        <NuxtLink
          to="/productos"
          class="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-lg font-body text-base hover:bg-neutral-800 transition-colors"
        >
          <span>Explorar productos</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <ProductCard
          v-for="product in favoritesStore.items"
          :key="product.id"
          :title="product.name"
          :brand="product.brand"
          :image="product.image"
          :description="product.description"
          :original-price="product.originalPrice"
          :price="product.price"
        />
      </div>
    </Section>
  </div>
</template>
