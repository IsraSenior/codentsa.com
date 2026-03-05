<script setup>
import { FunnelIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  totalProducts: {
    type: Number,
    default: 0,
  },
  initialCategory: {
    type: String,
    default: null,
  },
  initialFilters: {
    type: Object,
    default: () => ({
      categories: [],
      priceRanges: [],
      material: null,
      brands: [],
    }),
  },
  initialSort: {
    type: String,
    default: 'relevance',
  },
})

const emit = defineEmits(['filterChange', 'sortChange'])

// Sort options
const sortOptions = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'name-asc', label: 'Nombre: A-Z' },
  { value: 'name-desc', label: 'Nombre: Z-A' },
]

// Filter data
const categories = [
  { id: 'exploracion', label: 'Exploración' },
  { id: 'restauracion', label: 'Restauración' },
  { id: 'cirugia', label: 'Cirugía' },
  { id: 'ortodoncia', label: 'Ortodoncia' },
  { id: 'higiene', label: 'Higiene & Profilaxis' },
  { id: 'accesorios', label: 'Accesorios y bandejas' },
]

const priceRanges = [
  { id: 'price-0-10', label: 'Hasta 10€' },
  { id: 'price-10-50', label: '10€ - 50€' },
  { id: 'price-50-100', label: '50€ - 100€' },
  { id: 'price-100-500', label: '100€ - 500€' },
  { id: 'price-500', label: '500€ o más' },
]

const materials = [
  { id: 'acero', label: 'Acero inoxidable' },
  { id: 'titanio', label: 'Titanio' },
  { id: 'autoclave', label: 'Autoclave' },
  { id: 'carburo', label: 'Carburo, diamante' },
]

const brands = [
  { id: 'dentsply', label: 'Dentsply Sirona' },
  { id: 'align', label: 'Align Technology' },
  { id: '3m', label: '3M Oral Care' },
  { id: 'straumann', label: 'Straumann Group' },
  { id: 'envista', label: 'Envista Holdings' },
]

// State
const selectedSort = ref(props.initialSort)
const isSortOpen = ref(false)
const isFilterOpen = ref(false)
const selectedCategories = ref([])
const selectedPriceRanges = ref([])
const selectedMaterial = ref(null)
const selectedBrands = ref([])

// Refs for click outside
const sortDropdownRef = ref(null)
const filterPanelRef = ref(null)

// Click outside handler and initialize filters from URL
onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  // Apply initial filters if provided
  if (props.initialFilters) {
    selectedCategories.value = props.initialFilters.categories || []
    selectedPriceRanges.value = props.initialFilters.priceRanges || []
    selectedMaterial.value = props.initialFilters.material || null
    selectedBrands.value = props.initialFilters.brands || []

    // Only emit if there are active filters
    if (selectedCategories.value.length > 0 ||
        selectedPriceRanges.value.length > 0 ||
        selectedMaterial.value ||
        selectedBrands.value.length > 0) {
      emitFilterChange()
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  // Close sort dropdown if click outside
  if (sortDropdownRef.value && !sortDropdownRef.value.contains(event.target)) {
    isSortOpen.value = false
  }

  // Close filter panel if click outside
  if (filterPanelRef.value && !filterPanelRef.value.contains(event.target)) {
    isFilterOpen.value = false
  }
}

// Computed
const activeFilterCount = computed(() => {
  return selectedCategories.value.length +
    selectedPriceRanges.value.length +
    (selectedMaterial.value ? 1 : 0) +
    selectedBrands.value.length
})

const selectedSortLabel = computed(() => {
  const option = sortOptions.find(opt => opt.value === selectedSort.value)
  return option ? option.label : 'Relevancia'
})

const activeFilterChips = computed(() => {
  const chips = []

  selectedCategories.value.forEach(id => {
    const cat = categories.find(c => c.id === id)
    if (cat) chips.push({ id: `cat-${id}`, label: cat.label, type: 'category' })
  })

  selectedPriceRanges.value.forEach(id => {
    const price = priceRanges.find(p => p.id === id)
    if (price) chips.push({ id: `price-${id}`, label: price.label, type: 'price' })
  })

  if (selectedMaterial.value) {
    const mat = materials.find(m => m.id === selectedMaterial.value)
    if (mat) chips.push({ id: `mat-${selectedMaterial.value}`, label: mat.label, type: 'material' })
  }

  selectedBrands.value.forEach(id => {
    const brand = brands.find(b => b.id === id)
    if (brand) chips.push({ id: `brand-${id}`, label: brand.label, type: 'brand' })
  })

  return chips
})

// Methods
const handleSortChange = (value) => {
  selectedSort.value = value
  isSortOpen.value = false
  emit('sortChange', value)
}

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value
}

