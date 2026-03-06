<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center px-5">
    <div class="max-w-lg text-center p-10">
      <!-- Check icon -->
      <div class="flex justify-center mb-8">
        <div class="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
          <svg
            class="w-8 h-8 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="font-title text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        ¡Registro completado!
      </h1>

      <!-- Message -->
      <p class="font-body text-neutral-600 text-lg leading-relaxed mb-8">
        Gracias por tu interés en Codentsa. Te notificaremos por email en cuanto la tienda esté
        disponible.
      </p>

      <!-- Separator -->
      <div class="border-t border-neutral-200 my-8" aria-hidden="true"></div>

      <!-- Contact info -->
      <p class="font-body text-sm text-neutral-500 mb-4">
        ¿Tienes alguna pregunta? Contacta con nosotros:
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
        <a
          href="mailto:pedidos@codentsa.es"
          class="font-body text-sm text-primary hover:text-primary-700 transition-colors underline-offset-2 hover:underline"
        >
          pedidos@codentsa.es
        </a>
        <span class="hidden sm:inline text-neutral-300" aria-hidden="true">|</span>
        <a
          href="tel:+34914773880"
          class="font-body text-sm text-primary hover:text-primary-700 transition-colors underline-offset-2 hover:underline"
        >
          914 773 880
        </a>
      </div>

      <!-- Logo -->
      <div class="opacity-30">
        <Logo color="text-neutral-500" class="h-4 w-auto mx-auto" />
      </div>

      <p class="font-body text-xs text-neutral-400 mt-4">
        &copy; {{ currentYear }} Codentsa. Todos los derechos reservados.
      </p>
    </div>
  </div>
</template>
