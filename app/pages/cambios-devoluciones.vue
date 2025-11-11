<script setup>
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

// Step tracking
const currentStep = ref(1)
const totalSteps = 3

// Form data
const formData = reactive({
  // Step 1 - Personal Information
  nombres: '',
  apellidos: '',
  email: '',
  fechaSolicitud: '',
  apartamento: '',
  ciudad: '',
  estado: '',
  pais: '',
  celular: '',

  // Step 2 - Product Information
  nombreProducto: '',
  idProducto: '',
  fechaCompra: '',
  leyoPolitica: null, // true for Sí, false for No
})

// Date input handling
const fechaSolicitudType = ref('text')
const fechaCompraType = ref('text')

const handleFechaFocus = (field) => {
  if (field === 'solicitud') {
    fechaSolicitudType.value = 'date'
  } else if (field === 'compra') {
    fechaCompraType.value = 'date'
  }
}

const handleFechaBlur = (field) => {
  if (field === 'solicitud' && !formData.fechaSolicitud) {
    fechaSolicitudType.value = 'text'
  } else if (field === 'compra' && !formData.fechaCompra) {
    fechaCompraType.value = 'text'
  }
}

// Navigation functions
const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const finish = () => {
  // Handle form submission
  console.log('Form submitted:', formData)
  // Navigate to home or show success message
  navigateTo('/')
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <Section class="!pt-0">
      <div class="text-center mb-12">
        <h1 class="font-title text-4xl md:text-5xl lg:text-6xl text-black font-normal mb-4">
          Cambios y devoluciones
        </h1>
        <p class="font-body text-base md:text-lg text-black">
          Completa el formulario para procesar tu solicitud de devolución
        </p>
      </div>

      <!-- Progress Indicator -->
      <div class="flex justify-center items-center mb-12">
        <template v-for="step in totalSteps" :key="step">
          <div
            class="w-4 h-4 rounded-full transition-all duration-300 border-2"
            :class="step <= currentStep ? 'bg-black border-black' : 'bg-white border-black'"
          />
          <div
            v-if="step < totalSteps"
            class="w-16 md:w-24 h-0.5 transition-colors duration-300"
            :class="step < currentStep ? 'bg-black' : 'bg-black'"
          />
        </template>
      </div>

      <!-- Form Container -->
      <div class="max-w-3xl mx-auto">
        <div class="bg-neutral-50 rounded-3xl p-8 md:p-12">
          <!-- Step 1: Personal Information -->
          <div v-if="currentStep === 1" class="space-y-6">
            <h2 class="font-title text-2xl md:text-3xl text-black font-normal mb-8">
              Información personal
            </h2>

            <!-- Nombres y Apellidos -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                v-model="formData.nombres"
                type="text"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                placeholder="Nombres"
              >
              <input
                v-model="formData.apellidos"
                type="text"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                placeholder="Apellidos"
              >
            </div>

            <!-- Email -->
            <input
              v-model="formData.email"
              type="email"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
              placeholder="E-mail"
            >

            <!-- Fecha de solicitud -->
            <input
              v-model="formData.fechaSolicitud"
              :type="fechaSolicitudType"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors custom-date-input"
              placeholder="Fecha de solicitud"
              @focus="handleFechaFocus('solicitud')"
              @blur="handleFechaBlur('solicitud')"
            >

            <!-- Apartamento, piso, etc. -->
            <input
              v-model="formData.apartamento"
              type="text"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
              placeholder="Apartamento, piso, etc."
            >

            <!-- Ciudad, Estado -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                v-model="formData.ciudad"
                type="text"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                placeholder="Ciudad"
              >
              <input
                v-model="formData.estado"
                type="text"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                placeholder="Estado"
              >
            </div>

            <!-- País -->
            <input
              v-model="formData.pais"
              type="text"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
              placeholder="País"
            >

            <!-- Celular -->
            <input
              v-model="formData.celular"
              type="tel"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
              placeholder="Celular"
            >

            <!-- Navigation -->
            <div class="flex justify-end pt-4">
              <Button
                variant="solid"
                color="dark"
                size="lg"
                @click="nextStep"
              >
                Siguiente
                <ArrowRightIcon class="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          <!-- Step 2: Product Information -->
          <div v-if="currentStep === 2" class="space-y-6">
            <h2 class="font-title text-2xl md:text-3xl text-black font-normal mb-8">
              Información del producto
            </h2>

            <!-- Nombre del producto -->
            <input
              v-model="formData.nombreProducto"
              type="text"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
              placeholder="Nombre del producto"
            >

            <!-- ID del producto -->
            <input
              v-model="formData.idProducto"
              type="text"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
              placeholder="ID del producto"
            >

            <!-- Fecha de compra del producto -->
            <input
              v-model="formData.fechaCompra"
              :type="fechaCompraType"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors custom-date-input"
              placeholder="Fecha de compra del producto"
              @focus="handleFechaFocus('compra')"
              @blur="handleFechaBlur('compra')"
            >

            <!-- Política de devoluciones -->
            <div class="pt-4">
              <p class="font-body text-base text-black mb-4">
                ¿Leíste la política de devoluciones?
              </p>
              <div class="flex gap-6 mb-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="formData.leyoPolitica"
                    type="radio"
                    :value="true"
                    class="w-5 h-5 text-primary focus:ring-primary"
                  >
                  <span class="font-body text-base text-black">Sí</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="formData.leyoPolitica"
                    type="radio"
                    :value="false"
                    class="w-5 h-5 text-primary focus:ring-primary"
                  >
                  <span class="font-body text-base text-black">No</span>
                </label>
              </div>
              <NuxtLink
                to="/politicas-privacidad"
                class="font-body text-sm text-primary hover:underline inline-block"
              >
                Abrir política de devoluciones
              </NuxtLink>
            </div>

            <!-- Navigation -->
            <div class="flex justify-between pt-4">
              <Button
                variant="outline"
                color="dark"
                size="lg"
                @click="prevStep"
              >
                <ArrowLeftIcon class="w-5 h-5 mr-2" />
                Atrás
              </Button>
              <Button
                variant="solid"
                color="dark"
                size="lg"
                @click="nextStep"
              >
                Siguiente
                <ArrowRightIcon class="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          <!-- Step 3: Confirmation -->
          <div v-if="currentStep === 3" class="text-center py-8">
            <div class="mb-8">
              <h2 class="font-title text-2xl md:text-3xl text-black font-normal mb-4">
                Espera un correo de confirmación de Codentsa
              </h2>
              <p class="font-body text-base md:text-lg text-black leading-relaxed max-w-xl mx-auto">
                Hemos recibido tu solicitud de devolución. En las próximas 24-48 horas recibirás un correo electrónico con las instrucciones detalladas para completar el proceso de devolución. Por favor revisa tu bandeja de entrada y spam.
              </p>
            </div>

            <!-- Navigation -->
            <div class="flex justify-between pt-4">
              <Button
                variant="outline"
                color="dark"
                size="lg"
                @click="prevStep"
              >
                <ArrowLeftIcon class="w-5 h-5 mr-2" />
                Atrás
              </Button>
              <Button
                variant="solid"
                color="dark"
                size="lg"
                @click="finish"
              >
                Listo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <!-- FAQ Section -->
    <Section class="bg-white">
      <FAQAccordion />
    </Section>
  </div>
</template>

<style>
/* Custom date input styles */
.custom-date-input::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}

/* Hide default date icon when type is text */
.custom-date-input[type="text"]::-webkit-calendar-picker-indicator {
  display: none;
}

/* Style for date input when focused/filled */
.custom-date-input[type="date"] {
  color-scheme: light;
}

/* Remove default date input styles in WebKit browsers */
.custom-date-input::-webkit-datetime-edit {
  font-family: 'Blauer Nue', sans-serif;
}

.custom-date-input::-webkit-datetime-edit-fields-wrapper {
  font-family: 'Blauer Nue', sans-serif;
}

.custom-date-input::-webkit-datetime-edit-text {
  color: #162526;
  padding: 0 0.25rem;
}

.custom-date-input::-webkit-datetime-edit-month-field,
.custom-date-input::-webkit-datetime-edit-day-field,
.custom-date-input::-webkit-datetime-edit-year-field {
  color: #162526;
}

/* Firefox */
.custom-date-input::-moz-calendar-picker-indicator {
  background: transparent;
  cursor: pointer;
}

.custom-date-input[type="text"]::-moz-calendar-picker-indicator {
  display: none;
}
</style>
