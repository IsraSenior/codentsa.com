# Guía de Componentes

## Filosofía de Componentes

Codentsa sigue una estrategia de desarrollo **UI-first**, donde primero se construyen los componentes base reutilizables y luego se componen en componentes más complejos.

## Estrategia de Desarrollo

### Fase 1: Componentes UI Base (Átomos)
Elementos fundamentales no divisibles:
- Buttons
- Inputs
- Badges
- Icons
- Typography

### Fase 2: Componentes Moleculares
Combinación de componentes base:
- SearchBar (Input + Button + Icon)
- ProductCard (Image + Title + Price + Button)
- FormField (Label + Input + Error message)

### Fase 3: Componentes Organizacionales
Secciones completas de la aplicación:
- ProductGrid
- CheckoutForm
- Navigation

## Estructura de un Componente

```vue
<script setup>
// 1. Definir props
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// 2. Definir emits
const emit = defineEmits(['click'])

// 3. Computed properties para clases dinámicas
const buttonClasses = computed(() => {
  const base = 'font-body font-semibold rounded-lg transition-all focus:outline-none focus:ring-2'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-700 focus:ring-primary-300',
    secondary: 'bg-secondary text-white hover:bg-secondary-700 focus:ring-secondary-300',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const disabled = props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  return `${base} ${variants[props.variant]} ${sizes[props.size]} ${disabled}`
})

// 4. Methods
const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
```

## Componentes UI Base

### Button.vue

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `fullWidth`: boolean
- `type`: 'button' | 'submit' | 'reset'

**Events:**
- `@click`: Emitido al hacer click

**Uso:**
```vue
<template>
  <Button variant="primary" size="lg" @click="handleSubmit">
    Comprar Ahora
  </Button>

  <Button variant="outline" size="md">
    Ver Detalles
  </Button>

  <Button variant="ghost" size="sm" disabled>
    Agotado
  </Button>
</template>
```

### Input.vue

**Props:**
- `modelValue`: string | number
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel'
- `placeholder`: string
- `error`: string
- `disabled`: boolean
- `required`: boolean

**Events:**
- `@update:modelValue`: v-model
- `@blur`: Al perder foco
- `@focus`: Al ganar foco

**Uso:**
```vue
<script setup>
const email = ref('')
const emailError = ref('')

const validateEmail = () => {
  if (!email.value.includes('@')) {
    emailError.value = 'Email inválido'
  } else {
    emailError.value = ''
  }
}
</script>

<template>
  <Input
    v-model="email"
    type="email"
    placeholder="tu@email.com"
    :error="emailError"
    @blur="validateEmail"
  />
</template>
```

### Badge.vue

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
- `size`: 'sm' | 'md' | 'lg'

**Uso:**
```vue
<template>
  <Badge variant="success">En Stock</Badge>
  <Badge variant="warning">Últimas unidades</Badge>
  <Badge variant="error">Agotado</Badge>
</template>
```

### Icon.vue (Wrapper para Heroicons)

**Props:**
- `name`: string (nombre del icono de Heroicons)
- `type`: 'outline' | 'solid'
- `size`: 'sm' | 'md' | 'lg' | 'xl'

**Uso:**
```vue
<template>
  <Icon name="ShoppingCart" type="outline" size="md" />
  <Icon name="Heart" type="solid" size="lg" />
</template>
```

## Componentes de Tipografía

### Heading.vue

**Props:**
- `level`: 1 | 2 | 3 | 4 | 5 | 6
- `as`: string (tag HTML opcional)

**Uso:**
```vue
<template>
  <Heading :level="1">Título Principal</Heading>
  <Heading :level="2" as="h1">Subtítulo renderizado como H1</Heading>
</template>
```

### Text.vue

**Props:**
- `variant`: 'body' | 'lead' | 'small' | 'tiny'
- `weight`: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
- `color`: string (clase de color de Tailwind)

**Uso:**
```vue
<template>
  <Text variant="lead" weight="medium">
    Texto destacado para introducción
  </Text>

  <Text variant="body">
    Párrafo normal de contenido
  </Text>

  <Text variant="small" color="text-neutral-500">
    Texto secundario
  </Text>
</template>
```

## Componentes Moleculares

### ProductCard.vue

**Props:**
```javascript
{
  product: {
    id: String,
    name: String,
    price: Number,
    image: String,
    badge: String,
    inStock: Boolean
  }
}
```

**Events:**
- `@add-to-cart`: Emitido al añadir producto
- `@view-details`: Emitido al hacer click en el card

