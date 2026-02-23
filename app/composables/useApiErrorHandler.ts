function getErrorMessage(statusCode: number): string {
  const messages: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  }
  return messages[statusCode] ?? 'An error occurred'
}

export function useApiErrorHandler() {
  function handleApiError(
    error: any,
    options: {
      fatal?: boolean
      fallback?: any
    } = {},
  ) {
    const statusCode = error?.status ?? error?.statusCode ?? 500
    if (options.fatal) {
      throw createError({
        statusCode,
        statusMessage: error?.message ?? getErrorMessage(statusCode),
        fatal: true,
      })
    }

    return options.fallback ?? null
  }

  return { handleApiError }
}
