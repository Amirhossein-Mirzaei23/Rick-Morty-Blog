<script setup lang="ts">
import idleIcon from '@/assets/icons/idl-imoji.svg'
</script>

<template>
  <div class="flex flex-col items-center gap-3 py-20 text-center">
    <img :src="idleIcon" :width="48" :height="48" alt="idle icon" />
    <p class="text-sm text-gray-500 dark:text-gray-400">
      Enter a character name above and hit Search or Enter more than 3 character for auto search.
    </p>
  </div>
</template>
