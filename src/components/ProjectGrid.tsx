import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../types'
import { ProjectCard } from './ProjectCard'

// Kept separate from the Projects section so it can be tested on its own.
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const types = ['All', ...Array.from(new Set(projects.map((p) => p.type)))]
  const [active, setActive] = useState('All')
  const shown = active === 'All' ? projects : projects.filter((p) => p.type === active)

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            className={`filter${t === active ? ' is-active' : ''}`}
            aria-pressed={t === active}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <motion.ul layout className="grid-cards" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  )
}
