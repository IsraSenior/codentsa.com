<script setup>
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  stepNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending', // pending, active, completed
    validator: (value) => ['pending', 'active', 'completed'].includes(value),
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle'])

const handleToggle = () => {
  if (!props.disabled) {
    emit('toggle')
  }
}
</script>

<template>
  <div
    class="border rounded-lg transition-all duration-200"
    :class="{
      'border-primary bg-neutral-50': status === 'active' && isOpen,
      'border-neutral-300 bg-white': status !== 'active' || !isOpen,
      'opacity-50 cursor-not-allowed': disabled,
    }"
  >
    <!-- Accordion Header -->
    <button
      class="w-full px-4 md:px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors rounded-lg"
      :class="{
        'cursor-pointer': !disabled,
        'cursor-not-allowed': disabled,
      }"
      @click="handleToggle"
    >
      <div class="flex items-center gap-3 md:gap-4">
        <!-- Step Number / Check Icon -->
        <div
          class="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-title font-medium transition-all"
          :class="{
            'bg-primary text-white': status === 'active',
            'bg-black text-white': status === 'completed',
            'bg-neutral-200 text-neutral-600': status === 'pending',
          }"
        >
          <CheckIcon v-if="status === 'completed'" class="w-5 h-5" :stroke-width="2.5" />
          <span v-else>{{ stepNumber }}</span>
        </div>

        <!-- Title -->
        <h3 class="font-title text-lg md:text-xl text-black font-normal text-left">
          {{ title }}
        </h3>
      </div>

      <!-- Chevron Icon -->
      <ChevronDownIcon
        v-if="!disabled"
        class="w-5 h-5 text-neutral-600 transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </button>

    <!-- Accordion Content -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[2000px]"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-[2000px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isOpen" class="px-4 md:px-6 pb-6 overflow-hidden">
        <div class="border-t border-neutral-200 pt-6">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
