<template>
  <div
    class="h-full bg-neutral-100 rounded-2xl p-4 flex flex-col gap-3 animate-pulse"
  >
    <!-- Header: Title and Brand -->
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <!-- Title skeleton -->
        <div class="h-7 bg-neutral-300 rounded w-3/4 mb-2"></div>
        <!-- Brand skeleton -->
        <div class="h-4 bg-neutral-300 rounded w-1/2"></div>
      </div>
      <!-- Heart icon skeleton -->
      <div class="w-8 h-8 bg-neutral-300 rounded-full"></div>
    </div>

    <!-- Image skeleton -->
    <div class="aspect-square w-full bg-neutral-300 rounded-lg"></div>

    <!-- Divider -->
    <hr class="border-neutral-300">

    <!-- Footer: Description and Price -->
    <div class="flex justify-between items-end">
      <div class="w-2/3 space-y-2">
        <!-- Description lines -->
        <div class="h-4 bg-neutral-300 rounded w-full"></div>
        <div class="h-4 bg-neutral-300 rounded w-4/5"></div>
      </div>
      <div class="text-right space-y-1">
        <!-- Original price -->
        <div class="h-4 bg-neutral-300 rounded w-16"></div>
        <!-- Price -->
        <div class="h-6 bg-neutral-300 rounded w-20"></div>
      </div>
    </div>
  </div>
</template>
