<template>
  <div class="flex h-32 flex-col items-start justify-between rounded-xl bg-[#0AD7F10A] p-4 leading-none text-white">
    <p class="line-clamp-2 text-[20px] font-bold">
      {{ title }}
    </p>
    <p class="text-md text-info font-medium">{{ subtitle }}</p>
    <p class="text-md text-sm font-normal text-neutral-500">{{ label }}</p>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  label: string
}>()
</script>
