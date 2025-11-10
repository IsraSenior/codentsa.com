<script setup>
import { ArrowUpRightIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  title: {
    type: String,
    default: 'Ahorra comprando<br>en Codentsa',
  },
  description: {
    type: String,
    default: 'Mientras más compres, más ahorras',
  },
  ctaText: {
    type: String,
    default: 'Ver promociones',
  },
  ctaLink: {
    type: String,
    default: '/ofertas',
  },
  bgColor: {
    type: String,
    default: 'bg-secondary-300',
  },
  image: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', { title: props.title, link: props.ctaLink })
}
</script>

<template>
  <div
    class="h-full w-full isolate rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group"
    :class="bgColor"
  >
    <!-- Background Image (if provided) -->
    <div
      v-if="image"
      class="absolute inset-0 z-10"
    >
      <img
        :src="image"
        alt="Pattern"
        class="w-full h-full object-cover group-hover:scale-125 transition-transform duration-300"
      >
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <h3
        class="text-neutral-50 text-xl leading-tight mb-1 font-body"
        v-html="title"
      ></h3>
      <p class="text-neutral-50 text-sm font-body">
        {{ description }}
      </p>
    </div>

    <!-- CTA Button -->
    <NuxtLink
      :to="ctaLink"
      class="bg-neutral-50 text-neutral-900 px-4 py-2 rounded-full text-base font-body flex items-center gap-1 self-end z-10 hover:bg-white transition-colors duration-200"
      @click="handleClick"
    >
      {{ ctaText }}
      <ArrowUpRightIcon class="size-6" />
    </NuxtLink>
  </div>
</template>
