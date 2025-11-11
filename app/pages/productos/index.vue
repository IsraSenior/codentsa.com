<script setup>
// Read category from URL query parameter
const route = useRoute()
const initialCategory = computed(() => route.query.categoria || null)

// Products store
const productsStore = useProductsStore()

// State
const currentPage = ref(1)
const itemsPerPage = 12 // 4 + 3 + 4 + pagination
const currentFilters = ref({
  categories: [],
  priceRanges: [],
  material: null,
  brands: [],
})
const currentSort = ref('relevance')

// Get all products from store
const allProducts = computed(() => productsStore.allProducts)

// Apply filters
const filteredProducts = computed(() => {
  let filtered = [...allProducts.value]

  // Filter by categories (if any selected)
  if (currentFilters.value.categories.length > 0) {
    filtered = filtered.filter(product =>
      currentFilters.value.categories.includes(product.category)
    )
  }

  // Filter by price ranges
  if (currentFilters.value.priceRanges.length > 0) {
    filtered = filtered.filter(product => {
      const price = product.price
      return currentFilters.value.priceRanges.some(range => {
        if (range === 'price-0-10') return price <= 10
        if (range === 'price-10-50') return price > 10 && price <= 50
        if (range === 'price-50-100') return price > 50 && price <= 100
        if (range === 'price-100-500') return price > 100 && price <= 500
        if (range === 'price-500') return price > 500
        return false
      })
    })
  }

  // Filter by brands
  if (currentFilters.value.brands.length > 0) {
    filtered = filtered.filter(product =>
      currentFilters.value.brands.some(brandId =>
        product.brand.toLowerCase().includes(brandId.toLowerCase())
      )
    )
  }

  return filtered
})

// Apply sorting
const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]

  switch (currentSort.value) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    default: // relevance
      return sorted
  }
})

// Pagination
const totalPages = computed(() => Math.ceil(sortedProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedProducts.value.slice(start, end)
})

// Split products for the special layout
const firstRowProducts = computed(() => paginatedProducts.value.slice(0, 4))
const secondRowProducts = computed(() => paginatedProducts.value.slice(4, 7))
const thirdRowProducts = computed(() => paginatedProducts.value.slice(7, 11))

// Handlers
const handleFilterChange = (filters) => {
  currentFilters.value = filters
  currentPage.value = 1 // Reset to first page when filters change
}

const handleSortChange = (sortValue) => {
  currentSort.value = sortValue
  currentPage.value = 1 // Reset to first page when sort changes
}

const handlePageChange = (page) => {
  currentPage.value = page
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <Section class="!pt-0">
      <!-- Filters Bar -->
      <ProductFilters
        :total-products="filteredProducts.length"
        :initial-category="initialCategory"
        @filter-change="handleFilterChange"
        @sort-change="handleSortChange"
      />

      <!-- Products Grid with Special Layout -->
      <div class="space-y-6">
        <!-- First Row: 4 Products -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard
            v-for="product in firstRowProducts"
            :key="product.id"
            :title="product.name"
            :brand="product.brand"
            :image="product.image"
            :description="product.description"
            :original-price="product.originalPrice"
            :price="product.price"
          />
        </div>

        <!-- Second Row: 2 Larger Products -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <ProductCard
            v-for="product in secondRowProducts"
            :key="product.id"
            :title="product.name"
            :brand="product.brand"
            :image="product.image"
            :description="product.description"
            :original-price="product.originalPrice"
            :price="product.price"
          />
        </div>

        <!-- CTA Banner -->
        <ProductCTA />

        <!-- Third Row: 4 Products -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard
            v-for="product in thirdRowProducts"
            :key="product.id"
            :title="product.name"
            :brand="product.brand"
            :image="product.image"
            :description="product.description"
            :original-price="product.originalPrice"
            :price="product.price"
          />
        </div>
      </div>

      <!-- Pagination -->
      <Pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </Section>

    <!-- Offer Popup -->
    <OfferPopup />
  </div>
</template>
