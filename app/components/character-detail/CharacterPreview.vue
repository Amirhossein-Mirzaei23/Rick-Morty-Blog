<script setup lang="ts">
import type { Character } from '~/types/character.type'
defineProps<{ character: Character }>()

const imageLoading = ref<boolean>(true)
const imgRef = ref<HTMLImageElement>()
const setImageLoading = (loading: boolean) => {
  imageLoading.value = loading
}

onMounted(() => {
  if (imgRef.value?.complete) {
    setImageLoading(false)
  }
})
</script>

<template>
  <div
    class="from-base to-base-dark relative w-full overflow-hidden bg-linear-to-r to-40% px-4 py-4 lg:to-60% lg:px-39 lg:py-12"
  >
    <UiGlowOrb
      class="bottom-1/5 -left-10 lg:bottom-5/12 lg:left-1/6"
      :opacity="100"
      :width="200"
      :blur="70"
      :height="150"
    />
    <div class="relative z-10 mx-auto mt-15 flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:gap-12">
      <div class="relative aspect-square h-45 w-45 overflow-hidden rounded-md lg:h-60 lg:w-60">
        <div v-if="imageLoading" class="animate-skeleton absolute inset-0" aria-hidden="true" />
        <img
          ref="imgRef"
          :src="character.image"
          fetchpriority="high"
          :alt="character.name"
          :width="180"
          :height="180"
          class="h-45 w-45 rounded-md object-cover lg:h-60 lg:w-60"
          @load="setImageLoading(false)"
        />
      </div>
      <div class="grid grid-cols-1 gap-4">
        <h1 class="text-2xl leading-none font-medium text-white">{{ character.name }}</h1>
        <div>
          <span class="text-md inline-flex items-center gap-2 font-normal text-white">
            <span
              class="inline-block h-3 w-3 rounded-full"
              :class="{
                'bg-success': character.status === 'Alive',
                'bg-danger': character.status === 'Dead',
                'bg-gray-500': character.status === 'unknown',
              }"
            />
            {{ character.status }} - {{ character.species }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
