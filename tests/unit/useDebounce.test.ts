import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { useDebounce } from '~/composables/useDebounce'

/**
 * Mounts a wrapper component that calls the given composable in its `setup`
 * function, giving it a real Vue lifecycle so hooks like `onBeforeUnmount` fire.
 */
function withSetup<T>(composable: () => T): { result: T; wrapper: ReturnType<typeof mount> } {
  let result!: T
  const wrapper = mount(
    defineComponent({
      setup() {
        result = composable()
        return {}
      },
      template: '<div />',
    }),
  )
  return { result, wrapper }
}

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('does not call fn before the delay elapses', () => {
    const fn = vi.fn()
    const { result } = withSetup(() => useDebounce(fn, 300))

    result.debounced()
    expect(fn).not.toHaveBeenCalled()
  })

  it('calls fn exactly once after the delay', () => {
    const fn = vi.fn()
    const { result } = withSetup(() => useDebounce(fn, 300))

    result.debounced()
    vi.advanceTimersByTime(300)

    expect(fn).toHaveBeenCalledOnce()
  })

  it('forwards arguments to the underlying function', () => {
    const fn = vi.fn()
    const { result } = withSetup(() => useDebounce(fn, 300))

    result.debounced('hello', 42)
    vi.advanceTimersByTime(300)

    expect(fn).toHaveBeenCalledWith('hello', 42)
  })

  it('only fires once for rapid successive calls (trailing-edge behaviour)', () => {
    const fn = vi.fn()
    const { result } = withSetup(() => useDebounce(fn, 300))

    result.debounced()
    result.debounced()
    result.debounced()
    vi.advanceTimersByTime(300)

    expect(fn).toHaveBeenCalledOnce()
  })

  it('resets the timer on each new call', () => {
    const fn = vi.fn()
    const { result } = withSetup(() => useDebounce(fn, 300))

    result.debounced()
    vi.advanceTimersByTime(200) // not yet

    result.debounced() // restart timer
    vi.advanceTimersByTime(200) // only 200 ms out of 300 ms have passed for the new timer

    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100) // now 300 ms have elapsed
    expect(fn).toHaveBeenCalledOnce()
  })

  it('cancel() prevents the pending invocation', () => {
    const fn = vi.fn()
    const { result } = withSetup(() => useDebounce(fn, 300))

    result.debounced()
    result.cancel()
    vi.advanceTimersByTime(300)

    expect(fn).not.toHaveBeenCalled()
  })

  it('cancel() is safe to call when nothing is pending', () => {
    const fn = vi.fn()
    const { result } = withSetup(() => useDebounce(fn, 300))

    expect(() => result.cancel()).not.toThrow()
  })

  it('flush() calls fn immediately without waiting for the delay', () => {
    const fn = vi.fn()
    const { result } = withSetup(() => useDebounce(fn, 300))

    result.debounced('a')
    result.flush('a')

    expect(fn).toHaveBeenCalledOnce()
    expect(fn).toHaveBeenCalledWith('a')
  })

  it('flush() cancels the pending timer so fn does not fire twice', () => {
    const fn = vi.fn()
    const { result } = withSetup(() => useDebounce(fn, 300))

    result.debounced('a')
    result.flush('a')
    vi.advanceTimersByTime(300) // timer should already be cancelled

    expect(fn).toHaveBeenCalledOnce()
  })

  it('cancel() is called on unmount — timer clears before it fires', () => {
    // `onBeforeUnmount(cancel)` captures the inner `cancel` closure directly,
    // so post-hoc spying on `result.cancel` cannot intercept it.
    // We verify the lifecycle hook works by observing its side-effect instead:
    // a pending debounced call queued before unmount must never execute.
    const fn = vi.fn()
    const { result, wrapper } = withSetup(() => useDebounce(fn, 300))

    result.debounced() // queue a call
    wrapper.unmount() // onBeforeUnmount(cancel) should fire here
    vi.advanceTimersByTime(300) // timer window passes

    expect(fn).not.toHaveBeenCalled()
  })
})
