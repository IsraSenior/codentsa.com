<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

// Meta tags
useHead({
  title: 'Pedido Confirmado - Codentsa',
  meta: [
    {
      name: 'description',
      content: 'Tu pedido ha sido procesado exitosamente',
    },
  ],
})

// Get query parameters from Redsys
const route = useRoute()
const router = useRouter()

// State
const isVerifying = ref(true)
const verificationFailed = ref(false)
const paymentData = ref(null)
const cartStore = useCartStore()

// Verify payment on mount
onMounted(async () => {
  try {
    // Get Redsys response parameters from URL
    const {
      Ds_SignatureVersion,
      Ds_MerchantParameters,
      Ds_Signature,
    } = route.query

    if (!Ds_MerchantParameters || !Ds_Signature) {
      console.error('Missing Redsys parameters')
      verificationFailed.value = true
      isVerifying.value = false
      return
    }

    // Verify payment with backend
    const response = await $fetch('/api/redsys/verify-payment', {
      method: 'POST',
      body: {
        Ds_SignatureVersion,
        Ds_MerchantParameters,
        Ds_Signature,
      },
    })

    if (response.verified && response.payment.status === 'success') {
      paymentData.value = response.payment

      // Clear cart from localStorage
      cartStore.clearCart()

      console.log('✅ Payment verified and cart cleared')
    } else {
      // Payment verification failed or payment was not successful
      verificationFailed.value = true
      console.error('Payment verification failed:', response)

      // Redirect to error page after 3 seconds
      setTimeout(() => {
        router.push('/checkout-error')
      }, 3000)
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    verificationFailed.value = true
  } finally {
    isVerifying.value = false
  }
})

// Format date
const formattedDate = computed(() => {
  if (!paymentData.value?.date) return ''
  const date = paymentData.value.date
  // Format: DD/MM/YYYY
  return `${date.substring(0, 2)}/${date.substring(2, 4)}/${date.substring(4, 8)}`
})

// Format time
const formattedTime = computed(() => {
  if (!paymentData.value?.hour) return ''
  const time = paymentData.value.hour
  // Format: HH:MM:SS
  return `${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(4, 6)}`
})
</script>

<template>
  <div>
    <Section class="!pt-0">
      <!-- Loading State -->
      <div v-if="isVerifying" class="text-center py-16 md:py-24">
        <div class="w-16 h-16 mx-auto mb-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <h2 class="font-title text-2xl md:text-3xl text-black font-normal mb-4">
          Verificando tu pago...
        </h2>
        <p class="font-body text-base md:text-lg text-neutral-600">
          Por favor espera mientras confirmamos tu pedido
        </p>
      </div>

      <!-- Verification Failed State -->
      <div v-else-if="verificationFailed" class="text-center py-16 md:py-24">
        <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-error/10 rounded-full">
          <svg
            class="w-12 h-12 text-error"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 class="font-title text-2xl md:text-3xl text-black font-normal mb-4">
          Error al verificar el pago
        </h2>
        <p class="font-body text-base md:text-lg text-neutral-600 mb-8">
          No pudimos verificar tu pago. Redirigiendo...
        </p>
      </div>

      <!-- Success State -->
      <div v-else-if="paymentData" class="max-w-3xl mx-auto">
        <!-- Success Icon -->
        <div class="text-center mb-8 md:mb-12">
          <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-success/10 rounded-full">
            <CheckCircleIcon class="w-16 h-16 text-success" />
          </div>
          <h1 class="font-title text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
            ¡Pedido confirmado!
          </h1>
          <p class="font-body text-base md:text-lg text-neutral-600">
            Tu pago ha sido procesado exitosamente
          </p>
        </div>

        <!-- Order Details Card -->
        <div class="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 mb-6">
          <h2 class="font-title text-xl md:text-2xl text-black font-normal mb-6">
            Detalles del pedido
          </h2>

          <div class="space-y-4">
            <!-- Order Number -->
            <div class="flex justify-between items-center pb-4 border-b border-neutral-200">
              <span class="font-body text-base text-neutral-600">Número de pedido</span>
              <span class="font-body text-base text-black font-medium">{{ paymentData.orderId }}</span>
            </div>

            <!-- Amount -->
            <div class="flex justify-between items-center pb-4 border-b border-neutral-200">
              <span class="font-body text-base text-neutral-600">Importe total</span>
              <span class="font-title text-xl text-black font-bold">
                {{ new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(paymentData.amount) }}
              </span>
            </div>

            <!-- Date & Time -->
            <div class="flex justify-between items-center pb-4 border-b border-neutral-200">
              <span class="font-body text-base text-neutral-600">Fecha y hora</span>
              <span class="font-body text-base text-black">
                {{ formattedDate }} - {{ formattedTime }}
              </span>
            </div>

            <!-- Authorization Code -->
            <div v-if="paymentData.authorisationCode" class="flex justify-between items-center pb-4 border-b border-neutral-200">
              <span class="font-body text-base text-neutral-600">Código de autorización</span>
              <span class="font-body text-base text-black font-mono">{{ paymentData.authorisationCode }}</span>
            </div>

            <!-- Card -->
            <div v-if="paymentData.maskedCard" class="flex justify-between items-center">
              <span class="font-body text-base text-neutral-600">Tarjeta</span>
              <span class="font-body text-base text-black font-mono">{{ paymentData.maskedCard }}</span>
            </div>
          </div>
        </div>

        <!-- Info Message -->
        <div class="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
          <p class="font-body text-sm md:text-base text-neutral-700 mb-2">
            <span class="font-semibold">Recibirás un email de confirmación</span> con todos los detalles de tu pedido y el número de seguimiento en las próximas horas.
          </p>
          <p class="font-body text-sm md:text-base text-neutral-700">
            Si tienes alguna duda, puedes contactarnos en
            <a href="mailto:soporte@codentsa.com" class="text-primary hover:underline font-medium">soporte@codentsa.com</a>
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink
            to="/productos"
            class="flex-1 px-6 py-4 bg-black text-white rounded-lg font-body text-base text-center hover:bg-neutral-800 transition-colors"
          >
            Seguir comprando
          </NuxtLink>
          <NuxtLink
            to="/"
            class="flex-1 px-6 py-4 border border-neutral-300 text-black rounded-lg font-body text-base text-center hover:border-primary hover:text-primary transition-colors"
          >
            Volver al inicio
          </NuxtLink>
        </div>
      </div>
    </Section>
  </div>
</template>
