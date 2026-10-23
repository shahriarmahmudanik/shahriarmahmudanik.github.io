import { useRef, type PointerEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  variant: 'primary' | 'ghost' | 'coffee'
  icon: 'arrow' | 'mail' | 'spark' | 'coffee'
  children: ReactNode
  href?: string
  to?: string
  external?: boolean
}

const ICONS = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  coffee: 'M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9ZM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2c-1 1.2 1 2 0 3.5M12 2c-1 1.2 1 2 0 3.5',
  spark: 'M12 3l2.2 6.3L21 12l-6.8 2.7L12 21l-2.2-6.3L3 12l6.8-2.7z',
}

// Hire-page button: leans toward the cursor, a light follows it, a shine sweeps across on hover
// and the icon slides out and back in.
export function HireButton({ variant, icon, children, href, to, external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    el.style.setProperty('--tx', `${(x / r.width - 0.5) * 10}px`)
    el.style.setProperty('--ty', `${(y / r.height - 0.5) * 8}px`)
  }

  const onLeave = () => {
    ref.current?.style.setProperty('--tx', '0px')
    ref.current?.style.setProperty('--ty', '0px')
  }

  const inner = (
    <>
      <span className="hbtn__label">{children}</span>
      <span className="hbtn__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS[icon]} />
        </svg>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS[icon]} />
        </svg>
      </span>
    </>
  )
  const common = { ref, className: `hbtn hbtn--${variant}`, onPointerMove: onMove, onPointerLeave: onLeave }

  return to ? (
    <Link {...common} to={to}>{inner}</Link>
  ) : (
    <a {...common} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
  )
}
