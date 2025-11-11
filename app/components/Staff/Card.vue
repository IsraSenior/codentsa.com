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
      <img
        :src="image"
        :alt="name"
        class="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
      >
    </div>

    <!-- Info -->
    <div class="text-left space-y-1">
      <h3 class="font-title text-lg md:text-xl text-black font-normal">
        {{ name }}
      </h3>
      <p class="font-body text-sm text-neutral-700">
        {{ role }}
      </p>
    </div>
  </div>
</template>