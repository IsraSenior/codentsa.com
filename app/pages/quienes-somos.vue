<script setup>
    
</script>

<template>
    <div>
        <!-- Sección 1: ¿Quiénes somos? -->
        <section class="py-16 md:py-20">
            <div class="container mx-auto px-5 lg:px-0">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <!-- Imagen del doctor con background -->
                    <div class="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[500px]">
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
                    <div class="flex flex-col gap-6">
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
                        <div class="grid grid-cols-3 gap-4">
                            <!-- Stat 1 -->
                            <div class="text-center">
                                <p class="font-title text-4xl md:text-5xl text-black font-normal mb-1">
                                    95%
                                </p>
                                <p class="font-body text-sm md:text-base text-black">
                                    Ahorra
                                </p>
                            </div>

                            <!-- Stat 2 -->
                            <div class="text-center">
                                <p class="font-title text-4xl md:text-5xl text-black font-normal mb-1">
                                    10+
                                </p>
                                <p class="font-body text-sm md:text-base text-black">
                                    Productos
                                </p>
                            </div>

                            <!-- Stat 3 -->
                            <div class="text-center">
                                <p class="font-title text-4xl md:text-5xl text-black font-normal mb-1">
                                    €250
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