import type { Character } from '~/types/character.type'
import { useApiErrorHandler } from '../useApiErrorHandler'

export async function useCharacterApi(characterId: Ref<string> | ComputedRef<string>) {
  const config = useRuntimeConfig()
  const { handleApiError } = useApiErrorHandler()

  const { data: character, error: characterError } = await useFetch<Character>(
    `/character/${characterId.value}`,
    {
      baseURL: config.public.apiBase,
      retry: 2,
      retryDelay: 500,
      key: `character-${characterId.value}`,
    },
  )

  if (characterError.value) {
    if (characterError.value.message.includes('no response')) {
      characterError.value.status = 429
    }
    // Use centralized error handler with fatal option
    handleApiError(characterError.value, { fatal: true })
  }

  return {
    character,
    characterError,
  }
}
