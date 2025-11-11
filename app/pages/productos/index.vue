<script setup>
// Product data (mock data for now)
const products = ref([
  {
    id: 1,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-1',
    image: '/images/products/product-1.png',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 2,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-2',
    image: '/images/products/product-2.png',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 3,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-3',
    image: '/images/products/product-3.png',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 4,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-4',
    image: '/images/products/product-4.png',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 5,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-5',
    image: '/images/products/product-5.png',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 6,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-6',
    image: '/images/products/product-6.png',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 7,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-7',
    image: '/images/products/product-7.png',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 8,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-8',
    image: '/images/products/product-8.png',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 9,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-9',
    image: '/images/products/product-9.png',
    description: 'El cemento dental es un material esencia...',
    originalPrice: 300,
    price: 250,
  },
  {
    id: 10,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    slug: 'sealapex-cemento-10',
    image: '/images/products/product-10.png',
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
const secondRowProducts = computed(() => products.value.slice(4, 6))
// Last 4 products
const thirdRowProducts = computed(() => products.value.slice(6, 10))
</script>

<template>
  <div>
    <Section class="!pt-0">
      <!-- Filters Bar -->
      <ProductFilters
        :total-products="256"
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
  </div>
</template>
