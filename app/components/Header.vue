<script setup>
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from '@heroicons/vue/24/outline'
</script>

<template>
  <header class="w-full">
    <!-- Main Header -->
    <div class="bg-neutral-50 border-b border-neutral-200">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between gap-4">
          <!-- Logo -->
          <NuxtLink to="/" class="shrink-0">
            <Logo color="text-primary" />
          </NuxtLink>

          <!-- Mobile: Announcement Text (centered) -->
          <div class="flex-1 text-center md:hidden">
            <span class="text-sm font-body font-medium text-primary">Envío en 24 horas</span>
          </div>

          <!-- Desktop: Navigation Links -->
          <nav class="hidden md:flex items-center gap-6 flex-1 justify-center">
            <Button variant="link" to="/quienes-somos" color="dark" size="md">
              Quienes somos
            </Button>
            <Button variant="link" to="/soporte-tecnico" color="dark" size="md">
              Soporte técnico
            </Button>
            <Button variant="link" to="/cambios-devoluciones" color="dark" size="md">
              Cambios y devoluciones
            </Button>
          </nav>

          <!-- Action Icons -->
          <div class="flex items-center gap-2 shrink-0">
            <!-- Search Icon (always visible) -->
            <button
              class="p-2 text-neutral-900 hover:text-neutral-700 transition-colors"
              @click="() => {}"
            >
              <MagnifyingGlassIcon class="w-6 h-6" :stroke-width="2" />
            </button>

            <!-- Desktop Only Icons -->
            <NuxtLink
              to="/favoritos"
              class="hidden md:block p-2 text-neutral-900 hover:text-neutral-700 transition-colors"
            >
              <HeartIcon class="w-6 h-6" :stroke-width="2" />
            </NuxtLink>
            <NuxtLink
              to="/carrito"
              class="hidden md:block p-2 text-neutral-900 hover:text-neutral-700 transition-colors"
            >
              <ShoppingCartIcon class="w-6 h-6" :stroke-width="2" />
            </NuxtLink>
            <NuxtLink to="/cuenta" class="hidden md:block shrink-0">
              <img
                src="https://avatar.iran.liara.run/public/1"
                alt="Usuario"
                class="w-10 h-10 rounded-full border-2 border-primary"
              >
            </NuxtLink>

            <!-- Mobile: Menu Icon -->
            <button
              class="md:hidden p-2 text-neutral-900 hover:text-neutral-700 transition-colors"
              @click="() => {}"
            >
              <Bars3Icon class="w-6 h-6" :stroke-width="2" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Announcement Bar (Desktop Only) -->
    <div class="hidden md:block">
      <AnnouncementBar />
    </div>
  </header>
</template>
