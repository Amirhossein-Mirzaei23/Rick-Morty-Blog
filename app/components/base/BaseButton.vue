<script setup lang="ts">
/**
 * BaseButton – the root button primitive.
 * All other button-like elements should compose from this.
 */
interface Props {
  /** Visual style */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  /** Size preset */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Renders as an anchor tag via NuxtLink */
  to?: string
  /** Disabled state */
  disabled?: boolean
  /** Show loading spinner */
  loading?: boolean
  /** Button type */
  type?: 'button' | 'submit' | 'reset'
}

const {
  variant = 'primary',
  size = 'md',
  to,
  disabled = false,
  loading = false,
  type = 'button',
} = defineProps<Props>()

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  xs: 'px-2.5 py-1 text-xs rounded',
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-6 py-3 text-base rounded-lg',
}

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  variantClasses[variant],
  sizeClasses[size],
  { 'opacity-50 cursor-not-allowed pointer-events-none': disabled || loading },
])

const component = computed(() => (to ? resolveComponent('NuxtLink') : 'button'))
</script>

<template>
  <component
    :is="component"
    :to="to"
    :type="!to ? type : undefined"
    :disabled="!to ? disabled || loading : undefined"
    :class="classes"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>

    <slot />
  </component>
</template>
