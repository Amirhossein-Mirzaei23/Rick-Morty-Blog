import type { characterSearchResponse } from '~/types/character.type'

interface UseCharacterSearchOptions {
  name: Ref<string> | ComputedRef<string>
  page: Ref<number> | ComputedRef<number>
}

export function useCharacterSearch({ name, page }: UseCharacterSearchOptions) {
  const config = useRuntimeConfig()
  const { handleApiError } = useApiErrorHandler()
  
  const apiUrl = computed(() => {
    const q = name.value.trim()
    if (!q) return null
    const params = new URLSearchParams({ name: q, page: String(page.value) })
    return `${config.public.apiBase}/character/?${params.toString()}`
  })

  const { data, status, error, refresh } = useAsyncData<characterSearchResponse | null>(
    'character-search',
    async () => {
      const url = apiUrl.value
      if (!url) return null

      return $fetch<characterSearchResponse>(url).catch((err) => {
        // Use error handler: return null for 404 (no results), throw everything else
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
