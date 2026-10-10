import { useEffect, useState } from 'react'

/**
 * Counts from 0 up to `target` over `durationMs` once `start` becomes true.
 * Uses requestAnimationFrame, the browser's built-in "run before the next paint" callback,
 * so the animation is smooth and pauses automatically in background tabs.
 */
export function useCountUp(target: number, start: boolean, durationMs = 1400, instant = false): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    if (instant) return // reduced motion: we skip the animation and show the final number (see return below)

    let frame = 0
    let startTime: number | null = null

    const step = (now: number) => {
      if (startTime === null) startTime = now
      const progress = Math.min((now - startTime) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out: fast at first, slow at the end
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, start, durationMs, instant])

  return instant && start ? target : value
}
