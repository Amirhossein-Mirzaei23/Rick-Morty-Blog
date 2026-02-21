<script setup lang="ts">
const year = new Date().getFullYear()
const { appName } = useRuntimeConfig().public
</script>

<template>
  <footer class="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
    <div class="container-fluid py-8">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          © {{ year }} {{ appName }}. All rights reserved.
        </p>
        <div class="flex gap-6">
          <NuxtLink to="/privacy" class="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400">Terms</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
