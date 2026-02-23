import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    include: ['tests/**/*.test.ts'],
    environmentOptions: {
      nuxt: {
        features: { pages: false },
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['app/composables/**', 'app/utils/**', 'app/components/**'],
    },
  },
})
