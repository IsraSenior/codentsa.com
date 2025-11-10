<script setup>
// Announcement messages
const announcements = [
  'Ofertas todos los días',
  'Envío en 24 horas',
  'Ofertas todos los días',
]
</script>

<template>
  <div class="bg-white text-primary">
    <div class="container mx-auto px-4 py-2">
      <div class="flex items-center justify-between gap-4 text-sm font-body font-medium">
        <span
          v-for="(announcement, index) in announcements"
          :key="index"
          class="flex-1 text-center"
        >
          {{ announcement }}
        </span>
      </div>
    </div>
  </div>
</template>
