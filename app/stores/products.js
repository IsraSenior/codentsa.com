import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    // All products (would come from API in production)
    products: [
      {
        id: 1,
        name: 'Sealapex Cemento',
        brand: 'Sybron Endo',
        description: 'El cemento dental es un material esencial para procedimientos de endodoncia.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 250,
        originalPrice: 300,
        rating: 4.5,
        category: 'restauracion',
        inStock: true,
      },
      {
        id: 2,
        name: 'Resina Compuesta Premium',
        brand: '3M ESPE',
        description: 'Resina de alta calidad para restauraciones estéticas.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 380,
        originalPrice: 450,
        rating: 4.8,
        category: 'restauracion',
        inStock: true,
      },
      {
        id: 3,
        name: 'Kit de Instrumentos Endodoncia',
        brand: 'Dentsply Sirona',
        description: 'Kit completo de instrumentos para procedimientos endodónticos.',
        image: 'https://www.figma.com/api/mcp/asset/54e7bf55-073d-4469-9d7b-2d33c843c33a',
        price: 450,
        originalPrice: null,
        rating: 4.7,
        category: 'exploracion',
        inStock: true,
      },
      {
        id: 4,
        name: 'Adhesivo Dental Universal',
        brand: 'Ivoclar Vivadent',
        description: 'Adhesivo de última generación para todo tipo de restauraciones.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 180,
        originalPrice: 220,
        rating: 4.6,
        category: 'restauracion',
        inStock: true,
      },
      {
        id: 5,
        name: 'Turbina Dental de Alta Velocidad',
        brand: 'NSK',
        description: 'Turbina de precisión con sistema de refrigeración avanzado.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 850,
        originalPrice: 1000,
        rating: 4.9,
        category: 'accesorios',
        inStock: true,
      },
      {
        id: 6,
        name: 'Composite Fotopolimerizable',
        brand: 'Kulzer',
        description: 'Material de restauración de alta estética y resistencia.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 320,
        originalPrice: 400,
        rating: 4.5,
        category: 'restauracion',
        inStock: true,
      },
      {
        id: 7,
        name: 'Lámpara de Fotocurado LED',
        brand: 'Woodpecker',
        description: 'Lámpara LED de alta potencia para polimerización rápida y efectiva.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 280,
        originalPrice: 350,
        rating: 4.7,
        category: 'accesorios',
        inStock: true,
      },
      {
        id: 8,
        name: 'Espejo Dental con Luz LED',
        brand: 'DentLight',
        description: 'Espejo intraoral con iluminación LED integrada para mejor visibilidad.',
        image: 'https://www.figma.com/api/mcp/asset/54e7bf55-073d-4469-9d7b-2d33c843c33a',
        price: 95,
        originalPrice: null,
        rating: 4.4,
        category: 'exploracion',
        inStock: true,
      },
      {
        id: 9,
        name: 'Blanqueamiento Dental Profesional',
        brand: 'Philips Zoom',
        description: 'Sistema de blanqueamiento profesional con resultados inmediatos.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 420,
        originalPrice: 500,
        rating: 4.8,
        category: 'higiene',
        inStock: true,
      },
      {
        id: 10,
        name: 'Guantes de Nitrilo sin Polvo',
        brand: 'Medline',
        description: 'Caja de 100 unidades de guantes de nitrilo hipoalergénicos.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 45,
        originalPrice: null,
        rating: 4.3,
        category: 'higiene',
        inStock: true,
      },
      {
        id: 11,
        name: 'Micromotor Eléctrico',
        brand: 'NSK',
        description: 'Micromotor de precisión con control de velocidad variable.',
        image: 'https://www.figma.com/api/mcp/asset/54e7bf55-073d-4469-9d7b-2d33c843c33a',
        price: 680,
        originalPrice: 800,
        rating: 4.9,
        category: 'accesorios',
        inStock: true,
      },
      {
        id: 12,
        name: 'Ionómero de Vidrio',
        brand: 'GC Fuji',
        description: 'Cemento de ionómero de vidrio para restauraciones y cementado.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 165,
        originalPrice: 200,
        rating: 4.6,
        category: 'restauracion',
        inStock: true,
      },
      {
        id: 13,
        name: 'Escáner Intraoral Digital',
        brand: '3Shape TRIOS',
        description: 'Escáner intraoral de última generación para impresiones digitales.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 12500,
        originalPrice: 15000,
        rating: 5.0,
        category: 'exploracion',
        inStock: true,
      },
      {
        id: 14,
        name: 'Fresas Diamantadas Set 10 Piezas',
        brand: 'Komet',
        description: 'Juego de 10 fresas diamantadas de alta calidad para diferentes procedimientos.',
        image: 'https://www.figma.com/api/mcp/asset/54e7bf55-073d-4469-9d7b-2d33c843c33a',
        price: 125,
        originalPrice: null,
        rating: 4.7,
        category: 'cirugia',
        inStock: true,
      },
      {
        id: 15,
        name: 'Anestesia Tópica Gel',
        brand: 'Septodont',
        description: 'Gel anestésico tópico de sabor agradable para anestesia superficial.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 35,
        originalPrice: 45,
        rating: 4.4,
        category: 'cirugia',
        inStock: true,
      },
      {
        id: 16,
        name: 'Sillón Dental Eléctrico',
        brand: 'Sirona',
        description: 'Sillón dental ergonómico con ajuste eléctrico y tapicería premium.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 8500,
        originalPrice: null,
        rating: 4.9,
        category: 'accesorios',
        inStock: true,
      },
      {
        id: 17,
        name: 'Autoclave Clase B',
        brand: 'Melag',
        description: 'Autoclave de vapor de clase B para esterilización completa.',
        image: 'https://www.figma.com/api/mcp/asset/54e7bf55-073d-4469-9d7b-2d33c843c33a',
        price: 3200,
        originalPrice: 3800,
        rating: 4.8,
        category: 'accesorios',
        inStock: true,
      },
      {
        id: 18,
        name: 'Revelador de Placa Bacteriana',
        brand: 'GUM',
        description: 'Solución reveladora para visualizar placa bacteriana en pacientes.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 28,
        originalPrice: null,
        rating: 4.2,
        category: 'higiene',
        inStock: true,
      },
      {
        id: 19,
        name: 'Alginato para Impresiones',
        brand: 'Zhermack',
        description: 'Material de impresión de alginato de fraguado rápido.',
        image: 'https://www.figma.com/api/mcp/asset/2fbb830f-f66f-44d9-9220-dfd0d0cf061b',
        price: 65,
        originalPrice: 80,
        rating: 4.5,
        category: 'ortodoncia',
        inStock: true,
      },
      {
        id: 20,
        name: 'Bisturí Eléctrico',
        brand: 'Ellman',
        description: 'Bisturí eléctrico de alta frecuencia para cirugía oral precisa.',
        image: 'https://www.figma.com/api/mcp/asset/54e7bf55-073d-4469-9d7b-2d33c843c33a',
        price: 1850,
        originalPrice: 2200,
        rating: 4.7,
        category: 'cirugia',
        inStock: true,
      },
    ],
    // Currently selected product for detail page
    selectedProduct: null,
    // Loading state
    isLoading: false,
    // Error state
    error: null,
  }),

  getters: {
    // Get all products
    allProducts: (state) => state.products,

    // Get products by category
    productsByCategory: (state) => {
      return (category) => {
        return state.products.filter((product) => product.category === category)
      }
    },

    // Get product by ID
    productById: (state) => {
      return (id) => {
        return state.products.find((product) => product.id === parseInt(id))
      }
    },

    // Get featured products (with discount)
    featuredProducts: (state) => {
      return state.products.filter((product) => product.originalPrice !== null)
    },

    // Get products in stock
    inStockProducts: (state) => {
      return state.products.filter((product) => product.inStock)
    },

    // Search products
    searchProducts: (state) => {
      return (query) => {
        const lowerQuery = query.toLowerCase()
        return state.products.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.brand.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery)
        )
      }
    },
  },

  actions: {
    // Fetch all products (would be an API call in production)
    async fetchProducts() {
      this.isLoading = true
      this.error = null
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        // In production: const response = await fetch('/api/products')
        // In production: this.products = await response.json()
        this.isLoading = false
      } catch (error) {
        this.error = error.message
        this.isLoading = false
      }
    },

    // Fetch product by ID
    async fetchProductById(id) {
      this.isLoading = true
      this.error = null
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300))
        const product = this.productById(id)
        if (product) {
          this.selectedProduct = product
        } else {
          this.error = 'Product not found'
        }
        this.isLoading = false
      } catch (error) {
        this.error = error.message
        this.isLoading = false
      }
    },

    // Add new product (admin functionality)
    addProduct(product) {
      const newProduct = {
        ...product,
        id: Math.max(...this.products.map((p) => p.id)) + 1,
      }
      this.products.push(newProduct)
    },

    // Update product (admin functionality)
    updateProduct(id, updates) {
      const index = this.products.findIndex((p) => p.id === parseInt(id))
      if (index > -1) {
        this.products[index] = { ...this.products[index], ...updates }
      }
    },

    // Delete product (admin functionality)
    deleteProduct(id) {
      const index = this.products.findIndex((p) => p.id === parseInt(id))
      if (index > -1) {
        this.products.splice(index, 1)
      }
    },

    // Clear selected product
    clearSelectedProduct() {
      this.selectedProduct = null
    },
  },
})
