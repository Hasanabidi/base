import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useMousePosition } from './useMousePosition'

function fireMouseMove(x, y) {
  act(() => {
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y }))
  })
}

describe('useMousePosition', () => {
  it('starts at the origin', () => {
    const { result } = renderHook(() => useMousePosition())
    expect(result.current).toEqual({ x: 0, y: 0 })
  })

  it('tracks mouse movement', () => {
    const { result } = renderHook(() => useMousePosition())
    fireMouseMove(120, 340)
    expect(result.current).toEqual({ x: 120, y: 340 })
  })

  it('updates on subsequent moves', () => {
    const { result } = renderHook(() => useMousePosition())
    fireMouseMove(10, 20)
    fireMouseMove(50, 60)
    expect(result.current).toEqual({ x: 50, y: 60 })
  })

  it('stops listening after unmount', () => {
    const { result, unmount } = renderHook(() => useMousePosition())
    fireMouseMove(5, 5)
    expect(result.current).toEqual({ x: 5, y: 5 })
    unmount()
    fireMouseMove(999, 999)
    expect(result.current).toEqual({ x: 5, y: 5 })
  })
})
