import type { FetchOptions } from 'ofetch'

interface UseApiOptions<T> extends FetchOptions {
  default?: () => T
}

export function useApi<T>(url: string, options: UseApiOptions<T> = {}) {
  const { public: { apiBase } } = useRuntimeConfig()

  const data = ref<T | undefined>(options.default?.() ?? undefined) as Ref<T | undefined>
  const error = ref<Error | null>(null)
  const pending = ref(false)

  async function execute() {
    pending.value = true
    error.value = null
    try {
      data.value = await $fetch<T>(url, {
        baseURL: apiBase,
        ...options,
      })
    }
    catch (err) {
      error.value = err as Error
    }
    finally {
      pending.value = false
    }
  }

  return { data, error, pending, execute }
}
