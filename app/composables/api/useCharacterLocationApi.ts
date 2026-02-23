import type { CharacterLocation } from '~/types/character.type'
import { useApiErrorHandler } from '../useApiErrorHandler'

export function useCharacterLocationApi(locationId: Ref<string> | ComputedRef<string | null>) {
  const { handleApiError } = useApiErrorHandler()

  if (!locationId.value) {
    return {
      location: null,
      locationStatus: ref('error') as Ref<'idle' | 'pending' | 'success' | 'error'>,
      locationError: ref(null) as Ref<Error | null>,
    }
  }

  const config = useRuntimeConfig()
  const locationUrl = computed(() => (locationId.value ? `/location/${locationId.value}` : ''))

  const {
    data: locationData,
    status: locationStatus,
    error: locationError,
  } = useFetch<CharacterLocation>(locationUrl.value, {
    baseURL: config.public.apiBase,
    retry: 2,
    lazy: true,
    // Return null if location fetch fails (non-critical)
    onResponseError({ error }) {
      handleApiError(error, { fallback: null })
    },
  })

  const location = computed<CharacterLocation | null>(() => locationData.value ?? null)

  return {
    location,
    locationStatus,
    locationError,
  }
}
