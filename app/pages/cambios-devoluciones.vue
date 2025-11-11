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
    <Section class="pt-0">
      <div class="text-center mb-12">
        <h1 class="font-title text-4xl md:text-5xl lg:text-6xl text-black font-normal mb-4">
          Cambios y devoluciones
        </h1>
        <p class="font-body text-base md:text-lg text-black">
          Completa el formulario para procesar tu solicitud de devolución
        </p>
      </div>

      <!-- Progress Indicator -->
      <div class="flex justify-center items-center gap-3 mb-12">
        <div
          v-for="step in totalSteps"
          :key="step"
          class="w-3 h-3 rounded-full transition-colors duration-300"
          :class="step <= currentStep ? 'bg-primary' : 'bg-neutral-300'"
        />
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
              <div>
                <label class="block font-body text-sm md:text-base text-black mb-2">
                  Nombres
                </label>
                <input
                  v-model="formData.nombres"
                  type="text"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="Ingresa tus nombres"
                >
              </div>
              <div>
                <label class="block font-body text-sm md:text-base text-black mb-2">
                  Apellidos
                </label>
                <input
                  v-model="formData.apellidos"
                  type="text"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="Ingresa tus apellidos"
                >
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block font-body text-sm md:text-base text-black mb-2">
                E-mail
              </label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                placeholder="tu@email.com"
              >
            </div>

            <!-- Fecha de solicitud -->
            <div>
              <label class="block font-body text-sm md:text-base text-black mb-2">
                Fecha de solicitud
              </label>
              <input
                v-model="formData.fechaSolicitud"
                type="date"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
              >
            </div>

            <!-- Apartamento, piso, etc. -->
            <div>
              <label class="block font-body text-sm md:text-base text-black mb-2">
                Apartamento, piso, etc.
              </label>
              <input
                v-model="formData.apartamento"
                type="text"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                placeholder="Número de apartamento o información adicional"
              >
            </div>

            <!-- Ciudad, Estado, País -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block font-body text-sm md:text-base text-black mb-2">
                  Ciudad
                </label>
                <input
                  v-model="formData.ciudad"
                  type="text"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="Tu ciudad"
                >
              </div>
              <div>
                <label class="block font-body text-sm md:text-base text-black mb-2">
                  Estado
                </label>
                <input
                  v-model="formData.estado"
                  type="text"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="Tu estado"
                >
              </div>
            </div>

            <!-- País -->
            <div>
              <label class="block font-body text-sm md:text-base text-black mb-2">
                País
              </label>
              <input
                v-model="formData.pais"
                type="text"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                placeholder="Tu país"
              >
            </div>

            <!-- Celular -->
            <div>
              <label class="block font-body text-sm md:text-base text-black mb-2">
                Celular
              </label>
              <input
                v-model="formData.celular"
                type="tel"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                placeholder="+1 234 567 8900"
              >
            </div>

            <!-- Navigation -->
            <div class="flex justify-end pt-4">
              <Button
                variant="solid"
                color="primary"
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
            <div>
              <label class="block font-body text-sm md:text-base text-black mb-2">
                Nombre del producto
              </label>
              <input
                v-model="formData.nombreProducto"
                type="text"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                placeholder="Ingresa el nombre del producto"
              >
            </div>

            <!-- ID del producto -->
            <div>
              <label class="block font-body text-sm md:text-base text-black mb-2">
                ID del producto
              </label>
              <input
                v-model="formData.idProducto"
                type="text"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
                placeholder="Código o ID del producto"
              >
            </div>

            <!-- Fecha de compra del producto -->
            <div>
              <label class="block font-body text-sm md:text-base text-black mb-2">
                Fecha de compra del producto
              </label>
              <input
                v-model="formData.fechaCompra"
                type="date"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors"
              >
            </div>

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
                color="primary"
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
              <svg
                class="w-20 h-20 mx-auto text-success mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
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
                color="primary"
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
