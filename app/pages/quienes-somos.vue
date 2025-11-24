<script setup>
import { CheckIcon } from '@heroicons/vue/24/outline'
import Section from '~/components/Section.vue'

// Stats animation
const statsRef = ref(null)
const stat1 = ref(0)
const stat2 = ref(0)
const stat3 = ref(0)
const hasAnimated = ref(false)

// Animate counter from 0 to target
const animateValue = (ref, start, end, duration) => {
  const range = end - start
  const increment = range / (duration / 16) // 60fps
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= end) {
      ref.value = end
      clearInterval(timer)
    } else {
      ref.value = Math.floor(current)
    }
  }, 16)
}

// Observer for stats section
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          // Animate each stat with different durations for effect
          animateValue(stat1, 0, 95, 2000)
          animateValue(stat2, 0, 10, 1500)
          animateValue(stat3, 0, 250, 2000)
        }
      })
    },
    { threshold: 0.3 }
  )

  if (statsRef.value) {
    observer.observe(statsRef.value)
  }

  // Cleanup
  onUnmounted(() => {
    if (statsRef.value) {
      observer.unobserve(statsRef.value)
    }
  })
})

// Staff Data
const staff = [
  {
    id: 1,
    name: 'Dr. Carlos Méndez',
    role: 'Odontólogo General',
    image: '/staff/staff-1.webp',
    bio: 'Especialista en odontología general con más de 15 años de experiencia. Comprometido con la salud dental integral de nuestros pacientes.',
    social: {
      linkedin: '#',
      instagram: '#',
      twitter: '#',
    },
  },
  {
    id: 2,
    name: 'Dra. María González',
    role: 'Ortodoncista',
    image: '/staff/staff-2.webp',
    bio: 'Experta en ortodoncia invisible y tratamientos estéticos. Apasionada por crear sonrisas perfectas y mejorar la confianza de cada paciente.',
    social: {
      linkedin: '#',
      instagram: '#',
      twitter: '#',
    },
  },
  {
    id: 3,
    name: 'Dr. Juan Pérez',
    role: 'Endodoncista',
    image: '/staff/staff-3.webp',
    bio: 'Especializado en endodoncia y tratamientos de conducto. Utiliza las técnicas más avanzadas para preservar la salud dental natural.',
    social: {
      linkedin: '#',
      instagram: '#',
      twitter: '#',
    },
  },
  {
    id: 4,
    name: 'Dra. Ana Rodríguez',
    role: 'Periodoncista',
    image: '/staff/staff-4.webp',
    bio: 'Dedicada a la salud de las encías y tejidos periodontales. Prevención y tratamiento especializado para mantener una base dental sana.',
    social: {
      linkedin: '#',
      instagram: '#',
      twitter: '#',
    },
  },
]
</script>

