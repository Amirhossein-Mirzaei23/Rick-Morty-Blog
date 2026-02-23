<script setup lang="ts">
import type { NuxtError } from '#app'
onUnmounted(() => {
  clearError()
})
interface Props {
  error: NuxtError
}

const { error } = defineProps<Props>()

useSeoMeta({
  title: () => `${error.statusCode} - ${error.statusMessage}`,
  description: 'An error occurred while processing your request.',
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex min-h-dvh flex-col items-center justify-center gap-8 px-4 text-center">
    <div>
      <p class="text-primary-600 text-8xl font-extrabold">{{ error.statusCode }}</p>
      <h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
      </h1>
      <p class="text-md mt-2 truncate bg-red-200 px-8 text-wrap break-normal text-gray-500 dark:text-gray-400">
        {{ error.message || 'An unexpected error occurred.' }}
      </p>
    </div>
    <button class="bg-accent rounded-lg px-6 py-3 font-semibold text-[#00333D] hover:opacity-90" @click="handleError">
      ← Back to Home
    </button>
  </div>
</template>
