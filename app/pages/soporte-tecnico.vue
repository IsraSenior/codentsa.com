<script setup>
// Contact options
const contactOptions = [
  {
    id: 1,
    icon: 'sun',
    title: 'Agenda una cita de soporte',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et sapien in lacus.',
    buttonText: 'Elige la fecha',
    buttonAction: '#',
  },
  {
    id: 2,
    icon: 'sun',
    title: 'Contáctate con nosotros',
    description: 'Los motores de velocidad son esenciales en aplicaciones que requieren un control preciso de la velocidad.',
    buttonText: 'Chatea por Whatsapp',
    buttonAction: 'https://wa.me/1234567890',
  },
  {
    id: 3,
    icon: 'sun',
    title: 'Habla con un asesor',
    description: 'Los motores de velocidad son esenciales en aplicaciones que requieren un control preciso de la velocidad.',
    buttonText: 'Llamar por celular',
    buttonAction: 'tel:+1234567890',
  },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <Section class="!pt-0">
      <div class="text-center mb-12">
        <h1 class="font-title text-4xl md:text-5xl lg:text-6xl text-black font-normal mb-4">
          Soporte técnico
        </h1>
        <p class="font-body text-base md:text-lg text-black">
          ¿Necesitas ayuda con alguno de los productos que compraste?
        </p>
      </div>

      <!-- Contact Options Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="option in contactOptions"
          :key="option.id"
          class="bg-neutral-50 rounded-3xl p-8 flex flex-col items-center text-center"
        >
          <!-- Icon -->
          <div class="mb-6">
            <svg class="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>

          <!-- Title -->
          <h3 class="font-title text-xl md:text-2xl text-black font-normal mb-3">
            {{ option.title }}
          </h3>

          <!-- Description -->
          <p class="font-body text-sm md:text-base text-black leading-relaxed mb-6 flex-1">
            {{ option.description }}
          </p>

          <!-- Button -->
          <Button
            :href="option.buttonAction"
            variant="outline"
            color="dark"
            size="md"
            class="w-full"
          >
            {{ option.buttonText }}
          </Button>
        </div>
      </div>
    </Section>

    <!-- FAQ Section -->
    <Section class="bg-white">
      <FAQAccordion />
    </Section>
  </div>
</template>
