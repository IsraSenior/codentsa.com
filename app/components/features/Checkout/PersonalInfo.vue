<script setup>
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

const isValid = computed(() => {
  return (
    formData.value.fullName &&
    formData.value.email &&
    formData.value.phone &&
    formData.value.address &&
    formData.value.city &&
    formData.value.postalCode &&
    formData.value.country
  )
})

const handleSubmit = () => {
  if (isValid.value) {
    emit('submit')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <!-- Full Name -->
      <input
        :value="formData.fullName"
        type="text"
        placeholder="Nombre completo"
        class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
        required
        @input="updateField('fullName', $event.target.value)"
      >

      <!-- Email and Phone -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          :value="formData.email"
          type="email"
          placeholder="Correo electrónico"
          class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
          required
          @input="updateField('email', $event.target.value)"
        >

        <input
          :value="formData.phone"
          type="tel"
          placeholder="Teléfono"
          class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
          required
          @input="updateField('phone', $event.target.value)"
        >
      </div>

      <!-- Address -->
      <input
        :value="formData.address"
        type="text"
        placeholder="Dirección"
        class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
        required
        @input="updateField('address', $event.target.value)"
      >

      <!-- City, Postal Code, Country -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          :value="formData.city"
          type="text"
          placeholder="Ciudad"
          class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
          required
          @input="updateField('city', $event.target.value)"
        >

        <input
          :value="formData.postalCode"
          type="text"
          placeholder="Código postal"
          class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
          required
          @input="updateField('postalCode', $event.target.value)"
        >

        <CheckoutCountrySelector
          :model-value="formData.country"
          @update:model-value="updateField('country', $event)"
        />
      </div>

      <!-- Additional Notes -->
      <div class="relative">
        <textarea
          :value="formData.notes"
          placeholder="Notas adicionales"
          rows="3"
          class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors resize-none"
          @input="updateField('notes', $event.target.value)"
        />
        <span class="absolute top-3 right-3 text-xs text-neutral-500">(opcional)</span>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end pt-4">
        <button
          type="submit"
          class="px-8 py-3 bg-black text-white rounded-lg font-body text-base hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValid"
        >
          Continuar al pago
        </button>
      </div>
    </div>
  </form>
</template>
