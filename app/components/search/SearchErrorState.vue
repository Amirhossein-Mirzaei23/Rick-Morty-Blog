<script setup lang="ts">
import type { NuxtError } from '#app'
import errorIcon from '@/assets/icons/triangle-error.svg'

const props = defineProps<{
  error: NuxtError | undefined
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-3 py-20 text-center" role="alert">
    <img :width="48" :height="48" :src="errorIcon" alt="error" />
    <p>{{ props.error?.statusCode }} - {{ props.error?.status }}</p>
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Something went wrong</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400">Failed to fetch characters. Please try again.</p>
    <button
      type="button"
      class="bg-primary-600 hover:bg-primary-700 mt-2 rounded-lg px-5 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-800"
      @click="emit('retry')"
    >
      Retry
    </button>
  </div>
</template>
