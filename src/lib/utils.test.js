import { describe, expect, it } from 'vitest'
import { cn, isIframe } from './utils'

describe('lib/utils cn', () => {
  it('joins classes and drops falsy values', () => {
    expect(cn('a', false, 'b', null, undefined)).toBe('a b')
  })

  it('merges conflicting tailwind utilities keeping the last', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('resolves conditional object syntax', () => {
    expect(cn('base', { on: true, off: false })).toBe('base on')
  })
})

describe('lib/utils isIframe', () => {
  it('is a boolean', () => {
    expect(typeof isIframe).toBe('boolean')
  })

  it('is false when window is its own top (not embedded)', () => {
    expect(isIframe).toBe(false)
  })
})
