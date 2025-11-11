<script setup>
defineProps({
  count: {
    type: Number,
    default: 3,
  },
})
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-4">
    <div
      v-for="i in count"
      :key="i"
      class="border border-neutral-200 rounded-lg overflow-hidden bg-white animate-pulse"
    >
      <!-- Question Skeleton -->
      <div class="px-6 py-4 flex items-center justify-between">
        <div class="flex-1 pr-4">
          <div class="h-5 bg-neutral-200 rounded w-3/4" />
        </div>
        <div class="w-5 h-5 bg-neutral-200 rounded shrink-0" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
