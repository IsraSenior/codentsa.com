<script setup>
import { HeartIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'

const route = useRoute()

// Product data (this would come from an API/CMS in production)
const product = ref({
  id: route.params.id,
  name: 'Sealapex Cemento',
  brand: 'Dentsply Sirona',
  description:
    'Minim ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
  price: 80000,
  originalPrice: null,
  rating: 4.8,
  images: [
    'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
  ],
  category: 'Material preparado',
  material: 'Sillas',
  colors: [
    { value: 'rojo', label: 'Rojo' },
    { value: 'azul', label: 'Azul' },
    { value: 'verde', label: 'Verde' },
    { value: 'blanco', label: 'Blanco' },
  ],
  sizes: [
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
  ],
  materials: [
    { value: 'acero', label: 'Acero inoxidable' },
    { value: 'titanio', label: 'Titanio' },
    { value: 'carburo', label: 'Carburo' },
  ],
  features: [
    {
      icon: 'star',
      title: 'Sistema de movimiento electrico',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et suscipit lorem.',
    },
    {
      icon: 'sun',
      title: 'Motor de corriente continua',
      description:
        'Los motores de corriente continua permiten un control preciso de la velocidad.',
    },
    {
      icon: 'cog',
      title: 'Sistema de control de movimiento',
      description:
        'Los sistemas de control de movimiento permiten un control preciso de los movimientos en maquinas industriales.',
    },
  ],
  technicalSpecs: {
    brand: 'Dentaux',
    specs: [
      'Requisitos electricos: 100 VCA, 115 VCA, 220-240VCA',
      'Frecuencia de red: 50/60 Hz',
      'Presion de entrada de agua: 300-900 kPa (43-130 psi)',
      'Presion de entrada de aire: 550-900 kPa (80-130 psi)',
      'Peso: 150 kg (234 lbs)',
    ],
  },
  reviews: [
    {
      id: 1,
      rating: 5,
      title: 'Excelente producto',
      text: 'Donec ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus...',
      name: 'Mario Ruiz',
      date: 'Hace dos dias',
      avatar: null,
    },
    {
      id: 2,
      rating: 4,
      title: 'Muy buena calidad',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
      name: 'Ana García',
      date: 'Hace una semana',
      avatar: null,
    },
  ],
})

// Similar products data
const similarProducts = ref([
  {
    id: 2,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    description: 'El cemento dental es un material esencial para procedimientos de endodoncia.',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    price: 250,
    originalPrice: 300,
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    description: 'El cemento dental es un material esencial para procedimientos de endodoncia.',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    price: 250,
    originalPrice: 300,
    rating: 4.5,
  },
  {
    id: 4,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    description: 'El cemento dental es un material esencial para procedimientos de endodoncia.',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    price: 250,
    originalPrice: 300,
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    description: 'El cemento dental es un material esencial para procedimientos de endodoncia.',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    price: 250,
    originalPrice: 300,
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    description: 'El cemento dental es un material esencial para procedimientos de endodoncia.',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    price: 250,
    originalPrice: 300,
    rating: 4.5,
  },
])

// Stores
const favoritesStore = useFavoritesStore()
const cartStore = useCartStore()

// State
const quantity = ref(1)
const selectedColor = ref(null)
const selectedSize = ref(null)
const selectedMaterial = ref(null)
const isReviewModalOpen = ref(false)
const showFloatingCart = ref(false)

// Check if product is favorited
const isFavorite = computed(() => {
  return favoritesStore.isFavorite(parseInt(product.value.id))
})

// Refs for scroll detection
const productDetailsRef = ref(null)

// Methods
const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const toggleFavorite = () => {
  favoritesStore.toggleFavorite({
    id: parseInt(product.value.id),
    name: product.value.name,
    brand: product.value.brand,
    image: product.value.images[0],
    description: product.value.description,
    price: product.value.price,
    originalPrice: product.value.originalPrice,
  })
}

const addToCart = () => {
  cartStore.addItem({
    id: parseInt(product.value.id),
    name: product.value.name,
    brand: product.value.brand,
    image: product.value.images[0],
    price: product.value.price,
    originalPrice: product.value.originalPrice,
    quantity: quantity.value,
    selectedColor: selectedColor.value,
    selectedSize: selectedSize.value,
    selectedMaterial: selectedMaterial.value,
  })
}

const downloadTechSheet = () => {
  const fileName = `${product.value.name.replace(/\s/g, '-')}_${new Date().toISOString().split('T')[0]}.pdf`
  console.log('Downloading:', fileName)
  // In production, this would trigger an actual download
}

const scrollToDetails = () => {
  const detailsSection = document.getElementById('technical-details')
  if (detailsSection) {
    detailsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleAddReview = () => {
  isReviewModalOpen.value = true
}

const handleSubmitReview = (reviewData) => {
  console.log('Review submitted:', reviewData)
  // In production, this would send the review to the API
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

// Handle scroll to show/hide floating cart
const handleScroll = () => {
  if (!productDetailsRef.value) return

  const element = productDetailsRef.value.$el || productDetailsRef.value
  const rect = element.getBoundingClientRect()
  const hasScrolledPast = rect.bottom < 0

  // Check if footer is in view
  const footer = document.getElementById('site-footer')
  const footerRect = footer?.getBoundingClientRect()
  const footerInView = footerRect && footerRect.top < window.innerHeight

  // Show floating cart only when scrolled past product details AND footer is not in view
  showFloatingCart.value = hasScrolledPast && !footerInView
}

onMounted(() => {
  // Load favorites and cart from localStorage
  favoritesStore.loadFromLocalStorage()
  cartStore.loadFromLocalStorage()

  window.addEventListener('scroll', handleScroll)
  // Trigger initial check
  nextTick(() => {
    handleScroll()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <!-- Product Details -->
    <div ref="productDetailsRef">
      <Section class="pt-0!">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:items-start">
        <!-- Left: Gallery -->
        <div>
          <ProductGallery :images="product.images" />
        </div>

        <!-- Right: Product Info -->
         <div class="lg:sticky lg:top-28">
            <div>
            <h1 class="font-title text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
                {{ product.name }}
            </h1>
    
            <!-- Rating -->
            <div class="flex items-center gap-2 mb-6">
                <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
                </svg>
                <span class="font-body text-base text-black font-medium">
                {{ product.rating }}
                </span>
            </div>
    
            <!-- Description -->
            <p class="font-body text-base text-neutral-700 mb-6">
                {{ product.description }}
            </p>
    
            <!-- Additional Files -->
            <div class="mb-6">
                <h3 class="font-title text-lg text-black font-normal mb-3">
                Archivos adicionales:
                </h3>
                <div class="space-y-2">
                <button
                    class="font-body text-sm text-primary hover:underline"
                    @click="downloadTechSheet"
                >
                    Descargar ficha tecnica
                </button>
                <br>
                <button
                    class="font-body text-sm text-primary hover:underline"
                    @click="scrollToDetails"
                >
                    Ver toda la informacion del producto
                </button>
                </div>
            </div>

            <!-- Variants Accordion -->
            <div class="mb-6">
                <ProductVariantAccordion
                title="Color"
                :options="product.colors"
                :selected="selectedColor"
                @select="(value) => (selectedColor = value)"
                />
    
                <ProductVariantAccordion
                title="Seleccione la talla"
                :options="product.sizes"
                :selected="selectedSize"
                @select="(value) => (selectedSize = value)"
                />
    
                <ProductVariantAccordion
                title="Seleccione material"
                :options="product.materials"
                :selected="selectedMaterial"
                @select="(value) => (selectedMaterial = value)"
                />
            </div>

            <!-- Price and Quantity Selector -->
            <div class="flex items-center gap-4 mb-6">
                <div class="flex-1">
                <div class="flex items-baseline gap-3">
                    <span class="font-title text-3xl md:text-4xl text-black font-normal">
                    {{ formatPrice(product.price) }}
                    </span>
                    <span
                    v-if="product.originalPrice"
                    class="font-body text-lg text-neutral-500 line-through"
                    >
                    {{ formatPrice(product.originalPrice) }}
                    </span>
                </div>
                </div>
    
                <div class="flex items-center gap-2">
                <button
                    class="w-10 h-10 border border-neutral-300 rounded-lg flex items-center justify-center hover:border-primary transition-colors"
                    @click="decrementQuantity"
                >
                    <span class="text-xl text-black">-</span>
                </button>
                <span class="font-body text-lg text-black font-medium w-12 text-center">
                    {{ quantity }}
                </span>
                <button
                    class="w-10 h-10 border border-neutral-300 rounded-lg flex items-center justify-center hover:border-primary transition-colors"
                    @click="incrementQuantity"
                >
                    <span class="text-xl text-black">+</span>
                </button>
                </div>
            </div>
    
            <!-- Action Buttons -->
            <div class="space-y-3">
                <button
                class="w-full px-6 py-4 bg-black text-white rounded-lg font-body text-base hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                @click="addToCart"
                >
                <ShoppingCartIcon class="w-5 h-5" />
                <span>Anadir al carrito</span>
                </button>
    
                <button
                class="w-full px-6 py-4 border border-neutral-300 rounded-lg font-body text-base hover:border-primary transition-colors flex items-center justify-center gap-2"
                @click="toggleFavorite"
                >
                <HeartIconSolid v-if="isFavorite" class="w-5 h-5 text-primary" />
                <HeartIcon v-else class="w-5 h-5" />
                <span>Anadir a lista de favoritos</span>
                </button>
            </div>
            </div>
         </div>
        </div>
      </Section>
    </div>

    <!-- Features -->
    <Section class="bg-neutral-50">
      <h2 class="font-title text-3xl md:text-4xl text-black font-normal mb-8 text-center">
        Caracteristicas destacadas
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-20">
        <div
          v-for="(feature, index) in product.features"
          :key="index"
          class="text-center"
        >
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg
              v-if="feature.icon === 'star'"
              class="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>

            <svg
              v-else-if="feature.icon === 'sun'"
              class="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>

            <svg
              v-else-if="feature.icon === 'cog'"
              class="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <h3 class="font-title text-lg md:text-xl text-black font-normal mb-2">
            {{ feature.title }}
          </h3>
          <p class="font-body text-sm text-neutral-600">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </Section>

    <!-- Technical Details -->
    <Section id="technical-details">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <!-- Left: Image -->
        <div class="bg-neutral-100 rounded-2xl overflow-hidden aspect-square">
          <img
            :src="product.images[0]"
            alt="Technical details"
            class="w-full h-full object-cover"
          >
        </div>

        <!-- Right: Specs -->
        <div class="flex items-center">
          <div>
            <h2 class="font-title text-3xl md:text-4xl text-black font-normal mb-3">
            Datos tecnicos
          </h2>

          <p class="font-body text-base text-black mb-6">
            Marca: {{ product.technicalSpecs.brand }}
          </p>

          <ul class="space-y-3 mb-8">
            <li
              v-for="(spec, index) in product.technicalSpecs.specs"
              :key="index"
              class="font-body text-base text-neutral-700 flex items-start gap-2"
            >
              <span class="text-primary mt-1">•</span>
              <span>{{ spec }}</span>
            </li>
          </ul>

          <button
            class="px-6 py-3 bg-black text-white rounded-full font-body text-sm md:text-base hover:bg-neutral-800 transition-colors"
          >
            Contactar a soporte
          </button>
          </div>
        </div>
      </div>
    </Section>

    <!-- Reviews -->
    <ProductReviews
      :reviews="product.reviews"
      :average-rating="product.rating"
      :total-reviews="product.reviews.length"
      :product-name="product.name"
      @add-review="handleAddReview"
    />

    <!-- Similar Products -->
    <Section class="bg-neutral-50">
      <div class="mb-8 md:mb-12">
        <h2 class="font-title text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
          Productos similares
        </h2>
        <p class="font-body text-base md:text-lg text-neutral-700 max-w-4xl">
          Aqui va el resumen. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
        </p>
      </div>

      <!-- Products Carousel -->
      <BaseCarousel :items="similarProducts" :slides-per-view="4" :autoplay="false" :loop="false">
        <template #default="{ item }">
          <ProductCard
            :id="item.id"
            :name="item.name"
            :brand="item.brand"
            :description="item.description"
            :image="item.image"
            :price="item.price"
            :original-price="item.originalPrice"
            :rating="item.rating"
          />
        </template>
      </BaseCarousel>

      <!-- View More Button -->
      <!-- <div class="flex justify-center mt-8 md:mt-12">
        <NuxtLink
          to="/productos"
          class="inline-flex items-center gap-3 px-8 py-4 border-2 border-black rounded-full font-body text-base md:text-lg text-black hover:bg-black hover:text-white transition-all duration-300 group"
        >
          <span>Ver mas productos</span>
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div> -->
    </Section>

    <!-- Review Modal -->
    <ProductReviewModal
      :is-open="isReviewModalOpen"
      :product-name="product.name"
      @close="isReviewModalOpen = false"
      @submit="handleSubmitReview"
    />

    <!-- Floating Cart Widget -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-full"
    >
      <ProductFloatingCart
        v-if="showFloatingCart"
        :product-name="product.name"
        :price="product.price"
        :quantity="quantity"
        :selected-color="selectedColor"
        :selected-size="selectedSize"
        :selected-material="selectedMaterial"
        :color-options="product.colors"
        :size-options="product.sizes"
        :material-options="product.materials"
        @increment="incrementQuantity"
        @decrement="decrementQuantity"
        @add-to-cart="addToCart"
        @select-color="(value) => (selectedColor = value)"
        @select-size="(value) => (selectedSize = value)"
        @select-material="(value) => (selectedMaterial = value)"
      />
    </Transition>
  </div>
</template>
