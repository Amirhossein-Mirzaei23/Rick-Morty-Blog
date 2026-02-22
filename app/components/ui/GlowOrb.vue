<script setup lang="ts">
interface Props {
  color?: string
  width?: number
  height?: number
  blur?: number
  opacity?: number
}

const { color = '#B2DF28', width = 200, height = 150, blur = 160, opacity = 0.65 } = defineProps<Props>()
</script>

<template>
  <div
    class="pointer-events-none absolute rounded-full"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      background: color,
      filter: `blur(${blur}px)`,
      opacity,
    }"
    aria-hidden="true"
  />
</template>
