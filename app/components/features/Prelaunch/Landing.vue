<script setup>
useSeoMeta({
  title: 'Codentsa - Material dental online | Próximamente',
  description:
    'Regístrate para acceder antes que nadie a la nueva tienda online de material dental profesional de Codentsa.',
  ogTitle: 'Codentsa - Material dental online | Próximamente',
  ogDescription:
    'Más de 30 años de confianza en material dental. Pronto online. Regístrate para acceso anticipado.',
  ogType: 'website',
})

const emit = defineEmits(['request-access'])

const formData = reactive({
  nombre: '',
  clinica: '',
  cargo: '',
  email: '',
  telefono: '',
  codigo_postal: '',
  ciudad: '',
  provincia: '',
  calle: '',
  intereses: [],
  intencion_comercial: '',
  consentimiento: false,
})

const errors = reactive({})
const isSubmitting = ref(false)
const isSuccess = ref(false)

const interesesOptions = [
  'Implantología',
  'Ortodoncia',
  'Endodoncia',
  'Cirugía oral',
  'Periodoncia',
  'Prótesis dental',
  'Estética dental',
  'Higiene y profilaxis',
  'Equipamiento clínico',
  'Instrumental rotatorio',
]

const intencionOptions = [
  { value: 'comprar', label: 'Quiero comprar en cuanto abra la tienda' },
  { value: 'evaluando', label: 'Estoy evaluando opciones' },
  { value: 'informacion', label: 'Solo quiero información' },
]

const validate = () => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => delete errors[key])

  if (!formData.nombre.trim()) errors.nombre = 'El nombre es obligatorio'
  if (!formData.clinica.trim()) errors.clinica = 'El nombre de la clínica es obligatorio'

  if (!formData.email.trim()) {
    errors.email = 'El email es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Introduce un email válido'
  }

  if (!formData.codigo_postal.trim()) {
    errors.codigo_postal = 'El código postal es obligatorio'
  } else if (!/^\d{5}$/.test(formData.codigo_postal)) {
    errors.codigo_postal = 'Introduce un código postal válido (5 dígitos)'
  }

  if (!formData.ciudad.trim()) errors.ciudad = 'La ciudad es obligatoria'
  if (!formData.consentimiento) errors.consentimiento = 'Debes aceptar la política de privacidad'

  return Object.keys(errors).length === 0
}

const submitForm = async () => {
  if (!validate()) return

  isSubmitting.value = true

  try {
    await $fetch('/api/leads/register', {
      method: 'POST',
      body: formData,
    })
    isSuccess.value = true
  } catch (error) {
    errors.submit = 'Ha ocurrido un error. Por favor, inténtalo de nuevo.'
  } finally {
    isSubmitting.value = false
  }
}

const scrollToForm = () => {
  document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' })
}

const toggleInteres = (interes) => {
  const index = formData.intereses.indexOf(interes)
  if (index === -1) {
    formData.intereses.push(interes)
  } else {
    formData.intereses.splice(index, 1)
  }
}

const inputClasses =
  'w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white font-body text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors'
const labelClasses = 'font-body text-sm font-medium text-neutral-700 mb-1.5 block'
const errorClasses = 'text-error text-xs font-body mt-1'
</script>

