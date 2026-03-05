<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

defineProps({
  hasActiveFilters: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['clearFilters'])
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 md:py-24 px-4">
    <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-neutral-200 flex items-center justify-center mb-6">
      <MagnifyingGlassIcon class="w-10 h-10 md:w-12 md:h-12 text-neutral-500" :stroke-width="1.5" />
    </div>

    <h2 class="font-title text-2xl md:text-3xl text-black font-bold mb-3 text-center">
      No se encontraron productos
    </h2>

    <p v-if="hasActiveFilters" class="font-body text-base text-neutral-600 mb-6 text-center max-w-md">
      Intenta ajustar los filtros o borrarlos para ver más resultados
    </p>
    <p v-else class="font-body text-base text-neutral-600 mb-6 text-center max-w-md">
      No hay productos disponibles en este momento
    </p>

    <button
      v-if="hasActiveFilters"
      class="px-6 py-3 bg-primary text-white rounded-lg font-body text-base font-medium hover:bg-primary-700 transition-colors"
      @click="emit('clearFilters')"
    >
      Borrar todos los filtros
    </button>

    <NuxtLink
      v-else
      to="/"
      class="px-6 py-3 bg-primary text-white rounded-lg font-body text-base font-medium hover:bg-primary-700 transition-colors"
    >
      Volver al inicio
    </NuxtLink>
  </div>
</template>
