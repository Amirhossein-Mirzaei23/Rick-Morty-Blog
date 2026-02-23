<script setup lang="ts">
import episodesIcon from '@/assets/icons/featured_play_list.svg'
import type { Episode } from '~/types/character.type'
import SectionHeader from './ui/SectionHeader.vue'
import EpisodeCard from './ui/CharacterInfoCard.vue'
interface Props {
  episodes: Episode[]
  loading?: boolean
}
const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-5">
    <SectionHeader :image="episodesIcon" title="Episodes" alt="episodes" />

    <ul class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
      <template v-if="!loading && props.episodes && props.episodes.length > 0">
        <li v-for="episode in props.episodes" :key="episode.id">
          <EpisodeCard :title="episode.name" :subtitle="episode.episode" :label="episode.air_date" />
        </li>
      </template>
      <template v-else-if="!loading && (!props.episodes || props.episodes.length === 0)">
        <div class="text-gray-500">
          <p>No episodes available.</p>
        </div>
      </template>
      <template v-else>
        <li v-for="n in 4" :key="n">
          <UiCardSkeletonLoader :show-image-loader="false" card-class="bg-[#0AD7F10A]" loader-class="bg-base" />
        </li>
      </template>
    </ul>
  </div>
</template>
