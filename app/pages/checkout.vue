<script setup>
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'

// Meta tags
useHead({
  title: 'Checkout - Codentsa',
  meta: [
    {
      name: 'description',
      content: 'Completa tu pedido de instrumental odontológico',
    },
  ],
})

// Cart store
const cartStore = useCartStore()

// Load cart from localStorage on mount
onMounted(() => {
  cartStore.loadFromLocalStorage()
})

// Steps state
const currentStep = ref(1)
const completedSteps = ref([])

// Form data
const personalInfo = ref({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  notes: '',
})

const paymentInfo = ref({
  method: '',
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: '',
})

// Cart data from store
const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.subtotal)
const shipping = computed(() => cartStore.shipping)
const tax = computed(() => cartStore.tax)
const isEmpty = computed(() => cartStore.isEmpty)

// Computed
const getStepStatus = (step) => {
  if (completedSteps.value.includes(step)) return 'completed'
  if (currentStep.value === step) return 'active'
  return 'pending'
}

const isStepOpen = (step) => {
  // Only open the current step, not completed ones
  return currentStep.value === step
}

const isStepDisabled = (step) => {
  // Step 2 can only be accessed after step 1 is completed
  if (step === 2 && !completedSteps.value.includes(1)) return true
  return false
}

// Methods
const toggleStep = (step) => {
  // Only allow opening completed steps or the current step
  if (completedSteps.value.includes(step) || step === currentStep.value) {
    currentStep.value = step
  }
}

const handlePersonalInfoSubmit = () => {
  // Mark step 1 as completed
  if (!completedSteps.value.includes(1)) {
    completedSteps.value.push(1)
  }
  // Move to step 2
  currentStep.value = 2
}

const handlePaymentSubmit = () => {
  // Mark step 2 as completed
  if (!completedSteps.value.includes(2)) {
    completedSteps.value.push(2)
  }

  // Process the order
  console.log('Processing order...', {
    personalInfo: personalInfo.value,
    paymentInfo: paymentInfo.value,
  })

  // In production: redirect to confirmation page or show success message
  alert('Pedido confirmado! (En producción, esto redirigiría a una página de confirmación)')
}

</script>

<template>
  <div>
    <Section class="!pt-0">
      <!-- Back Link -->
      <!-- <NuxtLink
        to="/carrito"
        class="inline-flex items-center gap-2 font-body text-base text-primary hover:underline mb-6"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Volver al carrito</span>
      </NuxtLink> -->

      <!-- Header -->
      <div class="mb-8 md:mb-12">
        <h1 class="font-title text-3xl md:text-4xl lg:text-5xl text-black font-normal">
          Finalizar pedido
        </h1>
      </div>

      <!-- Empty State -->
      <div v-if="isEmpty" class="text-center py-16 md:py-24">
        <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-neutral-100 rounded-full">
          <ShoppingCartIcon class="w-12 h-12 text-black" :stroke-width="1.5" />
        </div>
        <h2 class="font-title text-2xl md:text-3xl text-black font-normal mb-4">
          Tu carrito está vacío
        </h2>
        <p class="font-body text-base md:text-lg text-neutral-600 mb-8 max-w-md mx-auto">
          No puedes proceder al checkout sin productos en tu carrito. Agrega algunos productos para continuar.
        </p>
        <NuxtLink
          to="/productos"
          class="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-body text-base hover:bg-neutral-800 transition-colors"
        >
          <span>Ver productos</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Checkout Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
        <!-- Left: Checkout Steps -->
        <div class="space-y-4">
          <!-- Step 1: Personal Information -->
          <CheckoutStepAccordion
            :step-number="1"
            title="Información personal"
            :status="getStepStatus(1)"
            :is-open="isStepOpen(1)"
            :disabled="isStepDisabled(1)"
            @toggle="toggleStep(1)"
          >
            <CheckoutPersonalInfo
              v-model="personalInfo"
              @submit="handlePersonalInfoSubmit"
            />
          </CheckoutStepAccordion>

          <!-- Step 2: Payment Method -->
          <CheckoutStepAccordion
            :step-number="2"
            title="Método de pago"
            :status="getStepStatus(2)"
            :is-open="isStepOpen(2)"
            :disabled="isStepDisabled(2)"
            @toggle="toggleStep(2)"
          >
            <CheckoutPaymentMethod
              v-model="paymentInfo"
              @submit="handlePaymentSubmit"
            />
          </CheckoutStepAccordion>
        </div>

        <!-- Right: Order Summary -->
        <div>
          <CheckoutOrderSummary
            :items="cartItems"
            :subtotal="subtotal"
            :shipping="shipping"
            :tax="tax"
          />
        </div>
      </div>
    </Section>
  </div>
</template>
