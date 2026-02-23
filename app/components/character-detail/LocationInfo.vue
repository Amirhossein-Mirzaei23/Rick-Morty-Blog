<script setup lang="ts">
import locationsIcon from '@/assets/icons/location_on.svg'
import type { CharacterLocation } from '~/types/character.type'
import LocationCard from './ui/CharacterInfoCard.vue'
import SectionHeader from './ui/SectionHeader.vue'

interface Props {
  location: CharacterLocation | null
  loading?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-5">
    <SectionHeader :image="locationsIcon" title="Locations" alt="locations" />
    <div v-if="loading" class="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <UiCardSkeletonLoader :show-image-loader="false" card-class="bg-[#0AD7F10A]" loader-class="bg-base" />
    </div>
    <div v-else-if="!props.location">
      <p class="text-info">No location available.</p>
    </div>
    <div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <LocationCard :title="props.location.name" :subtitle="props.location.type" :label="props.location.dimension" />
    </div>
  </div>
</template>
