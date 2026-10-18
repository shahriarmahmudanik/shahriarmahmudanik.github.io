import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export interface TimelineEntry {
  title: string
  org: string
  location?: string
  dates: string
  current?: boolean
  points: string[]
}

function Entry({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const reached = useInView(ref, { margin: '0px 0px -45% 0px' }) // lights up when it reaches the middle of the screen
  const reduce = useReducedMotion()
  const side = index % 2 === 0 ? -1 : 1

  return (
    <li ref={ref} className={`tl__item${reached ? ' is-reached' : ''}${entry.current ? ' is-current' : ''}`}>
      <span className="tl__dot" aria-hidden="true" />
      <motion.div
        className="tl__card"
        initial={reduce ? false : { opacity: 0, x: side * 60, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        whileHover={reduce ? undefined : { y: -4 }}
      >
        <p className="tl__dates">
          {entry.dates}
          {entry.current && <span className="tl__badge">Now</span>}
        </p>
        <h3 className="tl__title">{entry.title}</h3>
        <p className="tl__org">{entry.org}</p>
        {entry.location && <p className="tl__loc"><span aria-hidden="true">📍</span> {entry.location}</p>}
        <ul className="tl__points">
          {entry.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      </motion.div>
    </li>
  )
}

// A vertical timeline whose glowing line "draws" itself as you scroll, lighting each dot on the way.
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  return (
    <ol className="tl" ref={ref}>
      <span className="tl__rail" aria-hidden="true">
        <motion.span className="tl__fill" style={{ scaleY }} />
      </span>
      {entries.map((e, i) => (
        <Entry key={e.title + e.org} entry={e} index={i} />
      ))}
    </ol>
  )
}
