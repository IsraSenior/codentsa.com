<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import 'swiper/css'
import 'swiper/css/pagination'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  slidesPerView: {
    type: Number,
    default: 4,
  },
  spaceBetween: {
    type: Number,
    default: 16,
  },
  autoplay: {
    type: [Boolean, Object],
    default: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  navigation: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Boolean,
    default: false,
  },
})

const modules = [Pagination, Autoplay]

// Configuración de autoplay
const autoplayConfig = computed(() => {
  if (props.autoplay === false) return false
  if (typeof props.autoplay === 'object') return props.autoplay
  return {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }
})

// Configuración responsiva
const breakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  1280: {
    slidesPerView: props.slidesPerView,
    spaceBetween: props.spaceBetween,
  },
}

// Ref para controlar Swiper
const swiperRef = ref(null)
const isBeginning = ref(true)
const isEnd = ref(false)
const isTransitioning = ref(false)

const onSwiper = (swiper) => {
  swiperRef.value = swiper
  updateNavigation(swiper)
}

const onSlideChange = (swiper) => {
  updateNavigation(swiper)
}

const updateNavigation = (swiper) => {
  if (!props.loop) {
    isBeginning.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
  }
}

const prevSlide = () => {
  if (swiperRef.value && !isTransitioning.value) {
    isTransitioning.value = true
    swiperRef.value.slidePrev()
    setTimeout(() => {
      isTransitioning.value = false
    }, 300)
  }
}

const nextSlide = () => {
  if (swiperRef.value && !isTransitioning.value) {
    isTransitioning.value = true
    swiperRef.value.slideNext()
    setTimeout(() => {
      isTransitioning.value = false
    }, 300)
  }
}
</script>

<template>
  <div class="base-carousel">
    <Swiper
      :modules="modules"
      :slides-per-view="slidesPerView"
      :space-between="spaceBetween"
      :pagination="pagination ? { clickable: true } : false"
      :autoplay="autoplayConfig"
      :loop="loop"
      :breakpoints="breakpoints"
      :class="pagination ? 'pb-12!' : 'pb-0!'"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide v-for="(item, index) in items" :key="index" class="!h-auto">
        <div class="h-full">
          <!-- Slot para contenido customizado -->
          <slot :item="item" :index="index"></slot>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- Custom Navigation Buttons -->
    <div v-if="navigation" class="flex justify-center lg:justify-start gap-6 mt-6">
      <button
        class="bg-neutral-200 p-2 rounded-full hover:bg-neutral-300 hover:scale-110 transition-all duration-200"
        :class="{ 'opacity-50 cursor-not-allowed': isTransitioning || (!loop && isBeginning) }"
        :disabled="isTransitioning || (!loop && isBeginning)"
        @click="prevSlide"
      >
        <ChevronLeftIcon class="w-6 h-6 text-black" />
      </button>
      <button
        class="bg-neutral-200 p-2 rounded-full hover:bg-neutral-300 hover:scale-110 transition-all duration-200"
        :class="{ 'opacity-50 cursor-not-allowed': isTransitioning || (!loop && isEnd) }"
        :disabled="isTransitioning || (!loop && isEnd)"
        @click="nextSlide"
      >
        <ChevronRightIcon class="w-6 h-6 text-black" />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Asegurar que todos los slides tengan la misma altura */
.base-carousel :deep(.swiper-wrapper) {
  align-items: stretch;
}

.base-carousel :deep(.swiper-slide) {
  height: auto;
  display: flex;
}

.base-carousel :deep(.swiper-slide > div) {
  display: flex;
  flex: 1;
}

/* Estilos para la paginación */
.base-carousel :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: rgb(var(--color-neutral-400));
  opacity: 1;
}

.base-carousel :deep(.swiper-pagination-bullet-active) {
  background: rgb(var(--color-primary-500));
  width: 24px;
  border-radius: 5px;
}
</style>
