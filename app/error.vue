<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
}

const { error } = defineProps<Props>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
    <div>
      <p class="text-8xl font-extrabold text-primary-600">{{ error.statusCode }}</p>
      <h1 class="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
        {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
      </h1>
      <p class="mt-2 text-gray-500 dark:text-gray-400">
        {{ error.message || 'An unexpected error occurred.' }}
      </p>
    </div>
    <BaseButton @click="handleError">← Back to Home</BaseButton>
  </div>
</template>
