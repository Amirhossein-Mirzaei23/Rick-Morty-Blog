export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'

export interface LocationRef {
  name: string
  url: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface CharacterLocation {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface Character {
  id: number
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: CharacterGender
  origin: LocationRef
  location: LocationRef
  image: string
  episode: string[]
  url: string
  created: string
}

export interface CharacterSearchPageInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface CharacterSearchResponse {
  info: CharacterSearchPageInfo
  results: Character[]
}
