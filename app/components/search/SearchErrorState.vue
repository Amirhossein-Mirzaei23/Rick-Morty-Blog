<script setup lang="ts">
import type { NuxtError } from '#app'
import errorIcon from '@/assets/icons/triangle-error.svg'

const props = defineProps<{
  error: NuxtError | undefined
}>()
const statusCode = ref(
  props.error?.message.includes('no response') ? 429 : (props.error?.status ?? props.error?.statusCode ?? 500),
)

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-3 py-20 text-center" role="alert">
    <img :width="48" :height="48" :src="errorIcon" alt="" aria-hidden="true" role="presentation" />
    <p class="text-danger text-3xl leading-none font-medium">{{ statusCode }}</p>
    <div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Something went wrong</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Failed to fetch characters. Please try again.</p>
    </div>
    <button
      type="button"
      class="bg-accent mt-4 cursor-pointer rounded-sm px-6 py-3 font-semibold text-[#00333D] hover:opacity-90"
      @click="emit('retry')"
    >
      Retry
    </button>
  </div>
</template>
