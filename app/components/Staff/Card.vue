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
    <div class="relative overflow-hidden rounded-3xl aspect-3/4 bg-neutral-100">
      <!-- Background overlay on hover -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <img
          src="/bg/staff-bg.webp"
          alt="Background"
          class="w-full h-full object-cover"
        >
      </div>

      <!-- Staff photo -->
      <img
        :src="image"
        :alt="name"
        class="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 relative z-20"
      >
    </div>

    <!-- Info -->
    <div class="text-left space-y-1">
      <h3 class="font-title text-lg md:text-xl text-black group-hover:text-primary font-normal transition-colors duration-300">
        {{ name }}
      </h3>
      <p class="font-body text-sm text-neutral-700 group-hover:text-primary transition-colors duration-300">
        {{ role }}
      </p>
    </div>
  </div>
</template>