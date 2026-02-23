import type { CharacterSearchResponse } from '~/types/character.type'

interface UseCharacterSearchOptions {
  name: Ref<string> | ComputedRef<string>
  page: Ref<number> | ComputedRef<number>
}

export async function useCharacterSearch({ name, page }: UseCharacterSearchOptions) {
  const config = useRuntimeConfig()
  const { handleApiError } = useApiErrorHandler()

  const apiUrl = computed(() => {
    const q = name.value.trim()
    if (!q) return null
    const params = new URLSearchParams({ name: q, page: String(page.value) })
    return `${config.public.apiBase}/character/?${params.toString()}`
  })

  const { data, status, error, refresh } = await useAsyncData<CharacterSearchResponse | null>(
    `character-search-${name.value}-${page.value}`,
    async () => {
      const url = apiUrl.value
      if (!url) return null

      return $fetch<CharacterSearchResponse>(url).catch((err) => {
        if (err?.status === 404 || err?.statusCode === 404) {
          return handleApiError(err, { fallback: null })
        }
        throw err
      })
    },
    {
      watch: [apiUrl],
      server: true,
    },
  )

  const isLoading = computed(() => status.value === 'pending')
  const characters = computed(() => data.value?.results ?? [])
  const totalPages = computed(() => data.value?.info?.pages ?? 1)
  const hasError = computed(() => error.value)
  const isEmpty = computed(
    () => !isLoading.value && !hasError.value && !!name.value && characters.value.length === 0,
  )

  return {
    data,
    characters,
    totalPages,
    status,
    error,
    isLoading,
    hasError,
    isEmpty,
    refresh,
  }
}
