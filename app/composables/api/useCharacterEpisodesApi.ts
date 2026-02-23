import type { Episode } from '~/types/character.type'

export function useCharacterEpisodesApi(episodeIds: Ref<string[]> | ComputedRef<string[]>) {
  const config = useRuntimeConfig()
  const { handleApiError } = useApiErrorHandler()

  const episodesUrl = computed(() =>
    episodeIds.value?.length > 0 ? `/episode/${episodeIds.value.join(',')}` : null,
  )

  const {
    data: episodesData,
    status: episodesStatus,
    error: episodesError,
  } = useFetch<Episode | Episode[]>(episodesUrl, {
    baseURL: config.public.apiBase,
    retry: 2,
    lazy: true,
    server: false,
    default: () => [] as Episode[],
    onResponseError({ error }) {
      handleApiError(error, { fallback: [] })
    },
  })

  const episodes = computed<Episode[]>(() => {
    const val = episodesData.value
    if (!val) return []
    return Array.isArray(val) ? (val as Episode[]) : [val as Episode]
  })

  return {
    episodes,
    episodesStatus,
    episodesError,
  }
}
