<script setup>
import { ShoppingCartIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  selectedColor: {
    type: String,
    default: null,
  },
  selectedSize: {
    type: String,
    default: null,
  },
  selectedMaterial: {
    type: String,
    default: null,
  },
  colorOptions: {
    type: Array,
    default: () => [],
  },
  sizeOptions: {
    type: Array,
    default: () => [],
  },
  materialOptions: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['increment', 'decrement', 'addToCart', 'selectColor', 'selectSize', 'selectMaterial'])

// Dropdown states
const isColorOpen = ref(false)
const isSizeOpen = ref(false)
const isMaterialOpen = ref(false)

// Refs for dropdowns
const colorDropdownRef = ref(null)
const sizeDropdownRef = ref(null)
const materialDropdownRef = ref(null)

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

const totalPrice = computed(() => props.price * props.quantity)

const getOptionLabel = (options, value) => {
  const option = options.find(opt => opt.value === value)
  return option ? option.label : null
}

// Computed labels for selected values
const selectedColorLabel = computed(() =>
  props.selectedColor ? getOptionLabel(props.colorOptions, props.selectedColor) : 'Color'
)
const selectedSizeLabel = computed(() =>
  props.selectedSize ? getOptionLabel(props.sizeOptions, props.selectedSize) : 'Talla'
)
const selectedMaterialLabel = computed(() =>
  props.selectedMaterial ? getOptionLabel(props.materialOptions, props.selectedMaterial) : 'Material'
)

