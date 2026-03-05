<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  maxVisiblePages: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits(['page-change'])

// Calculate visible page numbers
const visiblePages = computed(() => {
  const pages = []
  const halfVisible = Math.floor(props.maxVisiblePages / 2)

  let startPage = Math.max(1, props.currentPage - halfVisible)
  let endPage = Math.min(props.totalPages, props.currentPage + halfVisible)

  // Adjust if we're near the beginning or end
  if (props.currentPage <= halfVisible) {
    endPage = Math.min(props.totalPages, props.maxVisiblePages)
  }

  if (props.currentPage + halfVisible >= props.totalPages) {
    startPage = Math.max(1, props.totalPages - props.maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}

const previousPage = () => {
  if (props.currentPage > 1) {
    goToPage(props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    goToPage(props.currentPage + 1)
  }
}
</script>

<template>
  <div class="flex items-center justify-center gap-2 py-8 mt-16">
    <!-- Previous Button -->
    <button
      class="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-300 hover:border-primary hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="currentPage === 1"
      @click="previousPage"
    >
      <ChevronLeftIcon class="w-5 h-5 text-black" />
    </button>

    <!-- Page Numbers -->
    <div class="flex items-center gap-2">
      <button
        v-for="page in visiblePages"
        :key="page"
        class="w-10 h-10 flex items-center justify-center rounded-lg font-body text-base transition-colors"
        :class="page === currentPage
          ? 'bg-black text-white border-2 border-black'
          : 'border border-neutral-300 text-black hover:border-primary hover:bg-neutral-50'"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <!-- Ellipsis if there are more pages -->
      <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" class="px-2 text-neutral-400">
        ...
      </span>

      <!-- Last page -->
      <button
        v-if="visiblePages[visiblePages.length - 1] < totalPages"
        class="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-300 text-black hover:border-primary hover:bg-neutral-50 font-body text-base transition-colors"
        @click="goToPage(totalPages)"
      >
        {{ totalPages }}
      </button>
    </div>

    <!-- Next Button -->
    <button
      class="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-300 hover:border-primary hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="currentPage === totalPages"
      @click="nextPage"
    >
      <ChevronRightIcon class="w-5 h-5 text-black" />
    </button>
  </div>
</template>
