<script setup lang="ts">
import magnifierIcon from '@/assets/icons/magnifier.svg'
defineProps<{
  searchQuery: string
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-3 py-20 text-center" role="status">
    <img :src="magnifierIcon" :width="48" :height="48" alt="search icon" />
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">No items found</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      No characters matched "
      <strong>{{ searchQuery }}</strong>
      ". Try a different name.
    </p>
  </div>
</template>
