import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-01-01',

  ssr: true,

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nuxt 4 App',
      titleTemplate: '%s | Nuxt 4 App',
      meta: [
        { name: 'description', content: 'Production-ready Nuxt 4 SSR application.' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Nuxt 4 App' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router'],
            'pinia-vendor': ['pinia'],
          },
        },
      },
    },
    css: {
      devSourcemap: true,
    },
  },

  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  imports: {
    dirs: ['composables/**', 'stores/**', 'utils/**'],
  },

  components: [
    { path: '~/components/base', prefix: 'Base', pathPrefix: false },
    { path: '~/components/ui', prefix: 'Ui', pathPrefix: false },
    { path: '~/components/layout', prefix: '', pathPrefix: false },
    { path: '~/components', pathPrefix: false },
  ],

  experimental: {
    typedPages: true,
    inlineSSRStyles: true,
  },

  nitro: {
    compressPublicAssets: true,
    typescript: {
      strict: true,
      tsConfig: {
        compilerOptions: {
          moduleResolution: 'bundler',
        },
      },
    },
  },

  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET ?? '',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? '/api',
      appName: 'Nuxt 4 App',
      appVersion: '1.0.0',
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
        verbatimModuleSyntax: true,
        noUncheckedIndexedAccess: true,
        exactOptionalPropertyTypes: true,
        noImplicitOverride: true,
      },
    },
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  devtools: { enabled: true },
})
