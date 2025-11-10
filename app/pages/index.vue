<script setup>
import { ShoppingCartIcon, ArrowRightIcon, HeartIcon } from '@heroicons/vue/24/outline'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="font-title text-4xl font-bold text-neutral-900 mb-2">
        Componentes UI - Codentsa
      </h1>
      <p class="font-body text-neutral-600 mb-12">
        Sistema de diseño y componentes reutilizables
      </p>

      <!-- Buttons Section -->
      <section class="mb-16">
        <h2 class="font-title text-2xl font-semibold text-neutral-900 mb-6">Buttons</h2>

        <!-- Solid Variants -->
        <div class="bg-white rounded-lg p-8 mb-8">
          <h3 class="font-title text-xl font-medium text-neutral-900 mb-4">Solid</h3>
          <div class="flex flex-wrap gap-4 mb-6">
            <Button color="dark" @click="handleClick">Dark Button</Button>
            <Button color="light" @click="handleClick">Light Button</Button>
            <Button color="primary" @click="handleClick">Primary Button</Button>
            <Button color="secondary" @click="handleClick">Secondary Button</Button>
          </div>

          <h4 class="font-body text-sm font-semibold text-neutral-700 mb-3">Con iconos</h4>
          <div class="flex flex-wrap gap-4">
            <Button color="dark" @click="handleClick">
              Añadir al carrito
              <template #icon>
                <ShoppingCartIcon class="w-5 h-5" />
              </template>
            </Button>
            <Button color="primary" @click="handleClick">
              Comprar ahora
              <template #icon>
                <ArrowRightIcon class="w-5 h-5" />
              </template>
            </Button>
            <Button color="secondary" @click="handleClick">
              Favoritos
              <template #icon>
                <HeartIcon class="w-5 h-5" />
              </template>
            </Button>
          </div>
        </div>

        <!-- Outline Variants -->
        <div class="bg-white rounded-lg p-8 mb-8">
          <h3 class="font-title text-xl font-medium text-neutral-900 mb-4">Outline</h3>
          <div class="flex flex-wrap gap-4 mb-6">
            <Button variant="outline" color="dark" @click="handleClick">Dark Outline</Button>
            <Button variant="outline" color="primary" @click="handleClick">
              Primary Outline
            </Button>
            <Button variant="outline" color="secondary" @click="handleClick">
              Secondary Outline
            </Button>
          </div>

          <h4 class="font-body text-sm font-semibold text-neutral-700 mb-3">Con iconos</h4>
          <div class="flex flex-wrap gap-4">
            <Button variant="outline" color="dark" @click="handleClick">
              Ver detalles
              <template #icon>
                <ArrowRightIcon class="w-5 h-5" />
              </template>
            </Button>
            <Button variant="outline" color="primary" @click="handleClick">
              Más información
              <template #icon>
                <ArrowRightIcon class="w-5 h-5" />
              </template>
            </Button>
          </div>
        </div>

        <!-- Sizes -->
        <div class="bg-white rounded-lg p-8 mb-8">
          <h3 class="font-title text-xl font-medium text-neutral-900 mb-4">Tamaños</h3>
          <div class="flex flex-wrap items-center gap-4">
            <Button size="sm" color="primary">Small</Button>
            <Button size="md" color="primary">Medium</Button>
            <Button size="lg" color="primary">Large</Button>
          </div>
        </div>

        <!-- States -->
        <div class="bg-white rounded-lg p-8 mb-8">
          <h3 class="font-title text-xl font-medium text-neutral-900 mb-4">Estados</h3>
          <div class="flex flex-wrap gap-4">
            <Button color="primary">Normal</Button>
            <Button color="primary" disabled>Disabled</Button>
            <Button color="primary" full-width>Full Width</Button>
          </div>
        </div>

        <!-- Dark Background -->
        <div class="bg-neutral-900 rounded-lg p-8">
          <h3 class="font-title text-xl font-medium text-white mb-4">En fondo oscuro</h3>
          <div class="flex flex-wrap gap-4">
            <Button variant="solid" color="light">Light Solid</Button>
            <Button variant="outline" color="light">Light Outline</Button>
            <Button variant="solid" color="primary">Primary</Button>
            <Button variant="outline" color="primary">Primary Outline</Button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
