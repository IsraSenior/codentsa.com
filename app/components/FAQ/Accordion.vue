<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  title: {
    type: String,
    default: '¿Necesitas ayuda?',
  },
  subtitle: {
    type: String,
    default: 'Busca en nuestra biblioteca de preguntas frecuentes',
  },
  searchPlaceholder: {
    type: String,
    default: 'Escribe algo como "tiempo de devoluciones"',
  },
  faqs: {
    type: Array,
    required: true,
    // Expected format: [{ id: 1, question: 'string', answer: 'string' }]
  },
  showSearch: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  skeletonCount: {
    type: Number,
    default: 3,
  },
})

// Search and filtering
const searchQuery = ref('')
const openItems = ref(new Set())

const filteredFaqs = computed(() => {
  if (!searchQuery.value) return props.faqs

  const query = searchQuery.value.toLowerCase()
  return props.faqs.filter(faq =>
    faq.question.toLowerCase().includes(query) ||
    faq.answer.toLowerCase().includes(query)
  )
})

const toggleItem = (id) => {
  if (openItems.value.has(id)) {
    openItems.value.delete(id)
  } else {
    openItems.value.add(id)
  }
}

const isOpen = (id) => {
  return openItems.value.has(id)
}
</script>

<template>
  <div class="w-full">
    <!-- Header -->
    <div class="text-center mb-8 md:mb-12">
      <h2 class="font-title text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
        {{ title }}
      </h2>
      <p class="font-body text-base md:text-lg text-black">
        {{ subtitle }}
      </p>
    </div>

    <!-- Search Bar -->
    <div v-if="showSearch" class="max-w-2xl mx-auto mb-8">
      <div class="relative">
        <svg
          class="w-5 h-5 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          class="w-full pl-12 pr-4 py-3 md:py-4 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
        >
      </div>
    </div>

    <!-- Loading State -->
    <FAQSkeleton v-if="loading" :count="skeletonCount" />

    <!-- FAQ Items -->
    <div v-else-if="filteredFaqs.length > 0" class="max-w-3xl mx-auto space-y-4">
      <div
        v-for="faq in filteredFaqs"
        :key="faq.id"
        class="border border-neutral-200 rounded-lg overflow-hidden transition-all duration-200"
        :class="isOpen(faq.id) ? 'bg-neutral-50' : 'bg-white'"
      >
        <!-- Question -->
        <button
          class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
          @click="toggleItem(faq.id)"
        >
          <span class="font-body text-base md:text-lg text-black font-normal pr-4">
            {{ faq.question }}
          </span>
          <ChevronDownIcon
            class="w-5 h-5 text-black shrink-0 transition-transform duration-200"
            :class="isOpen(faq.id) ? 'rotate-180' : ''"
            :stroke-width="2"
          />
        </button>

        <!-- Answer -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-96 opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="max-h-96 opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div v-if="isOpen(faq.id)" class="overflow-hidden">
            <div class="px-6 pb-4 pt-2">
              <p class="font-body text-sm md:text-base text-neutral-700 leading-relaxed">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- No results state -->
    <div v-else>
      <div class="text-center py-8 mb-8">
        <p class="font-body text-base md:text-lg text-neutral-500 mb-2">
          No se encontraron preguntas que coincidan con tu búsqueda.
        </p>
        <p class="font-body text-sm md:text-base text-neutral-400">
          Intenta con otros términos o explora las preguntas sugeridas
        </p>
      </div>
      <FAQSkeleton :count="skeletonCount" />
    </div>
  </div>
</template>
