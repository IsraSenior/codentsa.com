import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [],
    nextId: 1,
  }),

  actions: {
    // Add a toast notification
    addToast({ message, type = 'info', duration = 3000 }) {
      const id = this.nextId++
      const toast = {
        id,
        message,
        type, // 'success', 'error', 'warning', 'info'
        duration,
      }

      this.toasts.push(toast)

      // Auto remove after duration
      if (duration > 0) {
        setTimeout(() => {
          this.removeToast(id)
        }, duration)
      }

      return id
    },

    // Remove a toast by ID
    removeToast(id) {
      const index = this.toasts.findIndex((t) => t.id === id)
      if (index > -1) {
        this.toasts.splice(index, 1)
      }
    },

    // Clear all toasts
    clearAll() {
      this.toasts = []
    },

    // Convenience methods for different types
    success(message, duration) {
      return this.addToast({ message, type: 'success', duration })
    },

    error(message, duration) {
      return this.addToast({ message, type: 'error', duration })
    },

    warning(message, duration) {
      return this.addToast({ message, type: 'warning', duration })
    },

    info(message, duration) {
      return this.addToast({ message, type: 'info', duration })
    },
  },
})
