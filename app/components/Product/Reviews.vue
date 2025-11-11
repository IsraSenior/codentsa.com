<script setup>
import { StarIcon } from '@heroicons/vue/24/solid'

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
  productName: {
    type: String,
    default: 'Producto',
  },
})

const emit = defineEmits(['addReview'])

// Calculate rating distribution
const ratingDistribution = computed(() => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  props.reviews.forEach((review) => {
    distribution[review.rating]++
  })

  return Object.entries(distribution)
    .map(([rating, count]) => ({
      rating: Number(rating),
      count,
      percentage: props.totalReviews > 0 ? (count / props.totalReviews) * 100 : 0,
    }))
    .reverse()
})
</script>

<template>
  <Section class="pt-0!">
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-title text-3xl md:text-4xl text-black font-normal">
        Reviews & Valoraciones
      </h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
      <!-- Left: Rating Summary -->
      <div class="flex items-center justify-center">
        <div class="flex items-start gap-6 w-full max-w-lg">
          <div class="text-center">
            <div class="text-6xl md:text-7xl font-title font-bold text-black mb-2">
              {{ averageRating.toFixed(1) }}
            </div>
            <div class="font-body text-sm text-neutral-600">
              ({{ totalReviews }} reviews)
            </div>
          </div>

          <!-- Rating Bars -->
          <div class="flex-1 space-y-2">
            <div
              v-for="item in ratingDistribution"
              :key="item.rating"
              class="flex items-center gap-3"
            >
              <div class="flex items-center gap-1">
                <span class="font-body text-sm text-black w-4">{{ item.rating }}</span>
                <StarIcon class="w-4 h-4 text-primary" />
              </div>
              <div class="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-black transition-all duration-300"
                  :style="{ width: `${item.percentage}%` }"
                />
              </div>
            </div>

            <button
            class="mt-6 px-6 py-3 bg-black text-white rounded-full font-body text-sm md:text-base hover:bg-neutral-800 transition-colors"
            @click="emit('addReview')"
          >
            Añade tu comentario
          </button>
          </div>
        </div>
      </div>

      <!-- Right: Review Carousel -->
      <div v-if="reviews.length > 0" class="">
        <BaseCarousel :items="reviews" :slides-per-view="1" :autoplay="false" :loop="false">
          <template #default="{ item }">
            <TestimonialsCard
              :product-name="productName"
              :review="item.text"
              :rating="item.rating"
              :author-name="item.name"
              :author-avatar="item.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(item.name)"
              :time-ago="item.date"
            />
          </template>
        </BaseCarousel>
      </div>

      <!-- Empty State -->
      <div v-else class="lg:col-span-2 text-center py-12">
        <p class="font-body text-lg text-neutral-600">
          No hay reviews todavía. ¡Sé el primero en dejar uno!
        </p>
      </div>
    </div>
  </Section>
</template>
