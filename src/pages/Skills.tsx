import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { FaCode, FaCss3Alt } from 'react-icons/fa6'
import {
  SiAndroidstudio, SiBootstrap, SiCplusplus, SiGit, SiHtml5, SiJavascript, SiLinux, SiMysql,
  SiNodedotjs, SiOpenjdk, SiPhp, SiPython, SiReact, SiSass, SiTypescript, SiWordpress,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

// Each skill's icon and brand colour (the colour also drives the hover glow).
const ICONS: Record<string, [IconType, string]> = {
  JavaScript: [SiJavascript, '#F7DF1E'],
  TypeScript: [SiTypescript, '#3178C6'],
  React: [SiReact, '#61DAFB'],
  HTML5: [SiHtml5, '#E34F26'],
  CSS3: [FaCss3Alt, '#1572B6'],
  Sass: [SiSass, '#CC6699'],
  Bootstrap: [SiBootstrap, '#7952B3'],
  'Node.js': [SiNodedotjs, '#5FA04E'],
  PHP: [SiPhp, '#777BB4'],
  WordPress: [SiWordpress, '#21759B'],
  Python: [SiPython, '#FFD43B'],
  Java: [SiOpenjdk, '#ED8B00'],
  'C++': [SiCplusplus, '#00599C'],
  MySQL: [SiMysql, '#4479A1'],
  'Git & GitHub': [SiGit, '#F05032'],
  'Android Studio': [SiAndroidstudio, '#3DDC84'],
  Linux: [SiLinux, '#FCC624'],
  'VS Code': [VscVscode, '#007ACC'],
}
const iconOf = (name: string): [IconType, string] => ICONS[name] ?? [FaCode, '#06b6d4']
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
  const [CurrentIcon, color] = iconOf(current)

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
          <ul className="bubbles">
            {list.map((s, i) => {
              const [Icon, brand] = iconOf(s)
              // Vary size, float speed and start offset so the bubbles drift out of sync.
              const size = 4.6 + ((i * 7) % 5) * 0.55
              return (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.07, type: 'spring', stiffness: 260, damping: 14 }}
                  whileHover={{ scale: 1.22 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <button
                    type="button"
                    data-hover
                    aria-label={s}
                    className={`bubble${i === index ? ' is-active' : ''}`}
                    style={{
                      ['--c' as string]: brand,
                      ['--size' as string]: `${size}rem`,
                      ['--dur' as string]: `${5 + (i % 5) * 0.9}s`,
                      ['--delay' as string]: `${-(i * 0.7)}s`,
                    }}
                    onClick={() => setIndex(i)}
                    onMouseEnter={() => setIndex(i)}
                    onFocus={() => setIndex(i)}
                  >
                    <Icon aria-hidden="true" />
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
              <CurrentIcon aria-hidden="true" className="skill-detail__icon" style={{ color }} />
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
