import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [],
  }),

  getters: {
    // Total number of favorites
    totalFavorites: (state) => {
      return state.items.length
    },

    // Check if cart is empty
    isEmpty: (state) => {
      return state.items.length === 0
    },

    // Check if a product is favorited
    isFavorite: (state) => {
      return (productId) => {
        return state.items.some((item) => item.id === productId)
      }
    },
  },

  actions: {
    // Add item to favorites
    addToFavorites(product) {
      // Check if item already exists
      const existingItem = this.items.find((item) => item.id === product.id)

      if (!existingItem) {
        this.items.push({
          id: product.id,
          name: product.name || product.title,
          brand: product.brand,
          image: product.image,
          price: product.price,
          originalPrice: product.originalPrice,
          description: product.description,
        })
        this.saveToLocalStorage()

        // Show toast notification
        const toastStore = useToastStore()
        toastStore.success(`${product.name || product.title} añadido a favoritos`)
      }
    },

    // Remove item from favorites
    removeFromFavorites(productId) {
      const index = this.items.findIndex((item) => item.id === productId)
      if (index > -1) {
        const item = this.items[index]
        this.items.splice(index, 1)
        this.saveToLocalStorage()

        // Show toast notification
        const toastStore = useToastStore()
        toastStore.info(`${item.name} eliminado de favoritos`)
      }
    },

    // Toggle favorite status
    toggleFavorite(product) {
      if (this.isFavorite(product.id)) {
        this.removeFromFavorites(product.id)
      } else {
        this.addToFavorites(product)
      }
    },

    // Clear all favorites
    clearFavorites() {
      this.items = []
      this.saveToLocalStorage()
    },

    // Save favorites to localStorage
    saveToLocalStorage() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('codentsa_favorites', JSON.stringify(this.items))
      }
    },

    // Load favorites from localStorage
    loadFromLocalStorage() {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('codentsa_favorites')
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (error) {
            console.error('Error loading favorites from localStorage:', error)
            this.items = []
          }
        }
      }
    },
  },
})