**Estructura:**
```vue
<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart', 'view-details'])

const handleAddToCart = () => {
  emit('add-to-cart', props.product)
}

const viewDetails = () => {
  emit('view-details', props.product.id)
}
</script>

<template>
  <div class="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
    <!-- Imagen -->
    <div class="relative cursor-pointer" @click="viewDetails">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-64 object-cover"
      >
      <Badge
        v-if="product.badge"
        variant="primary"
        class="absolute top-4 right-4"
      >
        {{ product.badge }}
      </Badge>
    </div>

    <!-- Contenido -->
    <div class="p-4">
      <Heading :level="3" class="mb-2 cursor-pointer" @click="viewDetails">
        {{ product.name }}
      </Heading>

      <div class="flex items-center justify-between mb-4">
        <Text variant="lead" weight="bold" color="text-primary">
          {{ formatPrice(product.price) }}
        </Text>
        <Badge v-if="!product.inStock" variant="error">
          Agotado
        </Badge>
      </div>

      <Button
        variant="primary"
        full-width
        :disabled="!product.inStock"
        @click="handleAddToCart"
      >
        <Icon name="ShoppingCart" class="mr-2" />
        Añadir al Carrito
      </Button>
    </div>
  </div>
</template>
```

### SearchBar.vue

**Props:**
- `placeholder`: string
- `modelValue`: string

**Events:**
- `@search`: Emitido al buscar
- `@update:modelValue`: v-model

**Uso:**
```vue
<script setup>
const searchQuery = ref('')

const handleSearch = () => {
  console.log('Buscando:', searchQuery.value)
}
</script>

<template>
  <SearchBar
    v-model="searchQuery"
    placeholder="Buscar productos..."
    @search="handleSearch"
  />
</template>
```

### FormField.vue

Wrapper que incluye label, input, y mensaje de error.

**Props:**
- `label`: string
- `modelValue`: string | number
- `error`: string
- `required`: boolean
- Todo lo que acepta Input

**Uso:**
```vue
<template>
  <FormField
    v-model="email"
    label="Email"
    type="email"
    :error="emailError"
    required
  />
</template>
```

## Componentes Organizacionales

### ProductGrid.vue

**Props:**
- `products`: Array
- `columns`: number (2, 3, 4)
- `loading`: boolean

**Uso:**
```vue
<script setup>
const { data: products, pending } = await useFetch('/api/products')
</script>

<template>
  <ProductGrid
    :products="products"
    :columns="3"
    :loading="pending"
    @add-to-cart="handleAddToCart"
  />
</template>
```

### Navigation.vue

Navegación principal del sitio.

**Features:**
- Responsive (mobile menu)
- Dropdown para categorías
- Search integrado
- Carrito con contador

### CheckoutForm.vue

Formulario completo de checkout con validación.

**Secciones:**
1. Información de contacto
2. Dirección de envío
3. Método de pago
4. Resumen de orden

## Composables para Componentes

### useFormValidation.js

```javascript
export const useFormValidation = () => {
  const errors = ref({})

  const validateField = (field, value, rules) => {
    const fieldErrors = []

    if (rules.required && !value) {
      fieldErrors.push('Este campo es requerido')
    }

    if (rules.email && value && !isValidEmail(value)) {
      fieldErrors.push('Email inválido')
    }

    if (rules.minLength && value.length < rules.minLength) {
      fieldErrors.push(`Mínimo ${rules.minLength} caracteres`)
    }

    errors.value[field] = fieldErrors
    return fieldErrors.length === 0
  }

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  return {
    errors,
    validateField
  }
}
```

### useProduct.js

```javascript
export const useProduct = () => {
  const mainStore = useMainStore()
  const cartStore = useCartStore()

  const addToCart = (product, quantity = 1) => {
    cartStore.addItem(product, quantity)
    // Toast notification
    useToast().success(`${product.name} añadido al carrito`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  return {
    addToCart,
    formatPrice
  }
}
```

## Naming Conventions

### Componentes
- PascalCase: `ProductCard.vue`, `SearchBar.vue`
- Descriptivos y específicos
- Evitar nombres genéricos como `Item.vue`

### Props
- camelCase: `modelValue`, `fullWidth`, `isActive`
- Prefijo `is/has` para booleans: `isLoading`, `hasError`

### Events
- kebab-case: `@add-to-cart`, `@update:model-value`
- Verbos descriptivos: `@submit`, `@delete`, `@search`

## Testing de Componentes (Futuro)

```javascript
// ProductCard.spec.js
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'

describe('ProductCard', () => {
  it('renders product information', () => {
    const product = {
      id: '1',
      name: 'Producto Test',
      price: 99.99,
      image: '/test.jpg',
      inStock: true
    }

    const wrapper = mount(ProductCard, {
      props: { product }
    })

    expect(wrapper.text()).toContain('Producto Test')
    expect(wrapper.text()).toContain('99,99')
  })

  it('emits add-to-cart event', async () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('add-to-cart')).toBeTruthy()
  })
})
```

## Mejores Prácticas

1. **Single Responsibility**: Cada componente debe tener una única responsabilidad
2. **Props Validation**: Siempre validar props con tipos y defaults
3. **Emits Declaration**: Declarar explícitamente todos los eventos
4. **Composition API**: Usar `<script setup>` para componentes
5. **Accesibilidad**: ARIA labels, semantic HTML, keyboard navigation
6. **Performance**: Usar `v-once`, `v-memo` cuando sea apropiado
7. **Documentación**: Comentar props, events y comportamiento complejo
