<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'John Doe',
  },
  role: {
    type: String,
    default: 'Especialista',
  },
  image: {
    type: String,
    default: 'https://avatar.iran.liara.run/public/1',
  },
  bio: {
    type: String,
    default: 'Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
  },
  social: {
    type: Object,
    default: () => ({
      linkedin: '#',
      instagram: '#',
      twitter: '#',
    }),
  },
})
</script>

<template>
  <div class="group cursor-pointer">
    <!-- Image Container -->
    <div class="relative overflow-hidden rounded-3xl aspect-3/4 bg-neutral-100">
      <!-- Background overlay on hover -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <img
          src="/bg/staff-bg.webp"
          alt="Background"
          class="w-full h-full object-cover"
        >
      </div>

      <!-- Staff photo -->
      <img
        :src="image"
        :alt="name"
        class="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 relative z-20"
      >

      <!-- Info overlay (only visible on hover) -->
      <div class="absolute inset-0 p-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between">
        <!-- Top: Name and Role -->
        <div class="text-left">
          <h3 class="font-title text-2xl text-white font-normal mb-1">
            {{ name }}
          </h3>
          <p class="font-body text-base text-white">
            {{ role }}
          </p>
        </div>

        <!-- Middle: Bio -->
        <div class="flex-1 flex items-center">
          <p class="font-body text-sm text-white leading-relaxed">
            {{ bio }}
          </p>
        </div>

        <!-- Bottom: Social Media Icons -->
        <div class="flex gap-3">
          <a
            v-if="social.linkedin"
            :href="social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-neutral-200 transition-colors"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            v-if="social.instagram"
            :href="social.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-neutral-200 transition-colors"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            v-if="social.twitter"
            :href="social.twitter"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-neutral-200 transition-colors"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>