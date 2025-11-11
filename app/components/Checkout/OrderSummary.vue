<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  subtotal: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

const total = computed(() => props.subtotal + props.shipping + props.tax)

const totalItems = computed(() => {
  return props.items.reduce((sum, item) => sum + item.quantity, 0)
})
</script>

<template>
  <div class="bg-neutral-50 border border-neutral-200 rounded-lg p-6 sticky top-28">
    <h2 class="font-title text-xl md:text-2xl text-black font-normal mb-6">
      Resumen del pedido
    </h2>

    <!-- Cart Items -->
    <div v-if="items.length > 0" class="space-y-4 mb-6 pb-6 border-b border-neutral-200">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex gap-3"
      >
        <!-- Image -->
        <div class="w-16 h-16 flex-shrink-0 bg-neutral-100 rounded-lg overflow-hidden">
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-full object-cover"
          >
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <h4 class="font-body text-sm text-black font-medium mb-1 truncate">
            {{ item.name }}
          </h4>
          <p v-if="item.brand" class="font-body text-xs text-neutral-600 mb-1">
            {{ item.brand }}
          </p>
          <div class="flex items-center justify-between">
            <span class="font-body text-xs text-neutral-600">
              Cant: {{ item.quantity }}
            </span>
            <span class="font-body text-sm text-black font-medium">
              {{ formatPrice(item.price * item.quantity) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Items -->
    <div class="space-y-4 mb-6">
      <!-- Subtotal -->
      <div class="flex items-center justify-between">
        <span class="font-body text-base text-black">Subtotal</span>
        <span class="font-body text-base text-black font-medium">{{ formatPrice(subtotal) }}</span>
      </div>

      <!-- Shipping -->
      <div class="flex items-center justify-between">
        <span class="font-body text-base text-black">Shipping</span>
        <span class="font-body text-base text-black font-medium">{{ formatPrice(shipping) }}</span>
      </div>

      <!-- Tax -->
      <div class="flex items-center justify-between">
        <span class="font-body text-base text-black">Tax</span>
        <span class="font-body text-base text-black font-medium">{{ formatPrice(tax) }}</span>
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t border-neutral-200 pt-6">
      <!-- Total -->
      <div class="flex items-center justify-between">
        <span class="font-title text-lg md:text-xl text-black font-normal">Precio total</span>
        <span class="font-title text-2xl md:text-3xl text-black font-normal">{{ formatPrice(total) }}</span>
      </div>
    </div>
  </div>
</template>
