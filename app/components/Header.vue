<script setup>
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

// Route for detecting home page
const route = useRoute()
const isHomePage = computed(() => route.path === '/')

// Search mega menu state
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInputRef = ref(null)

// Navigation links
const navigationLinks = [
  { name: 'Quienes somos', path: '/quienes-somos' },
  { name: 'Soporte técnico', path: '/soporte-tecnico' },
  { name: 'Cambios y devoluciones', path: '/cambios-devoluciones' },
]

// Categories data
const categories = [
  { id: 1, name: 'Categoría 1', slug: 'categoria-1' },
  { id: 2, name: 'Categoría 2', slug: 'categoria-2' },
  { id: 3, name: 'Categoría 3', slug: 'categoria-3' },
  { id: 4, name: 'Categoría 4', slug: 'categoria-4' },
  { id: 5, name: 'Categoría 5', slug: 'categoria-5' },
]

// Sample products data (in real app, this would come from API)
const suggestedProducts = [
  {
    id: 1,
    title: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia....',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 2,
    title: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/54e7bf55-073d-4469-9d7b-2d33c843c33a',
    description: 'El cemento dental es un material esencia....',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 3,
    title: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia....',
    originalPrice: 300,
    price: 250,
  },
]

// Filtered products based on search query (by name)
const filteredProducts = computed(() => {
  if (!searchQuery.value) return suggestedProducts

  const query = searchQuery.value.toLowerCase()
  return suggestedProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  )
})

const openSearch = () => {
  isSearchOpen.value = true
  nextTick(() => {
    searchInputRef.value?.focus()
  })
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
}
</script>

<template>
  <header class="w-full relative">
    <!-- Main Header -->
    <div class="bg-neutral-50 relative z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between gap-4">
          <!-- Logo -->
          <NuxtLink to="/" class="shrink-0">
            <Logo color="text-primary" />
          </NuxtLink>

          <!-- Normal State: Navigation Links -->
          <nav v-if="!isSearchOpen" class="hidden md:flex items-center gap-6 flex-1 justify-center">
            <NuxtLink
              v-for="link in navigationLinks"
              :key="link.path"
              :to="link.path"
              class="font-body font-normal text-base text-neutral-900 hover:text-neutral-700 transition-all duration-200 underline-offset-4 hover:underline cursor-pointer"
            >
              {{ link.name }}
            </NuxtLink>
          </nav>

          <!-- Search Open State: Search Input -->
          <div v-if="isSearchOpen" class="flex-1 flex items-center gap-4 mx-8">
            <div class="relative flex-1">
              <MagnifyingGlassIcon class="w-5 h-5 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" :stroke-width="2" />
              <input
                ref="searchInputRef"
                v-model="searchQuery"
                type="text"
                placeholder="Buscar"
                class="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
              >
            </div>
          </div>

          <!-- Action Icons -->
          <div class="flex items-center gap-2 shrink-0">
            <!-- Search Icon (normal state) or Close button (search open) -->
            <button
              v-if="!isSearchOpen"
              class="p-2 text-black hover:text-neutral-700 transition-colors"
              @click="openSearch"
            >
              <MagnifyingGlassIcon class="w-6 h-6" :stroke-width="2" />
            </button>
            <button
              v-else
              class="p-2 text-black hover:text-neutral-700 transition-colors"
              @click="closeSearch"
            >
              <XMarkIcon class="w-6 h-6" :stroke-width="2" />
            </button>

            <!-- Desktop Only Icons -->
            <NuxtLink
              to="/favoritos"
              class="hidden md:block p-2 text-black hover:text-neutral-700 transition-colors"
            >
              <HeartIcon class="w-6 h-6" :stroke-width="2" />
            </NuxtLink>
            <NuxtLink
              to="/carrito"
              class="hidden md:block p-2 text-black hover:text-neutral-700 transition-colors"
            >
              <ShoppingCartIcon class="w-6 h-6" :stroke-width="2" />
            </NuxtLink>
            <NuxtLink to="/cuenta" class="hidden md:block shrink-0">
              <img
                src="https://avatar.iran.liara.run/public/1"
                alt="Usuario"
                class="w-10 h-10 rounded-full border-2 border-primary"
              >
            </NuxtLink>

            <!-- Mobile: Menu Icon -->
            <button
              v-if="!isSearchOpen"
              class="md:hidden p-2 text-black hover:text-neutral-700 transition-colors"
              @click="() => {}"
            >
              <Bars3Icon class="w-6 h-6" :stroke-width="2" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Mega Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isSearchOpen" class="absolute top-full left-0 right-0 bg-neutral-50 shadow-2xl z-40 border-t border-neutral-200">
        <div class="container mx-auto px-4 py-8">
          <div class="flex gap-8">
            <!-- Categories Sidebar -->
            <aside class="w-64 shrink-0">
              <h3 class="text-black text-lg font-title font-medium mb-4">
                Categorías principales
              </h3>
              <nav class="flex flex-col gap-2">
                <NuxtLink
                  v-for="category in categories"
                  :key="category.id"
                  :to="`/categoria/${category.slug}`"
                  class="text-neutral-700 hover:text-primary text-base font-body py-2 transition-colors"
                  @click="closeSearch"
                >
                  {{ category.name }}
                </NuxtLink>
              </nav>
            </aside>

            <!-- Products Grid -->
            <div class="flex-1">
              <!-- Products Found -->
              <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProductCard
                  v-for="product in filteredProducts"
                  :key="product.id"
                  :title="product.title"
                  :brand="product.brand"
                  :image="product.image"
                  :description="product.description"
                  :original-price="product.originalPrice"
                  :price="product.price"
                  @click="closeSearch"
                />
              </div>

              <!-- No Results - Show Skeletons -->
              <div v-else>
                <p class="text-neutral-500 text-lg font-body mb-6 text-center">
                  No se encontraron productos
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ProductSkeleton v-for="i in 3" :key="`skeleton-${i}`" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isSearchOpen"
        class="fixed inset-0 bg-black/20 z-30"
        @click="closeSearch"
      />
    </Transition>

    <!-- Announcement Bar (Desktop Only, Home Page Only) -->
    <div v-if="!isSearchOpen && isHomePage" class="hidden md:block">
      <AnnouncementBar />
    </div>
  </header>
</template>
