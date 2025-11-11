<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'John Doe',
  },
  role: {
    type: String,
    default: 'Especialista',
  },
  image: {
    type: String,
    default: 'https://avatar.iran.liara.run/public/1',
  },
})
</script>

<template>
  <div class="flex flex-col gap-4 group cursor-pointer">
    <!-- Image -->
    <div class="relative overflow-hidden rounded-3xl aspect-square bg-neutral-100">
      <img
        :src="image"
        :alt="name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      >
    </div>

    <!-- Info -->
    <div class="text-center space-y-1">
      <h3 class="font-title text-xl md:text-2xl text-black font-normal">
        {{ name }}
      </h3>
      <p class="font-body text-sm md:text-base text-neutral-700">
        {{ role }}
      </p>
    </div>
  </div>
</template>