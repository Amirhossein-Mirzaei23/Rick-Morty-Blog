export function useDebounce<T extends (...args: never[]) => void>(fn: T, delay = 300) {
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)

  function debounced(...args: Parameters<T>) {
    if (timer.value) clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      fn(...args)
      timer.value = null
    }, delay)
  }

  function cancel() {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
  }

  function flush(...args: Parameters<T>) {
    cancel()
    fn(...args)
  }

  onBeforeUnmount(cancel)

  return { debounced, cancel, flush }
}
