import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useInView } from './useInView'

let observerCallback
let observerOptions
let observeSpy
let unobserveSpy
let disconnectSpy

beforeEach(() => {
  observerCallback = null
  observerOptions = null
  observeSpy = vi.fn()
  unobserveSpy = vi.fn()
  disconnectSpy = vi.fn()
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb, options) {
        observerCallback = cb
        observerOptions = options
      }
      observe = observeSpy
      unobserve = unobserveSpy
      disconnect = disconnectSpy
    }
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function Probe({ options }) {
  const [ref, inView] = useInView(options)
  return (
    <div ref={ref} data-testid="probe" data-inview={String(inView)} />
  )
}

function emitIntersection(isIntersecting) {
  act(() => {
    observerCallback([{ isIntersecting }])
  })
}

describe('useInView', () => {
  it('starts out of view and observes the element', () => {
    const { getByTestId } = render(<Probe />)
    expect(getByTestId('probe').dataset.inview).toBe('false')
    expect(observeSpy).toHaveBeenCalledTimes(1)
  })

  it('becomes in view when the element intersects', () => {
    const { getByTestId } = render(<Probe />)
    emitIntersection(true)
    expect(getByTestId('probe').dataset.inview).toBe('true')
  })

  it('unobserves after first intersection by default (once)', () => {
    render(<Probe />)
    emitIntersection(true)
    expect(unobserveSpy).toHaveBeenCalledTimes(1)
  })

  it('toggles back to false when once is disabled', () => {
    const { getByTestId } = render(<Probe options={{ once: false }} />)
    emitIntersection(true)
    expect(getByTestId('probe').dataset.inview).toBe('true')
    emitIntersection(false)
    expect(getByTestId('probe').dataset.inview).toBe('false')
    expect(unobserveSpy).not.toHaveBeenCalled()
  })

  it('applies default threshold and rootMargin', () => {
    render(<Probe />)
    expect(observerOptions).toEqual({ threshold: 0.15, rootMargin: '0px' })
  })

  it('forwards custom threshold and rootMargin', () => {
    render(<Probe options={{ threshold: 0.5, rootMargin: '100px' }} />)
    expect(observerOptions).toEqual({ threshold: 0.5, rootMargin: '100px' })
  })

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<Probe />)
    unmount()
    expect(disconnectSpy).toHaveBeenCalled()
  })
})
