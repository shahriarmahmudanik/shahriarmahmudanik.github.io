import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  delay?: number // seconds
  className?: string
}

/**
 * Wrap anything in <Reveal> and it fades/slides up the first time it scrolls into view.
 * `whileInView` + `viewport.once` is framer-motion's version of an IntersectionObserver.
 */
export function Reveal({ children, delay = 0, className }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
