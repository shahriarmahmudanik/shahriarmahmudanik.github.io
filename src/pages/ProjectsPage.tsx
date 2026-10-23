import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Filmstrip } from '../components/Filmstrip'
import type { Project } from '../types'

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

const featuredSlugs = ['image-downloader-pro', 'ai-fitness-tracker', 'seek-spirituality', 'ai-alchemy', 'mongstar-music', 'the-whole-woman', 'hvac-bangladesh', 'ecommerce-microservices', 'music-library-api', 'tritech', 'cafe-shop-website']
const highlights = featuredSlugs.map((slug) => projects.find((p) => p.slug === slug)).filter((p): p is Project => !!p)

export function ProjectsPage() {
  useDocumentTitle(`Projects - ${profile.name}`)
  const [selected, setSelected] = useState<Project | null>(null)
  const [category, setCategory] = useState('All')
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.type)))]
  const featured = projects.find((x) => x.featured)
  const shown = category === 'All' ? projects : projects.filter((p) => p.type === category)

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null)
    document.body.classList.add('menu-open')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [selected])

  return (
    <main id="main" className="page-projects">
      <header className="phead">
        <p className="phead__label">Selected work</p>
        <h1>Featured Projects</h1>
        <p className="phead__lead">A curated selection of web, mobile and software work, from client websites to full-stack applications.</p>
      </header>
      {featured && (
        <motion.section className="featured" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} aria-label="Featured project">
          <div className="featured__text">
            <p className="featured__badge">★ Featured project</p>
            <h2>{featured.title}</h2>
            <p>{featured.summary}</p>
            <ul className="chips chips--small">{featured.tech.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="featured__cta">
              <button type="button" className="btn btn--primary" onClick={() => setSelected(featured)}>View screenshots</button>
              {featured.repo && <a className="btn" href={featured.repo} target="_blank" rel="noopener noreferrer">App code ↗</a>}
              {featured.links?.map((l) => <a key={l.url} className="btn" href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
            </p>
          </div>
          <div className="featured__shots" aria-hidden="true">
            {featured.gallery?.slice(0, 3).map((src, i) => <img key={src} src={src} alt="" loading="lazy" style={{ ['--i' as string]: i }} />)}
          </div>
        </motion.section>
      )}
      <Filmstrip projects={highlights} onOpen={setSelected} />
      <h2 className="pall">All projects</h2>
      <div className="cat-filters" role="group" aria-label="Filter projects by category">
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={c === category} className={c === category ? 'is-active' : undefined} onClick={() => setCategory(c)}>
            {c} <span className="cat-count">{c === 'All' ? projects.length : projects.filter((p) => p.type === c).length}</span>
          </button>
        ))}
      </div>
      <motion.ul className="pgrid" variants={container} initial="hidden" animate="show" key={category}>
        {shown.map((p, i) => (
          <motion.li key={p.slug} variants={item} className={i === 0 && category === 'All' && shown.length > 3 ? 'pgrid__wide' : undefined}>
            <button type="button" data-hover className="pcard" onClick={() => setSelected(p)}>
              <motion.span layoutId={`tile-${p.slug}`} className={`pcard__media${p.promo ? ' pcard__media--promo' : ''}`}>
                {p.image ? <img src={p.image} alt="" loading="lazy" /> : <span className="script">{p.title.charAt(0)}</span>}
                <span className="pcard__badge">{p.featured ? '★ ' : ''}{p.type}</span>
                <span className="pcard__view">View project →</span>
              </motion.span>
              <span className="pcard__body">
                <span className="pcard__title">{p.title}</span>
                <span className="pcard__text">{p.summary}</span>
                <span className="pcard__tech">{p.tech.slice(0, 4).map((t) => <span key={t}>{t}</span>)}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <AnimatePresence>
        {selected && (
          <motion.div className="modal" role="dialog" aria-modal="true" aria-label={selected.title}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <div className="modal__box" onClick={(e) => e.stopPropagation()}>
              <motion.div layoutId={`tile-${selected.slug}`} className={`tile__art tile__art--big${selected.gallery ? ' tile__art--hidden' : ''}`}>
                {selected.image ? <img src={selected.image} alt={`${selected.title} preview`} /> : <span className="script">{selected.title.charAt(0)}</span>}
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="modal__body">
                <p className="tile__cat">{selected.type}</p>
                <h2>{selected.title}</h2>
                {selected.description.map((d) => <p key={d}>{d}</p>)}
                {selected.gallery && (
                  <div className="gallery">{selected.gallery.map((src) => <img key={src} src={src} alt={`${selected.title} screenshot`} loading="lazy" />)}</div>
                )}
                <ul className="chips chips--small">{selected.tech.map((t) => <li key={t}>{t}</li>)}</ul>
                <p className="modal__links">
                  {selected.live && <a href={selected.live} target="_blank" rel="noopener noreferrer">Live ↗</a>}
                  {selected.repo && <a href={selected.repo} target="_blank" rel="noopener noreferrer">Code ↗</a>}
                  {selected.links?.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
                  <Link to={`/projects/${selected.slug}`}>Full details</Link>
                  <button type="button" onClick={() => setSelected(null)}>Close</button>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
