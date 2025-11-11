<script setup>
const props = defineProps({
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

const emit = defineEmits(['checkout', 'applyPromo'])

const promoCode = ref('')

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

const total = computed(() => props.subtotal + props.shipping + props.tax)

const handleApplyPromo = () => {
  if (promoCode.value.trim()) {
    emit('applyPromo', promoCode.value)
  }
}
</script>

<template>
  <div class="bg-neutral-50 border border-neutral-200 rounded-lg p-6 sticky top-28">
    <h2 class="font-title text-xl md:text-2xl text-black font-normal mb-6">
      Resumen del pedido
    </h2>

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

    <!-- Promo Code -->
    <div class="mb-6">
      <label class="font-body text-sm text-neutral-600 mb-2 block">
        Código promocional
      </label>
      <div class="flex gap-2">
        <input
          v-model="promoCode"
          type="text"
          placeholder=""
          class="flex-1 px-4 py-2 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
        >
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t border-neutral-200 pt-6 mb-6">
      <!-- Total -->
      <div class="flex items-center justify-between mb-6">
        <span class="font-title text-lg md:text-xl text-black font-normal">Precio total</span>
        <span class="font-title text-2xl md:text-3xl text-black font-normal">{{ formatPrice(total) }}</span>
      </div>

      <!-- Checkout Button -->
      <button
        class="w-full px-6 py-4 bg-black text-white rounded-lg font-body text-base hover:bg-neutral-800 transition-colors"
        @click="emit('checkout')"
      >
        Check out
      </button>
    </div>
  </div>
</template>
