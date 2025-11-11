<script setup>
// CTA component for products page
</script>

<template>
  <div class="col-span-full my-6">
    <div
      class="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 min-h-[300px] md:min-h-[400px]"
      style="background-image: url('/bg/products-cta-bg.webp'); background-size: cover; background-position: center;"
    >
      <!-- Content Container -->
      <div class="relative z-10 container mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <!-- Left: Text Content -->
        <div class="flex-1 text-white">
          <h2 class="font-title text-3xl md:text-4xl lg:text-5xl font-normal mb-2 md:mb-4">
            Los mejores<br>
            insumos<br>
            odontologicos.
          </h2>
          <p class="font-body text-lg md:text-xl">
            y la mejor calidad
          </p>
        </div>

        <!-- Center/Right: Product Image -->
        <div class="flex-1 flex items-center justify-center relative">
          <div class="w-full max-w-md aspect-[4/3] bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 flex items-center justify-center">
            <img
              src="/images/dental-tools.png"
              alt="Instrumentos odontologicos"
              class="w-full h-full object-contain"
              onerror="this.style.display='none'"
            >
          </div>

          <!-- Decorative tooth icon -->
          <div class="absolute top-0 right-0 -mt-4 -mr-4 hidden md:block">
            <svg class="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c-1.5 0-2.8.5-3.8 1.4C7.2 5.3 6.5 6.5 6.2 7.9c-.3 1.4-.2 2.9.1 4.2.3 1.3.8 2.5 1.5 3.5.7 1 1.5 1.8 2.4 2.4.9.6 1.9.9 2.8.9s1.9-.3 2.8-.9c.9-.6 1.7-1.4 2.4-2.4.7-1 1.2-2.2 1.5-3.5.3-1.3.4-2.8.1-4.2-.3-1.4-1-2.6-2-3.5C14.8 3.5 13.5 3 12 3z" />
              <ellipse cx="12" cy="12" rx="8" ry="9" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