const handleCategoryChange = (id) => {
  const index = selectedCategories.value.indexOf(id)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(id)
  }
  emitFilterChange()
}

const handlePriceChange = (id) => {
  const index = selectedPriceRanges.value.indexOf(id)
  if (index > -1) {
    selectedPriceRanges.value.splice(index, 1)
  } else {
    selectedPriceRanges.value.push(id)
  }
  emitFilterChange()
}

const handleMaterialChange = (id) => {
  selectedMaterial.value = selectedMaterial.value === id ? null : id
  emitFilterChange()
}

const handleBrandChange = (id) => {
  const index = selectedBrands.value.indexOf(id)
  if (index > -1) {
    selectedBrands.value.splice(index, 1)
  } else {
    selectedBrands.value.push(id)
  }
  emitFilterChange()
}

const removeChip = (chip) => {
  switch (chip.type) {
    case 'category':
      selectedCategories.value = selectedCategories.value.filter(id => `cat-${id}` !== chip.id)
      break
    case 'price':
      selectedPriceRanges.value = selectedPriceRanges.value.filter(id => `price-${id}` !== chip.id)
      break
    case 'material':
      selectedMaterial.value = null
      break
    case 'brand':
      selectedBrands.value = selectedBrands.value.filter(id => `brand-${id}` !== chip.id)
      break
  }
  emitFilterChange()
}

const clearAllFilters = () => {
  selectedCategories.value = []
  selectedPriceRanges.value = []
  selectedMaterial.value = null
  selectedBrands.value = []
  selectedSort.value = 'relevance'
  emitFilterChange()
  emit('sortChange', 'relevance')
}

const emitFilterChange = () => {
  emit('filterChange', {
    categories: selectedCategories.value,
    priceRanges: selectedPriceRanges.value,
    material: selectedMaterial.value,
    brands: selectedBrands.value,
  })
}
</script>

