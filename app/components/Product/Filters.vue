<script setup>
import { FunnelIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  totalProducts: {
    type: Number,
    default: 0,
  },
  activeFilters: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['clearFilters', 'sortChange'])

const sortOptions = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'name-asc', label: 'Nombre: A-Z' },
  { value: 'name-desc', label: 'Nombre: Z-A' },
]

const selectedSort = ref('relevance')
const isOpen = ref(false)

const handleSortChange = (value) => {
  selectedSort.value = value
  isOpen.value = false
  emit('sortChange', value)
}

const handleClearFilters = () => {
  emit('clearFilters')
}
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
    <!-- Left: Filters Count -->
    <div class="flex items-center gap-3">
      <button
        class="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg font-body text-base text-black hover:border-primary transition-colors"
      >
        <FunnelIcon class="w-5 h-5" />
        <span>{{ activeFilters }} Filtros</span>
      </button>

      <button
        v-if="activeFilters > 0"
        class="font-body text-sm text-neutral-600 hover:text-primary underline underline-offset-4 transition-colors"
        @click="handleClearFilters"
      >
        Borrar filtros
      </button>
    </div>

    <!-- Center: Products Count -->
    <div class="font-body text-base text-neutral-600 text-center">
      {{ totalProducts }} productos encontrados
    </div>

    <!-- Right: Sort Dropdown -->
    <div class="relative">
      <button
        class="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg font-body text-base text-black hover:border-primary transition-colors min-w-[200px] justify-between"
        @click="isOpen = !isOpen"
      >
        <span>Ordenar por</span>
        <ChevronDownIcon
          class="w-5 h-5 transition-transform duration-200"
          :class="isOpen ? 'rotate-180' : ''"
        />
      </button>

      <!-- Dropdown Menu -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 scale-95 -translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 -translate-y-2"
      >
        <div
          v-if="isOpen"
          class="absolute right-0 mt-2 w-full min-w-[250px] bg-white border border-neutral-200 rounded-lg shadow-lg z-10 overflow-hidden"
        >
          <button
            v-for="option in sortOptions"
            :key="option.value"
            class="w-full px-4 py-3 text-left font-body text-base hover:bg-neutral-50 transition-colors"
            :class="selectedSort === option.value ? 'bg-neutral-100 text-primary' : 'text-black'"
            @click="handleSortChange(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>
