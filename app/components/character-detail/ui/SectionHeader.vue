<script setup lang="ts">
interface Props {
  image: string
  title: string
  alt?: string
}

withDefaults(defineProps<Props>(), {
  alt: 'section icon',
})
</script>

<template>
  <div class="flex items-center gap-3">
    <NuxtImg :src="image" :alt="alt" />
    <h2 class="text-2xl leading-none font-medium text-white">{{ title }}</h2>
  </div>
</template>
