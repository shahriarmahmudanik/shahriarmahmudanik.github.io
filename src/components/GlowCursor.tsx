import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Glowing dot that follows the pointer (desktop only). Same size and brightness everywhere, including over links.
export function GlowCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { damping: 50, stiffness: 700 })
  const sy = useSpring(y, { damping: 50, stiffness: 700 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 16)
      y.set(e.clientY - 16)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden="true"
      className="glow-cursor"
      style={{ translateX: sx, translateY: sy, scale: 0.4 }}
    />
  )
}
