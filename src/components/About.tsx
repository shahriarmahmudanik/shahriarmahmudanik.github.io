import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import type { Stat } from '../types'
import { useCountUp } from '../hooks/useCountUp'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const numeric = typeof stat.value === 'number'
  const count = useCountUp(typeof stat.value === 'number' ? stat.value : 0, inView, 1400, !!reduce)
  return (
    <li className="stat" ref={ref}>
      <span className="stat__value">
        {numeric ? count : stat.value}
        {stat.suffix}
      </span>
      <span className="stat__label">{stat.label}</span>
    </li>
  )
}

export function About() {
  return (
    <section className="section" id="about">
      <div className="wrap grid-2">
        <div>
          <SectionHeading label="About" title="Building for the web, one detail at a time." />
          {profile.about.map((p) => (
            <Reveal key={p}>
              <p className="lead">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <ul className="stats">
            {profile.stats.map((s) => (
              <StatItem key={s.label} stat={s} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
