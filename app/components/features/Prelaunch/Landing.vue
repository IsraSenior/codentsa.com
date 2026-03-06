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

// Scroll reveal with IntersectionObserver
const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
}

onMounted(() => {
  observeElements()
})

// Animated counters
const counterRefs = reactive({ years: 0, clinics: 0, brands: 0 })
const countersStarted = ref(false)

const animateCounter = (key, target, duration = 2000) => {
  const start = performance.now()
  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    counterRefs[key] = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const startCounters = () => {
  if (countersStarted.value) return
  countersStarted.value = true
  animateCounter('years', 30, 1800)
  animateCounter('clinics', 500, 2200)
  animateCounter('brands', 50, 2000)
}

onMounted(() => {
  const counterSection = document.getElementById('social-proof')
  if (!counterSection) return
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startCounters()
        obs.disconnect()
      }
    },
    { threshold: 0.3 },
  )
  obs.observe(counterSection)
})

const brandLogos = [
  { name: '3M', src: '/clients-logos/3m-logo.svg' },
  { name: 'Align Technology', src: '/clients-logos/align-logo.svg' },
  { name: 'Straumann', src: '/clients-logos/straumann-logo.svg' },
  { name: 'Envista', src: '/clients-logos/envista-logo.svg' },
]

const inputClasses =
  'w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white font-body text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200'
const labelClasses = 'font-body text-sm font-medium text-neutral-700 mb-1.5 block'
const errorClasses = 'text-error text-xs font-body mt-1'

