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
  const delta = 4
  const left = Math.max(2, currentPage - delta)
  const right = Math.min(totalPages - 1, currentPage + delta)
  const pages: (number | '...')[] = [1]

  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < totalPages - 1) pages.push('...')
  if (currentPage > 2) pages.push(totalPages)
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
      <img :src="doublePreviousIcon" :width="24" :height="24" alt="first page icon" />
    </button>
    <button
      type="button"
      :disabled="!hasPrev || loading"
      class="flex cursor-pointer items-center justify-center rounded text-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="Previous page"
      @click="go(currentPage - 1)"
    >
      <img :src="previousIcon" :width="24" :height="24" class="text-white" alt="previous icon" />
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
      <img :src="nextIcon" :width="24" :height="24" alt="next icon" />
    </button>
    <button
      type="button"
      :disabled="!hasNext || loading"
      class="flex cursor-pointer items-center justify-center rounded text-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="Last page"
      @click="go(totalPages)"
    >
      <img :src="doubleNextIcon" :width="24" :height="24" alt="last page icon" />
    </button>
  </nav>
</template>
