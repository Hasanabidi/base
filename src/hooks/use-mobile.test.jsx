import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useIsMobile } from './use-mobile'

let listeners

function setWindowWidth(width) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  })
}

function installMatchMedia() {
  listeners = new Set()
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    media: query,
    matches: false,
    addEventListener: (_event, cb) => listeners.add(cb),
    removeEventListener: (_event, cb) => listeners.delete(cb),
  }))
}

function emitChange() {
  act(() => {
    listeners.forEach((cb) => cb())
  })
}

describe('useIsMobile', () => {
  beforeEach(() => {
    installMatchMedia()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns true below the 768px breakpoint', () => {
    setWindowWidth(500)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('returns false at or above the breakpoint', () => {
    setWindowWidth(1024)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('treats exactly 768px as not mobile', () => {
    setWindowWidth(768)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('updates when the viewport crosses the breakpoint', () => {
    setWindowWidth(1200)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
    setWindowWidth(400)
    emitChange()
    expect(result.current).toBe(true)
  })
})
