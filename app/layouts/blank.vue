<template>
  <div class="min-h-screen bg-white">
    <header class="border-b border-neutral-200">
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3">
          <Logo color="text-primary" class="h-5 md:h-6 w-auto" />
        </NuxtLink>
        <NuxtLink
          to="/"
          class="font-body text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Volver
        </NuxtLink>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
