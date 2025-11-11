<script setup>
import { XCircleIcon } from '@heroicons/vue/24/solid'

// Meta tags
useHead({
  title: 'Error en el Pago - Codentsa',
  meta: [
    {
      name: 'description',
      content: 'Hubo un problema al procesar tu pago',
    },
  ],
})

// Get query parameters from Redsys
const route = useRoute()
const router = useRouter()

// State
const errorType = ref('unknown')
const errorMessage = ref('Hubo un problema al procesar tu pago')
const paymentData = ref(null)

// Detect error type on mount
onMounted(async () => {
  try {
    // Get Redsys response parameters from URL
    const {
      Ds_SignatureVersion,
      Ds_MerchantParameters,
      Ds_Signature,
    } = route.query

    // If no parameters, user probably cancelled or there was a timeout
    if (!Ds_MerchantParameters || !Ds_Signature) {
      errorType.value = 'cancelled'
      errorMessage.value = 'El pago fue cancelado o no se completó'
      return
    }

    // Try to verify payment to get error details
    try {
      const response = await $fetch('/api/redsys/verify-payment', {
        method: 'POST',
        body: {
          Ds_SignatureVersion,
          Ds_MerchantParameters,
          Ds_Signature,
        },
      })

      if (response.verified) {
        paymentData.value = response.payment

        // Check payment status
        if (response.payment.status === 'error') {
          errorType.value = 'declined'
          errorMessage.value = response.payment.message || 'Tu pago fue rechazado'
        } else {
          errorType.value = 'unknown'
          errorMessage.value = 'Ocurrió un error inesperado'
        }
      } else {
        errorType.value = 'verification'
        errorMessage.value = 'No pudimos verificar el estado del pago'
      }
    } catch (verifyError) {
      console.error('Error verifying payment:', verifyError)
      errorType.value = 'verification'
      errorMessage.value = 'Error al verificar el pago'
    }
  } catch (error) {
    console.error('Error processing error page:', error)
    errorType.value = 'unknown'
    errorMessage.value = 'Ocurrió un error inesperado'
  }
})

// Error-specific icons and colors
const errorConfig = computed(() => {
  switch (errorType.value) {
    case 'cancelled':
      return {
        icon: '🚫',
        color: 'warning',
        bgColor: 'bg-warning/10',
        textColor: 'text-warning',
        borderColor: 'border-warning/20',
        title: 'Pago cancelado',
        subtitle: 'No se realizó ningún cargo a tu tarjeta',
      }
    case 'declined':
      return {
        icon: '❌',
        color: 'error',
        bgColor: 'bg-error/10',
        textColor: 'text-error',
        borderColor: 'border-error/20',
        title: 'Pago rechazado',
        subtitle: 'Tu banco no autorizó la transacción',
      }
    case 'verification':
      return {
        icon: '⚠️',
        color: 'warning',
        bgColor: 'bg-warning/10',
        textColor: 'text-warning',
        borderColor: 'border-warning/20',
        title: 'Error de verificación',
        subtitle: 'No pudimos confirmar el estado del pago',
      }
    default:
      return {
        icon: '⚠️',
        color: 'error',
        bgColor: 'bg-error/10',
        textColor: 'text-error',
        borderColor: 'border-error/20',
        title: 'Error en el pago',
        subtitle: 'Hubo un problema al procesar tu transacción',
      }
  }
})

// Handle retry
const handleRetry = () => {
  router.push('/carrito')
}
</script>

<template>
  <div>
    <Section class="!pt-0">
      <div class="max-w-3xl mx-auto">
        <!-- Error Icon -->
        <div class="text-center mb-8 md:mb-12">
          <div
            :class="[
              'w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full',
              errorConfig.bgColor
            ]"
          >
            <XCircleIcon :class="['w-16 h-16', errorConfig.textColor]" />
          </div>
          <h1 class="font-title text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
            {{ errorConfig.title }}
          </h1>
          <p class="font-body text-base md:text-lg text-neutral-600">
            {{ errorConfig.subtitle }}
          </p>
        </div>

        <!-- Error Details Card -->
        <div
          :class="[
            'border rounded-2xl p-6 md:p-8 mb-6',
            errorConfig.bgColor,
            errorConfig.borderColor
          ]"
        >
          <h2 class="font-title text-xl md:text-2xl text-black font-normal mb-4">
            ¿Qué ha pasado?
          </h2>

          <p class="font-body text-base text-neutral-700 mb-6">
            {{ errorMessage }}
          </p>

          <!-- Payment details if available -->
          <div v-if="paymentData" class="space-y-3">
            <div v-if="paymentData.orderId" class="flex justify-between items-center">
              <span class="font-body text-sm text-neutral-600">Referencia</span>
              <span class="font-body text-sm text-black font-mono">{{ paymentData.orderId }}</span>
            </div>
            <div v-if="paymentData.responseCode" class="flex justify-between items-center">
              <span class="font-body text-sm text-neutral-600">Código de error</span>
              <span class="font-body text-sm text-black font-mono">{{ paymentData.responseCode }}</span>
            </div>
          </div>
        </div>

        <!-- Suggestions -->
        <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-6 mb-8">
          <h3 class="font-title text-lg text-black font-normal mb-4">
            ¿Qué puedes hacer?
          </h3>

          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-primary text-xl">•</span>
              <span class="font-body text-sm md:text-base text-neutral-700">
                <strong>Verifica tus datos:</strong> Asegúrate de que los datos de tu tarjeta sean correctos
              </span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary text-xl">•</span>
              <span class="font-body text-sm md:text-base text-neutral-700">
                <strong>Comprueba el saldo:</strong> Verifica que tienes fondos suficientes en tu cuenta
              </span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary text-xl">•</span>
              <span class="font-body text-sm md:text-base text-neutral-700">
                <strong>Contacta con tu banco:</strong> Tu entidad puede haber bloqueado la transacción por seguridad
              </span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary text-xl">•</span>
              <span class="font-body text-sm md:text-base text-neutral-700">
                <strong>Prueba otro método:</strong> Intenta con otra tarjeta o método de pago
              </span>
            </li>
          </ul>
        </div>

        <!-- Support Info -->
        <div class="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
          <p class="font-body text-sm md:text-base text-neutral-700 mb-2">
            <span class="font-semibold">¿Necesitas ayuda?</span>
          </p>
          <p class="font-body text-sm md:text-base text-neutral-700">
            Nuestro equipo está disponible para ayudarte. Contactanos en
            <a href="mailto:soporte@codentsa.com" class="text-primary hover:underline font-medium">soporte@codentsa.com</a>
            o llámanos al <a href="tel:+34900000000" class="text-primary hover:underline font-medium">900 000 000</a>
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4">
          <button
            class="flex-1 px-6 py-4 bg-black text-white rounded-lg font-body text-base text-center hover:bg-neutral-800 transition-colors"
            @click="handleRetry"
          >
            Volver al carrito
          </button>
          <NuxtLink
            to="/productos"
            class="flex-1 px-6 py-4 border border-neutral-300 text-black rounded-lg font-body text-base text-center hover:border-primary hover:text-primary transition-colors"
          >
            Seguir comprando
          </NuxtLink>
        </div>
      </div>
    </Section>
  </div>
</template>
