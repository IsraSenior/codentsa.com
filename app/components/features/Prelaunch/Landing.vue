<script setup>
useSeoMeta({
  title: 'Codentsa - Material dental online | Próximamente',
  description:
    'Regístrate para acceder antes que nadie a la nueva tienda online de material dental profesional de Codentsa. Más de 30 años de experiencia.',
  ogTitle: 'Codentsa - Material dental online | Próximamente',
  ogDescription:
    'Más de 30 años de confianza en material dental. Pronto online. Regístrate para acceso anticipado y consigue condiciones exclusivas de lanzamiento.',
  ogType: 'website',
  ogUrl: 'https://codentsa.com',
  ogSiteName: 'Codentsa',
  ogLocale: 'es_ES',
  ogImage: 'https://codentsa.com/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Codentsa — Tu proveedor de material dental de confianza, ahora online',
  ogImageType: 'image/jpeg',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Codentsa - Material dental online | Próximamente',
  twitterDescription:
    'Más de 30 años de confianza en material dental. Pronto online. Regístrate para acceso anticipado.',
  twitterImage: 'https://codentsa.com/og-image.jpg',
  twitterImageAlt: 'Codentsa — Tu proveedor de material dental de confianza, ahora online',
  robots: 'index, follow',
})

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Codentsa',
  url: 'https://codentsa.com',
  logo: 'https://codentsa.com/favicon.svg',
  description:
    'Distribuidora de material dental profesional con más de 30 años de experiencia en España. Proveedor de confianza para clínicas dentales.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Spanish',
  },
  sameAs: [],
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Codentsa',
  url: 'https://codentsa.com',
  description:
    'Tienda online de material dental profesional. Distribuidora con más de 30 años de experiencia en España.',
  inLanguage: 'es-ES',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Codentsa',
  url: 'https://codentsa.com',
  logo: 'https://codentsa.com/favicon.svg',
  description:
    'Distribuidora de material dental profesional con más de 30 años de experiencia sirviendo a clínicas dentales en toda España.',
  priceRange: '$$',
  areaServed: {
    '@type': 'Country',
    name: 'España',
  },
  knowsAbout: [
    'Material dental',
    'Equipamiento odontológico',
    'Implantes dentales',
    'Fungibles dentales',
    'Ortodoncia',
  ],
}

