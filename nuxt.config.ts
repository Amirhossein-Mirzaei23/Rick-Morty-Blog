import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-01-01',

  ssr: true,

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Rick and Morty blog',
      meta: [
        {
          name: 'description',
          content:
            'Rick and Morty blog - Explore characters, episodes, and locations from the Rick and Morty universe.',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Rick and Morty blog' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/ttf',
          href: '/fonts/Rubik-VariableFont_wght.ttf',
        },
      ],
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
    dirs: ['composables/**'],
  },

  components: [
    { path: '~/components/ui', prefix: 'Ui', pathPrefix: false },
    { path: '~/components', pathPrefix: false },
  ],

  experimental: {
    typedPages: true,
    inlineSSRStyles: true,
  },

  nitro: {
    // preset: 'netlify',
    compressPublicAssets: true,
    prerender: {
      autoSubfolderIndex: false,
    },
    routeRules: {
      '/**': {
        headers: {
          // ✅ Content Security Policy
          'Content-Security-Policy': [
            "default-src 'self'",
            "img-src 'self' https://rickandmortyapi.com data:",
            "font-src 'self' data:",
            "script-src 'self' 'unsafe-inline'", // Nuxt hydration
            "style-src 'self' 'unsafe-inline'",
            "object-src 'none'",
            "base-uri 'self'",
            "frame-ancestors 'none'",
          ].join('; '),

          // ✅ Additional Security Headers
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
        },
      },
    },
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
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? 'https://rickandmortyapi.com/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
      appName: 'Rick and Morty blog',
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
      standalone: true,
    },
  },

  devtools: { enabled: true },
})
