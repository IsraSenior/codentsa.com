<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="py-16 md:pb-24 md:pt-0">
    <div class="container mx-auto px-5 lg:px-0 max-w-4xl">
      <!-- Title -->
      <h1 class="font-title text-4xl md:text-5xl lg:text-6xl text-black font-normal text-center mb-12">
        {{ title }}
      </h1>

      <!-- Content -->
      <div class="prose-legal">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
</style>
