import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile'
import { skillIcons } from '../data/skillIcons'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const BLURBS: Record<string, string> = {
  JavaScript: 'My core language for interactive, dynamic interfaces, from page behaviour to full front-end applications.',
  TypeScript: 'Type-safe JavaScript that catches errors early and keeps larger codebases reliable and easy to maintain.',
  React: 'Component-driven interfaces with clean state management. This portfolio is built with it.',
  HTML5: 'Semantic, accessible markup that forms a solid foundation for every page I build.',
  CSS3: 'Responsive layouts, animation and careful visual detail across every screen size.',
  Sass: 'Structured, reusable stylesheets with variables and mixins for scalable styling.',
  Bootstrap: 'Rapid, consistent responsive layouts, customised to match each brand.',
  'Node.js': 'JavaScript on the server for tooling, build pipelines and back-end services.',
  PHP: 'The back-end engine behind my custom WordPress themes, plugins and integrations.',
  WordPress: 'Bespoke themes and plugins, hand-coded for speed, security and easy editing.',
  Python: 'Back-end development and scripting, including Django web applications.',
  Java: 'Object-oriented programming and Android application development.',
  'C++': 'Systems-level programming with a strong grounding in object-oriented design.',
  MySQL: 'Relational database design and queries powering data-driven websites and applications.',
  'Git & GitHub': 'Version control and collaboration: clean commit history, branching and automated deployment.',
  'Android Studio': 'Building and testing native Android applications.',
  Linux: 'Command-line confidence for development, servers and deployment workflows.',
  'VS Code': 'My primary editor, configured for fast, consistent and high-quality development.',
}

const personal = [
  {
    title: 'Problem solving',
    body: 'I break complex problems into clear steps and track every bug to its root cause.',
    tags: ['Debugging', 'Analysis', 'Root cause'],
    icon: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z',
  },
  {
    title: 'Communication',
    body: 'I explain technical decisions in plain language and keep clients informed at every stage.',
    tags: ['Clear updates', 'Client focus', 'Collaboration'],
    icon: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.5A8 8 0 1 1 21 12ZM8.5 11h7M8.5 14h4',
  },
  {
    title: 'Adaptability',
    body: 'I pick up new tools quickly, from WordPress to React and TypeScript, and put them to work on real projects.',
    tags: ['Quick learner', 'Modern tooling', 'Versatile'],
    icon: 'M20 11a8 8 0 0 0-14.5-3.5M4 4v4h4M4 13a8 8 0 0 0 14.5 3.5M20 20v-4h-4',
  },
  {
    title: 'Attention to detail',
    body: 'Clean code, accessible interfaces and pages that load fast, with the small details done right.',
    tags: ['Clean code', 'Accessibility', 'Performance'],
    icon: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM21 21l-5-5M8.5 11l2 2 3.5-4',
  },
]

// A card that tilts toward the pointer and lights up where it is hovered.
function PersonalCard({ item, index }: { item: (typeof personal)[number]; index: number }) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * 12}deg`)
  }
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    for (const v of ['--rx', '--ry']) e.currentTarget.style.setProperty(v, '0deg')
  }
  return (
    <motion.li
      initial={{ opacity: 0, y: 50, x: index % 2 ? 40 : -40 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.1 + index * 0.15 }}
    >
      <div className="pskill" style={{ ['--d' as string]: `${index * -1.1}s` }} onPointerMove={onMove} onPointerLeave={onLeave}>
        <span className="pskill__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <span className="pskill__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <motion.path
              d={item.icon}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4 + index * 0.15, duration: 1.4, ease: 'easeInOut' }}
            />
          </svg>
        </span>
        <h2>{item.title}</h2>
        <p>{item.body}</p>
        <ul className="pskill__tags">
          {item.tags.map((t, k) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.8 + index * 0.15 + k * 0.1 }}
            >
              {t}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.li>
  )
}

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
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setIndex(i)}
                    onFocus={() => setIndex(i)}
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
              <p>{BLURBS[current] ?? `${current} is part of my toolkit for building reliable, maintainable websites.`}</p>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <ul className="personal">
          {personal.map((p, i) => (
            <PersonalCard key={p.title} item={p} index={i} />
          ))}
        </ul>
      )}
    </main>
  )
}
