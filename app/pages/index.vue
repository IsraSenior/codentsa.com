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

// Testimonials Data
const testimonials = [
  {
    productName: 'Turbina eléctrica',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus...',
    rating: 5,
    authorName: 'Mario Ruiz',
    authorAvatar: 'https://i.pravatar.cc/150?img=12',
    timeAgo: 'Hace dos días',
  },
  {
    productName: 'Kit de Blanqueamiento',
    review: 'Excelente producto, superó mis expectativas. La calidad es increíble y el servicio al cliente fue muy atento. Lo recomiendo totalmente para cualquier consultorio dental profesional.',
    rating: 5,
    authorName: 'Ana García',
    authorAvatar: 'https://i.pravatar.cc/150?img=5',
    timeAgo: 'Hace una semana',
  },
  {
    productName: 'Resina Compuesta',
    review: 'Muy buena calidad, los resultados son excelentes. Mis pacientes están muy satisfechos con las restauraciones. La durabilidad es excepcional y el acabado es perfecto.',
    rating: 4,
    authorName: 'Carlos Méndez',
    authorAvatar: 'https://i.pravatar.cc/150?img=33',
    timeAgo: 'Hace tres días',
  },
  {
    productName: 'Cemento Dental',
    review: 'Producto confiable y de excelente calidad. Lo he usado en múltiples procedimientos y siempre da resultados consistentes. La adherencia es superior a otras marcas que he probado.',
    rating: 5,
    authorName: 'Laura Sánchez',
    authorAvatar: 'https://i.pravatar.cc/150?img=9',
    timeAgo: 'Hace cinco días',
  },
  {
    productName: 'Instrumental Quirúrgico',
    review: 'La precisión del instrumental es impresionante. Facilita mucho los procedimientos complejos. La ergonomía es excelente y se nota la calidad de los materiales.',
    rating: 5,
    authorName: 'Roberto Díaz',
    authorAvatar: 'https://i.pravatar.cc/150?img=15',
    timeAgo: 'Hace un día',
  },
]

// Brands Data
const brands = [
  {
    name: "Dentsply Sirona",
    logo: "https://www.figma.com/api/mcp/asset/658a450a-4a6a-4fcc-a9f3-76c69db9ba2a"
  },
  {
    name: "Align",
    logo: "https://www.figma.com/api/mcp/asset/b0d6508d-b769-4b60-8d75-6afca63e834c"
  },
  {
    name: "3M",
    logo: "https://www.figma.com/api/mcp/asset/600e56b7-6926-4459-9fcb-f6a303fab606"
  },
  {
    name: "Straumann",
    logo: "https://www.figma.com/api/mcp/asset/b6debe7a-c873-4fb8-8c19-b864928748ab"
  },
  {
    name: "Envista",
    logo: "https://www.figma.com/api/mcp/asset/2efead82-119b-47eb-a305-c6535081dce0"
  }
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
