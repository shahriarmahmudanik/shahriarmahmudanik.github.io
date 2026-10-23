import { motion, useReducedMotion } from 'framer-motion'
import { coffeeUrl } from '../data/profile'
import { HireButton } from './HireButton'

// Small support card: the cup fills with coffee when it scrolls into view and the steam keeps rising.
export function CoffeeSection() {
  const reduce = useReducedMotion()
  return (
    <section className="coffee" aria-label="Support my work">
      <motion.div
        className="coffee__card"
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <svg className="coffee__cup" viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <clipPath id="coffee-clip">
              <path d="M20 46h64v30a26 26 0 0 1-26 26H46a26 26 0 0 1-26-26V46Z" />
            </clipPath>
          </defs>
          <g className="coffee__steam" fill="none" strokeWidth="3" strokeLinecap="round">
            <path d="M40 34c-6-7 6-10 0-18" />
            <path d="M54 34c-6-7 6-10 0-18" />
            <path d="M68 34c-6-7 6-10 0-18" />
          </g>
          <g clipPath="url(#coffee-clip)">
            <motion.rect
              className="coffee__fill"
              x="14" width="76" height="62"
              initial={reduce ? { y: 52 } : { y: 106 }}
              whileInView={{ y: 52 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            />
          </g>
          <path className="coffee__outline" d="M20 46h64v30a26 26 0 0 1-26 26H46a26 26 0 0 1-26-26V46ZM84 54h8a11 11 0 0 1 0 22h-8" fill="none" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <div className="coffee__text">
          <h2>Enjoying my work?</h2>
          <p>If my projects or free Chrome extension saved you time, a coffee helps me keep building.</p>
        </div>
        <HireButton variant="coffee" icon="coffee" href={coffeeUrl} external>Buy me a coffee</HireButton>
      </motion.div>
    </section>
  )
}
