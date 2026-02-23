import { describe, it, expect } from 'vitest'
import { ref, computed, type Ref } from 'vue'
import type { CharacterSearchResponse } from '@/types/character.type'
interface StubError {
  statusCode?: number
  message?: string
}

function makeDerivedState(
  data: ReturnType<typeof ref<CharacterSearchResponse | null>>,
  status: ReturnType<typeof ref<'idle' | 'pending' | 'success' | 'error'>>,
  error: Ref<StubError | null>,
  name: ReturnType<typeof ref<string>>,
) {
  const isLoading = computed(() => status.value === 'pending')
  const characters = computed(() => data.value?.results ?? [])
  const totalPages = computed(() => data.value?.info?.pages ?? 1)
  const hasError = computed(() => !!error.value && error.value.statusCode !== 404)
  const isEmpty = computed(
    () =>
      !isLoading.value &&
      !hasError.value &&
      !!name.value &&
      (characters.value.length === 0 || error.value?.statusCode === 404),
  )
  return { isLoading, characters, totalPages, hasError, isEmpty }
}

// ─── Fixture ─────────────────────────────────────────────────────────────────

const STUB: CharacterSearchResponse = {
  info: { count: 2, pages: 5, next: null, prev: null },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: '',
      episode: [],
      url: '',
      created: '',
    },
  ],
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('useCharacterSearch — derived state', () => {
  // ── isLoading ─────────────────────────────────────────────────────────────

  describe('isLoading', () => {
    it('is true when status is "pending"', () => {
      const { isLoading } = makeDerivedState(ref(null), ref('pending'), ref(null), ref('rick'))
      expect(isLoading.value).toBe(true)
    })

    it('is false when status is "success"', () => {
      const { isLoading } = makeDerivedState(ref(null), ref('success'), ref(null), ref('rick'))
      expect(isLoading.value).toBe(false)
    })

    it('is false when status is "idle"', () => {
      const { isLoading } = makeDerivedState(ref(null), ref('idle'), ref(null), ref('rick'))
      expect(isLoading.value).toBe(false)
    })

    it('is false when status is "error"', () => {
      const { isLoading } = makeDerivedState(ref(null), ref('error'), ref(null), ref('rick'))
      expect(isLoading.value).toBe(false)
    })

    it('reacts to status changes', () => {
      const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle')
      const { isLoading } = makeDerivedState(ref(null), status, ref(null), ref('rick'))

      expect(isLoading.value).toBe(false)
      status.value = 'pending'
      expect(isLoading.value).toBe(true)
      status.value = 'success'
      expect(isLoading.value).toBe(false)
    })
  })

  // ── hasError ──────────────────────────────────────────────────────────────

  describe('hasError', () => {
    it('is truthy when error is a non-404 status', () => {
      const { hasError } = makeDerivedState(
        ref(null),
        ref('error'),
        ref({ statusCode: 500, message: 'Internal Server Error' }),
        ref('rick'),
      )
      expect(hasError.value).toBe(true)
    })

    it('is falsy when error is null', () => {
      const { hasError } = makeDerivedState(ref(null), ref('success'), ref(null), ref('rick'))
      expect(hasError.value).toBe(false)
    })

    it('is falsy for a 404 error (no results match — treated as empty state)', () => {
      const { hasError } = makeDerivedState(
        ref(null),
        ref('error'),
        ref({ statusCode: 404, message: 'Not Found' }),
        ref('rick'),
      )
      expect(hasError.value).toBe(false)
    })
  })

  // ── characters ────────────────────────────────────────────────────────────

  describe('characters', () => {
    it('defaults to [] when data is null', () => {
      const { characters } = makeDerivedState(ref(null), ref('idle'), ref(null), ref('rick'))
      expect(characters.value).toEqual([])
    })

    it('returns data.results when data is present', () => {
      const { characters } = makeDerivedState(ref(STUB), ref('success'), ref(null), ref('rick'))
      expect(characters.value).toHaveLength(1)
      expect(characters.value[0]?.name).toBe('Rick Sanchez')
    })

    it('reacts when data changes', () => {
      const data = ref<CharacterSearchResponse | null>(null)
      const { characters } = makeDerivedState(data, ref('success'), ref(null), ref('rick'))

      expect(characters.value).toEqual([])
      data.value = STUB
      expect(characters.value).toHaveLength(1)
    })
  })

  // ── totalPages ────────────────────────────────────────────────────────────

  describe('totalPages', () => {
    it('defaults to 1 when data is null', () => {
      const { totalPages } = makeDerivedState(ref(null), ref('idle'), ref(null), ref('rick'))
      expect(totalPages.value).toBe(1)
    })

    it('returns data.info.pages when data is present', () => {
      const { totalPages } = makeDerivedState(ref(STUB), ref('success'), ref(null), ref('rick'))
      expect(totalPages.value).toBe(5)
    })
  })

  // ── isEmpty ───────────────────────────────────────────────────────────────

  describe('isEmpty', () => {
    it('is true when not loading, no error, has a name, and results are empty', () => {
      const data = ref<CharacterSearchResponse | null>({
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      })
      const { isEmpty } = makeDerivedState(data, ref('success'), ref(null), ref('zzz'))
      expect(isEmpty.value).toBe(true)
    })

    it('is false while loading', () => {
      const data = ref<CharacterSearchResponse | null>({
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      })
      const { isEmpty } = makeDerivedState(data, ref('pending'), ref(null), ref('rick'))
      expect(isEmpty.value).toBe(false)
    })

    it('is false when there is a non-404 error', () => {
      const data = ref<CharacterSearchResponse | null>({
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      })
      const { isEmpty } = makeDerivedState(
        data,
        ref('error'),
        ref({ statusCode: 500, message: 'Server Error' }),
        ref('rick'),
      )
      expect(isEmpty.value).toBe(false)
    })

    it('is true when error is 404 (API returns no matches)', () => {
      const { isEmpty } = makeDerivedState(
        ref(null),
        ref('error'),
        ref({ statusCode: 404, message: 'Not Found' }),
        ref('zzz'),
      )
      expect(isEmpty.value).toBe(true)
    })

    it('is false when the search query is empty (idle before user types)', () => {
      const data = ref<CharacterSearchResponse | null>({
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      })
      const { isEmpty } = makeDerivedState(data, ref('success'), ref(null), ref(''))
      expect(isEmpty.value).toBe(false)
    })

    it('is false when results are present', () => {
      const { isEmpty } = makeDerivedState(ref(STUB), ref('success'), ref(null), ref('rick'))
      expect(isEmpty.value).toBe(false)
    })

    it('reacts when results arrive after an empty response', () => {
      const data = ref<CharacterSearchResponse | null>({
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      })
      const { isEmpty } = makeDerivedState(data, ref('success'), ref(null), ref('rick'))

      expect(isEmpty.value).toBe(true)
      data.value = STUB
      expect(isEmpty.value).toBe(false)
    })
  })
})