// Header scroll state
const isScrolled = ref(false)
onMounted(() => {
  const onScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <PrelaunchSuccessMessage v-if="isSuccess" />

  <div v-else class="min-h-screen bg-white overflow-hidden">
    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      :class="
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-neutral-200/50'
          : 'bg-transparent'
      "
    >
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Logo :color="isScrolled ? 'text-primary' : 'text-white'" class="h-5 md:h-6 w-auto transition-colors duration-500" />
          <span
            class="inline-flex items-center rounded-full px-3 py-1 font-body text-[11px] font-semibold tracking-wide uppercase transition-colors duration-500"
            :class="
              isScrolled
                ? 'bg-primary-100 text-primary-700'
                : 'bg-white/15 text-white/90 backdrop-blur-sm'
            "
          >
            Próximamente
          </span>
        </div>
        <Button
          variant="outline"
          :color="isScrolled ? 'primary' : 'light'"
          size="sm"
          class="hidden md:inline-flex transition-all duration-500"
          @click="scrollToForm"
        >
          Registrarme
        </Button>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center overflow-hidden">
      <!-- Background layers -->
      <div class="absolute inset-0 bg-linear-to-br from-primary-900 via-primary-800 to-neutral-900"></div>

      <!-- Decorative grid -->
      <div class="absolute inset-0 opacity-[0.04]">
        <div
          class="absolute inset-0"
          style="
            background-image: linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
            background-size: 80px 80px;
          "
        ></div>
      </div>

      <!-- Radial glow -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style="background: radial-gradient(circle, rgba(231, 29, 53, 0.4) 0%, transparent 70%)"
      ></div>

      <!-- Floating decorative number -->
      <div
        class="absolute -right-10 md:right-10 top-1/2 -translate-y-1/2 font-title text-[280px] md:text-[400px] lg:text-[500px] font-black text-white/[0.03] leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        +
      </div>

      <div class="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-32">
        <div class="max-w-4xl">
          <!-- Eyebrow -->
          <div class="reveal reveal-up mb-6 md:mb-8">
            <span
              class="inline-flex items-center gap-2 font-body text-sm md:text-base text-primary-300 tracking-wide"
            >
              <span class="w-8 h-px bg-primary-400"></span>
              Más de 30 años en el sector dental
            </span>
          </div>

          <!-- Headline -->
          <h1
            class="reveal reveal-up font-title text-[2.5rem] md:text-6xl lg:text-[5.5rem] xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6 md:mb-8"
            style="animation-delay: 100ms"
          >
            Tu proveedor dental
            <span class="relative inline-block">
              de confianza
              <span
                class="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1 md:h-1.5 bg-primary-500 rounded-full"
              ></span>
            </span>
            <br class="hidden md:block" />
            ahora <span class="text-primary-400">online</span>
          </h1>

          <!-- Subheadline -->
          <p
            class="reveal reveal-up font-body text-lg md:text-xl lg:text-2xl text-neutral-300 max-w-2xl leading-relaxed mb-10 md:mb-14"
            style="animation-delay: 200ms"
          >
            Codentsa lleva décadas acompañando a clínicas dentales en toda España. Ahora, todo
            nuestro catálogo y servicio llegan a un clic de distancia.
          </p>

          <!-- CTA Group -->
          <div
            class="reveal reveal-up flex flex-col sm:flex-row items-start gap-4"
            style="animation-delay: 300ms"
          >
            <Button variant="solid" color="primary" size="lg" class="w-full sm:w-auto text-base! px-10! py-4! h-auto!" @click="scrollToForm">
              Solicitar acceso anticipado
            </Button>
            <a
              href="#beneficios"
              class="font-body text-neutral-400 hover:text-white transition-colors duration-300 flex items-center gap-2 py-4 group"
            >
              Descubrir ventajas
              <svg
                class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
          <span class="font-body text-[11px] tracking-widest uppercase text-neutral-500">Scroll</span>
          <div class="w-px h-8 bg-linear-to-b from-neutral-500 to-transparent scroll-line"></div>
        </div>
      </div>
    </section>

    <!-- Social Proof / Trust Section -->
    <section id="social-proof" class="relative py-20 md:py-28 bg-neutral-50 overflow-hidden">
      <!-- Subtle top border accent -->
      <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-300 to-transparent"></div>

      <div class="max-w-7xl mx-auto px-5 lg:px-8">
        <!-- Stats Row -->
        <div class="reveal reveal-up grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-neutral-300 mb-20">
          <div class="text-center md:px-8">
            <p class="font-title text-6xl md:text-7xl lg:text-8xl font-bold text-primary leading-none mb-2">
              {{ counterRefs.years }}+
            </p>
            <p class="font-body text-neutral-600 text-base md:text-lg">
              Años de experiencia
            </p>
          </div>
          <div class="text-center md:px-8">
            <p class="font-title text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-900 leading-none mb-2">
              {{ counterRefs.clinics }}+
            </p>
            <p class="font-body text-neutral-600 text-base md:text-lg">
              Clínicas confían en nosotros
            </p>
          </div>
          <div class="text-center md:px-8">
            <p class="font-title text-6xl md:text-7xl lg:text-8xl font-bold text-secondary leading-none mb-2">
              {{ counterRefs.brands }}+
            </p>
            <p class="font-body text-neutral-600 text-base md:text-lg">
              Marcas líderes disponibles
            </p>
          </div>
        </div>

        <!-- Brand logos -->
        <div class="reveal reveal-up" style="animation-delay: 200ms">
          <p class="font-body text-sm text-neutral-500 text-center mb-8 tracking-wide uppercase">
            Trabajamos con las mejores marcas del sector
          </p>
          <div class="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
            <img
              v-for="brand in brandLogos"
              :key="brand.name"
              :src="brand.src"
              :alt="brand.name"
              class="h-7 md:h-9 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section id="beneficios" class="relative py-24 md:py-32 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-5 lg:px-8">
        <!-- Section header -->
        <div class="reveal reveal-up max-w-2xl mb-16 md:mb-20">
          <span class="inline-flex items-center gap-2 font-body text-sm text-primary tracking-wide mb-4">
            <span class="w-8 h-px bg-primary-400"></span>
            Ventajas exclusivas
          </span>
          <h2 class="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.1] mb-5">
            ¿Por qué<br />registrarte?
          </h2>
          <p class="font-body text-lg text-neutral-600 leading-relaxed">
            Únete antes del lanzamiento y accede a condiciones que no encontrarás en ningún otro
            momento.
          </p>
        </div>

        <!-- Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <!-- Card 1: Acceso anticipado -->
          <div
            class="reveal reveal-up group relative rounded-3xl bg-linear-to-br from-primary-900 to-primary-700 p-8 md:p-10 lg:row-span-2 overflow-hidden"
          >
            <div class="absolute inset-0 opacity-[0.06]">
              <div
                class="absolute inset-0"
                style="
                  background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
                  background-size: 24px 24px;
                "
              ></div>
            </div>
            <div class="relative h-full flex flex-col justify-between min-h-[280px] lg:min-h-0">
              <div>
                <div
                  class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                >
                  <svg
                    class="w-7 h-7 text-primary-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.841m2.699-2.103 1.3-.26a7.97 7.97 0 0 0 3.88-2.274M7.5 19.5l3-3"
                    />
                  </svg>
                </div>
                <h3 class="font-title text-2xl md:text-3xl font-bold text-white mb-3">
                  Acceso anticipado
                </h3>
                <p class="font-body text-white/70 text-base leading-relaxed">
                  Sé de los primeros en explorar nuestra tienda online antes del lanzamiento oficial.
                  Navega el catálogo, guarda favoritos y prepara tu primer pedido.
                </p>
              </div>
              <p class="font-title text-[120px] lg:text-[160px] font-black text-white/[0.06] leading-none mt-6 -mb-4 -ml-2 select-none">
                01
              </p>
            </div>
          </div>

          <!-- Card 2: Ofertas exclusivas -->
          <div
            class="reveal reveal-up group relative rounded-3xl bg-neutral-50 border border-neutral-200 p-8 md:p-10 overflow-hidden hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-500"
            style="animation-delay: 100ms"
          >
            <div
              class="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
            >
              <svg
                class="w-7 h-7 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
            </div>
            <h3 class="font-title text-xl md:text-2xl font-bold text-neutral-900 mb-3">
              Ofertas exclusivas
            </h3>
            <p class="font-body text-neutral-600 leading-relaxed">
              Promociones y descuentos reservados solo para los profesionales registrados antes del
              lanzamiento.
            </p>
            <p class="font-title text-[100px] font-black text-neutral-900/[0.03] leading-none absolute -bottom-4 -right-2 select-none">
              02
            </p>
          </div>

          <!-- Card 3: Precios de feria -->
          <div
            class="reveal reveal-up group relative rounded-3xl bg-neutral-50 border border-neutral-200 p-8 md:p-10 overflow-hidden hover:border-secondary-200 hover:shadow-lg hover:shadow-secondary-500/5 transition-all duration-500"
            style="animation-delay: 200ms"
          >
            <div
              class="w-14 h-14 rounded-2xl bg-secondary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
            >
              <svg
                class="w-7 h-7 text-secondary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </div>
            <h3 class="font-title text-xl md:text-2xl font-bold text-neutral-900 mb-3">
              Precios de feria
            </h3>
            <p class="font-body text-neutral-600 leading-relaxed">
              Las mismas condiciones que ofrecemos en Expodental, pero sin moverte de tu clínica.
            </p>
            <p class="font-title text-[100px] font-black text-neutral-900/[0.03] leading-none absolute -bottom-4 -right-2 select-none">
              03
            </p>
          </div>

          <!-- Card 4: Envío rápido -->
          <div
            class="reveal reveal-up group relative rounded-3xl bg-linear-to-br from-secondary-900 to-secondary-700 p-8 md:p-10 lg:col-span-2 overflow-hidden"
            style="animation-delay: 150ms"
          >
            <div class="absolute inset-0 opacity-[0.06]">
              <div
                class="absolute inset-0"
                style="
                  background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
                  background-size: 24px 24px;
                "
              ></div>
            </div>
            <div class="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div class="flex-1">
                <div
                  class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                >
                  <svg
                    class="w-7 h-7 text-secondary-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                </div>
                <h3 class="font-title text-2xl md:text-3xl font-bold text-white mb-3">
                  Envío rápido en 24h
                </h3>
                <p class="font-body text-white/70 text-base leading-relaxed max-w-lg">
                  Stock permanente y servicio de envío express para toda España. Tu pedido al día
                  siguiente, sin complicaciones.
                </p>
              </div>
              <p class="font-title text-[120px] md:text-[160px] font-black text-white/[0.06] leading-none select-none md:-mr-4">
                04
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works / Value Proposition -->
    <section class="relative py-24 md:py-32 bg-neutral-900 overflow-hidden">
      <!-- Decorative element -->
      <div
        class="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
        style="background: radial-gradient(ellipse at 100% 50%, white 0%, transparent 70%)"
      ></div>

      <div class="max-w-7xl mx-auto px-5 lg:px-8">
        <!-- Section header -->
        <div class="reveal reveal-up max-w-2xl mb-16 md:mb-24">
          <span class="inline-flex items-center gap-2 font-body text-sm text-primary-400 tracking-wide mb-4">
            <span class="w-8 h-px bg-primary-500"></span>
            Cómo funciona
          </span>
          <h2 class="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            Tres pasos para<br />empezar a comprar
          </h2>
        </div>

        <!-- Steps -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          <!-- Step 1 -->
          <div class="reveal reveal-up relative">
            <p class="font-title text-[140px] md:text-[180px] lg:text-[220px] font-black text-white/[0.04] leading-none absolute -top-14 md:-top-20 -left-2 select-none pointer-events-none">
              01
            </p>
            <div class="relative pt-16 md:pt-24">
              <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
                <svg class="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h3 class="font-title text-xl md:text-2xl font-semibold text-white mb-3">
                Regístrate ahora
              </h3>
              <p class="font-body text-neutral-400 leading-relaxed">
                Completa el formulario con tus datos profesionales. Solo te llevará un minuto.
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="reveal reveal-up relative" style="animation-delay: 150ms">
            <p class="font-title text-[140px] md:text-[180px] lg:text-[220px] font-black text-white/[0.04] leading-none absolute -top-14 md:-top-20 -left-2 select-none pointer-events-none">
              02
            </p>
            <div class="relative pt-16 md:pt-24">
              <div class="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-5">
                <svg class="w-6 h-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 class="font-title text-xl md:text-2xl font-semibold text-white mb-3">
                Recibe tu invitación
              </h3>
              <p class="font-body text-neutral-400 leading-relaxed">
                Te avisaremos por email con acceso prioritario antes del lanzamiento público.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="reveal reveal-up relative" style="animation-delay: 300ms">
            <p class="font-title text-[140px] md:text-[180px] lg:text-[220px] font-black text-white/[0.04] leading-none absolute -top-14 md:-top-20 -left-2 select-none pointer-events-none">
              03
            </p>
            <div class="relative pt-16 md:pt-24">
              <div class="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center mb-5">
                <svg class="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              <h3 class="font-title text-xl md:text-2xl font-semibold text-white mb-3">
                Empieza a comprar
              </h3>
              <p class="font-body text-neutral-400 leading-relaxed">
                Explora el catálogo, aprovecha tus descuentos exclusivos y recibe en 24h.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Registration Form Section -->
    <section id="registro" class="relative py-24 md:py-32 bg-neutral-50 overflow-hidden">
      <!-- Decorative -->
      <div
        class="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-30"
        style="background: radial-gradient(circle, rgba(231, 29, 53, 0.08) 0%, transparent 70%)"
      ></div>

      <div class="max-w-7xl mx-auto px-5 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <!-- Left column: Copy -->
          <div class="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <div class="reveal reveal-up">
              <span class="inline-flex items-center gap-2 font-body text-sm text-primary tracking-wide mb-4">
                <span class="w-8 h-px bg-primary-400"></span>
                Registro gratuito
              </span>
              <h2 class="font-title text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.1] mb-5">
                Reserva tu<br />acceso ahora
              </h2>
              <p class="font-body text-lg text-neutral-600 leading-relaxed mb-8">
                Completa tus datos profesionales y serás de los primeros en acceder a la tienda
                online de Codentsa con ventajas exclusivas.
              </p>

              <!-- Trust indicators -->
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p class="font-body text-sm text-neutral-600">Sin compromiso de compra</p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p class="font-body text-sm text-neutral-600">Tus datos están protegidos</p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p class="font-body text-sm text-neutral-600">Te avisamos solo cuando esté listo</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right column: Form -->
          <div class="lg:col-span-7">
            <div class="reveal reveal-up bg-white rounded-3xl shadow-xl shadow-neutral-900/5 border border-neutral-200/60 p-8 md:p-10">
              <form @submit.prevent="submitForm" novalidate>
                <!-- Datos profesionales -->
                <fieldset class="mb-10">
                  <legend
                    class="font-title text-lg font-semibold text-neutral-900 mb-6 pb-3 border-b border-neutral-200 w-full flex items-center gap-2"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Datos profesionales
                  </legend>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label :class="labelClasses" for="nombre">
                        Nombre completo <span class="text-primary" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="nombre"
                        v-model="formData.nombre"
                        type="text"
                        :class="[inputClasses, errors.nombre ? 'border-error! ring-error/30!' : '']"
                        placeholder="Dr. Juan García"
                        required
                        autocomplete="name"
                      />
                      <p v-if="errors.nombre" :class="errorClasses" role="alert">
                        {{ errors.nombre }}
                      </p>
                    </div>

                    <div>
                      <label :class="labelClasses" for="clinica">
                        Nombre de la clínica <span class="text-primary" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="clinica"
                        v-model="formData.clinica"
                        type="text"
                        :class="[inputClasses, errors.clinica ? 'border-error! ring-error/30!' : '']"
                        placeholder="Clínica Dental García"
                        required
                        autocomplete="organization"
                      />
                      <p v-if="errors.clinica" :class="errorClasses" role="alert">
                        {{ errors.clinica }}
                      </p>
                    </div>

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

                    <div>
                      <label :class="labelClasses" for="email">
                        Email profesional <span class="text-primary" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        v-model="formData.email"
                        type="email"
                        :class="[inputClasses, errors.email ? 'border-error! ring-error/30!' : '']"
                        placeholder="contacto@clinica.es"
                        required
                        autocomplete="email"
                      />
                      <p v-if="errors.email" :class="errorClasses" role="alert">
                        {{ errors.email }}
                      </p>
                    </div>

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

                <!-- Dirección -->
                <fieldset class="mb-10">
                  <legend
                    class="font-title text-lg font-semibold text-neutral-900 mb-6 pb-3 border-b border-neutral-200 w-full flex items-center gap-2"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Dirección de envío
                  </legend>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        :class="[inputClasses, errors.codigo_postal ? 'border-error! ring-error/30!' : '']"
                        placeholder="28001"
                        required
                        autocomplete="postal-code"
                      />
                      <p v-if="errors.codigo_postal" :class="errorClasses" role="alert">
                        {{ errors.codigo_postal }}
                      </p>
                    </div>

                    <div>
                      <label :class="labelClasses" for="ciudad">
                        Ciudad <span class="text-primary" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="ciudad"
                        v-model="formData.ciudad"
                        type="text"
                        :class="[inputClasses, errors.ciudad ? 'border-error! ring-error/30!' : '']"
                        placeholder="Madrid"
                        required
                        autocomplete="address-level2"
                      />
                      <p v-if="errors.ciudad" :class="errorClasses" role="alert">
                        {{ errors.ciudad }}
                      </p>
                    </div>

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
                  <legend
                    class="font-title text-lg font-semibold text-neutral-900 mb-6 pb-3 border-b border-neutral-200 w-full flex items-center gap-2"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-success"></span>
                    Preferencias
                  </legend>

                  <!-- Intereses -->
                  <div class="mb-8">
                    <p class="font-body text-sm font-medium text-neutral-700 mb-4">
                      ¿Qué áreas te interesan?
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <label
                        v-for="interes in interesesOptions"
                        :key="interes"
                        class="flex items-center gap-3 cursor-pointer group rounded-lg px-3 py-2.5 hover:bg-neutral-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          :value="interes"
                          :checked="formData.intereses.includes(interes)"
                          class="w-4 h-4 rounded border-neutral-300 text-primary accent-primary focus:ring-2 focus:ring-primary-500/30"
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
                    <p class="font-body text-sm font-medium text-neutral-700 mb-4">
                      ¿Cuál es tu intención?
                    </p>
                    <div class="flex flex-col gap-2.5">
                      <label
                        v-for="opcion in intencionOptions"
                        :key="opcion.value"
                        class="flex items-center gap-3 cursor-pointer group rounded-lg px-3 py-2.5 hover:bg-neutral-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name="intencion"
                          :value="opcion.value"
                          v-model="formData.intencion_comercial"
                          class="w-4 h-4 border-neutral-300 text-primary accent-primary focus:ring-2 focus:ring-primary-500/30"
                        />
                        <span class="font-body text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                          {{ opcion.label }}
                        </span>
                      </label>
                    </div>
                  </div>
                </fieldset>

                <!-- Consentimiento -->
                <div class="mb-8 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <label class="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      v-model="formData.consentimiento"
                      class="w-4 h-4 mt-0.5 rounded border-neutral-300 text-primary accent-primary focus:ring-2 focus:ring-primary-500/30"
                      required
                    />
                    <span class="font-body text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors leading-relaxed">
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
                  <p v-if="errors.consentimiento" :class="[errorClasses, 'ml-7 mt-2']" role="alert">
                    {{ errors.consentimiento }}
                  </p>
                </div>

                <!-- Error general -->
                <div
                  v-if="errors.submit"
                  class="mb-6 p-4 rounded-xl bg-error/5 border border-error/20"
                  role="alert"
                >
                  <p class="font-body text-sm text-error">{{ errors.submit }}</p>
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full py-4 px-8 bg-primary text-white font-body font-semibold text-base rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span class="relative z-10">
                    {{ isSubmitting ? 'Enviando registro...' : 'Solicitar acceso anticipado' }}
                  </span>
                  <div
                    class="absolute inset-0 bg-linear-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-neutral-900 py-12 md:py-16 border-t border-neutral-800">
      <div class="max-w-7xl mx-auto px-5 lg:px-8">
        <div class="flex flex-col items-center gap-8">
          <Logo color="text-white" class="h-5 w-auto" />

          <div class="flex flex-col sm:flex-row items-center gap-4 text-center">
            <a
              href="mailto:pedidos@codentsa.es"
              class="font-body text-sm text-neutral-400 hover:text-white transition-colors duration-300"
            >
              pedidos@codentsa.es
            </a>
            <span class="hidden sm:inline text-neutral-700" aria-hidden="true">&middot;</span>
            <a
              href="tel:+34914773880"
              class="font-body text-sm text-neutral-400 hover:text-white transition-colors duration-300"
            >
              914 773 880
            </a>
          </div>

          <div class="flex items-center gap-6">
            <NuxtLink
              to="/politicas-privacidad"
              class="font-body text-xs text-neutral-500 hover:text-neutral-300 transition-colors underline-offset-2 hover:underline"
            >
              Política de privacidad
            </NuxtLink>
            <NuxtLink
              to="/terminos-condiciones"
              class="font-body text-xs text-neutral-500 hover:text-neutral-300 transition-colors underline-offset-2 hover:underline"
            >
              Términos y condiciones
            </NuxtLink>
          </div>

          <div class="w-full max-w-sm border-t border-neutral-800 pt-6 flex items-center justify-center gap-3">
            <p class="font-body text-xs text-neutral-600">
              &copy; {{ new Date().getFullYear() }} Codentsa. Todos los derechos reservados.
            </p>

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

<style scoped>
/* Scroll reveal animations */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.reveal-up {
  transform: translateY(40px);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delays via style attribute animation-delay */
.reveal[style*='animation-delay: 100ms'].revealed {
  transition-delay: 100ms;
}
.reveal[style*='animation-delay: 150ms'].revealed {
  transition-delay: 150ms;
}
.reveal[style*='animation-delay: 200ms'].revealed {
  transition-delay: 200ms;
}
.reveal[style*='animation-delay: 300ms'].revealed {
  transition-delay: 300ms;
}

/* Scroll line animation */
.scroll-line {
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scaleY(0.6);
    transform-origin: top;
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: top;
  }
}

/* Smooth anchor scroll */
html {
  scroll-behavior: smooth;
}
</style>