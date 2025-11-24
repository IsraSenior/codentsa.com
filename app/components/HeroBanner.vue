<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

// Props for slideshow configuration
const props = defineProps({
  slides: {
    type: Array,
    default: () => [
      {
        title: 'Compra instrumental del más alto nivel',
        description: 'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        image: 'https://www.figma.com/api/mcp/asset/3cffc140-7433-4a19-8179-b3f15c8123a7',
        bgColor: 'bg-primary',
        ctaText: 'Comprar ahora',
        ctaLink: '/productos',
      },
      {
        title: 'Calidad garantizada en cada instrumento',
        description: 'Nuestro catálogo incluye instrumental quirúrgico certificado y de las mejores marcas internacionales para garantizar resultados óptimos.',
        image: 'https://www.figma.com/api/mcp/asset/3cffc140-7433-4a19-8179-b3f15c8123a7',
        bgColor: 'bg-secondary',
        ctaText: 'Ver catálogo',
        ctaLink: '/productos',
      },
      {
        title: 'Envío rápido en 24 horas',
        description: 'Recibe tu pedido al día siguiente. Contamos con stock permanente y servicio de envío express para toda España.',
        image: 'https://www.figma.com/api/mcp/asset/3cffc140-7433-4a19-8179-b3f15c8123a7',
        bgColor: 'bg-primary-700',
        ctaText: 'Más información',
        ctaLink: '/soporte-tecnico',
      },
    ],
  },
})

// Slideshow state
const currentSlide = ref(0)
const isTransitioning = ref(false)

const nextSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentSlide.value = (currentSlide.value + 1) % props.slides.length
  setTimeout(() => {
    isTransitioning.value = false
  }, 800)
}

const prevSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentSlide.value = currentSlide.value === 0 ? props.slides.length - 1 : currentSlide.value - 1
  setTimeout(() => {
    isTransitioning.value = false
  }, 800)
}

const currentSlideData = computed(() => props.slides[currentSlide.value])
</script>

<template>
  <section class="relative h-[400px] md:h-[500px] lg:h-[670px] overflow-hidden rounded-b-2xl flex items-center">
    <!-- Background Color with smooth transition -->
    <Transition name="fade" mode="out-in">
      <div
        :key="currentSlide"
        class="absolute inset-0 transition-colors duration-700"
        :class="currentSlideData.bgColor"
      />
    </Transition>

    <!-- Background Image -->
    <div class="absolute inset-0">
      <Transition name="fade-slow" mode="out-in">
        <img
          :key="currentSlide"
          :src="currentSlideData.image"
          alt="Background"
          class="w-full h-full object-cover mix-blend-multiply opacity-50"
        >
      </Transition>
    </div>

    <!-- Content with fade animation -->
    <div class="relative z-10 container px-5 lg:px-0 mx-auto">
      <div class="relative min-h-[300px]">
        <Transition name="content-fade">
          <div
            :key="`content-${currentSlide}`"
            class="absolute inset-0 flex flex-col gap-8 items-start"
          >
            <div class="flex flex-col gap-2 text-white max-w-3xl text-center lg:text-left">
              <h1 class="font-title text-3xl md:text-5xl lg:text-7xl leading-none font-normal">
                {{ currentSlideData.title }}
              </h1>
              <p class="text-sm md:text-base leading-6 font-body font-normal">
                {{ currentSlideData.description }}
              </p>
            </div>
            <Button
              variant="solid"
              color="dark"
              size="md"
              :to="currentSlideData.ctaLink"
              class="md:h-[50px]! md:px-8! md:py-4! md:text-lg! w-full lg:w-auto"
            >
              {{ currentSlideData.ctaText }}
            </Button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Navigation -->
    <div class="left-1/2 md:left-24 transform -translate-x-1/2 md:translate-x-0  absolute bottom-6 md:bottom-10 flex gap-3 md:gap-6 z-10">
      <button
        class="bg-neutral-200 p-2 rounded-lg hover:bg-neutral-300 hover:scale-110 transition-all duration-200"
        :class="{ 'opacity-50 cursor-not-allowed': isTransitioning }"
        :disabled="isTransitioning"
        @click="prevSlide"
      >
        <ChevronLeftIcon class="w-5 h-5 md:w-6 md:h-6 text-black" />
      </button>
      <button
        class="bg-neutral-200 p-2 rounded-lg hover:bg-neutral-300 hover:scale-110 transition-all duration-200"
        :class="{ 'opacity-50 cursor-not-allowed': isTransitioning }"
        :disabled="isTransitioning"
        @click="nextSlide"
      >
        <ChevronRightIcon class="w-5 h-5 md:w-6 md:h-6 text-black" />
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Fade transition for background color */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slow fade for background image */
.fade-slow-enter-active {
  transition: opacity 0.8s ease;
}

.fade-slow-leave-active {
  transition: opacity 0.6s ease;
}

.fade-slow-enter-from,
.fade-slow-leave-to {
  opacity: 0;
}

/* Fade only for content (no translation) - with absolute positioning */
.content-fade-enter-active {
  transition: opacity 0.6s ease-out;
}

.content-fade-leave-active {
  transition: opacity 0.6s ease-in;
  position: absolute;
}

.content-fade-enter-from {
  opacity: 0;
}

.content-fade-leave-to {
  opacity: 0;
}
</style>
