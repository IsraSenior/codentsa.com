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

    <section class="py-16 md:py-24">
      <div class="container mx-auto">
        <h2 class="text-black text-4xl leading-10 mb-10 font-title">REVISA LAS MEJORES OFERTAS</h2>

        <!-- Product Carousel -->
        <ProductCarousel
          :items="bestOffersItems"
          :slides-per-view="4"
          :space-between="16"
          :navigation="true"
          :loop="true"
        />
      </div>
    </section>
  </div>
</template>
