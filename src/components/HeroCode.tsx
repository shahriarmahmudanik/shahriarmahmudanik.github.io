import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// A small, quiet "editor" card for the right side of the hero: lines of code fade in one by one,
// with a few floating stack badges. Desktop only (hidden via CSS on small screens).
const lines = [
  [['k', 'const'], ['v', ' developer'], ['p', ' = {']],
  [['p', '  name: '], ['s', "'Shahriar Mahmud Anik'"], ['p', ',']],
  [['p', '  role: '], ['s', "'Web Developer'"], ['p', ',']],
  [['p', '  stack: ['], ['s', "'WordPress'"], ['p', ', '], ['s', "'React'"], ['p', '],']],
  [['p', '  location: '], ['s', "'Cardiff, UK'"], ['p', ',']],
  [['p', '  available: '], ['b', 'true'], ['p', ',']],
  [['p', '}']],
] as const

export function HeroCode() {
  const reduce = useReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(-1)

  // A soft "current line" highlight that walks down the code, like a cursor moving through an editor.
  useEffect(() => {
    if (reduce) return
    let i = 0
    let t = 0
    const start = window.setTimeout(() => {
      setActive(0)
      t = window.setInterval(() => {
        i = (i + 1) % lines.length
        setActive(i)
      }, 1500)
    }, 3600)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(t)
    }
  }, [reduce])

  useEffect(() => {
    if (reduce) return
    const el = wrap.current
    if (!el) return
    let nx = 0, ny = 0, x = 0, y = 0, raf = 0
    const onMove = (e: PointerEvent) => {
      nx = e.clientX / window.innerWidth - 0.5
      ny = e.clientY / window.innerHeight - 0.5
    }
    const tick = () => {
      x += (nx - x) * 0.06
      y += (ny - y) * 0.06
      el.style.transform = `perspective(900px) translate3d(${(x * -10).toFixed(2)}px, ${(y * -7).toFixed(2)}px, 0) rotateY(${(x * -9).toFixed(2)}deg) rotateX(${(y * 7).toFixed(2)}deg)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduce])

  return (
    <div className="hcode" ref={wrap} aria-hidden="true">
      <motion.div
        className="hcode__card"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hcode__bar">
          <i /><i /><i />
          <span>developer.ts</span>
        </div>
        <pre className="hcode__body">
          <span className="hcode__line" style={{ transform: `translateY(${Math.max(active, 0)}00%)`, opacity: active < 0 ? 0 : 1 }} />
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.7 + i * 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {line.map(([kind, text], j) => (
                <span key={j} className={`t-${kind}`}>{text}</span>
              ))}
              {i === lines.length - 1 && <span className="hcode__cursor" />}
            </motion.div>
          ))}
        </pre>
      </motion.div>

      <motion.p
        className="hcode__status"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.1, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <i /> Available for new projects
      </motion.p>
    </div>
  )
}
