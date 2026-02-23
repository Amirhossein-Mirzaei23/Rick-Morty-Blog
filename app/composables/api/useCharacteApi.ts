import type { Character } from '~/types/charecter.type'

export async function useCharacteApi(characterId: Ref<string> | ComputedRef<string>) {
  const config = useRuntimeConfig()
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
    let status = characterError.value?.status ?? characterError.value?.statusCode ?? 500
    if (characterError.value.message.includes('no response')) {
      status = 429
    }
    throw createError({
      statusCode: status || 500,
      statusMessage:
        status === 404
          ? 'Character Not Found'
          : characterError.value.message || 'Failed to Load Character',
      fatal: true,
    })
  }

  return {
    character,
    characterError,
  }
}
