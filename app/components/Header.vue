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
            <Button icon-only variant="outline" color="dark" size="sm" @click="() => {}">
              <MagnifyingGlassIcon class="w-5 h-5 stroke-2" />
            </Button>
            <Button icon-only variant="outline" color="dark" size="sm" to="/favoritos">
              <HeartIcon class="w-5 h-5 stroke-2" />
            </Button>
            <Button icon-only variant="outline" color="dark" size="sm" to="/carrito">
              <ShoppingCartIcon class="w-5 h-5 stroke-2" />
            </Button>
            <Button icon-only variant="solid" color="primary" size="sm" to="/cuenta">
              <UserIcon class="w-5 h-5 stroke-2" />
            </Button>
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
