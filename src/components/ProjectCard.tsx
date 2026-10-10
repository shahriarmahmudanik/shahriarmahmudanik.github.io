import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Project } from '../types'

// `layout` makes framer-motion animate the card smoothly to its new grid position when the filter changes.
export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className="card"
    >
      <div className="card__media card__media--blank" aria-hidden="true">
        <span>{project.title.charAt(0)}</span>
      </div>
      <div className="card__body">
        <p className="card__type">{project.type}</p>
        <h3 className="card__title">
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="card__text">{project.summary}</p>
        <ul className="chips chips--small">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="card__links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer">Live ↗</a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer">Code ↗</a>
          )}
        </p>
      </div>
    </motion.li>
  )
}