<template>
  <div ref="filterPanelRef" class="mb-8">
    <!-- Top Bar: Filter button, Product Count, Sort Dropdown -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
      <!-- Left: Filters Button -->
      <div class="flex items-center gap-3">
        <button
          class="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg font-body text-base text-black hover:border-primary transition-colors"
          @click="toggleFilter"
        >
          <FunnelIcon class="w-5 h-5" />
          <span>{{ activeFilterCount }} Filtros</span>
        </button>

        <button
          v-if="activeFilterCount > 0"
          class="font-body text-sm text-neutral-600 hover:text-primary underline underline-offset-4 transition-colors"
          @click="clearAllFilters"
        >
          Borrar filtros
        </button>
      </div>

      <!-- Center: Products Count -->
      <div class="font-body text-base text-neutral-600 text-center">
        {{ totalProducts }} productos encontrados
      </div>

      <!-- Right: Sort Dropdown -->
      <div ref="sortDropdownRef" class="relative">
        <button
          class="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg font-body text-base text-black hover:border-primary transition-colors min-w-[200px] justify-between"
          @click="isSortOpen = !isSortOpen"
        >
          <span>{{ selectedSortLabel }}</span>
          <ChevronDownIcon
            class="w-5 h-5 transition-transform duration-200"
            :class="isSortOpen ? 'rotate-180' : ''"
          />
        </button>

        <!-- Sort Dropdown Menu -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-2"
        >
          <div
            v-if="isSortOpen"
            class="absolute right-0 mt-2 w-full min-w-[250px] bg-white border border-neutral-200 rounded-lg shadow-lg z-10 overflow-hidden"
          >
            <button
              v-for="option in sortOptions"
              :key="option.value"
              class="w-full px-4 py-3 text-left font-body text-base hover:bg-neutral-50 transition-colors"
              :class="selectedSort === option.value ? 'bg-neutral-100 text-primary' : 'text-black'"
              @click="handleSortChange(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Active Filter Chips -->
    <div v-if="activeFilterChips.length > 0" class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="chip in activeFilterChips"
        :key="chip.id"
        class="flex items-center gap-2 px-3 py-1.5 bg-neutral-600 text-white rounded-lg font-body text-sm hover:bg-neutral-700 transition-colors"
        @click="removeChip(chip)"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 9.293l4.146-4.147a.5.5 0 01.708.708L10.707 10l4.147 4.146a.5.5 0 01-.708.708L10 10.707l-4.146 4.147a.5.5 0 01-.708-.708L9.293 10 5.146 5.854a.5.5 0 01.708-.708L10 9.293z" />
        </svg>
        <span>{{ chip.label }}</span>
      </button>
    </div>

    <!-- Filter Panel -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isFilterOpen"
        class="bg-white border border-neutral-200 rounded-lg shadow-lg p-6 md:p-8"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Category Filter -->
          <div>
            <h3 class="font-title text-lg md:text-xl text-black font-normal mb-4">
              Categoría de producto
            </h3>
            <div class="space-y-3">
              <label
                v-for="category in categories"
                :key="category.id"
                class="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  :checked="selectedCategories.includes(category.id)"
                  class="w-4 h-4 border-2 border-neutral-400 rounded focus:ring-0 focus:outline-none accent-black cursor-pointer"
                  @change="handleCategoryChange(category.id)"
                >
                <span class="font-body text-sm md:text-base text-black group-hover:text-primary transition-colors">
                  {{ category.label }}
                </span>
              </label>
            </div>
          </div>

          <!-- Price Range Filter -->
          <div>
            <h3 class="font-title text-lg md:text-xl text-black font-normal mb-4">
              Rango de precios
            </h3>
            <div class="space-y-3">
              <label
                v-for="range in priceRanges"
                :key="range.id"
                class="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  :checked="selectedPriceRanges.includes(range.id)"
                  class="w-4 h-4 border-2 border-neutral-400 rounded focus:ring-0 focus:outline-none accent-black cursor-pointer"
                  @change="handlePriceChange(range.id)"
                >
                <span class="font-body text-sm md:text-base text-black group-hover:text-primary transition-colors">
                  {{ range.label }}
                </span>
              </label>
            </div>
          </div>

          <!-- Material Filter -->
          <div>
            <h3 class="font-title text-lg md:text-xl text-black font-normal mb-4">
              Material
            </h3>
            <div class="space-y-3">
              <label
                v-for="material in materials"
                :key="material.id"
                class="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="material"
                  :checked="selectedMaterial === material.id"
                  class="w-4 h-4 border-2 border-neutral-400 focus:ring-0 focus:outline-none accent-black cursor-pointer"
                  @change="handleMaterialChange(material.id)"
                >
                <span class="font-body text-sm md:text-base text-black group-hover:text-primary transition-colors">
                  {{ material.label }}
                </span>
              </label>
            </div>
          </div>

          <!-- Brands Filter -->
          <div>
            <h3 class="font-title text-lg md:text-xl text-black font-normal mb-4">
              Marcas
            </h3>
            <div class="space-y-3">
              <label
                v-for="brand in brands"
                :key="brand.id"
                class="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  :checked="selectedBrands.includes(brand.id)"
                  class="w-4 h-4 border-2 border-neutral-400 rounded focus:ring-0 focus:outline-none accent-black cursor-pointer"
                  @change="handleBrandChange(brand.id)"
                >
                <span class="font-body text-sm md:text-base text-black group-hover:text-primary transition-colors">
                  {{ brand.label }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
