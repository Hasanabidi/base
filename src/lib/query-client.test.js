import { QueryClient } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'
import { queryClientInstance } from './query-client'

describe('queryClientInstance', () => {
  it('is a QueryClient instance', () => {
    expect(queryClientInstance).toBeInstanceOf(QueryClient)
  })

  it('disables refetch on window focus', () => {
    const { queries } = queryClientInstance.getDefaultOptions()
    expect(queries.refetchOnWindowFocus).toBe(false)
  })

  it('retries failed queries once', () => {
    const { queries } = queryClientInstance.getDefaultOptions()
    expect(queries.retry).toBe(1)
  })
})
