<script setup>
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

// Cart data (in production would come from Pinia store)
const cartItems = ref([
  {
    id: 1,
    name: 'Sealapex Cemento Sellador Radicular',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    price: 250,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Sealapex Cemento Sellador Radicular',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    price: 250,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Sealapex Cemento Sellador Radicular',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    price: 250,
    quantity: 1,
  },
])

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const shipping = ref(15)
const tax = computed(() => subtotal.value * 0.021)

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

      <!-- Checkout Content -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
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