<template>
  <PrelaunchSuccessMessage v-if="isSuccess" />

  <div v-else class="min-h-screen">
    <!-- Header -->
    <header class="bg-white border-b border-neutral-200">
      <div class="max-w-6xl mx-auto px-5 py-5 flex items-center justify-center gap-3">
        <Logo color="text-primary" class="h-6 w-auto" />
        <span
          class="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 font-body text-xs font-medium text-primary-700"
        >
          Próximamente
        </span>
      </div>
    </header>

    <!-- Hero Section -->
    <section
      class="relative overflow-hidden py-20 md:py-32"
      style="background: linear-gradient(135deg, #87071a 0%, #780716 100%)"
    >
      <!-- Subtle pattern overlay -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute inset-0"
          style="
            background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
            background-size: 40px 40px;
          "
        ></div>
      </div>

      <div class="relative max-w-4xl mx-auto px-5 text-center">
        <h1 class="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Material dental de confianza, ahora online
        </h1>
        <p class="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Codentsa lleva más de 30 años siendo el partner de confianza de clínicas dentales en toda
          España. Pronto podrás hacer tus pedidos online con la misma calidad y servicio de siempre.
        </p>
        <Button variant="solid" color="light" size="lg" @click="scrollToForm">
          Regístrate para acceso anticipado
        </Button>
      </div>
    </section>

    <!-- Beneficios Section -->
    <section class="bg-neutral-50 py-16 md:py-24">
      <div class="max-w-6xl mx-auto px-5">
        <h2 class="font-title text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
          ¿Por qué registrarte?
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <!-- Card: Acceso anticipado -->
          <div
            class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div
              class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-5"
            >
              <svg
                class="w-6 h-6 text-primary-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h3 class="font-title text-xl font-semibold text-neutral-900 mb-3">
              Acceso anticipado
            </h3>
            <p class="font-body text-neutral-600 leading-relaxed">
              Sé el primero en acceder a nuestra tienda online antes del lanzamiento oficial.
            </p>
          </div>

          <!-- Card: Ofertas exclusivas -->
          <div
            class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div
              class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-5"
            >
              <svg
                class="w-6 h-6 text-primary-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              </svg>
            </div>
            <h3 class="font-title text-xl font-semibold text-neutral-900 mb-3">
              Ofertas exclusivas
            </h3>
            <p class="font-body text-neutral-600 leading-relaxed">
              Promociones especiales solo para profesionales que se registren antes del lanzamiento.
            </p>
          </div>

          <!-- Card: Precios de feria -->
          <div
            class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div
              class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-5"
            >
              <svg
                class="w-6 h-6 text-primary-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </div>
            <h3 class="font-title text-xl font-semibold text-neutral-900 mb-3">
              Precios de feria
            </h3>
            <p class="font-body text-neutral-600 leading-relaxed">
              Accede a las mismas condiciones que ofrecemos en Expodental, desde tu clínica.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulario Section -->
    <section id="registro" class="bg-white py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-5">
        <div class="text-center mb-12">
          <h2 class="font-title text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Regístrate para acceso anticipado
          </h2>
          <p class="font-body text-neutral-600 text-lg">
            Completa tus datos y te avisaremos en cuanto abramos la tienda.
          </p>
        </div>

        <form @submit.prevent="submitForm" novalidate>
          <!-- Datos profesionales -->
          <fieldset class="mb-10">
            <legend class="font-title text-lg font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200 w-full">
              Datos profesionales
            </legend>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Nombre -->
              <div>
                <label :class="labelClasses" for="nombre">
                  Nombre completo <span class="text-primary" aria-hidden="true">*</span>
                </label>
                <input
                  id="nombre"
                  v-model="formData.nombre"
                  type="text"
                  :class="[inputClasses, errors.nombre ? 'border-error' : '']"
                  placeholder="Dr. Juan García"
                  required
                  autocomplete="name"
                />
                <p v-if="errors.nombre" :class="errorClasses" role="alert">{{ errors.nombre }}</p>
              </div>

              <!-- Clínica -->
              <div>
                <label :class="labelClasses" for="clinica">
                  Nombre de la clínica <span class="text-primary" aria-hidden="true">*</span>
                </label>
                <input
                  id="clinica"
                  v-model="formData.clinica"
                  type="text"
                  :class="[inputClasses, errors.clinica ? 'border-error' : '']"
                  placeholder="Clínica Dental García"
                  required
                  autocomplete="organization"
                />
                <p v-if="errors.clinica" :class="errorClasses" role="alert">
                  {{ errors.clinica }}
                </p>
              </div>

              <!-- Cargo -->
              <div>
                <label :class="labelClasses" for="cargo">Cargo</label>
                <input
                  id="cargo"
                  v-model="formData.cargo"
                  type="text"
                  :class="inputClasses"
                  placeholder="Director/a, Odontólogo/a..."
                  autocomplete="organization-title"
                />
              </div>

              <!-- Email -->
              <div>
                <label :class="labelClasses" for="email">
                  Email profesional <span class="text-primary" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  :class="[inputClasses, errors.email ? 'border-error' : '']"
                  placeholder="contacto@clinica.es"
                  required
                  autocomplete="email"
                />
                <p v-if="errors.email" :class="errorClasses" role="alert">{{ errors.email }}</p>
              </div>

              <!-- Teléfono -->
              <div class="md:col-span-2">
                <label :class="labelClasses" for="telefono">Teléfono</label>
                <input
                  id="telefono"
                  v-model="formData.telefono"
                  type="tel"
                  :class="inputClasses"
                  placeholder="912 345 678"
                  autocomplete="tel"
                />
              </div>
            </div>
          </fieldset>

          <!-- Dirección de envío -->
          <fieldset class="mb-10">
            <legend class="font-title text-lg font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200 w-full">
              Dirección de envío
            </legend>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Código postal -->
              <div>
                <label :class="labelClasses" for="codigo_postal">
                  Código postal <span class="text-primary" aria-hidden="true">*</span>
                </label>
                <input
                  id="codigo_postal"
                  v-model="formData.codigo_postal"
                  type="text"
                  inputmode="numeric"
                  maxlength="5"
                  pattern="[0-9]{5}"
                  :class="[inputClasses, errors.codigo_postal ? 'border-error' : '']"
                  placeholder="28001"
                  required
                  autocomplete="postal-code"
                />
                <p v-if="errors.codigo_postal" :class="errorClasses" role="alert">
                  {{ errors.codigo_postal }}
                </p>
              </div>

              <!-- Ciudad -->
              <div>
                <label :class="labelClasses" for="ciudad">
                  Ciudad <span class="text-primary" aria-hidden="true">*</span>
                </label>
                <input
                  id="ciudad"
                  v-model="formData.ciudad"
                  type="text"
                  :class="[inputClasses, errors.ciudad ? 'border-error' : '']"
                  placeholder="Madrid"
                  required
                  autocomplete="address-level2"
                />
                <p v-if="errors.ciudad" :class="errorClasses" role="alert">
                  {{ errors.ciudad }}
                </p>
              </div>

              <!-- Provincia -->
              <div>
                <label :class="labelClasses" for="provincia">Provincia</label>
                <input
                  id="provincia"
                  v-model="formData.provincia"
                  type="text"
                  :class="inputClasses"
                  placeholder="Madrid"
                  autocomplete="address-level1"
                />
              </div>

              <!-- Calle -->
              <div>
                <label :class="labelClasses" for="calle">Calle y número</label>
                <input
                  id="calle"
                  v-model="formData.calle"
                  type="text"
                  :class="inputClasses"
                  placeholder="Calle Gran Vía, 1"
                  autocomplete="street-address"
                />
              </div>
            </div>
          </fieldset>

          <!-- Preferencias -->
          <fieldset class="mb-10">
            <legend class="font-title text-lg font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200 w-full">
              Preferencias
            </legend>

            <!-- Intereses -->
            <div class="mb-8">
              <p class="font-body text-sm font-medium text-neutral-700 mb-3">
                ¿Qué áreas te interesan?
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  v-for="interes in interesesOptions"
                  :key="interes"
                  class="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    :value="interes"
                    :checked="formData.intereses.includes(interes)"
                    class="w-4 h-4 rounded border-neutral-300 text-primary accent-primary focus:ring-2 focus:ring-primary-500"
                    @change="toggleInteres(interes)"
                  />
                  <span class="font-body text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    {{ interes }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Intención comercial -->
            <div>
              <p class="font-body text-sm font-medium text-neutral-700 mb-3">
                ¿Cuál es tu intención?
              </p>
              <div class="flex flex-col gap-3">
                <label
                  v-for="opcion in intencionOptions"
                  :key="opcion.value"
                  class="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="intencion"
                    :value="opcion.value"
                    v-model="formData.intencion_comercial"
                    class="w-4 h-4 border-neutral-300 text-primary accent-primary focus:ring-2 focus:ring-primary-500"
                  />
                  <span class="font-body text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    {{ opcion.label }}
                  </span>
                </label>
              </div>
            </div>
          </fieldset>

          <!-- Consentimiento -->
          <div class="mb-8">
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                v-model="formData.consentimiento"
                class="w-4 h-4 mt-0.5 rounded border-neutral-300 text-primary accent-primary focus:ring-2 focus:ring-primary-500"
                required
              />
              <span class="font-body text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors">
                Acepto la
                <NuxtLink
                  to="/politicas-privacidad"
                  class="text-primary hover:underline underline-offset-2"
                  target="_blank"
                >
                  política de privacidad
                </NuxtLink>
                y consiento el tratamiento de mis datos para recibir información sobre el
                lanzamiento de Codentsa.
                <span class="text-primary" aria-hidden="true">*</span>
              </span>
            </label>
            <p v-if="errors.consentimiento" :class="[errorClasses, 'ml-7']" role="alert">
              {{ errors.consentimiento }}
            </p>
          </div>

          <!-- Error general -->
          <div
            v-if="errors.submit"
            class="mb-6 p-4 rounded-lg bg-error/10 border border-error/20"
            role="alert"
          >
            <p class="font-body text-sm text-error">{{ errors.submit }}</p>
          </div>

          <!-- Submit -->
          <Button
            variant="solid"
            color="primary"
            size="lg"
            :full-width="true"
            type="submit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Enviando...' : 'Enviar registro' }}
          </Button>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-neutral-900 py-10">
      <div class="max-w-6xl mx-auto px-5">
        <div class="flex flex-col items-center gap-6">
          <Logo color="text-white" class="h-5 w-auto" />

          <div class="flex flex-col sm:flex-row items-center gap-4 text-center">
            <a
              href="mailto:pedidos@codentsa.es"
              class="font-body text-sm text-neutral-400 hover:text-white transition-colors"
            >
              pedidos@codentsa.es
            </a>
            <span class="hidden sm:inline text-neutral-700" aria-hidden="true">|</span>
            <a
              href="tel:+34914773880"
              class="font-body text-sm text-neutral-400 hover:text-white transition-colors"
            >
              914 773 880
            </a>
          </div>

          <div class="flex items-center gap-4">
            <NuxtLink
              to="/politicas-privacidad"
              class="font-body text-xs text-neutral-500 hover:text-neutral-300 transition-colors underline-offset-2 hover:underline"
            >
              Política de privacidad
            </NuxtLink>
          </div>

          <div class="flex items-center gap-3">
            <p class="font-body text-xs text-neutral-600">
              &copy; {{ new Date().getFullYear() }} Codentsa. Todos los derechos reservados.
            </p>

            <!-- Candado de acceso mantenimiento -->
            <button
              type="button"
              class="text-neutral-700 hover:text-neutral-500 transition-colors focus:outline-none"
              aria-label="Acceso administración"
              @click="emit('request-access')"
            >
              <svg
                class="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
