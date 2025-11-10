<script setup>
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'

// Announcement messages for the bottom bar
const announcements = [
  'Ofertas todos los días',
  'Envío en 24 horas',
  'Ofertas todos los días',
]
</script>

<template>
  <header class="w-full">
    <!-- Main Header -->
    <div class="bg-white border-b border-neutral-200">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between gap-8">
          <!-- Logo -->
          <NuxtLink to="/" class="flex-shrink-0">
            <Logo color="text-primary" />
          </NuxtLink>

          <!-- Navigation Links -->
          <nav class="hidden md:flex items-center gap-6 flex-1 justify-center">
            <Button variant="link" to="/quienes-somos" color="dark" size="sm">
              Quienes somos
            </Button>
            <Button variant="link" to="/soporte-tecnico" color="dark" size="sm">
              Soporte técnico
            </Button>
            <Button variant="link" to="/cambios-devoluciones" color="dark" size="sm">
              Cambios y devoluciones
            </Button>
          </nav>

          <!-- Action Icons -->
          <div class="flex items-center gap-3 flex-shrink-0">
            <button
              class="p-2 text-neutral-900 hover:text-neutral-700 transition-colors"
              @click="() => {}"
            >
              <MagnifyingGlassIcon class="w-6 h-6" :stroke-width="2" />
            </button>
            <NuxtLink
              to="/favoritos"
              class="p-2 text-neutral-900 hover:text-neutral-700 transition-colors"
            >
              <HeartIcon class="w-6 h-6" :stroke-width="2" />
            </NuxtLink>
            <NuxtLink
              to="/carrito"
              class="p-2 text-neutral-900 hover:text-neutral-700 transition-colors"
            >
              <ShoppingCartIcon class="w-6 h-6" :stroke-width="2" />
            </NuxtLink>
            <NuxtLink to="/cuenta" class="flex-shrink-0">
              <img
                src="https://avatar.iran.liara.run/public/1"
                alt="Usuario"
                class="w-10 h-10 rounded-full border-2 border-primary"
              >
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Announcement Bar -->
    <div class="bg-neutral-500 text-white">
      <div class="container mx-auto px-4 py-2">
        <div class="flex items-center justify-between gap-4 text-sm font-body font-medium">
          <span v-for="(announcement, index) in announcements" :key="index" class="flex-1 text-center">
            {{ announcement }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>
