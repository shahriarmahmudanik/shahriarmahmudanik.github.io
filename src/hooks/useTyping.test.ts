import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTyping } from './useTyping'

describe('useTyping', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('types the first word one letter at a time', () => {
    const { result } = renderHook(() => useTyping(['Hi', 'Yo'], { typeMs: 100, pauseMs: 1000 }))
    // Each timer schedules the next one only after React re-renders, so advance in small steps.
    for (let i = 0; i < 3; i++) act(() => vi.advanceTimersByTime(100))
    expect(result.current).toBe('Hi')
  })

  it('shows the first word straight away when disabled', () => {
    const { result } = renderHook(() => useTyping(['Hi', 'Yo'], { enabled: false }))
    expect(result.current).toBe('Hi')
  })
})
