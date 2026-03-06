import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },

  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@pinia/nuxt', 'nuxt-gtag', 'nuxt-umami', '@nuxt/eslint'],

  components: [
    {
      path: '~/components/layout',
      pathPrefix: false,
    },
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
    {
      path: '~/components/features',
      pathPrefix: true,
    },
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;800;900&display=swap',
          onload: "this.onload=null;this.rel='stylesheet'",
        },
        {
          rel: 'preload',
          as: 'image',
          href: '/image-qs-3.webp',
          type: 'image/webp',
        },
      ],
      style: [
        {
          innerHTML:
            '#__nuxt{animation:nuxtReveal .2s ease forwards}@keyframes nuxtReveal{from{opacity:0}to{opacity:1}}',
        },
      ],
      noscript: [
        {
          innerHTML:
            '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;800;900&display=swap">',
        },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  gtag: {
    enabled: process.env.NODE_ENV === 'production',
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
    maintenanceAccessKey: process.env.NUXT_MAINTENANCE_ACCESS_KEY || 'codentsa2025',
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
      maintenanceEnabled: process.env.NUXT_PUBLIC_MAINTENANCE_ENABLED || 'true',
    },
  },
})
