<script setup lang="ts">
/**
 * UiCard – flexible card container with optional header/footer slots.
 */
interface Props {
  /** Add elevation shadow */
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  /** Remove default padding */
  noPadding?: boolean
}

const { shadow = 'sm', noPadding = false } = defineProps<Props>()

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}
</script>

<template>
  <div
    class="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
    :class="shadowClasses[shadow]"
  >
    <!-- Header slot -->
    <div
      v-if="$slots.header"
      class="border-b border-gray-200 px-6 py-4 dark:border-gray-700"
    >
      <slot name="header" />
    </div>

    <!-- Body -->
    <div :class="{ 'px-6 py-5': !noPadding }">
      <slot />
    </div>

    <!-- Footer slot -->
    <div
      v-if="$slots.footer"
      class="border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
