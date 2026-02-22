<script setup lang="ts">
import searchIcon from '@/assets/icons/search-normal.svg'
interface Props {
  loading?: boolean
}

const { loading = false } = defineProps<Props>()

const emit = defineEmits<{
  search: [query: string]
}>()

const model = defineModel<string>({ default: '' })

const {
  debounced: debouncedSearch,
  flush: flushSearch,
  cancel: cancelSearch,
} = useDebounce((value: string) => emit('search', value), 500)

function handleSearch() {
  const trimmed = model.value.trim()
  if (!trimmed) return
  // Flush immediately – cancel any pending debounce and fire now
  flushSearch(trimmed)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') handleSearch()
}

watch(model, (value) => {
  const trimmedSearchValue = value.trim()
  cancelSearch()
  if (trimmedSearchValue.length > 2) {
    debouncedSearch(trimmedSearchValue)
  } else if (!trimmedSearchValue) {
    flushSearch('')
  }
})
</script>

<template>
  <div class="from-base to-base-dark relative w-full overflow-hidden bg-linear-to-r to-40% px-4 py-12">
    <!-- Glow orb sits behind the input box -->
    <UiGlowOrb class="bottom-1/5 left-1/5 hidden lg:md:block" :opacity="100" :width="250" :blur="100" :height="150" />

    <div class="bg-base relative z-10 mx-auto mt-15 rounded-md p-4 lg:max-w-10/12">
      <div class="bg-base flex gap-3" role="search">
        <label for="search-input" class="sr-only">Search for characters...</label>
        <input
          id="search-input"
          v-model="model"
          type="search"
          placeholder="Search for characters..."
          autocomplete="off"
          :disabled="loading"
          class="flex-1 rounded-sm bg-[#3B3D3F] px-2 py-3 text-white placeholder-white outline-none focus:ring-1 focus:ring-cyan-800 disabled:cursor-not-allowed"
          aria-label="Character name"
          @keydown="handleKeydown"
        />

        <button
          type="button"
          :disabled="loading || !model.trim()"
          class="bg-accent hover:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-sm px-4 py-3 text-sm leading-none font-medium text-[#00333D] disabled:cursor-not-allowed disabled:opacity-75"
          aria-label="Search"
          @click="handleSearch"
        >
          <img :src="searchIcon" :width="14" :height="14" alt="search icon" />
          <span class="hidden lg:inline">Search</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#search-input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  cursor: pointer;
  /* To change the color, edit the stroke value — %23 is a URL-encoded # */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23B2DF28' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M18 6L6 18M6 6l12 12'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
