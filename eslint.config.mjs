import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: ['.nuxt/**', '.output/**', 'dist/**', 'node_modules/**', 'public/**'],
  },

  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': ['warn', { html: { void: 'always', normal: 'always', component: 'always' } }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/require-explicit-emits': 'error',
      'vue/no-v-html': 'warn',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
    },
  },

  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
    },
  },
)