// Click outside handler
const handleClickOutside = (event) => {
  if (colorDropdownRef.value && !colorDropdownRef.value.contains(event.target)) {
    isColorOpen.value = false
  }
  if (sizeDropdownRef.value && !sizeDropdownRef.value.contains(event.target)) {
    isSizeOpen.value = false
  }
  if (materialDropdownRef.value && !materialDropdownRef.value.contains(event.target)) {
    isMaterialOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Selection handlers
const selectColor = (value) => {
  emit('selectColor', value)
  isColorOpen.value = false
}

const selectSize = (value) => {
  emit('selectSize', value)
  isSizeOpen.value = false
}

const selectMaterial = (value) => {
  emit('selectMaterial', value)
  isMaterialOpen.value = false
}
</script>

<template>
  <div class="fixed bottom-0 inset-x-0 z-[45] bg-white border-t border-neutral-200 shadow-2xl">
    <div class="container mx-auto px-4 py-3 md:py-4">
      <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 md:gap-4 items-center">
        <!-- Left: Product Info & Variants -->
        <div class="flex-1 min-w-0">
          <h3 class="font-title text-base md:text-lg text-black font-normal truncate mb-2">
            {{ productName }}
          </h3>

          <!-- Variant Selectors (compact) -->
          <div class="flex flex-wrap gap-2">
            <!-- Color Selector -->
            <div v-if="colorOptions.length > 0" ref="colorDropdownRef" class="relative">
              <button
                class="flex items-center gap-2 px-3 py-1.5 text-sm border border-neutral-300 rounded-lg font-body hover:border-primary transition-colors bg-white"
                :class="selectedColor ? 'text-black' : 'text-neutral-600'"
                @click="isColorOpen = !isColorOpen"
              >
                <span>{{ selectedColorLabel }}</span>
                <ChevronDownIcon
                  class="w-4 h-4 transition-transform duration-200"
                  :class="isColorOpen ? 'rotate-180' : ''"
                />
              </button>

              <!-- Dropdown Menu -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 -translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-2"
              >
                <div
                  v-if="isColorOpen"
                  class="absolute bottom-full left-0 mb-2 w-full min-w-[140px] bg-white border border-neutral-200 rounded-lg shadow-lg z-10 overflow-hidden max-h-[200px] overflow-y-auto"
                >
                  <button
                    v-for="option in colorOptions"
                    :key="option.value"
                    class="w-full px-3 py-2 text-left font-body text-sm hover:bg-neutral-50 transition-colors"
                    :class="selectedColor === option.value ? 'bg-neutral-100 text-primary' : 'text-black'"
                    @click="selectColor(option.value)"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Size Selector -->
            <div v-if="sizeOptions.length > 0" ref="sizeDropdownRef" class="relative">
              <button
                class="flex items-center gap-2 px-3 py-1.5 text-sm border border-neutral-300 rounded-lg font-body hover:border-primary transition-colors bg-white"
                :class="selectedSize ? 'text-black' : 'text-neutral-600'"
                @click="isSizeOpen = !isSizeOpen"
              >
                <span>{{ selectedSizeLabel }}</span>
                <ChevronDownIcon
                  class="w-4 h-4 transition-transform duration-200"
                  :class="isSizeOpen ? 'rotate-180' : ''"
                />
              </button>

              <!-- Dropdown Menu -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 -translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-2"
              >
                <div
                  v-if="isSizeOpen"
                  class="absolute bottom-full left-0 mb-2 w-full min-w-[120px] bg-white border border-neutral-200 rounded-lg shadow-lg z-10 overflow-hidden max-h-[200px] overflow-y-auto"
                >
                  <button
                    v-for="option in sizeOptions"
                    :key="option.value"
                    class="w-full px-3 py-2 text-left font-body text-sm hover:bg-neutral-50 transition-colors"
                    :class="selectedSize === option.value ? 'bg-neutral-100 text-primary' : 'text-black'"
                    @click="selectSize(option.value)"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Material Selector -->
            <div v-if="materialOptions.length > 0" ref="materialDropdownRef" class="relative">
              <button
                class="flex items-center gap-2 px-3 py-1.5 text-sm border border-neutral-300 rounded-lg font-body hover:border-primary transition-colors bg-white"
                :class="selectedMaterial ? 'text-black' : 'text-neutral-600'"
                @click="isMaterialOpen = !isMaterialOpen"
              >
                <span>{{ selectedMaterialLabel }}</span>
                <ChevronDownIcon
                  class="w-4 h-4 transition-transform duration-200"
                  :class="isMaterialOpen ? 'rotate-180' : ''"
                />
              </button>

              <!-- Dropdown Menu -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 -translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-2"
              >
                <div
                  v-if="isMaterialOpen"
                  class="absolute bottom-full left-0 mb-2 w-full min-w-[160px] bg-white border border-neutral-200 rounded-lg shadow-lg z-10 overflow-hidden max-h-[200px] overflow-y-auto"
                >
                  <button
                    v-for="option in materialOptions"
                    :key="option.value"
                    class="w-full px-3 py-2 text-left font-body text-sm hover:bg-neutral-50 transition-colors"
                    :class="selectedMaterial === option.value ? 'bg-neutral-100 text-primary' : 'text-black'"
                    @click="selectMaterial(option.value)"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Center: Quantity & Price -->
        <div class="flex items-center gap-3 md:gap-4 justify-between md:justify-start">
          <!-- Quantity Selector -->
          <div class="flex items-center gap-2">
            <button
              class="w-8 h-8 md:w-9 md:h-9 border border-neutral-300 rounded-lg flex items-center justify-center hover:border-primary transition-colors"
              @click="emit('decrement')"
            >
              <span class="text-lg text-black">-</span>
            </button>
            <span class="font-body text-sm md:text-base text-black font-medium w-6 md:w-8 text-center">
              {{ quantity }}
            </span>
            <button
              class="w-8 h-8 md:w-9 md:h-9 border border-neutral-300 rounded-lg flex items-center justify-center hover:border-primary transition-colors"
              @click="emit('increment')"
            >
              <span class="text-lg text-black">+</span>
            </button>
          </div>

          <!-- Total Price -->
          <div class="text-right">
            <div class="font-body text-xs text-neutral-600 mb-0.5">
              Total
            </div>
            <div class="font-title text-xl md:text-2xl text-black font-normal whitespace-nowrap">
              {{ formatPrice(totalPrice) }}
            </div>
          </div>
        </div>

        <!-- Right: Add to Cart Button -->
        <button
          class="w-full md:w-auto px-6 py-2.5 md:py-3 bg-black text-white rounded-full font-body text-sm md:text-base hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          @click="emit('addToCart')"
        >
          <ShoppingCartIcon class="w-5 h-5" />
          <span>Añadir al carrito</span>
        </button>
      </div>
    </div>
  </div>
</template>
