import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * The cursor spotlight on the hero photo.
 *
 * A bright copy of the photo is shown through a soft circle (a CSS mask) that follows the pointer.
 * With no pointer (phones, or when the mouse is idle) the light drifts slowly around the face.
 *
 * Why refs and not state?  The light moves ~60 times a second. Updating React state that often would
 * re-render the component every frame. A ref lets us write straight to the DOM (CSS variables) without
 * re-rendering, which is the right tool for high-frequency animation.
 */
export function useSpotlight() {
  const heroRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const hero = heroRef.current
    const stage = stageRef.current
    const dot = dotRef.current
    if (!hero || !stage) return

    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0
    let pointerActive = false
    let running = false
    let frame = 0
    let idleTimer = 0
    const startTime = performance.now()

    const faceCenter = () => {
      const rect = stage.getBoundingClientRect()
      const mobile = window.innerWidth < 900
      return { x: rect.width * (mobile ? 0.5 : 0.485), y: rect.height * (mobile ? 0.26 : 0.27), w: rect.width, h: rect.height }
    }

    const place = (px: number, py: number) => {
      stage.style.setProperty('--mx', `${px.toFixed(1)}px`)
      stage.style.setProperty('--my', `${py.toFixed(1)}px`)
      if (dot && pointerActive) {
        const s = stage.getBoundingClientRect()
        const h = hero.getBoundingClientRect()
        dot.style.transform = `translate(${(px + s.left - h.left).toFixed(1)}px, ${(py + s.top - h.top).toFixed(1)}px)`
      }
    }

    const setTarget = (clientX: number, clientY: number) => {
      const rect = stage.getBoundingClientRect()
      targetX = clientX - rect.left
      targetY = clientY - rect.top
    }

    const start0 = faceCenter()
    x = targetX = start0.x
    y = targetY = start0.y
    place(x, y)

    const goIdleLater = () => {
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        pointerActive = false
        hero.classList.remove('has-pointer')
      }, 3000)
    }

    const onMove = (e: PointerEvent) => {
      pointerActive = true
      if (e.pointerType !== 'touch') hero.classList.add('has-pointer')
      setTarget(e.clientX, e.clientY)
      if (reduceMotion) place(targetX, targetY)
      else goIdleLater()
    }
    const onLeave = () => {
      window.clearTimeout(idleTimer)
      pointerActive = false
      hero.classList.remove('has-pointer')
    }
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        pointerActive = true
        setTarget(e.clientX, e.clientY)
        goIdleLater()
      }
    }

    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    hero.addEventListener('pointerdown', onDown)

    // Reduced motion: no automatic movement; the light only follows the mouse.
    if (reduceMotion) {
      return () => {
        hero.removeEventListener('pointermove', onMove)
        hero.removeEventListener('pointerleave', onLeave)
        hero.removeEventListener('pointerdown', onDown)
      }
    }

    const loop = (now: number) => {
      if (!running) return
      if (!pointerActive) {
        const c = faceCenter()
        const t = (now - startTime) / 1000
        targetX = c.x + Math.sin(t * 0.7) * c.w * 0.07
        targetY = c.y + Math.cos(t * 0.9) * c.h * 0.1
      }
      x += (targetX - x) * 0.12 // easing: move 12% of the remaining distance each frame
      y += (targetY - y) * 0.12
      place(x, y)
      frame = requestAnimationFrame(loop)
    }
    const run = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    // Only animate while the hero is on screen and the tab is visible (saves battery).
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? run() : stop()),
      { threshold: 0.05 },
    )
    observer.observe(hero)
    const onVisibility = () => (document.hidden ? stop() : run())
    document.addEventListener('visibilitychange', onVisibility)
    run()

    // Cleanup runs when the component unmounts: remove everything we added.
    return () => {
      stop()
      window.clearTimeout(idleTimer)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
      hero.removeEventListener('pointerdown', onDown)
    }
  }, [reduceMotion])

  return { heroRef, stageRef, dotRef }
}
