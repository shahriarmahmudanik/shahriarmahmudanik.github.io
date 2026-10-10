import { motion, useReducedMotion } from 'framer-motion'
import type { Signature as SignatureData } from '../data/signature'

interface Props {
  data: SignatureData
  stroke?: number // line thickness in the SVG's own units
  duration?: number // seconds for the whole signature to be drawn
  delay?: number
  className?: string
}

// A handwritten signature that draws itself: transparent fill, thin white outline traced from 0 to 100%,
// letter by letter - the same effect as the reference site's logo and headline.
export function Signature({ data, stroke = 1.5, duration = 2.4, delay = 0, className }: Props) {
  const reduce = useReducedMotion()
  const step = (duration * 0.5) / Math.max(data.paths.length - 1, 1)
  return (
    <svg className={className} viewBox={data.viewBox} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      {data.paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: duration * 0.6, ease: 'easeInOut', delay: delay + i * step }}
        />
      ))}
    </svg>
  )
}
