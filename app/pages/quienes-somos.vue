<script setup>
// Stats animation
const statsRef = ref(null)
const stat1 = ref(0)
const stat2 = ref(0)
const stat3 = ref(0)
const hasAnimated = ref(false)

// Animate counter from 0 to target
const animateValue = (ref, start, end, duration) => {
  const range = end - start
  const increment = range / (duration / 16) // 60fps
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= end) {
      ref.value = end
      clearInterval(timer)
    } else {
      ref.value = Math.floor(current)
    }
  }, 16)
}

// Observer for stats section
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          // Animate each stat with different durations for effect
          animateValue(stat1, 0, 95, 2000)
          animateValue(stat2, 0, 10, 1500)
          animateValue(stat3, 0, 250, 2000)
        }
      })
    },
    { threshold: 0.3 }
  )

  if (statsRef.value) {
    observer.observe(statsRef.value)
  }

  // Cleanup
  onUnmounted(() => {
    if (statsRef.value) {
      observer.unobserve(statsRef.value)
    }
  })
})
</script>

<template>
    <div>
        <!-- Sección 1: ¿Quiénes somos? -->
        <section class="py-16">
            <div class="container mx-auto px-5 lg:px-0">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
                    <!-- Imagen del doctor con background -->
                    <div class="relative rounded-l-3xl overflow-hidden aspect-4/3 lg:aspect-auto lg:h-[500px]">
                        <!-- Background image -->
                        <img
                            src="/bg/bg-wave.webp"
                            alt="Background"
                            class="absolute inset-0 w-full h-full object-cover"
                        >
                        <!-- Doctor image -->
                        <img
                            src="/doctor.webp"
                            alt="Doctor"
                            class="absolute inset-0 w-full h-full object-contain object-bottom"
                        >
                    </div>

                    <!-- Contenido -->
                    <div class="flex flex-col gap-6 bg-neutral-100 rounded-r-3xl h-full p-12">
                        <div class="space-y-4">
                            <h2 class="font-title text-4xl md:text-5xl text-black font-normal">
                                ¿Quiénes somos?
                            </h2>
                            <p class="font-body text-base md:text-lg text-black leading-relaxed">
                                Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            color="dark"
                            size="md"
                            to="/equipo"
                            class="w-fit"
                        >
                            Conoce nuestro equipo
                        </Button>

                        <!-- Separador -->
                        <hr class="border-neutral-300 my-2">

                        <!-- Stats -->
                        <div ref="statsRef" class="grid grid-cols-3 gap-4">
                            <!-- Stat 1 -->
                            <div class="text-center">
                                <p class="font-title text-4xl md:text-5xl text-black font-normal mb-1">
                                    {{ stat1 }}%
                                </p>
                                <p class="font-body text-sm md:text-base text-black">
                                    Ahorra
                                </p>
                            </div>

                            <!-- Stat 2 -->
                            <div class="text-center">
                                <p class="font-title text-4xl md:text-5xl text-black font-normal mb-1">
                                    {{ stat2 }}+
                                </p>
                                <p class="font-body text-sm md:text-base text-black">
                                    Productos
                                </p>
                            </div>

                            <!-- Stat 3 -->
                            <div class="text-center">
                                <p class="font-title text-4xl md:text-5xl text-black font-normal mb-1">
                                    €{{ stat3 }}
                                </p>
                                <p class="font-body text-sm md:text-base text-black">
                                    Ahorra
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Soluciones -->
        <BentoSectionSolutions />
    </div>
</template>