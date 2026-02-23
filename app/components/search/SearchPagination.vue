<script setup lang="ts">
import doublePreviousIcon from '@/assets/icons/pagination/double-previous.svg'
import previousIcon from '@/assets/icons/pagination/previous.svg'
import nextIcon from '@/assets/icons/pagination/next.svg'
import doubleNextIcon from '@/assets/icons/pagination/double-next.svg'
interface Props {
  currentPage: number
  totalPages: number
  loading?: boolean
}

const { currentPage, totalPages, loading = false } = defineProps<Props>()

const emit = defineEmits<{
  page: [page: number]
}>()

const hasPrev = computed(() => currentPage > 1)
const hasNext = computed(() => currentPage < totalPages)
const visiblePages = computed<(number | '...')[]>(() => {
  if (totalPages <= 1) return []

  // If total pages fit within the 5-slot window, show all without ellipsis
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Always show: 1, [mid-1, mid, mid+1], totalPages = exactly 5 numbers
  // Clamp the centre so the 3-page window never strays outside [2, totalPages-1]
  const mid = Math.min(Math.max(currentPage, 3), totalPages - 2)
  const pages: (number | '...')[] = [1]

  if (mid - 1 > 2) pages.push('...')
  pages.push(mid - 1, mid, mid + 1)
  if (mid + 1 < totalPages - 1) pages.push('...')
  pages.push(totalPages)

  return pages
})

function go(page: number) {
  if (page < 1 || page > totalPages || page === currentPage || loading) return
  emit('page', page)
}
</script>

<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center gap-2" aria-label="Pagination">
    <button
      type="button"
      :disabled="!hasPrev || loading"
      class="flex cursor-pointer items-center justify-center rounded text-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="First page"
      @click="go(1)"
    >
      <img :src="doublePreviousIcon" :width="24" :height="24" alt="" aria-hidden="true" />
    </button>
    <button
      type="button"
      :disabled="!hasPrev || loading"
      class="flex cursor-pointer items-center justify-center rounded text-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="Previous page"
      @click="go(currentPage - 1)"
    >
      <img :src="previousIcon" :width="24" :height="24" class="text-white" alt="" aria-hidden="true" />
    </button>
    <div v-for="(p, i) in visiblePages" :key="i" class="">
      <span v-if="p === '...'" class="px-1 text-neutral-400" aria-hidden="true">…</span>
      <button
        v-else
        type="button"
        :disabled="loading"
        :aria-label="`Page ${p}`"
        :aria-current="p === currentPage ? 'page' : undefined"
        class="h-6 w-6 cursor-pointer"
        :class="
          p === currentPage ? 'bg-accent rounded-full font-bold text-[#00333D]' : 'cursor-pointer text-neutral-400'
        "
        @click="go(p)"
      >
        {{ p }}
      </button>
    </div>
    <button
      type="button"
      :disabled="!hasNext || loading"
      class="flex cursor-pointer items-center justify-center rounded text-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="Next page"
      @click="go(currentPage + 1)"
    >
      <img :src="nextIcon" :width="24" :height="24" alt="" aria-hidden="true" />
    </button>
    <button
      type="button"
      :disabled="!hasNext || loading"
      class="flex cursor-pointer items-center justify-center rounded text-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="Last page"
      @click="go(totalPages)"
    >
      <img :src="doubleNextIcon" :width="24" :height="24" alt="" aria-hidden="true" />
    </button>
  </nav>
</template>
