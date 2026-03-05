<template>
  <div class="flex gap-4 md:gap-6 bg-white border border-neutral-200 rounded-lg p-4 md:p-6 animate-pulse">
    <!-- Image Skeleton -->
    <div class="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-neutral-200 rounded-lg" />

    <!-- Content Skeleton -->
    <div class="flex-1 flex flex-col justify-between min-w-0">
      <div>
        <!-- Title -->
        <div class="h-5 bg-neutral-200 rounded w-3/4 mb-2" />
        <!-- Brand -->
        <div class="h-4 bg-neutral-200 rounded w-1/2 mb-3" />
        <!-- Variants -->
        <div class="flex gap-2 mb-3">
          <div class="h-6 bg-neutral-200 rounded w-16" />
          <div class="h-6 bg-neutral-200 rounded w-16" />
        </div>
      </div>

      <!-- Bottom -->
      <div class="flex items-center justify-between gap-4">
        <!-- Quantity Controls -->
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 md:w-9 md:h-9 bg-neutral-200 rounded-lg" />
          <div class="w-8 h-8 bg-neutral-200 rounded" />
          <div class="w-8 h-8 md:w-9 md:h-9 bg-neutral-200 rounded-lg" />
        </div>

        <!-- Price -->
        <div class="text-right">
          <div class="h-6 bg-neutral-200 rounded w-24" />
        </div>
      </div>
    </div>
  </div>
</template>
