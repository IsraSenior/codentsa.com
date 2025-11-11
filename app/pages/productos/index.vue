<script setup>
// Read category from URL query parameter
const route = useRoute()
const initialCategory = computed(() => route.query.categoria || null)

// Product data (mock data for now)
const products = ref([
  {
    id: 1,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-1',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 2,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-2',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 3,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-3',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 4,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-4',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 5,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-5',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 6,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-6',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 7,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-7',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 8,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-8',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 9,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-9',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 10,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-10',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 10,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-10',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
])

// Pagination
const currentPage = ref(1)
const totalPages = ref(7)

// Filters
const handleFilterChange = (filters) => {
  console.log('Filters changed:', filters)
  // Implement filter logic here
  // filters.categories, filters.priceRanges, filters.material, filters.brands
}

const handleSortChange = (sortValue) => {
  console.log('Sort changed to:', sortValue)
  // Implement sorting logic here
}

const handlePageChange = (page) => {
  currentPage.value = page
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Split products for the special layout
// First 4 products
const firstRowProducts = computed(() => products.value.slice(0, 4))
// Next 2 products (larger cards)
const secondRowProducts = computed(() => products.value.slice(4, 7))
// Last 4 products
const thirdRowProducts = computed(() => products.value.slice(7, 11))
</script>

<template>
  <div>
    <Section class="!pt-0">
      <!-- Filters Bar -->
      <ProductFilters
        :total-products="256"
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
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </Section>

    <!-- Offer Popup -->
    <OfferPopup />
  </div>
</template>
