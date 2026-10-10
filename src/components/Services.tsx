import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const icons: ReactNode[] = [
  <svg key="code" viewBox="0 0 24 24" {...stroke}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>,
  <svg key="wp" viewBox="0 0 24 24" {...stroke}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 14h8M8 17h5" /></svg>,
  <svg key="seo" viewBox="0 0 24 24" {...stroke}><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.2-4.2M9 12.5l1.5-2 1.5 1.5 1.5-2.5" /></svg>,
]

function tilt(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.style.setProperty('--mx', `${x * 100}%`)
  el.style.setProperty('--my', `${y * 100}%`)
  el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`)
  el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`)
}

function reset(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

export function Services() {
  const reduce = useReducedMotion()
  return (
    <section className="section section--alt" id="services">
      <div className="wrap">
        <SectionHeading label="Services" title="How I can help." />
        <div className="grid-3">
          {profile.services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <article className="tcard" onMouseMove={reduce ? undefined : tilt} onMouseLeave={reduce ? undefined : reset}>
                <span className="tcard__icon">{icons[i % icons.length]}</span>
                <span className="tcard__num" aria-hidden="true">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {s.points && (
                  <ul className="tcard__points">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="acc__cta">
            Have a project in mind? <Link to="/hire-me">Hire me <span aria-hidden="true">&rarr;</span></Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
