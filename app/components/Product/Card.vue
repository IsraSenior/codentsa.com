<script setup>
import { HeartIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    default: null,
  },
  price: {
    type: Number,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggleFavorite', 'click'])

// Estado local para favorito
const isFav = ref(props.isFavorite)

const handleFavoriteClick = (e) => {
  e.stopPropagation()
  isFav.value = !isFav.value
  emit('toggleFavorite', isFav.value)
}

const handleCardClick = () => {
  emit('click', { title: props.title, price: props.price })
}

// Computed para el descuento
const discountPercentage = computed(() => {
  if (!props.originalPrice) return null
  return Math.round(((props.originalPrice - props.price) / props.originalPrice) * 100)
})
</script>

<template>
  <div
    class="h-full bg-neutral-100 hover:bg-neutral-200 rounded-2xl p-4 flex flex-col gap-3 cursor-pointer hover:shadow shadow-neutral-600/15 transition-all duration-200 relative isolate group"
    @click="handleCardClick"
  >
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-black text-2xl leading-tight">{{ title }}</h3>
        <p class="text-neutral-700 text-sm">{{ brand }}</p>
      </div>
      <button
        class="w-8 h-8 transition-colors z-20"
        :class="isFav ? 'text-primary' : 'text-neutral-500 hover:text-primary'"
        @click="handleFavoriteClick"
      >
        <HeartIcon
          class="size-6 hover:fill-primary"
          :stroke-width="2"
          :fill="isFav ? 'currentColor' : 'none'"
        />
      </button>
    </div>
    <div class="aspect-square w-full">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      >
    </div>
    <hr class="border-neutral-700">
    <div class="flex justify-between items-end">
      <p class="text-black text-sm leading-tight w-2/3 line-clamp-2">
        {{ description }}
      </p>
      <div class="text-right">
        <p
          class="text-neutral-500 line-through text-base h-4"
        >
          <span v-if="originalPrice">${{ originalPrice }}</span>
        </p>
        <p class="text-black text-xl leading-9">${{ price }}</p>
      </div>
    </div>

    <NuxtLink to="/productos/test-product" class="absolute inset-0"></NuxtLink>
  </div>
</template>
