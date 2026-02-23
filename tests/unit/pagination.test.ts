import { describe, it, expect } from 'vitest'

/**
 * Mirror of the `visiblePages` computed logic in SearchPagination.vue.
 *
 * Keeping the algorithm in one place (the component) is intentional.
 * This helper duplicates it so it can be exercised exhaustively without
 * mounting a component, making each test instant and dependency-free.
 *
 * If the algorithm in SearchPagination.vue changes, update this mirror too.
 */
function visiblePages(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 1) return []
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)

  const mid = Math.min(Math.max(currentPage, 3), totalPages - 2)
  const pages: (number | '...')[] = [1]

  if (mid - 1 > 2) pages.push('...')
  pages.push(mid - 1, mid, mid + 1)
  if (mid + 1 < totalPages - 1) pages.push('...')
  pages.push(totalPages)

  return pages
}

// ─── helpers ──────────────────────────────────────────────────────────────────

const numericPages = (pages: (number | '...')[]) => pages.filter((p): p is number => p !== '...')

describe('visiblePages', () => {
  describe('edge cases', () => {
    it('returns [] when totalPages is 0', () => {
      expect(visiblePages(1, 0)).toEqual([])
    })

    it('returns [] when totalPages is 1 (no pagination needed)', () => {
      expect(visiblePages(1, 1)).toEqual([])
    })

    it('returns all pages when totalPages is 2', () => {
      expect(visiblePages(1, 2)).toEqual([1, 2])
    })

    it('returns all pages when totalPages equals 5 (no ellipsis)', () => {
      expect(visiblePages(3, 5)).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('window of exactly 5 numeric buttons when totalPages > 5', () => {
    const cases: [number, number][] = [
      [1, 42],
      [3, 42],
      [10, 42],
      [21, 42],
      [40, 42],
      [42, 42],
    ]

    it.each(cases)('page %i of %i → exactly 5 numbers', (currentPage, totalPages) => {
      expect(numericPages(visiblePages(currentPage, totalPages))).toHaveLength(5)
    })
  })

  describe('always includes first and last page', () => {
    const cases: [number, number][] = [
      [1, 10],
      [5, 10],
      [10, 10],
    ]

    it.each(cases)('page %i of %i → includes first and last', (currentPage, totalPages) => {
      const pages = visiblePages(currentPage, totalPages)
      expect(pages[0]).toBe(1)
      expect(pages[pages.length - 1]).toBe(totalPages)
    })
  })

  describe('start of range (page 1)', () => {
    // mid = clamp(1, 3, 40) = 3  →  push [2, 3, 4] + trailing ellipsis
    it('shows 1 2 3 4 … last', () => {
      expect(visiblePages(1, 42)).toEqual([1, 2, 3, 4, '...', 42])
    })
  })

  describe('near start (page 3)', () => {
    // mid = clamp(3, 3, 40) = 3  →  same shape as page 1
    it('shows 1 2 3 4 … last when currentPage clamps to mid=3', () => {
      expect(visiblePages(3, 42)).toEqual([1, 2, 3, 4, '...', 42])
    })
  })

  describe('middle of range', () => {
    it('shows 1 … 19 20 21 … 42 for page 20 of 42', () => {
      expect(visiblePages(20, 42)).toEqual([1, '...', 19, 20, 21, '...', 42])
    })

    it('shows 1 … 20 21 22 … 42 for page 21 of 42', () => {
      expect(visiblePages(21, 42)).toEqual([1, '...', 20, 21, 22, '...', 42])
    })
  })

  describe('near end (page totalPages - 2)', () => {
    // mid = clamp(40, 3, 40) = 40  →  push [39, 40, 41], no trailing ellipsis
    it('shows 1 … 39 40 41 last when currentPage clamps to mid=40', () => {
      expect(visiblePages(40, 42)).toEqual([1, '...', 39, 40, 41, 42])
    })
  })

  describe('end of range (last page)', () => {
    // mid = clamp(42, 3, 40) = 40  →  same shape as page 40
    it('shows 1 … 39 40 41 last', () => {
      expect(visiblePages(42, 42)).toEqual([1, '...', 39, 40, 41, 42])
    })
  })

  describe('numeric pages are always in ascending order', () => {
    const cases: [number, number][] = [
      [1, 20],
      [5, 20],
      [10, 20],
      [20, 20],
    ]

    it.each(cases)('page %i of %i → numbers are sorted ascending', (currentPage, totalPages) => {
      const nums = numericPages(visiblePages(currentPage, totalPages))
      const sorted = [...nums].sort((a, b) => a - b)
      expect(nums).toEqual(sorted)
    })
  })

  describe('no duplicate page numbers', () => {
    it('page 1 of 6 has no duplicates', () => {
      const nums = numericPages(visiblePages(1, 6))
      expect(nums).toHaveLength(new Set(nums).size)
    })

    it('page 6 of 6 has no duplicates', () => {
      const nums = numericPages(visiblePages(6, 6))
      expect(nums).toHaveLength(new Set(nums).size)
    })
  })
})