<template>
  <div>
    <!-- Sección 1: ¿Quiénes somos? -->
    <Section class="lg:pt-0">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
        <!-- Imagen del doctor con background -->
        <div class="relative rounded-l-3xl overflow-hidden aspect-4/3 lg:aspect-auto lg:h-[500px]">
          <!-- Background image -->
          <img
            src="/bg/bg-wave.webp"
            alt="Background"
            class="absolute inset-0 w-full h-full object-cover"
          >
          <!-- Doctor image -->
          <img
            src="/doctor.webp"
            alt="Doctor"
            class="absolute inset-0 w-full h-full object-contain object-bottom"
          >
        </div>

        <!-- Contenido -->
        <div class="flex flex-col gap-6 bg-neutral-100 rounded-r-3xl h-full p-12">
          <div class="space-y-4">
            <h2 class="font-title text-4xl md:text-5xl text-black font-normal">
              ¿Quiénes somos?
            </h2>
            <p class="font-body text-base md:text-lg text-black leading-relaxed">
              Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
            </p>
          </div>

          <Button
            variant="outline"
            color="dark"
            size="md"
            to="/equipo"
            class="w-fit"
          >
            Conoce nuestro equipo
          </Button>

          <!-- Separador -->
          <hr class="border-neutral-300 my-2">

          <!-- Stats -->
          <div ref="statsRef" class="grid grid-cols-3 gap-4">
            <!-- Stat 1 -->
            <div class="text-center">
              <p class="font-title text-4xl md:text-5xl text-black font-normal mb-1">
                {{ stat1 }}%
              </p>
              <p class="font-body text-sm md:text-base text-black">
                Ahorra
              </p>
            </div>

            <!-- Stat 2 -->
            <div class="text-center">
              <p class="font-title text-4xl md:text-5xl text-black font-normal mb-1">
                {{ stat2 }}+
              </p>
              <p class="font-body text-sm md:text-base text-black">
                Productos
              </p>
            </div>

            <!-- Stat 3 -->
            <div class="text-center">
              <p class="font-title text-4xl md:text-5xl text-black font-normal mb-1">
                €{{ stat3 }}
              </p>
              <p class="font-body text-sm md:text-base text-black">
                Ahorra
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <!-- Sección 3: Construyendo confianza -->
    <Section>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Contenido -->
        <div class="flex flex-col gap-6">
          <div class="space-y-4">
            <h2 class="font-title text-4xl md:text-5xl text-black font-normal leading-tight">
              Construyendo confianza a través de la innovación continua
            </h2>
            <p class="font-body text-base md:text-lg text-black leading-relaxed">
              Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
            </p>
          </div>

          <!-- Features list -->
          <div class="flex flex-col gap-4 mt-4">
            <!-- Feature 1 -->
            <div class="flex items-center gap-3">
              <CheckIcon class="w-6 h-6 text-primary shrink-0" :stroke-width="2" />
              <p class="font-body text-base md:text-lg text-neutral-700">
                Calidad asegurada en cada servicio
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="flex items-center gap-3">
              <CheckIcon class="w-6 h-6 text-primary shrink-0" :stroke-width="2" />
              <p class="font-body text-base md:text-lg text-neutral-700">
                Innovación continua para tu bienestar
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="flex items-center gap-3">
              <CheckIcon class="w-6 h-6 text-primary shrink-0" :stroke-width="2" />
              <p class="font-body text-base md:text-lg text-neutral-700">
                Atención profesional y personalizada
              </p>
            </div>
          </div>
        </div>

        <!-- Imagen -->
        <div class="relative rounded-3xl overflow-hidden aspect-video lg:aspect-4/3 lg:h-[500px]">
          <img
            src="/image-qs-3.webp"
            alt="Dentista trabajando"
            class="w-full h-full object-cover"
          >
        </div>
      </div>
    </Section>

    <!-- Soluciones -->
    <BentoSectionSolutions />

    <!-- Sección 3: Construyendo confianza -->
    <Section>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
        <!-- Contenido -->
        <div class="flex flex-col gap-6">
          <div class="space-y-4">
            <h2 class="font-title text-4xl md:text-5xl text-black font-normal leading-tight">
              Construyendo confianza a través de la innovación continua
            </h2>
            <p class="font-body text-base md:text-lg text-black leading-relaxed">
              Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
            </p>
          </div>

          <!-- Features list -->
          <div class="flex flex-col gap-4 mt-4">
            <!-- Feature 1 -->
            <div class="flex items-center gap-3">
              <CheckIcon class="w-6 h-6 text-primary shrink-0" :stroke-width="2" />
              <p class="font-body text-base md:text-lg text-neutral-700">
                Calidad asegurada en cada servicio
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="flex items-center gap-3">
              <CheckIcon class="w-6 h-6 text-primary shrink-0" :stroke-width="2" />
              <p class="font-body text-base md:text-lg text-neutral-700">
                Innovación continua para tu bienestar
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="flex items-center gap-3">
              <CheckIcon class="w-6 h-6 text-primary shrink-0" :stroke-width="2" />
              <p class="font-body text-base md:text-lg text-neutral-700">
                Atención profesional y personalizada
              </p>
            </div>
          </div>
        </div>

        <!-- Imagen -->
        <div class="relative rounded-3xl overflow-hidden aspect-video lg:aspect-4/3 lg:h-[500px]">
          <img
            src="/image-qs-3.webp"
            alt="Dentista trabajando"
            class="w-full h-full object-cover"
          >
        </div>
      </div>
    </Section>

    <Section title="Descubre al equipo detrás de esta familia">
      <BaseCarousel
        :items="staff"
        :slides-per-view="4"
        :space-between="16"
        :navigation="true"
        :loop="true"
      >
        <template #default="{ item }">
          <StaffCard
            :name="item.name"
            :role="item.role"
            :image="item.image"
            :bio="item.bio"
            :social="item.social"
          />
        </template>
      </BaseCarousel>
    </Section>
  </div>
</template>