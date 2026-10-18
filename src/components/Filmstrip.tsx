import { useEffect, useState, type PointerEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '../types'

const DELAY = 4200

// Tilts the front card towards the cursor.
const tilt = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  e.currentTarget.style.setProperty('--ry', `${x * 10}deg`)
  e.currentTarget.style.setProperty('--rx', `${-y * 8}deg`)
  e.currentTarget.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
  e.currentTarget.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
}
const untilt = (e: PointerEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty('--ry', '0deg')
  e.currentTarget.style.setProperty('--rx', '0deg')
}

// Looping 3D card deck: the active card sits in the middle, neighbours fan out behind it.
export function Filmstrip({ projects, onOpen }: { projects: Project[]; onOpen: (p: Project) => void }) {
  const n = projects.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const go = (d: number) => setActive((a) => (a + d + n) % n)

  useEffect(() => {
    if (paused || reduce || n < 2) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % n), DELAY)
    return () => window.clearTimeout(id)
  }, [paused, reduce, n, active])

  // shortest signed distance from the active card, so the deck loops
  const offsetOf = (i: number) => {
    let o = (i - active) % n
    if (o > n / 2) o -= n
    if (o < -n / 2) o += n
    return o
  }

  return (
    <section
      className="film"
      aria-roledescription="carousel"
      aria-label="Project filmstrip"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1)
        if (e.key === 'ArrowRight') go(1)
      }}
    >
      <motion.div
        className="film__stage"
        onPanEnd={(_, info) => {
          if (info.offset.x < -60 || info.velocity.x < -400) go(1)
          else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
        }}
      >
        {projects.map((p, i) => {
          const o = offsetOf(i)
          const abs = Math.abs(o)
          const isActive = o === 0
          return (
            <motion.button
              key={p.slug}
              type="button"
              className="film__card"
              data-hover
              aria-label={isActive ? `Open ${p.title}` : `Show ${p.title}`}
              aria-hidden={abs > 2 ? true : undefined}
              tabIndex={abs > 2 ? -1 : 0}
              onClick={() => (isActive ? onOpen(p) : setActive(i))}
              onPointerMove={isActive && !reduce ? tilt : undefined}
              onPointerLeave={isActive ? untilt : undefined}
              initial={false}
              animate={{
                x: `${o * 56}%`,
                y: abs * 14,
                z: -abs * 190,
                rotateY: o * -22,
                scale: isActive ? 1 : 0.92,
                opacity: abs > 2 ? 0 : 1 - abs * 0.22,
                filter: `brightness(${1 - abs * 0.18}) blur(${abs > 1 ? 1.5 : 0}px)`,
              }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 18, mass: 0.9 }}
              style={{ zIndex: 10 - abs, pointerEvents: abs > 2 ? 'none' : 'auto' }}
            >
              <span className="film__frame">
                {p.image ? (
                  <>
                    <img className="film__bg" src={p.image} alt="" aria-hidden="true" loading="lazy" draggable={false} />
                    <img className="film__img" src={p.image} alt="" loading="lazy" draggable={false} />
                  </>
                ) : (
                  <span className="script">{p.title.charAt(0)}</span>
                )}
                <span className="film__grain" aria-hidden="true" />
                <span className="film__glow" aria-hidden="true" />
              </span>
              <span className="film__foot">
                <span className="film__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="film__meta">
                  <span className="film__title">{p.title}</span>
                  <span className="film__type">{p.type}</span>
                </span>
              </span>
            </motion.button>
          )
        })}
      </motion.div>
      <div className="film__ctrl">
        <button type="button" onClick={() => go(-1)} aria-label="Previous project">←</button>
        <span className="film__count" aria-live="polite">
          {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          {!reduce && <span key={active} className={`film__bar${paused ? ' is-paused' : ''}`} style={{ animationDuration: `${DELAY}ms` }} aria-hidden="true" />}
        </span>
        <button type="button" onClick={() => go(1)} aria-label="Next project">→</button>
      </div>
    </section>
  )
}
