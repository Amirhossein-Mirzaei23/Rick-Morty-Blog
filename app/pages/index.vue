<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const searchQuery = computed(() => (route.query.name as string) ?? '')
const currentPage = computed(() => Number(route.query.page ?? 1))
const inputValue = ref(searchQuery.value)

const { characters, totalPages, error, isLoading, hasError, isEmpty, refresh } = await useCharacterSearch({
  name: searchQuery,
  page: currentPage,
})

function pushQuery(params: Record<string, string | number>) {
  router.push({ query: { ...route.query, ...params } })
}

function handleSearch(query: string) {
  inputValue.value = query
  pushQuery({ name: query, page: 1 })
}

function goToPage(page: number) {
  pushQuery({ page })
}
useSeoMeta({
  title: computed(() =>
    searchQuery.value ? `Results for "${searchQuery.value}" – Rick & Morty` : 'Character Search – Rick & Morty',
  ),
  description: 'Search for Rick and Morty characters by name.',
  ogTitle: computed(() =>
    searchQuery.value ? `Results for "${searchQuery.value}" – Rick & Morty` : 'Character Search – Rick & Morty',
  ),
})

useHeadSafe({
  link: [
    {
      rel: 'canonical',
      href: `https://yourdomain.com/character/search`,
    },
  ],
})
</script>

<template>
  <div class="flex-1">
    <SearchBar v-model="inputValue" :loading="isLoading" @search="handleSearch" />
    <main class="container-fluid">
      <LazySearchErrorState v-if="hasError" :error="error" @retry="refresh" />
      <LazySearchEmptyState v-else-if="isEmpty" :search-query="searchQuery" />
      <LazySearchIdleState v-else-if="!searchQuery && !isLoading" />
      <div v-else class="flex flex-col gap-6 py-8">
        <ul class="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-39 lg:py-16">
          <template v-if="isLoading">
            <li v-for="n in 10" :key="n">
              <UiCardSkeletonLoader :show-image-loader="true" card-class="bg-base" loader-class="bg-base-dark" />
            </li>
          </template>
          <template v-else>
            <li v-for="character in characters" :key="character.id">
              <CharacterCard :character="character" />
            </li>
          </template>
        </ul>
        <LazySearchPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :loading="isLoading"
          @page="goToPage"
        />
      </div>
    </main>
  </div>
</template>
