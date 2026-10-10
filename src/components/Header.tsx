import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile'
import { logoSignature } from '../data/signature'
import { ScrollProgress } from './ScrollProgress'
import { Signature } from './Signature'

const items = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'skills', label: 'Skills', to: '/skills' },
  { id: 'projects', label: 'Projects', to: '/projects' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'hire', label: 'Hire me', to: '/hire-me' },
]

const sectionFor = (path: string) => {
  const hit = items.find((i) => i.to !== '/' && path.startsWith(i.to))
  return hit ? hit.id : path === '/' ? 'home' : ''
}

export function Header() {
  const [open, setOpen] = useState(false)
  const active = sectionFor(useLocation().pathname)

  // Lock page scroll and allow Escape to close while the menu is open.
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const brand = (
    <Link className="brand" to="/" onClick={() => setOpen(false)} aria-label={`${profile.name} - home`}>
      <Signature data={logoSignature} stroke={1.4} duration={3.4} />
    </Link>
  )

  return (
    <>
      <ScrollProgress />
      <header className="site-header">
        {brand}

        <motion.nav
          className="pill-nav"
          aria-label="Main"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
        >
          <ul>
            {items.map((item) => {
              const isActive = active === item.id
              const hire = item.id === 'hire'
              return (
                <li key={item.id} className={isActive ? 'is-active' : undefined}>
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className={`pill-nav__active${hire ? ' pill-nav__active--hire' : ''}`}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Link to={item.to} className={hire ? 'is-hire' : undefined}>
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </motion.nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            className="site-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.15 }}
          >
            <ul className="site-menu__list">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className={item.id === 'hire' ? 'is-hire' : active === item.id ? 'is-current' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
