import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useReducedMotion } from './useReducedMotion'

let listeners
let currentMatches

function installMatchMedia(matches) {
  currentMatches = matches
  listeners = new Set()
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    get matches() {
      return currentMatches
    },
    media: query,
    addEventListener: (_event, cb) => listeners.add(cb),
    removeEventListener: (_event, cb) => listeners.delete(cb),
  }))
}

function emitChange(matches) {
  currentMatches = matches
  act(() => {
    listeners.forEach((cb) => cb({ matches }))
  })
}

describe('useReducedMotion', () => {
  beforeEach(() => {
    installMatchMedia(false)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('reflects the initial media query match', () => {
    installMatchMedia(true)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it('is false when reduced motion is not preferred', () => {
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('reacts to media query changes', () => {
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
    emitChange(true)
    expect(result.current).toBe(true)
  })

  it('removes its listener on unmount', () => {
    const { unmount } = renderHook(() => useReducedMotion())
    expect(listeners.size).toBe(1)
    unmount()
    expect(listeners.size).toBe(0)
  })
})
