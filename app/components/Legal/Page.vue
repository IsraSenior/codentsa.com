<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="py-16 md:py-24">
    <div class="container mx-auto px-5 lg:px-0 max-w-4xl">
      <!-- Title -->
      <h1 class="font-title text-4xl md:text-5xl lg:text-6xl text-black font-normal text-center mb-12">
        {{ title }}
      </h1>

      <!-- Content -->
      <div class="prose prose-neutral max-w-none">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom prose styles for legal content */
.prose {
  @apply text-black;
}

.prose :deep(p) {
  @apply font-body text-base md:text-lg leading-relaxed mb-6;
}

.prose :deep(h2) {
  @apply font-title text-2xl md:text-3xl font-normal mt-12 mb-6;
}

.prose :deep(h3) {
  @apply font-title text-xl md:text-2xl font-normal mt-8 mb-4;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply font-body text-base md:text-lg leading-relaxed mb-6 ml-6;
}

.prose :deep(li) {
  @apply mb-2;
}

.prose :deep(strong) {
  @apply font-semibold;
}

.prose :deep(a) {
  @apply text-primary hover:underline;
}
</style>
