import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    // Total number of items in cart
    totalItems: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    // Check if cart is empty
    isEmpty: (state) => {
      return state.items.length === 0
    },

    // Calculate subtotal
    subtotal: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },

    // Calculate shipping (flat rate for now)
    shipping: () => {
      return 15 // €15 flat shipping
    },

    // Calculate tax (2.1% IVA in Spain)
    tax: (state) => {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return subtotal * 0.021
    },

    // Calculate total
    total() {
      return this.subtotal + this.shipping + this.tax
    },
  },

  actions: {
    // Add item to cart
    addItem(product) {
      // Check if item with same product and variants already exists
      const existingItem = this.items.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize &&
          item.selectedMaterial === product.selectedMaterial
      )

      if (existingItem) {
        // Increment quantity if item already exists
        existingItem.quantity += product.quantity || 1
      } else {
        // Add new item
        this.items.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: product.quantity || 1,
          selectedColor: product.selectedColor || null,
          selectedSize: product.selectedSize || null,
          selectedMaterial: product.selectedMaterial || null,
        })
      }

      this.saveToLocalStorage()

      // Show toast notification
      const toastStore = useToastStore()
      toastStore.success(`${product.name} añadido al carrito`)
    },

    // Remove item from cart
    removeItem(itemId) {
      const index = this.items.findIndex((item) => item.id === itemId)
      if (index > -1) {
        const item = this.items[index]
        this.items.splice(index, 1)
        this.saveToLocalStorage()

        // Show toast notification
        const toastStore = useToastStore()
        toastStore.info(`${item.name} eliminado del carrito`)
      }
    },

    // Update item quantity
    updateQuantity(itemId, quantity) {
      const item = this.items.find((item) => item.id === itemId)
      if (item) {
        item.quantity = Math.max(1, quantity) // Minimum quantity is 1
        this.saveToLocalStorage()
      }
    },

    // Increment quantity
    incrementQuantity(itemId) {
      const item = this.items.find((item) => item.id === itemId)
      if (item) {
        item.quantity++
        this.saveToLocalStorage()
      }
    },

    // Decrement quantity
    decrementQuantity(itemId) {
      const item = this.items.find((item) => item.id === itemId)
      if (item && item.quantity > 1) {
        item.quantity--
        this.saveToLocalStorage()
      }
    },

    // Clear all items from cart
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },

    // Save cart to localStorage
    saveToLocalStorage() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('codentsa_cart', JSON.stringify(this.items))
      }
    },

    // Load cart from localStorage
    loadFromLocalStorage() {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('codentsa_cart')
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (error) {
            console.error('Error loading cart from localStorage:', error)
            this.items = []
          }
        }
      }
    },
  },
})
