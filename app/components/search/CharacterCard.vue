<script setup lang="ts">
import type { Character, CharacterStatus } from '~/types/character.type'
const { character } = defineProps<{ character: Character }>()
const statusConfig: Record<CharacterStatus, { label: string; dot: string }> = {
  Alive: {
    label: 'Alive',
    dot: 'bg-success',
  },
  Dead: {
    label: 'Dead',
    dot: 'bg-danger',
  },
  unknown: {
    label: 'Unknown',

    dot: 'bg-gray-400',
  },
}

const status = computed(() => statusConfig[character.status] ?? statusConfig.unknown)

const imageLoading = ref(true)

const imgRef = ref<{ $el: HTMLImageElement } | null>(null)
const setImageLoading = (loading: boolean) => {
  imageLoading.value = loading
}

onMounted(() => {
  if (imgRef.value?.$el?.complete) {
    setImageLoading(false)
  }
})
</script>

<template>
  <NuxtLink :to="`/character/${slugify(character.name)}/${character.id}`">
    <article
      class="group flex cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl border border-[#404244] p-4"
      :aria-label="`View details for ${character.name}`"
      role="button"
    >
      <div class="relative aspect-square overflow-hidden rounded-xl">
        <div v-if="imageLoading" class="animate-skeleton absolute inset-0" aria-hidden="true" />
        <NuxtImg
          ref="imgRef"
          :src="character.image"
          :alt="character.name"
          width="300"
          height="300"
          sizes="xs:45vw sm:45vw md:30vw lg:280px"
          densities="1 2"
          loading="lazy"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          :class="imageLoading ? 'opacity-0' : 'opacity-100'"
          @load="setImageLoading(false)"
        />
        <!-- preset="character" -->
      </div>
      <div class="flex flex-1 flex-col gap-3">
        <h2 class="truncate text-base font-semibold dark:text-white">
          {{ character.name }}
        </h2>
        <span class="text-md inline-flex w-fit items-center gap-2 rounded-full leading-none font-normal">
          <span class="h-3 w-3 rounded-full" :class="status.dot" aria-hidden="true" />
          {{ status.label }} - {{ character.species }}
        </span>
      </div>
    </article>
  </NuxtLink>
</template>
