<script setup>
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value),
  },
})

const emit = defineEmits(['close'])

const iconMap = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
}

const colorMap = {
  success: 'bg-white border-success/30 text-success',
  error: 'bg-white border-error/30 text-error',
  warning: 'bg-wwhite border-warning/30 text-warning',
  info: 'bg-white border-secondary-500/30 text-secondary-500',
}

const iconColorMap = {
  success: 'text-success',
  error: 'text-error',
  warning: 'text-warning',
  info: 'text-secondary-500',
}

const Icon = iconMap[props.type]
</script>

<template>
  <div
    :class="[
      'flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[320px] max-w-md',
      colorMap[type],
    ]"
  >
    <component :is="Icon" :class="['w-5 h-5 shrink-0 mt-0.5', iconColorMap[type]]" />
    <p class="font-body text-sm flex-1">{{ message }}</p>
    <button
      class="shrink-0 p-0.5 hover:opacity-70 transition-opacity"
      @click="emit('close', id)"
    >
      <XMarkIcon class="w-4 h-4" />
    </button>
  </div>
</template>
