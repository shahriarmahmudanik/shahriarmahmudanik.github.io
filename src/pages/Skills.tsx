import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile'
import { skillIcons } from '../data/skillIcons'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const BLURBS: Record<string, string> = {
  JavaScript: 'The language I use every day to make pages interactive.',
  TypeScript: 'Typed JavaScript, so mistakes are caught before users see them.',
  React: 'Component-based UIs - this portfolio is built with it.',
  WordPress: 'Custom themes and plugins, hand-coded rather than template-based.',
  PHP: 'Back-end logic behind my WordPress theme and plugin work.',
  HTML5: 'Semantic, accessible markup as the foundation of every page.',
  CSS3: 'Responsive layouts, animation and careful detail.',
}

const personal = [
  { title: 'Problem solving', body: 'I break messy problems into small steps and enjoy tracking a bug to its root.' },
  { title: 'Communication', body: 'I explain technical choices in plain language and keep clients updated.' },
  { title: 'Fast learner', body: 'Moving from WordPress into React and TypeScript while studying for an MSc.' },
  { title: 'Attention to detail', body: 'Clean code, accessible interfaces and pages that load quickly.' },
]

export function Skills() {
  useDocumentTitle(`Skills - ${profile.name}`)
  const [tech, setTech] = useState(true)
  const [index, setIndex] = useState(0)
  const list = profile.skills
  const current = list[index] ?? list[0]
  const color = skillIcons[current]?.color ?? '#06b6d4'

  return (
    <main id="main" className="page-skills">
      <motion.div
        className="skills-switch"
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 700, damping: 30, delay: 0.6 }}
      >
        <span>Technology</span>
        <button
          type="button"
          role="switch"
          aria-checked={!tech}
          aria-label="Switch between technology and personal skills"
          className={`switch${tech ? '' : ' is-on'}`}
          onClick={() => setTech((t) => !t)}
        >
          <motion.span layout transition={{ type: 'spring', stiffness: 700, damping: 30 }} />
        </button>
        <span>Personal Skills</span>
      </motion.div>

      {tech ? (
        <>
          <ul className="skill-icons">
            {list.map((s, i) => {
              const icon = skillIcons[s]
              // Keep the outline about 1px thick whatever the icon's own coordinate size is.
              const stroke = icon ? Math.max(...icon.viewBox.split(' ').slice(2).map(Number)) / 70 : 1
              return (
                <motion.li key={s} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <button
                    type="button"
                    data-hover
                    aria-label={s}
                    aria-pressed={i === index}
                    className="skill-icon"
                    style={{ ['--c' as string]: icon?.color ?? '#06b6d4' }}
                    onClick={() => setIndex(i)}
                  >
                    {icon ? (
                      <svg viewBox={icon.viewBox} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        {icon.paths.map((d, k) => (
                          <motion.path
                            key={k}
                            d={d}
                            fill="#1E293B"
                            strokeWidth={stroke}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.3, duration: 2, ease: 'easeInOut' }}
                          />
                        ))}
                      </svg>
                    ) : (
                      <span>{s}</span>
                    )}
                  </button>
                </motion.li>
              )
            })}
          </ul>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="skill-detail"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <h1 style={{ color }}>{current}</h1>
              <p>{BLURBS[current] ?? `I use ${current} in my projects and keep learning more about it.`}</p>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <ul className="personal">
          {personal.map((p, i) => (
            <motion.li key={p.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
            </motion.li>
          ))}
        </ul>
      )}
    </main>
  )
}
