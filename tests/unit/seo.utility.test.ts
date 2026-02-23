import { describe, it, expect } from 'vitest'
import { slugify } from '~/utils/seo.utility'

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('Rick Sanchez')).toBe('rick-sanchez')
  })

  it('lowercases all characters', () => {
    expect(slugify('MORTY SMITH')).toBe('morty-smith')
  })

  it('removes diacritics / accents', () => {
    expect(slugify('Café Résumé')).toBe('cafe-resume')
  })

  it('strips non-alphanumeric characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
  })

  it('collapses multiple consecutive spaces into a single hyphen', () => {
    expect(slugify('Rick   Sanchez')).toBe('rick-sanchez')
  })

  it('collapses multiple consecutive hyphens into a single hyphen', () => {
    expect(slugify('rick--sanchez')).toBe('rick-sanchez')
  })

  it('trims leading and trailing whitespace', () => {
    expect(slugify('  rick  ')).toBe('rick')
  })

  it('handles an empty string gracefully', () => {
    expect(slugify('')).toBe('')
  })

  it('handles a string that is only special characters', () => {
    expect(slugify('!@#$%')).toBe('')
  })

  it('preserves hyphens already in the text', () => {
    expect(slugify('Birdperson-Rick')).toBe('birdperson-rick')
  })

  it('produces a valid URL segment for a character name with apostrophe', () => {
    // e.g. "Mr. Meeseeks" → "mr-meeseeks"
    expect(slugify('Mr. Meeseeks')).toBe('mr-meeseeks')
  })
})
