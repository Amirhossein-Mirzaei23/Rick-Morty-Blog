<script setup lang="ts">
import { useCharacterEpisodesApi } from '~/composables/api/useCharacterEpisodesApi'
import { useCharacterLocationApi } from '~/composables/api/useCharactorLocationApi'
import { useCharacterJsonLd } from '~/composables/useCharacterJsonLd'
import { useCharacteApi } from '~/composables/api/useCharacteApi'

definePageMeta({
  layout: 'default',
  validate(route) {
    const { id } = route.params as { id?: string | string[] }
    if (typeof id !== 'string') return false
    const num = Number(id)
    return !isNaN(num) && num > 0
  },
})

const route = useRoute()

const characterId = computed(() => {
  const { id } = route.params as { id?: string | string[] }
  return Array.isArray(id) ? (id[0] ?? '') : (id ?? '')
})
const { character } = await useCharacteApi(characterId)

const episodeIds = computed(
  () =>
    character.value?.episode.map((url) => url.match(/\/episode\/(\d+)/)?.[1]).filter((id): id is string => !!id) ?? [],
)
const locationId = computed(() => character.value?.location.url.match(/\/location\/(\d+)/)?.[1] ?? null)

const { episodes, episodesStatus } = useCharacterEpisodesApi(episodeIds)
const { location, locationStatus } = useCharacterLocationApi(locationId)

const { jsonLd, canonicalUrl } = useCharacterJsonLd(character, characterId.value)

useSeoMeta({
  title: () => (character.value ? `${character.value.name} - Rick and Morty Character` : 'Character'),
  description: () =>
    character.value
      ? `${character.value.name} is a ${character.value.status} ${character.value.species} from Rick and Morty. Origin: ${character.value.origin.name}. Appears in ${character.value.episode.length} episodes.`
      : '',
  ogTitle: () => (character.value ? `${character.value.name} - Rick and Morty Character` : ''),
  ogDescription: () =>
    character.value
      ? `${character.value.name} is a ${character.value.status} ${character.value.species} from Rick and Morty. Origin: ${character.value.origin.name}. Appears in ${character.value.episode.length} episodes.`
      : '',
  ogImage: () => character.value?.image,
  ogImageAlt: () => (character.value ? `${character.value.name} - Rick and Morty character image` : ''),
  ogType: 'profile',
  twitterCard: 'summary_large_image',
  twitterTitle: () => (character.value ? `${character.value.name} - Rick and Morty Character` : ''),
  twitterDescription: () =>
    character.value
      ? `${character.value.name}: ${character.value.status} ${character.value.species}. Origin: ${character.value.origin.name}.`
      : '',
  twitterImage: () => character.value?.image,
})

useHead({
  link: computed(() =>
    character.value
      ? [
          { rel: 'preload', as: 'image', href: character.value.image },
          { rel: 'canonical', href: canonicalUrl.value },
        ]
      : [],
  ),
  script: computed(() =>
    jsonLd.value.map((schema) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema),
    })),
  ),
})
</script>

<template>
  <div v-if="character" class="flex flex-col gap-8">
    <CharacterPreview :character="character" />
    <div class="flex flex-col gap-8 px-4 py-8 lg:gap-16 lg:px-39 lg:py-16">
      <Suspense>
        <template #default>
          <LazyEpisodesList
            :episodes="episodes ?? []"
            :loading="episodesStatus === 'pending' || episodesStatus === 'idle'"
          />
        </template>
        <template #fallback>
          <div class="animate-skeleton h-64 rounded-2xl bg-[#404244]"></div>
        </template>
      </Suspense>
      <Suspense>
        <template #default>
          <LazyLocationInfo hydrate-on-visible :location="location ?? null" :loading="locationStatus === 'pending'" />
        </template>
        <template #fallback>
          <div class="animate-skeleton h-32 rounded-2xl bg-[#404244]"></div>
        </template>
      </Suspense>
    </div>
  </div>
</template>
