<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    default: null,
  },
  quantity: {
    type: Number,
    required: true,
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
})

const emit = defineEmits(['increment', 'decrement', 'remove'])

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

const totalPrice = computed(() => props.price * props.quantity)
</script>

<template>
  <div class="flex gap-4 md:gap-6 bg-white border border-neutral-200 rounded-lg p-4 md:p-6 relative">
    <!-- Remove Button -->
    <button
      class="absolute top-4 right-4 p-1 text-neutral-600 hover:text-black transition-colors"
      @click="emit('remove')"
    >
      <XMarkIcon class="w-5 h-5" :stroke-width="2" />
    </button>

    <!-- Product Image -->
    <div class="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-neutral-100 rounded-lg overflow-hidden">
      <img
        :src="image"
        :alt="name"
        class="w-full h-full object-cover"
      >
    </div>

    <!-- Product Info -->
    <div class="flex-1 flex flex-col justify-between min-w-0">
      <div>
        <h3 class="font-title text-base md:text-lg text-black font-normal mb-1 pr-8">
          {{ name }}
        </h3>
        <p v-if="brand" class="font-body text-sm text-neutral-600 mb-2">
          {{ brand }}
        </p>

        <!-- Variants (if any) -->
        <div v-if="selectedColor || selectedSize || selectedMaterial" class="flex flex-wrap gap-2 mb-3">
          <span v-if="selectedColor" class="font-body text-xs text-neutral-600 px-2 py-1 bg-neutral-100 rounded">
            Color: {{ selectedColor }}
          </span>
          <span v-if="selectedSize" class="font-body text-xs text-neutral-600 px-2 py-1 bg-neutral-100 rounded">
            Talla: {{ selectedSize }}
          </span>
          <span v-if="selectedMaterial" class="font-body text-xs text-neutral-600 px-2 py-1 bg-neutral-100 rounded">
            Material: {{ selectedMaterial }}
          </span>
        </div>
      </div>

      <!-- Bottom: Quantity and Price -->
      <div class="flex items-center justify-between gap-4">
        <!-- Quantity Selector -->
        <div class="flex items-center gap-2">
          <button
            class="w-8 h-8 md:w-9 md:h-9 border border-neutral-300 rounded-lg flex items-center justify-center hover:border-primary transition-colors"
            @click="emit('decrement')"
          >
            <span class="text-lg text-black">-</span>
          </button>
          <span class="font-body text-sm md:text-base text-black font-medium w-8 text-center">
            {{ quantity }}
          </span>
          <button
            class="w-8 h-8 md:w-9 md:h-9 border border-neutral-300 rounded-lg flex items-center justify-center hover:border-primary transition-colors"
            @click="emit('increment')"
          >
            <span class="text-lg text-black">+</span>
          </button>
        </div>

        <!-- Price -->
        <div class="text-right">
          <div v-if="originalPrice" class="flex items-center gap-2 justify-end">
            <span class="font-body text-sm text-neutral-500 line-through">
              {{ formatPrice(originalPrice * quantity) }}
            </span>
          </div>
          <div class="font-title text-lg md:text-xl text-black font-normal whitespace-nowrap">
            {{ formatPrice(totalPrice) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
