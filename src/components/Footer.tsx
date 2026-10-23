import { Fragment, useEffect, useState, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { CoffeeButton } from './CoffeeButton'
import { items } from './Header'
import { Icon } from './Icon'

const YEAR = new Date().getFullYear()
const TIME_ZONE = 'Europe/London' // Cardiff
const HEADLINE = 'Have a project in mind? Let\u2019s talk.'
const MARK = profile.name.split(' ').slice(0, 2).join(' ')
const EASE = [0.2, 0.7, 0.2, 1] as const

// Ticks once a second so the footer shows the live local time in Cardiff.
function useCardiffTime() {
  const format = () =>
    new Date().toLocaleTimeString('en-GB', {
      timeZone: TIME_ZONE,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  const [time, setTime] = useState(format)
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function Footer({ showCta = true }: { showCta?: boolean }) {
  const time = useCardiffTime()
  const [h, m, sec] = time.split(':').map(Number)
  const seconds = sec * 6
  const minutes = m * 6 + sec * 0.1
  const hours = (h % 12) * 30 + m * 0.5
  const [copied, setCopied] = useState(false)

  // The soft spotlight on the call-to-action card follows the pointer.
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  // The colour layer on the name follows the pointer horizontally.
  const trackName = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--nx', `${e.clientX - r.left}px`)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <footer className="site-footer">
      <div className="wrap">
        {showCta && (
          <motion.section
            className="site-footer__cta"
            onPointerMove={onMove}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-labelledby="footer-cta"
          >
            <div className="site-footer__orbs" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="site-footer__copy">
              <p className="site-footer__status">
                <i /> Available for new projects
              </p>
              <h2 id="footer-cta" aria-label={HEADLINE}>
                {HEADLINE.split(' ').map((w, i) => (
                  <Fragment key={i}>
                    <motion.span
                      aria-hidden="true"
                      initial={{ opacity: 0, y: '0.6em', filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15 + i * 0.08,
                        ease: EASE,
                      }}
                    >
                      {w}
                    </motion.span>{' '}
                  </Fragment>
                ))}
              </h2>
            </div>
            <div className="site-footer__actions">
              <Link className="btn btn--primary site-footer__hire" to="/hire-me">
                Hire me <span aria-hidden="true">→</span>
              </Link>
              <button type="button" className="btn" onClick={copyEmail} aria-live="polite">
                {copied ? 'Email copied' : 'Copy email'}
              </button>
              <CoffeeButton />
            </div>
          </motion.section>
        )}

        <motion.div
          className="site-footer__row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <div className="fmini">
            <svg className="fclock" viewBox="0 0 100 100" role="img" aria-label={`Local time in Cardiff is ${time}`}>
              <circle className="fclock__face" cx="50" cy="50" r="46" />
              <line className="fclock__hand" x1="50" y1="50" x2="50" y2="28" transform={`rotate(${hours} 50 50)`} />
              <line
                className="fclock__hand fclock__hand--min"
                x1="50"
                y1="50"
                x2="50"
                y2="14"
                transform={`rotate(${minutes} 50 50)`}
              />
              <line
                className="fclock__hand fclock__hand--sec"
                x1="50"
                y1="56"
                x2="50"
                y2="10"
                transform={`rotate(${seconds} 50 50)`}
              />
              <circle className="fclock__pin" cx="50" cy="50" r="3.5" />
            </svg>
            <p>
              <time>{time}</time>
              <span>{profile.location}</span>
            </p>
          </div>

          <nav className="flinks" aria-label="Footer">
            {items.map((i) => (
              <Link key={i.id} to={i.to}>
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="ficons">
            {profile.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <Icon name={l.label} size={18} />
              </a>
            ))}
            <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} title="Email">
              <Icon name="Email" size={18} />
            </a>
          </div>
        </motion.div>

        <motion.p
          className="site-footer__mark"
          aria-hidden="true"
          data-text={MARK}
          onPointerMove={trackName}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {MARK}
        </motion.p>

        <div className="site-footer__bar">
          <p>
            © {YEAR} {profile.name}. All rights reserved.
          </p>
          <button
            type="button"
            className="site-footer__top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
