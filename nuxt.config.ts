import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },

  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@pinia/nuxt', 'nuxt-gtag', 'nuxt-umami'],

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  gtag: {
    id: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },

  umami: {
    id: process.env.NUXT_PUBLIC_UMAMI_ID,
    host: process.env.NUXT_PUBLIC_UMAMI_HOST,
    autoTrack: true,
    ignoreLocalhost: true,
    version: 2,
  },

  runtimeConfig: {
    // Private keys (only available server-side)
    directusToken: process.env.NUXT_DIRECTUS_TOKEN,
    redsys: {
      merchantCode: process.env.NUXT_REDSYS_MERCHANT_CODE,
      terminal: process.env.NUXT_REDSYS_TERMINAL,
      secretKey: process.env.NUXT_REDSYS_SECRET_KEY,
      environment: process.env.NUXT_REDSYS_ENVIRONMENT || 'test',
    },

    // Public keys (exposed to client)
    public: {
      directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL,
      googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID,
      metaPixelId: process.env.NUXT_PUBLIC_META_PIXEL_ID,
    },
  },
})
