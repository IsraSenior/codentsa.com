<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  reviews: {
    type: Array,
    default: () => [],
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['addReview'])

const currentReviewIndex = ref(0)

const currentReview = computed(() => props.reviews[currentReviewIndex.value])

const nextReview = () => {
  currentReviewIndex.value = (currentReviewIndex.value + 1) % props.reviews.length
}

const prevReview = () => {
  currentReviewIndex.value =
    (currentReviewIndex.value - 1 + props.reviews.length) % props.reviews.length
}

// Calculate rating distribution
const ratingDistribution = computed(() => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  props.reviews.forEach((review) => {
    distribution[review.rating]++
  })

  return Object.entries(distribution).map(([rating, count]) => ({
    rating: Number(rating),
    count,
    percentage: props.totalReviews > 0 ? (count / props.totalReviews) * 100 : 0,
  }))
})
</script>

<template>
  <div class="py-12 md:py-16">
    <Section>
      <div class="flex items-center justify-between mb-8">
        <h2 class="font-title text-3xl md:text-4xl text-black font-normal">
          Reviews & Valoraciones
        </h2>
        <button
          class="px-6 py-3 bg-black text-white rounded-full font-body text-sm md:text-base hover:bg-neutral-800 transition-colors"
          @click="emit('addReview')"
        >
          Añade tu comentario
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <!-- Left: Rating Summary -->
        <div class="lg:col-span-1">
          <div class="text-center lg:text-left">
            <div class="text-6xl md:text-7xl font-title font-bold text-black mb-2">
              {{ averageRating.toFixed(1) }}
            </div>
            <div class="font-body text-sm text-neutral-600 mb-6">
              ({{ totalReviews }} reviews)
            </div>

            <!-- Rating Bars -->
            <div class="space-y-2">
              <div
                v-for="item in ratingDistribution.reverse()"
                :key="item.rating"
                class="flex items-center gap-3"
              >
                <span class="font-body text-sm text-black w-4">{{ item.rating }}</span>
                <div class="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-primary transition-all duration-300"
                    :style="{ width: `${item.percentage}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Review Carousel -->
        <div v-if="reviews.length > 0" class="lg:col-span-2">
          <div class="relative bg-neutral-50 rounded-2xl p-6 md:p-8">
            <!-- Rating Stars -->
            <div class="flex items-center gap-1 mb-4">
              <svg
                v-for="star in 5"
                :key="star"
                class="w-5 h-5"
                :class="star <= currentReview.rating ? 'text-primary' : 'text-neutral-300'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span class="ml-2 font-body text-sm text-neutral-600">{{ currentReview.rating }}</span>
            </div>

            <!-- Review Title -->
            <h3 class="font-title text-xl md:text-2xl text-black font-normal mb-3">
              {{ currentReview.title }}
            </h3>

            <!-- Review Text -->
            <p class="font-body text-base text-neutral-700 mb-6 line-clamp-4">
              {{ currentReview.text }}
            </p>

            <!-- Reviewer Info -->
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-full bg-neutral-300 flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="currentReview.avatar"
                  :src="currentReview.avatar"
                  :alt="currentReview.name"
                  class="w-full h-full object-cover"
                >
                <span v-else class="font-body text-lg font-semibold text-white">
                  {{ currentReview.name.charAt(0) }}
                </span>
              </div>
              <div>
                <div class="font-body text-base font-medium text-black">
                  {{ currentReview.name }}
                </div>
                <div class="font-body text-sm text-neutral-600">
                  {{ currentReview.date }}
                </div>
              </div>
            </div>

            <!-- Navigation Arrows -->
            <div class="flex items-center gap-2 mt-6">
              <button
                class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="reviews.length <= 1"
                @click="prevReview"
              >
                <ChevronLeftIcon class="w-5 h-5 text-black" />
              </button>

              <button
                class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="reviews.length <= 1"
                @click="nextReview"
              >
                <ChevronRightIcon class="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="lg:col-span-2 text-center py-12">
          <p class="font-body text-lg text-neutral-600">
            No hay reviews todavía. ¡Sé el primero en dejar uno!
          </p>
        </div>
      </div>
    </Section>
  </div>
</template>
