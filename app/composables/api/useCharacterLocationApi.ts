import type { CharacterLocation } from '~/types/character.type'
import { useApiErrorHandler } from '../useApiErrorHandler'

export function useCharacterLocationApi(
  locationId: Ref<string | null> | ComputedRef<string | null>,
) {
  const config = useRuntimeConfig()
  const { handleApiError } = useApiErrorHandler()
  const { data, status, error } = useFetch<CharacterLocation>(`/location/${locationId.value}`, {
    baseURL: config.public.apiBase,
    retry: 2,
    lazy: true,
    onResponseError({ error }) {
      handleApiError(error, { fallback: null })
    },
  })

  const location = computed<CharacterLocation | null>(() =>
    locationId.value ? (data.value ?? null) : null,
  )
  return { location, locationStatus: status, locationError: error }
}
