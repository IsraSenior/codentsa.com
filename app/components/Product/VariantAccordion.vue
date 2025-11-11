<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  selected: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    default: 'radio', // 'radio' or 'checkbox'
  },
})

const emit = defineEmits(['select'])

const isOpen = ref(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}

const handleSelect = (value) => {
  emit('select', value)
  // Close accordion after selection
  isOpen.value = false
}

const selectedLabel = computed(() => {
  if (!props.selected) return null
  const option = props.options.find(opt => opt.value === props.selected)
  return option ? option.label : null
})
</script>

<template>
  <div class="border-b border-neutral-200">
    <button
      class="w-full flex items-center justify-between py-4 font-title text-lg md:text-xl text-black hover:text-primary transition-colors"
      @click="toggleAccordion"
    >
      <span>{{ title }}</span>
      <div class="flex items-center gap-2">
        <span v-if="selectedLabel" class="font-body text-base text-neutral-600">{{ selectedLabel }}</span>
        <ChevronDownIcon
          class="w-5 h-5 transition-transform duration-200"
          :class="isOpen ? 'rotate-180' : ''"
        />
      </div>
    </button>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isOpen" class="pb-4 overflow-hidden">
        <div class="grid grid-cols-2 gap-3">
          <label
            v-for="option in options"
            :key="option.value"
            class="flex items-center gap-2 cursor-pointer group"
          >
            <input
              :type="type"
              :name="title"
              :value="option.value"
              :checked="selected === option.value"
              class="w-4 h-4 border-2 border-neutral-400 focus:ring-0 focus:outline-none accent-black cursor-pointer"
              :class="type === 'checkbox' ? 'rounded' : ''"
              @change="handleSelect(option.value)"
            >
            <span class="font-body text-sm md:text-base text-black group-hover:text-primary transition-colors">
              {{ option.label }}
            </span>
          </label>
        </div>
      </div>
    </Transition>
  </div>
</template>
