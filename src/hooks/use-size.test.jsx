import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSize } from './use-size'

let observerCallback
let observeSpy
let disconnectSpy

beforeEach(() => {
  observerCallback = null
  observeSpy = vi.fn()
  disconnectSpy = vi.fn()
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(cb) {
        observerCallback = cb
      }
      observe = observeSpy
      disconnect = disconnectSpy
    }
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function emitResize(width, height) {
  act(() => {
    observerCallback([{ contentRect: { width, height } }])
  })
}

describe('useSize', () => {
  it('starts as null before any measurement', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useSize(ref))
    expect(result.current).toBeNull()
  })

  it('observes the referenced element', () => {
    const element = document.createElement('div')
    const ref = { current: element }
    renderHook(() => useSize(ref))
    expect(observeSpy).toHaveBeenCalledWith(element)
  })

  it('reports the measured content rect', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useSize(ref))
    emitResize(320, 240)
    expect(result.current).toEqual({ width: 320, height: 240 })
  })

  it('does nothing when the ref is empty', () => {
    const ref = { current: null }
    const { result } = renderHook(() => useSize(ref))
    expect(result.current).toBeNull()
    expect(observeSpy).not.toHaveBeenCalled()
  })

  it('disconnects the observer on unmount', () => {
    const ref = { current: document.createElement('div') }
    const { unmount } = renderHook(() => useSize(ref))
    unmount()
    expect(disconnectSpy).toHaveBeenCalled()
  })
})
