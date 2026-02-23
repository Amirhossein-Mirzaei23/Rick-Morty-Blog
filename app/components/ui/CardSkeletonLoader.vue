<template>
  <div class="overflow-hidden rounded-xl border border-neutral-600" :class="cardClass" aria-hidden="true">
    <div v-if="showImageLoader" class="aspect-square animate-pulse" :class="loaderClass" />
    <div class="flex flex-col gap-3 p-4">
      <div class="h-4 w-3/4 animate-pulse rounded" :class="loaderClass" />
      <div class="h-5 w-1/3 animate-pulse rounded-full" :class="loaderClass" />
      <div class="h-3 w-1/2 animate-pulse rounded" :class="loaderClass" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  showImageLoader?: boolean
  cardClass?: string
  loaderClass?: string
}

withDefaults(defineProps<Props>(), {
  showImageLoader: true,
  cardClass: 'bg-base',
  loaderClass: 'bg-base-dark',
})
</script>
