import type { Episode } from '~/types/charecter.type'

export function useCharacterEpisodesApi(episodeIds: Ref<string[]> | ComputedRef<string[]>) {
  const config = useRuntimeConfig()
  const episodesUrl = computed(() =>
    episodeIds.value.length > 0
      ? `/episode/${episodeIds.value.join(',')}`
      : '',
  )
  const {
    data: episodesData,
    status: episodesStatus,
    error: episodesError,
  } = useFetch<Episode | Episode[]>(episodesUrl.value, {
    baseURL: config.public.apiBase,
    retry: 2,
    lazy: true,
    server: false,
    default: () => [] as Episode[],
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
