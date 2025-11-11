<script setup>
import { CreditCardIcon, BanknotesIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const updateField = (field, value) => {
  emit('update:modelValue', {
    ...formData.value,
    [field]: value,
  })
}

const selectPaymentMethod = (method) => {
  updateField('method', method)
}

const isCardFormValid = computed(() => {
  if (formData.value.method !== 'redsys') return true

  return (
    formData.value.cardNumber &&
    formData.value.cardHolder &&
    formData.value.expiryDate &&
    formData.value.cvv
  )
})

const isValid = computed(() => {
  return formData.value.method && isCardFormValid.value
})

const handleSubmit = () => {
  if (isValid.value) {
    emit('submit')
  }
}

// Format card number with spaces
const formatCardNumber = (value) => {
  const cleaned = value.replace(/\s/g, '')
  const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
  updateField('cardNumber', formatted)
}

// Format expiry date as MM/YY
const formatExpiryDate = (value) => {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length >= 2) {
    updateField('expiryDate', `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`)
  } else {
    updateField('expiryDate', cleaned)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-6">
      <!-- Payment Method Selection -->
      <div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Redsys / Credit Card -->
          <button
            type="button"
            class="p-4 border-2 rounded-lg transition-all text-left"
            :class="formData.method === 'redsys' ? 'border-primary bg-primary-50/30' : 'border-neutral-300 hover:border-neutral-400'"
            @click="selectPaymentMethod('redsys')"
          >
            <div class="flex items-center gap-3 mb-2">
              <CreditCardIcon class="w-6 h-6 text-black" />
              <span class="font-title text-base text-black font-normal">Tarjeta de crédito</span>
            </div>
            <p class="font-body text-sm text-neutral-600 mb-2">
              Pago seguro con tarjeta vía Redsys
            </p>
            <div class="flex items-center gap-1 text-xs text-neutral-500">
              <span>Powered by</span>
              <span class="font-semibold text-primary">Redsys</span>
            </div>
          </button>

          <!-- Bank Transfer -->
          <button
            type="button"
            class="p-4 border-2 rounded-lg transition-all text-left"
            :class="formData.method === 'transfer' ? 'border-primary bg-primary-50/30' : 'border-neutral-300 hover:border-neutral-400'"
            @click="selectPaymentMethod('transfer')"
          >
            <div class="flex items-center gap-3 mb-2">
              <BanknotesIcon class="w-6 h-6 text-black" />
              <span class="font-title text-base text-black font-normal">Transferencia bancaria</span>
            </div>
            <p class="font-body text-sm text-neutral-600">
              Pago manual por transferencia
            </p>
          </button>
        </div>
      </div>

      <!-- Credit Card Form (Redsys) -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="formData.method === 'redsys'" class="space-y-4">
          <!-- Accepted Cards -->
          <div class="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
            <span class="font-body text-sm text-neutral-600">Tarjetas aceptadas:</span>
            <div class="flex items-center gap-2">
              <!-- Visa -->
              <div class="h-8 px-3 bg-white rounded border border-neutral-200 flex items-center justify-center">
                <svg class="h-4" viewBox="0 0 48 16" fill="none">
                  <path d="M20.58 0.75h-3.96l-2.48 14.5h3.96l2.48-14.5zm11.16 9.4l2.08-5.74 1.2 5.74h-3.28zm4.44 5.1h3.66l-3.2-14.5h-3.36c-.76 0-1.4.44-1.68 1.12l-5.92 13.38h4.16l.82-2.28h5.08l.48 2.28h-.04zm-10.08-4.76c.02-3.82-5.28-4.04-5.24-5.74.02-.52.5-.94 1.58-1.06 1.5-.14 2.82.26 3.64.68l.64-3.02c-.88-.32-2-.62-3.42-.62-3.92 0-6.68 2.08-6.7 5.08-.04 2.2 1.96 3.44 3.46 4.18 1.54.76 2.06 1.24 2.06 1.92 0 1.04-1.24 1.5-2.4 1.52-2.02.04-3.18-.54-4.12-1l-.72 3.4c.94.44 2.66.82 4.46.84 4.18 0 6.92-2.06 6.94-5.26l-.18.08zM16.92.75l-6.46 14.5h-4.2L3.16 3.71c-.2-.78-.38-1.06-1-1.4-.98-.52-2.62-1.02-4.06-1.32l.1-.5h7c.9 0 1.7.6 1.9 1.64l1.74 9.26 4.3-10.9h4.18l-.4.26z" fill="#1434CB" />
                </svg>
              </div>
              <!-- Mastercard -->
              <div class="h-8 px-3 bg-white rounded border border-neutral-200 flex items-center justify-center">
                <svg class="h-4" viewBox="0 0 48 32" fill="none">
                  <circle cx="18" cy="16" r="14" fill="#EB001B" />
                  <circle cx="30" cy="16" r="14" fill="#FF5F00" />
                  <circle cx="24" cy="16" r="14" fill="#F79E1B" opacity="0.7" />
                </svg>
              </div>
              <!-- American Express -->
              <div class="h-8 px-3 bg-white rounded border border-neutral-200 flex items-center justify-center">
                <svg class="h-4" viewBox="0 0 48 16" fill="none">
                  <rect width="48" height="16" rx="2" fill="#006FCF" />
                  <text x="24" y="11" text-anchor="middle" fill="white" font-size="8" font-weight="bold">AMEX</text>
                </svg>
              </div>
            </div>
          </div>

          <!-- Card Number -->
          <input
            :value="formData.cardNumber"
            type="text"
            placeholder="Número de tarjeta"
            maxlength="19"
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
            required
            @input="formatCardNumber($event.target.value)"
          >

          <!-- Card Holder -->
          <input
            :value="formData.cardHolder"
            type="text"
            placeholder="Nombre del titular"
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors uppercase"
            required
            @input="updateField('cardHolder', $event.target.value.toUpperCase())"
          >

          <!-- Expiry Date and CVV -->
          <div class="grid grid-cols-2 gap-4">
            <input
              :value="formData.expiryDate"
              type="text"
              placeholder="Fecha de expiración (MM/AA)"
              maxlength="5"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
              required
              @input="formatExpiryDate($event.target.value)"
            >

            <input
              :value="formData.cvv"
              type="text"
              placeholder="CVV"
              maxlength="4"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
              required
              @input="updateField('cvv', $event.target.value.replace(/\D/g, ''))"
            >
          </div>
        </div>
      </Transition>

      <!-- Bank Transfer Instructions -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="formData.method === 'transfer'" class="p-4 bg-neutral-50 rounded-lg">
          <h4 class="font-title text-base text-black font-normal mb-3">
            Instrucciones para transferencia bancaria
          </h4>
          <div class="space-y-2 font-body text-sm text-neutral-700">
            <p>
              Realiza la transferencia a la siguiente cuenta bancaria:
            </p>
            <div class="bg-white p-4 rounded border border-neutral-200">
              <div class="grid grid-cols-2 gap-2">
                <span class="font-medium">Banco:</span>
                <span>Banco Santander</span>
                <span class="font-medium">IBAN:</span>
                <span class="font-mono">ES12 3456 7890 1234 5678 9012</span>
                <span class="font-medium">Titular:</span>
                <span>Codentsa S.L.</span>
                <span class="font-medium">Concepto:</span>
                <span>Pedido #[Se asignará al confirmar]</span>
              </div>
            </div>
            <p class="text-xs text-neutral-600 mt-3">
              * Una vez realizada la transferencia, tu pedido será procesado en un plazo de 24-48 horas laborables.
            </p>
          </div>
        </div>
      </Transition>

      <!-- Submit Button -->
      <div class="flex justify-end pt-4">
        <button
          type="submit"
          class="px-8 py-3 bg-black text-white rounded-lg font-body text-base hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValid"
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  </form>
</template>
