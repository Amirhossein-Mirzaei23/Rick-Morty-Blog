import type { LocationDetail } from '~/types/charecter.type'
export function useCharacterLocationApi(locationId: Ref<string> | ComputedRef<string | null>) {
  if (!locationId.value) {
    return {
      location: null,
      locationStatus: ref('idle') as Ref<'idle' | 'pending' | 'success' | 'error'>,
      locationError: ref(null) as Ref<Error | null>,
    }
  }
  const locationUrl = computed(() =>
    locationId.value ? `https://rickandmortyapi.com/api/location/${locationId.value}` : '',
  )
  const {
    data: locationData,
    status: locationStatus,
    error: locationError,
  } = useFetch<LocationDetail>(locationUrl.value, {
    retry: 2,
    lazy: true,
  })
  const location = computed<LocationDetail | null>(
    () => (locationData.value as LocationDetail | null) ?? null,
  )
  return {
    location,
    locationStatus,
    locationError,
  }
}
