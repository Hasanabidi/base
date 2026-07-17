import { describe, expect, it } from 'vitest'
import { createPageUrl } from './index'

describe('createPageUrl', () => {
  it('prefixes a single-word page name with a slash', () => {
    expect(createPageUrl('Home')).toBe('/Home')
  })

  it('replaces spaces with hyphens', () => {
    expect(createPageUrl('Service Detail')).toBe('/Service-Detail')
  })

  it('replaces every space, not just the first', () => {
    expect(createPageUrl('My Cool Page Name')).toBe('/My-Cool-Page-Name')
  })

  it('handles an empty string', () => {
    expect(createPageUrl('')).toBe('/')
  })

  it('leaves existing hyphens untouched', () => {
    expect(createPageUrl('already-hyphenated')).toBe('/already-hyphenated')
  })
})
