<script setup>
const props = defineProps({
  // Styling
  variant: {
    type: String,
    default: 'solid',
    validator: (value) => ['solid', 'outline', 'link'].includes(value),
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
  iconOnly: {
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
  // Link variant tiene estilo completamente diferente
  if (props.variant === 'link') {
    const linkBase = 'font-body font-normal transition-all duration-200 focus:outline-none inline-flex items-center gap-2 underline-offset-4 hover:underline'

    const linkColors = {
      dark: 'text-neutral-900 hover:text-neutral-700',
      light: 'text-neutral-50 hover:text-neutral-200',
      primary: 'text-primary hover:text-primary-700',
      secondary: 'text-secondary hover:text-secondary-700',
    }

    const linkSizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    const disabled = props.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'

    return `${linkBase} ${linkSizes[props.size]} ${linkColors[props.color]} ${disabled}`
  }

  // Solid y Outline variants (comportamiento original)
  const base =
    'font-body font-normal rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2'

  // Sizes
  const sizes = props.iconOnly
    ? {
        sm: 'p-2 text-sm w-[36px] h-[36px]',
        md: 'p-3 text-base w-[42px] h-[42px]',
        lg: 'p-4 text-lg w-[50px] h-[50px]',
      }
    : {
        sm: 'px-4 py-2 text-sm h-[36px]',
        md: 'px-6 py-3 text-base h-[42px]',
        lg: 'px-8 py-4 text-lg h-[50px]',
      }

  // Variants & Colors
  const variants = {
    solid: {
      dark: 'bg-neutral-900 text-white hover:bg-neutral-900/50 focus:ring-neutral-900',
      light: 'bg-neutral-50 text-neutral-900 hover:bg-neutral-50/50 focus:ring-neutral-200',
      primary: 'bg-primary text-white hover:bg-primary/50 focus:ring-primary-300',
      secondary: 'bg-secondary text-white hover:bg-secondary/50 focus:ring-secondary-300',
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
