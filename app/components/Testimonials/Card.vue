<script setup>
import { StarIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  productName: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    validator: (value) => value >= 1 && value <= 5,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorAvatar: {
    type: String,
    required: true,
  },
  timeAgo: {
    type: String,
    required: true,
  },
})

// Generar array de estrellas basado en el rating
const stars = computed(() => Array.from({ length: 5 }, (_, i) => i < props.rating))
</script>

<template>
  <div class="h-full bg-neutral-100 rounded-2xl p-8 flex flex-col gap-6">
    <!-- Product Name -->
    <h4 class="text-neutral-500 text-base font-body">{{ productName }}</h4>

    <!-- Review Text -->
    <p class="text-black text-base leading-relaxed font-body line-clamp-4">
      {{ review }}
    </p>

    <!-- Rating -->
    <div class="flex items-center gap-3">
      <div class="flex gap-1">
        <StarIcon
          v-for="(filled, index) in stars"
          :key="index"
          class="w-6 h-6"
          :class="filled ? 'text-primary' : 'text-neutral-300'"
        />
      </div>
      <span class="text-black text-2xl font-body font-medium">{{ rating }}</span>
    </div>

    <!-- Divider -->
    <hr class="border-neutral-300">

    <!-- Author Info -->
    <div class="flex items-center gap-4">
      <img
        :src="authorAvatar"
        :alt="authorName"
        class="w-16 h-16 rounded-full object-cover"
      >
      <div class="flex flex-col">
        <p class="text-black text-lg font-body font-medium">{{ authorName }}</p>
        <p class="text-neutral-500 text-sm font-body">{{ timeAgo }}</p>
      </div>
    </div>
  </div>
</template>
