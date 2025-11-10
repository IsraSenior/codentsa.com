<script setup>
const props = defineProps({
  // Styling
  variant: {
    type: String,
    default: 'solid',
    validator: (value) => ['solid', 'outline'].includes(value),
  },
  color: {
    type: String,
    default: 'dark',
    validator: (value) => ['dark', 'light', 'primary', 'secondary'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },

  // Button-specific
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },

  // Link-specific (internal navigation with NuxtLink)
  to: {
    type: [String, Object],
    default: null,
  },

  // Link-specific (external links with <a>)
  href: {
    type: String,
    default: null,
  },
  target: {
    type: String,
    default: null,
    validator: (value) => [null, '_blank', '_self', '_parent', '_top'].includes(value),
  },
  rel: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['click'])

// Determinar qué componente renderizar
const componentType = computed(() => {
  if (props.to) return 'NuxtLink'
  if (props.href) return 'a'
  return 'button'
})

// Atributos dinámicos según el tipo de componente
const componentAttrs = computed(() => {
  const base = {
    class: buttonClasses.value,
  }

  if (componentType.value === 'button') {
    return {
      ...base,
      type: props.type,
      disabled: props.disabled,
    }
  }

  if (componentType.value === 'NuxtLink') {
    return {
      ...base,
      to: props.to,
      target: props.target,
      rel: props.rel || (props.target === '_blank' ? 'noopener noreferrer' : null),
    }
  }

  if (componentType.value === 'a') {
    return {
      ...base,
      href: props.href,
      target: props.target,
      rel: props.rel || (props.target === '_blank' ? 'noopener noreferrer' : null),
    }
  }

  return base
})

const buttonClasses = computed(() => {
  const base =
    'font-body font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2'

  // Sizes
  const sizes = {
    sm: 'px-4 py-2 text-sm h-[36px]',
    md: 'px-6 py-3 text-base h-[42px]',
    lg: 'px-8 py-4 text-lg h-[50px]',
  }

  // Variants & Colors
  const variants = {
    solid: {
      dark: 'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900',
      light: 'bg-neutral-50 text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-200',
      primary: 'bg-primary text-white hover:bg-primary-700 focus:ring-primary-300',
      secondary: 'bg-secondary text-white hover:bg-secondary-700 focus:ring-secondary-300',
    },
    outline: {
      dark: 'border-2 border-neutral-900 text-neutral-900 bg-transparent hover:bg-neutral-900 hover:text-white focus:ring-neutral-900',
      light:
        'border-2 border-neutral-50 text-neutral-50 bg-transparent hover:bg-neutral-50 hover:text-neutral-900 focus:ring-neutral-200',
      primary:
        'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-primary-300',
      secondary:
        'border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white focus:ring-secondary-300',
    },
  }

  const width = props.fullWidth ? 'w-full' : ''
  const disabled = props.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'

  return `${base} ${sizes[props.size]} ${variants[props.variant][props.color]} ${width} ${disabled}`
})

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <component :is="componentType" v-bind="componentAttrs" @click="handleClick">
    <slot />
    <slot name="icon" />
  </component>
</template>
