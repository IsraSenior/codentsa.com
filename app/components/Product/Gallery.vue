<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const currentIndex = ref(0)

const currentImage = computed(() => props.images[currentIndex.value])

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

const selectImage = (index) => {
  currentIndex.value = index
}
</script>

<template>
  <div class="flex flex-col h-full space-y-4">
    <!-- Main Image -->
    <div class="relative flex-1 bg-neutral-100 rounded-2xl overflow-hidden group">
      <img
        :src="currentImage"
        :alt="`Product image ${currentIndex + 1}`"
        class="w-full h-full object-cover"
      >

      <!-- Navigation Arrows -->
      <button
        class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        @click="prevImage"
      >
        <ChevronLeftIcon class="w-6 h-6 text-black" />
      </button>

      <button
        class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        @click="nextImage"
      >
        <ChevronRightIcon class="w-6 h-6 text-black" />
      </button>
    </div>

    <!-- Thumbnail Navigation -->
    <div class="grid grid-cols-4 gap-3 flex-shrink-0">
      <button
        v-for="(image, index) in images"
        :key="index"
        class="aspect-square bg-neutral-100 rounded-lg overflow-hidden border-2 transition-all"
        :class="currentIndex === index ? 'border-primary' : 'border-transparent hover:border-neutral-300'"
        @click="selectImage(index)"
      >
        <img
          :src="image"
          :alt="`Thumbnail ${index + 1}`"
          class="w-full h-full object-cover"
        >
      </button>
    </div>
  </div>
</template>