useHead({
  link: [{ rel: 'canonical', href: 'https://codentsa.com' }],
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(organizationSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(webSiteSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(localBusinessSchema) },
  ],
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

// Form wizard
const currentStep = ref(1)
const totalSteps = 3

const stepTitles = ['Datos profesionales', 'Dirección de envío', 'Preferencias']

const validateStep = (step) => {
  Object.keys(errors).forEach((key) => delete errors[key])

  if (step === 1) {
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es obligatorio'
    if (!formData.clinica.trim()) errors.clinica = 'El nombre de la clínica es obligatorio'
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Introduce un email válido'
    }
  }

  if (step === 2) {
    if (!formData.codigo_postal.trim()) {
      errors.codigo_postal = 'El código postal es obligatorio'
    } else if (!/^\d{5}$/.test(formData.codigo_postal)) {
      errors.codigo_postal = 'Código postal válido (5 dígitos)'
    }
    if (!formData.ciudad.trim()) errors.ciudad = 'La ciudad es obligatoria'
  }

  if (step === 3) {
    if (!formData.consentimiento) errors.consentimiento = 'Debes aceptar la política de privacidad'
  }

  return Object.keys(errors).length === 0
}

const nextStep = () => {
  if (validateStep(currentStep.value) && currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const submitForm = async () => {
  if (!validateStep(3)) return

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

const smoothScroll = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const scrollToForm = () => smoothScroll('registro')

const toggleInteres = (interes) => {
  const index = formData.intereses.indexOf(interes)
  if (index === -1) formData.intereses.push(interes)
  else formData.intereses.splice(index, 1)
}

const interesesOptions = [
  'Implantología', 'Ortodoncia', 'Endodoncia', 'Cirugía oral', 'Periodoncia',
  'Prótesis dental', 'Estética dental', 'Higiene y profilaxis', 'Equipamiento clínico', 'Instrumental rotatorio',
]

const intencionOptions = [
  { value: 'comprar', label: 'Quiero comprar en cuanto abra la tienda' },
  { value: 'evaluando', label: 'Estoy evaluando opciones' },
  { value: 'informacion', label: 'Solo quiero información' },
]

// Scroll reveal
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

// Hero loaded state for entrance animations
const heroLoaded = ref(false)

onMounted(() => {
  // Trigger hero entrance animation after a brief delay
  setTimeout(() => { heroLoaded.value = true }, 100)

  observeElements()

  const counterSection = document.getElementById('social-proof')
  if (!counterSection) return
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) { startCounters(); obs.disconnect() }
    },
    { threshold: 0.3 },
  )
  obs.observe(counterSection)
})

const brandLogos = [
  { name: '3M', src: '/clients-logos/3m-logo.webp' },
  { name: 'Align Technology', src: '/clients-logos/align-logo.webp' },
  { name: 'Straumann', src: '/clients-logos/straumann-logo.webp' },
  { name: 'Envista', src: '/clients-logos/envista-logo.webp' },
]

const inputClasses =
  'w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white font-body text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200'
const labelClasses = 'font-body text-sm font-medium text-neutral-700 mb-1.5 block'
const errorClasses = 'text-error text-xs font-body mt-1'

// Header scroll state
const isScrolled = ref(false)
onMounted(() => {
  const onScroll = () => { isScrolled.value = window.scrollY > 20 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

// Parallax for hero decorative elements
const heroParallax = ref(0)
onMounted(() => {
  const onScroll = () => {
    heroParallax.value = window.scrollY * 0.3
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <PrelaunchSuccessMessage v-if="isSuccess" />

  <div v-else class="min-h-screen bg-white overflow-hidden">
    <a href="#registro" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-body focus:text-sm focus:outline-none">
      Ir al formulario de registro
    </a>
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-body focus:text-sm focus:outline-none">
      Ir al contenido principal
    </a>
    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      :class="isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-neutral-200/50' : 'bg-transparent'"
    >
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Logo :color="isScrolled ? 'text-primary' : 'text-white'" class="h-5 md:h-6 w-auto transition-colors duration-500" role="img" aria-label="Codentsa" />
          <span
            class="inline-flex items-center rounded-full px-3 py-1 font-body text-[11px] font-semibold tracking-wide uppercase transition-colors duration-500"
            :class="isScrolled ? 'bg-primary-100 text-primary-700' : 'bg-white/15 text-white/90 backdrop-blur-sm'"
          >
            Próximamente
          </span>
        </div>
        <nav aria-label="Navegación principal">
          <Button
            variant="outline"
            :color="isScrolled ? 'primary' : 'light'"
            size="sm"
            class="hidden md:inline-flex transition-all duration-500"
            @click="scrollToForm"
          >
            Registrarme
          </Button>
        </nav>
      </div>
    </header>

    <main id="main-content">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center overflow-hidden bg-primary-900">
      <!-- Background image with parallax -->
      <div
        class="absolute inset-0 hero-bg-image"
        :style="{ transform: `translateY(${heroParallax * 0.4}px) scale(1.1)` }"
        aria-hidden="true"
      >
        <img
          src="/image-qs-3.webp"
          alt=""
          width="1920"
          height="1080"
          class="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
      </div>

      <!-- Red gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-900/92 via-primary-800/88 to-primary-900/95" aria-hidden="true"></div>

      <!-- Subtle vignette -->
      <div class="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-black/30" aria-hidden="true"></div>

      <div class="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-32">
        <div class="max-w-4xl">
          <div
            class="mb-6 md:mb-8 transition-all duration-700 ease-out"
            :class="heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          >
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.08]">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span class="font-body text-sm text-neutral-300">Plazas limitadas para acceso anticipado</span>
            </span>
          </div>

          <h1
            class="font-title text-[2.5rem] md:text-6xl lg:text-[5.5rem] xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6 md:mb-8 transition-all duration-700 ease-out"
            :class="heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: '150ms' }"
          >
            Tu proveedor dental
            de confianza
            <br class="hidden md:block" />
            <span class="text-neutral-900">ahora online</span>
          </h1>

          <p
            class="font-body text-lg md:text-xl lg:text-2xl text-neutral-300 max-w-2xl leading-relaxed mb-10 md:mb-14 transition-all duration-700 ease-out"
            :class="heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: '300ms' }"
          >
            Codentsa lleva décadas acompañando a clínicas dentales en toda España. Ahora, todo nuestro catálogo y servicio llegan a un clic de distancia.
          </p>

          <div
            class="flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 ease-out"
            :class="heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: '450ms' }"
          >
            <Button
              variant="solid"
              color="primary"
              size="lg"
              class="w-full sm:w-auto text-base! px-10! py-4! h-auto! hero-cta"
              @click="scrollToForm"
            >
              Solicitar acceso anticipado
            </Button>
            <button
              type="button"
              class="font-body text-neutral-400 hover:text-white transition-colors duration-300 flex items-center gap-2 py-4 group"
              @click="smoothScroll('beneficios')"
            >
              Descubrir ventajas
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section id="social-proof" class="relative py-20 md:py-28 bg-neutral-50 overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"></div>

      <!-- Stats row -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 mb-20">
        <dl class="reveal reveal-up grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-neutral-300">
          <div class="text-center md:px-8">
            <dt class="font-body text-neutral-600 text-base md:text-lg order-2">Años de experiencia</dt>
            <dd class="font-title text-6xl md:text-7xl lg:text-8xl font-bold text-primary leading-none mb-2 order-1">{{ counterRefs.years }}+</dd>
          </div>
          <div class="text-center md:px-8">
            <dt class="font-body text-neutral-600 text-base md:text-lg order-2">Clínicas confían en nosotros</dt>
            <dd class="font-title text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-900 leading-none mb-2 order-1">{{ counterRefs.clinics }}+</dd>
          </div>
          <div class="text-center md:px-8">
            <dt class="font-body text-neutral-600 text-base md:text-lg order-2">Marcas líderes disponibles</dt>
            <dd class="font-title text-6xl md:text-7xl lg:text-8xl font-bold text-secondary leading-none mb-2 order-1">{{ counterRefs.brands }}+</dd>
          </div>
        </dl>
      </div>

      <!-- Brand marquee -->
      <div class="reveal reveal-up">
        <p class="font-body text-sm text-neutral-600 text-center mb-8 tracking-wide uppercase">Trabajamos con las mejores marcas del sector</p>
        <div class="brand-marquee overflow-hidden relative" role="region" aria-label="Marcas con las que trabajamos">
          <div class="brand-marquee-track flex items-center" aria-hidden="true">
            <div v-for="set in 4" :key="`set-${set}`" class="flex items-center shrink-0">
              <img v-for="(brand, i) in brandLogos" :key="`brand-${set}-${i}`" :src="brand.src" :alt="brand.name" width="120" height="36" loading="lazy" class="h-7 md:h-9 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 shrink-0 mx-8 lg:mx-10" />
            </div>
          </div>
          <!-- Accessible list for screen readers (duplicated logos in marquee are decorative) -->
          <ul class="sr-only">
            <li v-for="brand in brandLogos" :key="brand.name">{{ brand.name }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section id="beneficios" class="relative py-24 md:py-32 bg-white overflow-hidden scroll-mt-20">
      <div class="max-w-7xl mx-auto px-5 lg:px-8">
        <!-- Bento Grid -->
        <div class="flex flex-col gap-4">

          <!-- Row 1-2: Left (title + 2x2 cards) | Right (image full height) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Left: title + cards -->
            <div class="flex flex-col gap-4">
              <!-- Title -->
              <div class="reveal reveal-up p-2 md:p-4">
                <span class="inline-flex items-center gap-2 font-body text-sm text-primary tracking-wide mb-4">
                  <span class="w-8 h-px bg-primary-400"></span>
                  Ventajas exclusivas
                </span>
                <h2 class="font-title text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.1] mb-5">
                  ¿Por qué<br />registrarte?
                </h2>
                <p class="font-body text-lg text-neutral-600 leading-relaxed">
                  Únete antes del lanzamiento y accede a condiciones que no encontrarás en ningún otro momento.
                </p>
              </div>
              <!-- 2x2 cards -->
              <div class="grid grid-cols-2 gap-4">
                <div class="reveal reveal-up group relative rounded-2xl bg-neutral-50 border border-neutral-200 p-5 overflow-hidden benefit-card hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-500" style="animation-delay: 150ms">
                  <div class="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                    <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                  </div>
                  <h3 class="font-title text-base font-bold text-neutral-900 mb-1.5">Ofertas exclusivas</h3>
                  <p class="font-body text-xs text-neutral-600 leading-relaxed">Promociones reservadas para registrados antes del lanzamiento.</p>
                </div>
                <div class="reveal reveal-up group relative rounded-2xl bg-neutral-50 border border-neutral-200 p-5 overflow-hidden benefit-card hover:border-secondary-200 hover:shadow-lg hover:shadow-secondary-500/5 transition-all duration-500" style="animation-delay: 200ms">
                  <div class="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                    <svg class="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  </div>
                  <h3 class="font-title text-base font-bold text-neutral-900 mb-1.5">Precios de feria</h3>
                  <p class="font-body text-xs text-neutral-600 leading-relaxed">Las mismas condiciones de Expodental, sin moverte de tu clínica.</p>
                </div>
                <div class="reveal reveal-up group relative rounded-2xl bg-neutral-50 border border-neutral-200 p-5 overflow-hidden benefit-card hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-500" style="animation-delay: 250ms">
                  <div class="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                    <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.841m2.699-2.103 1.3-.26a7.97 7.97 0 0 0 3.88-2.274M7.5 19.5l3-3" />
                    </svg>
                  </div>
                  <h3 class="font-title text-base font-bold text-neutral-900 mb-1.5">Acceso anticipado</h3>
                  <p class="font-body text-xs text-neutral-600 leading-relaxed">Explora nuestra tienda antes del lanzamiento oficial.</p>
                </div>
                <div class="reveal reveal-up group relative rounded-2xl bg-neutral-50 border border-neutral-200 p-5 overflow-hidden benefit-card hover:border-secondary-200 hover:shadow-lg hover:shadow-secondary-500/5 transition-all duration-500" style="animation-delay: 300ms">
                  <div class="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                    <svg class="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                  <h3 class="font-title text-base font-bold text-neutral-900 mb-1.5">Envío en 24h</h3>
                  <p class="font-body text-xs text-neutral-600 leading-relaxed">Stock permanente y envío express para toda España.</p>
                </div>
              </div>
              <!-- CTA inline -->
              <div class="reveal reveal-up group relative rounded-2xl bg-primary-800 p-6 overflow-hidden benefit-card flex flex-col items-center justify-center text-center" style="animation-delay: 350ms">
                <div class="absolute top-0 right-0 w-48 h-48 opacity-[0.06]" aria-hidden="true">
                  <svg viewBox="0 0 200 200" fill="none" class="w-full h-full">
                    <circle cx="160" cy="40" r="80" stroke="white" stroke-width="1" />
                    <circle cx="160" cy="40" r="120" stroke="white" stroke-width="1" />
                  </svg>
                </div>
                <p class="font-body text-sm text-white/70 mb-4">Únete a los más de <strong class="text-white">500 profesionales</strong> que ya confían en Codentsa</p>
                <Button variant="solid" color="primary" size="md" class="text-sm! px-6! py-3! h-auto!" @click="scrollToForm">
                  Quiero mi acceso anticipado
                </Button>
              </div>
            </div>
            <!-- Right: Image full height -->
            <div class="reveal reveal-up rounded-2xl overflow-hidden" style="animation-delay: 100ms">
              <img src="/bg/bg-card-solution-2.webp" alt="Profesional dental de confianza trabajando con material Codentsa" width="800" height="1000" loading="lazy" class="w-full h-full object-cover object-top" />
            </div>
          </div>



        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="relative py-24 md:py-32 bg-neutral-900 overflow-hidden">
      <div class="max-w-7xl mx-auto px-5 lg:px-8">
        <div class="reveal reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div class="max-w-2xl">
            <span class="inline-flex items-center gap-2 font-body text-sm text-primary-400 tracking-wide mb-4">
              <span class="w-8 h-px bg-primary-500"></span>
              Cómo funciona
            </span>
            <h2 class="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
              Tres pasos para<br />empezar a comprar
            </h2>
          </div>
          <Button variant="outline" color="light" size="lg" class="flex-shrink-0 w-full md:w-auto" @click="scrollToForm">
            Registrarme ahora
          </Button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          <div class="reveal reveal-up relative">
            <p class="font-title text-[140px] md:text-[180px] lg:text-[220px] font-black text-white/[0.04] leading-none absolute -top-14 md:-top-20 -left-2 select-none pointer-events-none">01</p>
            <div class="relative pt-16 md:pt-24">
              <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
                <svg class="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h3 class="font-title text-xl md:text-2xl font-semibold text-white mb-3">Regístrate ahora</h3>
              <p class="font-body text-neutral-400 leading-relaxed">Completa el formulario con tus datos profesionales. Solo te llevará un minuto.</p>
            </div>
          </div>

          <div class="reveal reveal-up relative" style="animation-delay: 150ms">
            <p class="font-title text-[140px] md:text-[180px] lg:text-[220px] font-black text-white/[0.04] leading-none absolute -top-14 md:-top-20 -left-2 select-none pointer-events-none">02</p>
            <div class="relative pt-16 md:pt-24">
              <div class="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-5">
                <svg class="w-6 h-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 class="font-title text-xl md:text-2xl font-semibold text-white mb-3">Recibe tu invitación</h3>
              <p class="font-body text-neutral-400 leading-relaxed">Te avisaremos por email con acceso prioritario antes del lanzamiento público.</p>
            </div>
          </div>

          <div class="reveal reveal-up relative" style="animation-delay: 300ms">
            <p class="font-title text-[140px] md:text-[180px] lg:text-[220px] font-black text-white/[0.04] leading-none absolute -top-14 md:-top-20 -left-2 select-none pointer-events-none">03</p>
            <div class="relative pt-16 md:pt-24">
              <div class="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center mb-5">
                <svg class="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              <h3 class="font-title text-xl md:text-2xl font-semibold text-white mb-3">Empieza a comprar</h3>
              <p class="font-body text-neutral-400 leading-relaxed">Explora el catálogo, aprovecha tus descuentos exclusivos y recibe en 24h.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Registration Form Section — Step Wizard -->
    <section id="registro" class="relative py-24 md:py-32 bg-neutral-50 overflow-hidden scroll-mt-20">
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
                Completa tus datos profesionales y serás de los primeros en acceder a la tienda online de Codentsa con ventajas exclusivas.
              </p>

              <div class="space-y-4 mb-8">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <p class="font-body text-sm text-neutral-600">Sin compromiso de compra</p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <p class="font-body text-sm text-neutral-600">Tus datos están protegidos</p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <p class="font-body text-sm text-neutral-600">Te avisamos solo cuando esté listo</p>
                </div>
              </div>

              <!-- Trust reinforcement -->
              <div class="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  <div>
                    <p class="font-body text-sm font-medium text-neutral-800">Datos 100% seguros</p>
                    <p class="font-body text-xs text-neutral-500 mt-0.5">Cumplimos con el RGPD y la LOPDGDD. Tus datos nunca se compartirán con terceros.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right column: Step Wizard Form -->
          <div class="lg:col-span-7">
            <div class="reveal reveal-up bg-white rounded-3xl shadow-xl shadow-neutral-900/5 border border-neutral-200/60 p-8 md:p-10">
              <!-- Progress bar -->
              <div class="mb-8">
                <div class="flex items-center justify-between mb-3">
                  <span class="font-body text-sm font-medium text-neutral-900">
                    Paso {{ currentStep }} de {{ totalSteps }}
                  </span>
                  <span class="font-body text-sm text-neutral-500">
                    {{ stepTitles[currentStep - 1] }}
                  </span>
                </div>
                <div
                  class="h-1.5 bg-neutral-200 rounded-full overflow-hidden"
                  role="progressbar"
                  :aria-valuenow="currentStep"
                  :aria-valuemin="1"
                  :aria-valuemax="totalSteps"
                  :aria-label="`Paso ${currentStep} de ${totalSteps}: ${stepTitles[currentStep - 1]}`"
                >
                  <div
                    class="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                    :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
                  ></div>
                </div>
                <!-- Step indicators -->
                <div class="flex justify-between mt-3">
                  <button
                    v-for="step in totalSteps"
                    :key="step"
                    type="button"
                    class="flex items-center gap-1.5 font-body text-xs transition-colors"
                    :class="step === currentStep ? 'text-primary font-medium' : step < currentStep ? 'text-success' : 'text-neutral-500'"
                    :aria-label="`Paso ${step}: ${stepTitles[step - 1]}${step === currentStep ? ' (actual)' : step < currentStep ? ' (completado)' : ''}`"
                    :aria-current="step === currentStep ? 'step' : undefined"
                    :disabled="step > currentStep"
                    @click="step < currentStep ? (currentStep = step) : null"
                  >
                    <span
                      class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold border transition-all"
                      :class="
                        step < currentStep
                          ? 'bg-success border-success text-white'
                          : step === currentStep
                            ? 'bg-primary border-primary text-white'
                            : 'bg-transparent border-neutral-300 text-neutral-500'
                      "
                    >
                      <svg v-if="step < currentStep" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      <template v-else>{{ step }}</template>
                    </span>
                    <span class="hidden sm:inline">{{ stepTitles[step - 1] }}</span>
                  </button>
                </div>
              </div>

              <form @submit.prevent="currentStep === totalSteps ? submitForm() : nextStep()" novalidate>
                <!-- Step 1: Datos profesionales -->
                <Transition name="step" mode="out-in">
                  <div v-if="currentStep === 1" key="step1">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label :class="labelClasses" for="nombre">Nombre completo <span class="text-primary" aria-hidden="true">*</span></label>
                        <input id="nombre" v-model="formData.nombre" type="text" :class="[inputClasses, errors.nombre ? 'border-error! ring-error/30!' : '']" placeholder="Dr. Juan García" required aria-required="true" :aria-invalid="!!errors.nombre" :aria-describedby="errors.nombre ? 'nombre-error' : undefined" autocomplete="name" />
                        <p v-if="errors.nombre" id="nombre-error" :class="errorClasses" role="alert">{{ errors.nombre }}</p>
                      </div>
                      <div>
                        <label :class="labelClasses" for="clinica">Nombre de la clínica <span class="text-primary" aria-hidden="true">*</span></label>
                        <input id="clinica" v-model="formData.clinica" type="text" :class="[inputClasses, errors.clinica ? 'border-error! ring-error/30!' : '']" placeholder="Clínica Dental García" required aria-required="true" :aria-invalid="!!errors.clinica" :aria-describedby="errors.clinica ? 'clinica-error' : undefined" autocomplete="organization" />
                        <p v-if="errors.clinica" id="clinica-error" :class="errorClasses" role="alert">{{ errors.clinica }}</p>
                      </div>
                      <div>
                        <label :class="labelClasses" for="cargo">Cargo</label>
                        <input id="cargo" v-model="formData.cargo" type="text" :class="inputClasses" placeholder="Director/a, Odontólogo/a..." autocomplete="organization-title" />
                      </div>
                      <div>
                        <label :class="labelClasses" for="email">Email profesional <span class="text-primary" aria-hidden="true">*</span></label>
                        <input id="email" v-model="formData.email" type="email" :class="[inputClasses, errors.email ? 'border-error! ring-error/30!' : '']" placeholder="contacto@clinica.es" required aria-required="true" :aria-invalid="!!errors.email" :aria-describedby="errors.email ? 'email-error' : undefined" autocomplete="email" />
                        <p v-if="errors.email" id="email-error" :class="errorClasses" role="alert">{{ errors.email }}</p>
                      </div>
                      <div class="md:col-span-2">
                        <label :class="labelClasses" for="telefono">Teléfono</label>
                        <input id="telefono" v-model="formData.telefono" type="tel" :class="inputClasses" placeholder="912 345 678" autocomplete="tel" />
                      </div>
                    </div>
                  </div>
                </Transition>

                <!-- Step 2: Dirección -->
                <Transition name="step" mode="out-in">
                  <div v-if="currentStep === 2" key="step2">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label :class="labelClasses" for="codigo_postal">Código postal <span class="text-primary" aria-hidden="true">*</span></label>
                        <input id="codigo_postal" v-model="formData.codigo_postal" type="text" inputmode="numeric" maxlength="5" pattern="[0-9]{5}" :class="[inputClasses, errors.codigo_postal ? 'border-error! ring-error/30!' : '']" placeholder="28001" required aria-required="true" :aria-invalid="!!errors.codigo_postal" :aria-describedby="errors.codigo_postal ? 'cp-error' : undefined" autocomplete="postal-code" />
                        <p v-if="errors.codigo_postal" id="cp-error" :class="errorClasses" role="alert">{{ errors.codigo_postal }}</p>
                      </div>
                      <div>
                        <label :class="labelClasses" for="ciudad">Ciudad <span class="text-primary" aria-hidden="true">*</span></label>
                        <input id="ciudad" v-model="formData.ciudad" type="text" :class="[inputClasses, errors.ciudad ? 'border-error! ring-error/30!' : '']" placeholder="Madrid" required aria-required="true" :aria-invalid="!!errors.ciudad" :aria-describedby="errors.ciudad ? 'ciudad-error' : undefined" autocomplete="address-level2" />
                        <p v-if="errors.ciudad" id="ciudad-error" :class="errorClasses" role="alert">{{ errors.ciudad }}</p>
                      </div>
                      <div>
                        <label :class="labelClasses" for="provincia">Provincia</label>
                        <input id="provincia" v-model="formData.provincia" type="text" :class="inputClasses" placeholder="Madrid" autocomplete="address-level1" />
                      </div>
                      <div>
                        <label :class="labelClasses" for="calle">Calle y número</label>
                        <input id="calle" v-model="formData.calle" type="text" :class="inputClasses" placeholder="Calle Gran Vía, 1" autocomplete="street-address" />
                      </div>
                    </div>
                  </div>
                </Transition>

                <!-- Step 3: Preferencias + Consentimiento -->
                <Transition name="step" mode="out-in">
                  <div v-if="currentStep === 3" key="step3">
                    <fieldset class="mb-8">
                      <legend class="font-body text-sm font-medium text-neutral-700 mb-4">¿Qué áreas te interesan?</legend>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <label v-for="interes in interesesOptions" :key="interes" class="flex items-center gap-3 cursor-pointer group rounded-lg px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                          <input type="checkbox" :value="interes" :checked="formData.intereses.includes(interes)" class="w-4 h-4 rounded border-neutral-300 text-primary accent-primary focus:ring-2 focus:ring-primary-500/30" @change="toggleInteres(interes)" />
                          <span class="font-body text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">{{ interes }}</span>
                        </label>
                      </div>
                    </fieldset>

                    <fieldset class="mb-8">
                      <legend class="font-body text-sm font-medium text-neutral-700 mb-4">¿Cuál es tu intención?</legend>
                      <div class="flex flex-col gap-2.5">
                        <label v-for="opcion in intencionOptions" :key="opcion.value" class="flex items-center gap-3 cursor-pointer group rounded-lg px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                          <input type="radio" name="intencion" :value="opcion.value" v-model="formData.intencion_comercial" class="w-4 h-4 border-neutral-300 text-primary accent-primary focus:ring-2 focus:ring-primary-500/30" />
                          <span class="font-body text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">{{ opcion.label }}</span>
                        </label>
                      </div>
                    </fieldset>

                    <div class="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <label class="flex items-start gap-3 cursor-pointer group">
                        <input id="consentimiento" type="checkbox" v-model="formData.consentimiento" class="w-4 h-4 mt-0.5 rounded border-neutral-300 text-primary accent-primary focus:ring-2 focus:ring-primary-500/30" required aria-required="true" :aria-invalid="!!errors.consentimiento" :aria-describedby="errors.consentimiento ? 'consent-error' : undefined" />
                        <span class="font-body text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors leading-relaxed">
                          Acepto la <NuxtLink to="/politicas-privacidad" class="text-primary hover:underline underline-offset-2" target="_blank">política de privacidad</NuxtLink>
                          y consiento el tratamiento de mis datos para recibir información sobre el lanzamiento de Codentsa. <span class="text-primary" aria-hidden="true">*</span>
                        </span>
                      </label>
                      <p v-if="errors.consentimiento" id="consent-error" :class="[errorClasses, 'ml-7 mt-2']" role="alert">{{ errors.consentimiento }}</p>
                    </div>
                  </div>
                </Transition>

                <!-- Live region para anunciar cambio de paso -->
                <div class="sr-only" aria-live="polite" aria-atomic="true">
                  Paso {{ currentStep }} de {{ totalSteps }}: {{ stepTitles[currentStep - 1] }}
                </div>

                <!-- Error general -->
                <div v-if="errors.submit" class="mt-6 p-4 rounded-xl bg-error/5 border border-error/20" role="alert">
                  <p class="font-body text-sm text-error">{{ errors.submit }}</p>
                </div>

                <!-- Navigation buttons -->
                <div class="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200">
                  <button
                    v-if="currentStep > 1"
                    type="button"
                    class="font-body text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2"
                    @click="prevStep"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                    Anterior
                  </button>
                  <div v-else></div>

                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="px-8 py-3 bg-primary text-white font-body font-semibold text-sm rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <template v-if="currentStep < totalSteps">
                      Siguiente
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                    </template>
                    <template v-else>
                      {{ isSubmitting ? 'Enviando...' : 'Solicitar acceso anticipado' }}
                    </template>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    </main>

    <!-- Footer -->
    <footer class="bg-neutral-900 border-t border-neutral-800" role="contentinfo">
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <Logo color="text-white" class="h-4 w-auto" role="img" aria-label="Codentsa" />
          <span class="text-neutral-700">|</span>
          <p class="font-body text-xs text-neutral-600">&copy; {{ new Date().getFullYear() }} Codentsa</p>
          <button type="button" class="text-neutral-700 hover:text-neutral-500 transition-colors focus:outline-none" aria-label="Acceso administración" @click="emit('request-access')">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
          </button>
        </div>
        <nav aria-label="Pie de página" class="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <NuxtLink to="/politicas-privacidad" class="font-body text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Privacidad</NuxtLink>
          <NuxtLink to="/terminos-condiciones" class="font-body text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Términos</NuxtLink>
          <NuxtLink to="/aviso-legal" class="font-body text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Aviso legal</NuxtLink>
        </nav>
        <p class="font-body text-[11px] text-neutral-700">Desarrollado por <a href="https://tactico.es" target="_blank" rel="noopener noreferrer" class="text-neutral-500 hover:text-neutral-300 transition-colors">Táctico</a></p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Scroll reveal — visual only, content remains accessible to screen readers */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  /* Do NOT use visibility:hidden or display:none — content must remain in accessibility tree */
}
.reveal.reveal-up { transform: translateY(40px); }
.reveal.revealed { opacity: 1; transform: translateY(0); }
.reveal[style*='animation-delay: 100ms'].revealed { transition-delay: 100ms; }
.reveal[style*='animation-delay: 150ms'].revealed { transition-delay: 150ms; }
.reveal[style*='animation-delay: 200ms'].revealed { transition-delay: 200ms; }
.reveal[style*='animation-delay: 300ms'].revealed { transition-delay: 300ms; }

/* Scroll indicator */
.scroll-line { animation: scrollPulse 2s ease-in-out infinite; }
@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
}

/* Hero background image */
.hero-bg-image {
  transition: transform 0.1s linear;
}

/* Hero CTA pulse */
.hero-cta {
  animation: ctaPulse 3s ease-in-out infinite;
}
@keyframes ctaPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(231, 29, 53, 0.3); }
  50% { box-shadow: 0 0 0 12px rgba(231, 29, 53, 0); }
}


/* Brand marquee - infinite scroll */
.brand-marquee-track {
  animation: marquee 25s linear infinite;
  width: max-content;
  will-change: transform;
}
.brand-marquee:hover .brand-marquee-track {
  animation-play-state: paused;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.brand-marquee::before,
.brand-marquee::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 1;
  pointer-events: none;
}
.brand-marquee::before {
  left: 0;
  background: linear-gradient(to right, var(--color-neutral-50), transparent);
}
.brand-marquee::after {
  right: 0;
  background: linear-gradient(to left, var(--color-neutral-50), transparent);
}

/* Benefit cards hover lift */
.benefit-card {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.benefit-card:hover {
  transform: translateY(-4px);
}

/* Step transitions */
.step-enter-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.step-leave-active {
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.step-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.step-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* WCAG 2.3.3 — Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .reveal.reveal-up {
    transform: none;
  }
  .scroll-line {
    animation: none;
  }
  .hero-cta {
    animation: none;
  }
  .brand-marquee-track {
    animation: none;
  }
  .hero-bg-image {
    transition: none;
  }
  .benefit-card {
    transition: none;
  }
  .step-enter-active,
  .step-leave-active {
    transition: none;
  }
  .step-enter-from,
  .step-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
