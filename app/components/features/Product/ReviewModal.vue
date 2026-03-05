<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  productName: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close', 'submit'])

// Form state
const currentStep = ref(1)
const formData = ref({
  rating: 0,
  title: '',
  text: '',
  name: '',
  email: '',
})

const steps = [
  { number: 1, title: 'Calificación' },
  { number: 2, title: 'Tu opinión' },
  { number: 3, title: 'Tus datos' },
]

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 1:
      return formData.value.rating > 0
    case 2:
      return formData.value.title.trim() && formData.value.text.trim()
    case 3:
      return formData.value.name.trim() && formData.value.email.trim()
    default:
      return false
  }
})

const hoverRating = ref(0)

const nextStep = () => {
  if (isStepValid.value && currentStep.value < 3) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const handleSubmit = () => {
  if (isStepValid.value) {
    emit('submit', { ...formData.value })
    closeModal()
  }
}

const closeModal = () => {
  emit('close')
  // Reset form
  setTimeout(() => {
    currentStep.value = 1
    formData.value = {
      rating: 0,
      title: '',
      text: '',
      name: '',
      email: '',
    }
  }, 300)
}

const setRating = (rating) => {
  formData.value.rating = rating
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <!-- Header -->
            <div class="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 class="font-title text-2xl md:text-3xl text-black font-normal">
                  Añade tu comentario
                </h2>
                <p class="font-body text-sm text-neutral-600 mt-1">
                  {{ productName }}
                </p>
              </div>
              <button
                class="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
                @click="closeModal"
              >
                <XMarkIcon class="w-6 h-6 text-black" />
              </button>
            </div>

            <!-- Progress Steps -->
            <div class="px-6 py-6 border-b border-neutral-200">
              <div class="flex items-center justify-between">
                <div
                  v-for="step in steps"
                  :key="step.number"
                  class="flex items-center"
                  :class="step.number < 3 ? 'flex-1' : ''"
                >
                  <div class="flex items-center">
                    <div
                      class="w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-medium transition-colors"
                      :class="
                        currentStep >= step.number
                          ? 'bg-primary text-white'
                          : 'bg-neutral-200 text-neutral-600'
                      "
                    >
                      {{ step.number }}
                    </div>
                    <span
                      class="ml-3 font-body text-sm font-medium hidden md:inline"
                      :class="
                        currentStep >= step.number ? 'text-black' : 'text-neutral-400'
                      "
                    >
                      {{ step.title }}
                    </span>
                  </div>

                  <div
                    v-if="step.number < 3"
                    class="flex-1 h-1 mx-4"
                    :class="
                      currentStep > step.number ? 'bg-primary' : 'bg-neutral-200'
                    "
                  />
                </div>
              </div>
            </div>

            <!-- Form Content -->
            <div class="px-6 py-8">
              <!-- Step 1: Rating -->
              <div v-if="currentStep === 1" class="space-y-6">
                <div class="text-center">
                  <h3 class="font-title text-xl md:text-2xl text-black font-normal mb-4">
                    ¿Cómo calificarías este producto?
                  </h3>
                  <div class="flex items-center justify-center gap-2 mb-2">
                    <button
                      v-for="star in 5"
                      :key="star"
                      class="transition-transform hover:scale-110"
                      @click="setRating(star)"
                      @mouseenter="hoverRating = star"
                      @mouseleave="hoverRating = 0"
                    >
                      <svg
                        class="w-12 h-12"
                        :class="
                          star <= (hoverRating || formData.rating)
                            ? 'text-primary'
                            : 'text-neutral-300'
                        "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p v-if="formData.rating > 0" class="font-body text-sm text-neutral-600">
                    {{ formData.rating }} de 5 estrellas
                  </p>
                </div>
              </div>

              <!-- Step 2: Opinion -->
              <div v-if="currentStep === 2" class="space-y-6">
                <div>
                  <label class="block font-body text-sm font-medium text-black mb-2">
                    Título de tu review
                  </label>
                  <input
                    v-model="formData.title"
                    type="text"
                    placeholder="Ej: Excelente producto"
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                </div>

                <div>
                  <label class="block font-body text-sm font-medium text-black mb-2">
                    Tu opinión
                  </label>
                  <textarea
                    v-model="formData.text"
                    rows="6"
                    placeholder="Cuéntanos tu experiencia con este producto..."
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <!-- Step 3: Personal Data -->
              <div v-if="currentStep === 3" class="space-y-6">
                <div>
                  <label class="block font-body text-sm font-medium text-black mb-2">
                    Nombre completo
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    placeholder="Tu nombre"
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                </div>

                <div>
                  <label class="block font-body text-sm font-medium text-black mb-2">
                    Correo electrónico
                  </label>
                  <input
                    v-model="formData.email"
                    type="email"
                    placeholder="tu@email.com"
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                </div>

                <div class="bg-neutral-50 rounded-lg p-4">
                  <p class="font-body text-sm text-neutral-600">
                    Tu review será revisada por nuestro equipo antes de ser publicada. Te
                    notificaremos por correo cuando esté aprobada.
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex items-center justify-between">
              <button
                v-if="currentStep > 1"
                class="px-6 py-3 border border-neutral-300 rounded-full font-body text-sm md:text-base text-black hover:border-black transition-colors"
                @click="prevStep"
              >
                Anterior
              </button>
              <div v-else />

              <button
                v-if="currentStep < 3"
                class="px-6 py-3 bg-black text-white rounded-full font-body text-sm md:text-base hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!isStepValid"
                @click="nextStep"
              >
                Siguiente
              </button>

              <button
                v-else
                class="px-6 py-3 bg-primary text-white rounded-full font-body text-sm md:text-base hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!isStepValid"
                @click="handleSubmit"
              >
                Enviar review
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
