import { Link, useParams } from 'react-router-dom'
import { getProject, projects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { NotFound } from './NotFound'

export function ProjectDetail() {
  const { slug } = useParams() // the ":slug" part of /projects/:slug
  const project = getProject(slug)
  useDocumentTitle(project ? `${project.title} - Anik` : 'Not found')
  if (!project) return <NotFound />

  const i = projects.findIndex((p) => p.slug === project.slug)
  const prev = projects[i - 1]
  const next = projects[i + 1]

  return (
    <main id="main" className="page">
      <div className="wrap wrap--narrow">
        <article className="entry">
          <header className="page__head">
            <p className="label">{project.type}</p>
            <h1>{project.title}</h1>
            <ul className="chips chips--small">
              {project.tech.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <p className="hero__cta">
              {project.live && <a className="btn btn--primary" href={project.live} target="_blank" rel="noopener noreferrer">Visit live site ↗</a>}
              {project.repo && <a className="btn" href={project.repo} target="_blank" rel="noopener noreferrer">View code ↗</a>}
              {project.links?.map((l) => <a key={l.url} className="btn" href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
            </p>
          </header>
          {project.gallery ? (
            <div className="gallery gallery--page">{project.gallery.map((src) => <img key={src} src={src} alt={`${project.title} screenshot`} loading="lazy" />)}</div>
          ) : (
            project.image && <p className="project-hero-img"><img src={project.image} alt={`${project.title} preview`} /></p>
          )}
          <div className="entry__content">
            {project.description.map((p) => <p key={p}>{p}</p>)}
          </div>
        </article>
        <nav className="entry__nav" aria-label="Projects">
          <span>{prev && <Link to={`/projects/${prev.slug}`}>← {prev.title}</Link>}</span>
          <Link to="/projects">All projects</Link>
          <span>{next && <Link to={`/projects/${next.slug}`}>{next.title} →</Link>}</span>
        </nav>
      </div>
    </main>
  )
}
