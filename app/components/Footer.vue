<script setup>
const currentYear = new Date().getFullYear()

const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    icon: 'M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248m0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008M16.806 6.129a1.078 1.078 0 1 0 0 2.156 1.078 1.078 0 1 0 0-2.156M20.533 6.111A4.6 4.6 0 0 0 17.9 3.479a6.6 6.6 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.6 6.6 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.6 6.6 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71s0 2.753.056 3.71c.015.748.156 1.486.419 2.187a4.6 4.6 0 0 0 2.634 2.632 6.6 6.6 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.6 6.6 0 0 0 2.186-.419 4.61 4.61 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.6 6.6 0 0 0-.421-2.217m-1.218 9.532a5 5 0 0 1-.311 1.688 2.99 2.99 0 0 1-1.712 1.711 5 5 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a5 5 0 0 1-1.669-.311 2.99 2.99 0 0 1-1.719-1.711 5.1 5.1 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654s0-2.686.053-3.655a5 5 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5 5 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a5 5 0 0 1 1.67.311 3 3 0 0 1 1.712 1.712 5.1 5.1 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655s0 2.698-.043 3.654z'
  },
  {
    name: 'Facebook',
    href: '#',
    icon: 'M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22 22 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202z'
  },
  {
    name: 'TikTok',
    href: '#',
    icon: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 3 3 0 0 1 .88.13V9.4a7 7 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a5 5 0 0 1-1-.1z'
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: 'M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z'
  },
]

const legalLinks = [
  { text: 'Políticas de privacidad', href: '/politicas-privacidad' },
  { text: 'Términos y Condiciones', href: '/terminos-condiciones' },
  { text: 'Aviso Legal', href: '/aviso-legal' }
]
</script>

<template>
  <footer class="bg-neutral-100 py-10 md:py-16">
    <div class="flex flex-col items-center gap-6 md:gap-10 container mx-auto px-4">
      <div class="flex flex-col items-center gap-4">
        <!-- Logo Component -->
        <Logo />

        <!-- Tagline -->
        <p class="text-black text-base text-center">
          Acompañando a profesionales a llegar a su máximo potencial
        </p>

        <!-- Social Media Links -->
        <div class="flex gap-6 md:gap-10 items-center">
          <NuxtLink
            v-for="social in socialLinks"
            :key="social.name"
            :to="social.href"
            :aria-label="social.name"
            class="w-5 h-5 md:w-6 md:h-6 text-black hover:text-primary transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-full h-full"
            >
              <path :d="social.icon" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Copyright -->
        <p class="text-black text-sm md:text-base text-center w-full">
          © {{ currentYear }} Gedesa. All rights reserved.
        </p>
      </div>

      <!-- Legal Links -->
      <div class="flex flex-col md:flex-row gap-2 md:gap-20 justify-center items-center w-full">
        <Button
          v-for="link in legalLinks"
          :key="link.text"
          :to="link.href"
          variant="link"
          color="dark"
          size="sm"
        >
          {{ link.text }}
        </Button>
      </div>
    </div>
  </footer>
</template>
