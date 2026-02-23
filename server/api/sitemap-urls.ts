import { slugify } from '~/utils/seo.utility'

interface Character {
  id: number
  name: string
}

interface ApiResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}
async function fetchAllCharacters(): Promise<Character[]> {
  const allCharacters: Character[] = []
  const baseUrl = 'https://rickandmortyapi.com/api/character'
  let currentPage = 1
  let totalPages = 1

  try {
    const firstResponse = await $fetch<ApiResponse>(`${baseUrl}?page=${currentPage}`)
    totalPages = firstResponse.info.pages
    allCharacters.push(...firstResponse.results)
    const batchSize = 5
    // set totoal pages limit to prevent too many requests error
    for (let i = 2; i <= 3; i += batchSize) {
      const pagePromises = []
      for (let j = 0; j < batchSize && i + j <= totalPages; j++) {
        pagePromises.push($fetch<ApiResponse>(`${baseUrl}?page=${i + j}`))
      }

      const responses = await Promise.all(pagePromises)
      responses.forEach((response) => {
        allCharacters.push(...response.results)
      })
    }

    return allCharacters
  } catch (error) {
    console.error('Error fetching characters for sitemap:', error)
    return []
  }
}
export default defineEventHandler(async () => {
  const characters = await fetchAllCharacters()
  return characters.map((char) => ({
    loc: `/character/${slugify(char.name)}/${char.id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))
})
