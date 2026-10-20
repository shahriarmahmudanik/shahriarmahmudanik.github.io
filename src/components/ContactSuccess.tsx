import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.2, 0.7, 0.2, 1] as [number, number, number, number]
const steps = ['Message received', 'Delivered to my inbox', "I'll reply to your email"]
const burst = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2
  return { x: Math.cos(angle) * (62 + (i % 3) * 10), y: Math.sin(angle) * (62 + (i % 3) * 10), size: 5 + (i % 3) * 2 }
})

// Shown in place of the form once the message has been delivered: a ring and tick draw themselves, a burst of dots
// fans out, and a short checklist ticks off line by line.
export function ContactSuccess({ name, onReset }: { name: string; onReset: () => void }) {
  const reduce = useReducedMotion()
  const first = name.trim().split(' ')[0]
  return (
    <motion.div
      className="sent"
      role="status"
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="sent__badge">
        {!reduce &&
          burst.map((d, i) => (
            <motion.span
              key={i}
              className="sent__dot"
              style={{ width: d.size, height: d.size }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x: d.x, y: d.y, opacity: [0, 1, 0], scale: [0, 1, 0.4] }}
              transition={{ duration: 1.1, delay: 0.75, ease: 'easeOut' }}
            />
          ))}
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <motion.circle
            cx="50" cy="50" r="44" className="sent__ring"
            initial={reduce ? false : { pathLength: 0, rotate: -90 }}
            animate={{ pathLength: 1, rotate: -90 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
          <motion.path
            d="M30 52 L45 66 L71 36" className="sent__tick"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
          />
        </svg>
      </div>
      <h3>{first ? `Thanks, ${first}!` : 'Thank you!'}</h3>
      <p>Your message has been sent.</p>
      <ul className="sent__steps">
        {steps.map((s, i) => (
          <motion.li
            key={s}
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1 + i * 0.35, ease: EASE }}
          >
            <span aria-hidden="true">✓</span> {s}
          </motion.li>
        ))}
      </ul>
      <button type="button" className="btn" onClick={onReset}>Send another message</button>
    </motion.div>
  )
}
