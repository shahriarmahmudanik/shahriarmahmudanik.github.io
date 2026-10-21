import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { cvUrl } from '../data/profile'

const SPARKS = 10

// Download button: a CV sheet slides out of a pocket on hover, the button leans toward the cursor
// with a light that follows it, and a click flies the sheet into the tray with a burst of sparks.
export function CvButton() {
  const ref = useRef<HTMLAnchorElement>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!saved) return
    const t = window.setTimeout(() => setSaved(false), 2800)
    return () => window.clearTimeout(t)
  }, [saved])

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    el.style.setProperty('--tx', `${((x / r.width) - 0.5) * 8}px`)
    el.style.setProperty('--ty', `${((y / r.height) - 0.5) * 6}px`)
  }

  const onLeave = () => {
    ref.current?.style.setProperty('--tx', '0px')
    ref.current?.style.setProperty('--ty', '0px')
  }

  return (
    <a
      ref={ref}
      className={`cv-btn${saved ? ' cv-btn--saved' : ''}`}
      href={cvUrl}
      download="Shahriar-Mahmud-Anik-CV.pdf"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={() => setSaved(true)}
    >
      <span className="cv-btn__glow" aria-hidden="true" />
      <span className="cv-btn__doc" aria-hidden="true">
        <span className="cv-btn__sheet">
          <i /><i /><i /><i />
        </span>
        <span className="cv-btn__pocket" />
      </span>
      <span className="cv-btn__text">
        <span className="cv-btn__swap">
          <span className="cv-btn__title">Download my CV</span>
          <span className="cv-btn__title cv-btn__title--alt" aria-hidden="true">Saved to your device ✓</span>
        </span>
        <span className="cv-btn__meta">PDF · 1 page · updated 2026</span>
      </span>
      <svg className="cv-btn__arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4v12m-5-5 5 5 5-5M5 20h14" />
      </svg>
      <span className="cv-btn__sparks" aria-hidden="true">
        {Array.from({ length: SPARKS }, (_, i) => (
          <b key={i} style={{ '--a': `${(360 / SPARKS) * i}deg` } as CSSProperties} />
        ))}
      </span>
      <span aria-live="polite" className="sr-only">{saved ? 'CV download started' : ''}</span>
    </a>
  )
}
