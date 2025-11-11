<script setup>
// Best Offers Data - Array plano de todos los items
const bestOffersItems = [
  {
    type: 'product',
    title: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia....',
    originalPrice: null,
    price: 250,
  },
  {
    type: 'product',
    title: 'Resina Compuesta Premium',
    brand: '3M ESPE',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'Resina de alta calidad para restauraciones...',
    originalPrice: 450,
    price: 380,
  },
  {
    type: 'banner',
    title: 'Ahorra comprando<br>en Codentsa',
    description: 'Mientras más compres, más ahorras',
    ctaText: 'Ver promociones',
    ctaLink: '/ofertas',
    bgColor: 'bg-secondary',
    image: 'https://www.figma.com/api/mcp/asset/c55971d1-1310-436b-83f3-ee40dd547c1f',
  },
  {
    type: 'product',
    title: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/54e7bf55-073d-4469-9d7b-2d33c843c33a',
    description: 'El cemento dental es un material esencia....',
    originalPrice: 300,
    price: 250,
  },
  {
    type: 'product',
    title: 'Sealapex Cemento',
    brand: 'Sybron Endo',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'El cemento dental es un material esencia....',
    originalPrice: 300,
    price: 250,
  },
  {
    type: 'product',
    title: 'Kit de Blanqueamiento',
    brand: 'Opalescence',
    image: 'https://www.figma.com/api/mcp/asset/54e7bf55-073d-4469-9d7b-2d33c843c33a',
    description: 'Sistema profesional de blanqueamiento...',
    originalPrice: 200,
    price: 150,
  },
  {
    type: 'banner',
    title: 'Nuevos Productos<br>Recién llegados',
    description: 'Lo último en tecnología dental',
    ctaText: 'Explorar',
    ctaLink: '/productos',
    bgColor: 'bg-primary',
    image: 'https://www.figma.com/api/mcp/asset/c55971d1-1310-436b-83f3-ee40dd547c1f'
  },
  {
    type: 'product',
    title: 'Turbina Dental NSK',
    brand: 'NSK',
    image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
    description: 'Turbina de alta velocidad con tecnología...',
    price: 890,
  },
]
</script>

<template>
  <div>
    <HeroBanner />

    <!-- Product Carousel -->
    <Section title="Revisa las mejores ofertas">
        <ProductCarousel
          :items="bestOffersItems"
          :slides-per-view="4"
          :space-between="16"
          :navigation="true"
          :loop="true"
        />
    </Section>

    <!-- Sección Promoción Primera Compra -->
    <section class="bg-linear-to-r from-primary to-primary-700 py-16 relative overflow-hidden flex items-center min-h-[35vh]">
        <div class="container mx-auto">
          <div class="relative flex items-start justify-between mb-24">
            <p class="text-neutral-100 text-4xl font-title font-light leading-10 mb-4 max-w-md">
              Disfruta de esta promoción en tu primera compra:
            </p>
            <button class="absolute top-6 right-20 border-2 border-neutral-100 text-neutral-100 px-6 py-3 rounded-full text-lg font-body">
              Ver ofertas
            </button>
          </div>
          
          <div class="grid grid-cols-3 gap-10 divide-x-2 divide-white">
              <div class="text-center relative">
                  <p class="font-title text-[288px] absolute left-1/3 transform -translate-x-1/2 font-medium bottom-[-150px] leading-none text-primary-500">01</p>
                  <p class="text-neutral-100 text-2xl leading-tight relative">Descuentos<br>exclusivos</p>
              </div>
              <div class="text-center relative">
                  <p class="font-title text-[288px] absolute left-1/3 transform -translate-x-1/2 font-medium bottom-[-150px] leading-none text-primary-500">02</p>
                  <p class="text-neutral-100 text-2xl leading-tight relative">Envíos<br>gratuitos</p>
              </div>
              <div class="text-center relative">
                  <p class="font-title text-[288px] absolute left-1/3 transform -translate-x-1/2 font-medium bottom-[-150px] leading-none text-primary-500">03</p>
                  <p class="text-neutral-100 text-2xl leading-tight relative">Envíos<br>express</p>
              </div>
          </div>
        </div>
    </section>

    <!-- Soluciones -->
    <Section title="Tenemos una solución para ti">
      <div class="grid grid-cols-3 grid-rows-3 gap-5">
          <BentoCard bg="bg-card-solution-1.webp" textColor="text-white">1</BentoCard>
          <BentoCard bg="bg-card-solution-2.webp" class="row-span-2">2</BentoCard>
          <BentoCard bg="bg-card-solution-3.webp" textColor="text-white">3</BentoCard>
          <BentoCard bg="bg-card-solution-4.webp" class="row-span-2">4</BentoCard>
          <BentoCard bg="bg-card-solution-5.webp" textColor="text-white" class="col-start-2 row-start-3">5</BentoCard>
          <BentoCard bg="bg-card-solution-6.webp" class="row-span-2 col-start-3 row-start-2">6</BentoCard>
      </div>
    </Section>

    <!-- Testimonials -->
    <Section title="Reseñas de nuestros clientes">
      <!-- Carrousel de reseñas -->
      <TestimonialsCarousel
          :items="testimonials"
          :slides-per-view="4"
          :space-between="16"
          :navigation="true"
          :loop="true"
        />
    </Section>
  </div>
</template>
