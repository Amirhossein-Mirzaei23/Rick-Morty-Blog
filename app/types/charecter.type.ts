export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'

export interface location {
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

export interface LocationDetail {
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
  origin: location
  location: location
  image: string
  episode: string[]
  url: string
  created: string
}

export interface characterSearchPageInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface characterSearchResponse {
  info: characterSearchPageInfo
  results: Character[]
}

export interface characterSearchApiError {
  error: string
}
