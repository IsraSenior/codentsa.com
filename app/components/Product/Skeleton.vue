<template>
  <div
    class="h-full bg-neutral-100 rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden"
  >
    <!-- Header: Title, Brand and Heart Icon -->
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <!-- Title Skeleton -->
        <div class="h-7 bg-neutral-200 rounded-lg w-3/4 mb-2 animate-pulse"></div>
        <!-- Brand Skeleton -->
        <div class="h-4 bg-neutral-200 rounded w-1/2 animate-pulse"></div>
      </div>
      <!-- Heart Icon Skeleton -->
      <div class="w-8 h-8 bg-neutral-200 rounded-full animate-pulse"></div>
    </div>

    <!-- Image Skeleton -->
    <div class="aspect-square w-full bg-neutral-200 rounded-lg animate-pulse"></div>

    <!-- Divider -->
    <hr class="border-neutral-300">

    <!-- Footer: Description and Price -->
    <div class="flex justify-between items-end gap-2">
      <!-- Description Skeleton -->
      <div class="w-2/3 space-y-2">
        <div class="h-3 bg-neutral-200 rounded w-full animate-pulse"></div>
        <div class="h-3 bg-neutral-200 rounded w-4/5 animate-pulse"></div>
      </div>

      <!-- Price Skeleton -->
      <div class="text-right space-y-1">
        <div class="h-4 bg-neutral-200 rounded w-16 animate-pulse"></div>
        <div class="h-6 bg-neutral-200 rounded w-20 animate-pulse"></div>
      </div>
    </div>

    <!-- Shimmer Effect Overlay -->
    <div class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
