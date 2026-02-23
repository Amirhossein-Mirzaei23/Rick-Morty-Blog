import type { Character } from '~/types/character.type'
import { slugify } from '~/utils/seo.utility'

export function useCharacterJsonLd(character: Ref<Character | undefined>, characterId: string) {
  const config = useRuntimeConfig()
  const genderMap: Record<string, string> = {
    Male: 'Male',
    Female: 'Female',
    Genderless: 'http://schema.org/Unknown',
    unknown: 'http://schema.org/Unknown',
  }

  const canonicalUrl = computed(
    () =>
      `${config.public.siteUrl}/character/${slugify(character.value?.name ?? '')}/${characterId}`,
  )

  const jsonLd = computed(() => {
    if (!character.value) return []

    const char = character.value

    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: char.name,
      image: char.image,
      gender: genderMap[char.gender] ?? char.gender,
      description: `${char.name} is a ${char.status.toLowerCase() === 'unknown' ? 'character' : char.status.toLowerCase()} ${char.species} character from the animated series Rick and Morty. Gender: ${char.gender}. Origin: ${char.origin.name}. Last known location: ${char.location.name}.`,
      url: canonicalUrl.value,
      memberOf: {
        '@type': 'TVSeries',
        name: 'Rick and Morty',
        sameAs: 'https://www.imdb.com/title/tt2861424/',
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Status',
          value: char.status,
        },
        {
          '@type': 'PropertyValue',
          name: 'Species',
          value: char.species,
        },
        ...(char.type ? [{ '@type': 'PropertyValue', name: 'Type', value: char.type }] : []),
        {
          '@type': 'PropertyValue',
          name: 'Origin',
          value: char.origin.name,
        },
        {
          '@type': 'PropertyValue',
          name: 'Last Known Location',
          value: char.location.name,
        },
        {
          '@type': 'PropertyValue',
          name: 'Episode Count',
          value: char.episode.length,
        },
      ],
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: config.public.siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Search',
          item: `${config.public.siteUrl}/search`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: char.name,
          item: canonicalUrl.value,
        },
      ],
    }

    return [personSchema, breadcrumbSchema]
  })

  return {
    jsonLd,
    canonicalUrl,
  }
}
