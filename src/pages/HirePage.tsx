import { HireButton } from '../components/HireButton'
import { CvButton } from '../components/CvButton'
import { motion, useReducedMotion } from 'framer-motion'
import { Contact } from '../components/Contact'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const steps = [
  { title: 'Discuss', text: 'We talk through your goals, audience and timeline so I understand what success looks like.' },
  { title: 'Plan', text: 'I outline the pages, features and approach, and agree the scope with you before any code is written.' },
  { title: 'Build', text: 'Hand-coded, responsive and fast. You see progress along the way and can give feedback early.' },
  { title: 'Launch', text: 'I test across devices, launch the site and stay on hand for fixes and improvements afterwards.' },
]

const offers = [
  {
    title: 'Front-end development',
    text: 'Fast, responsive interfaces that look sharp on every device and are built to be maintained.',
    points: ['Responsive, accessible layouts', 'React and TypeScript web apps', 'Performance and clean code'],
    tech: ['React', 'TypeScript', 'JavaScript', 'Sass'],
    icon: 'M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16',
  },
  {
    title: 'Professional WordPress websites',
    text: 'Hand-coded themes and plugins instead of bloated templates, built around what your business needs.',
    points: ['Custom themes and plugin development', 'Business, shop and brand sites', 'Maintenance, security and testing'],
    tech: ['WordPress', 'PHP', 'CSS', 'Bootstrap'],
    icon: 'M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01',
  },
  {
    title: 'Automation & funnels',
    text: 'Landing pages, funnels and lead-generation systems that keep working behind the scenes.',
    points: ['Landing pages and sales funnels', 'Content delivery and lead capture', 'Workflow automation'],
    tech: ['GHL', 'Squarespace', 'WIX'],
    icon: 'M4 6h16M7 12h10M10 18h4',
  },
  {
    title: 'SEO content & blog writing',
    text: 'Clear, search-friendly articles and website copy that bring in the right visitors and read well.',
    points: ['Keyword-led blog articles', 'Website and landing page copy', 'On-page SEO basics'],
    tech: ['SEO', 'Copywriting', 'Blogging'],
    icon: 'M5 4h11l3 3v13H5zM9 11h6M9 15h6M9 8h3',
  },
]

const headline = ["Let's", 'build', 'something', 'great', 'together.']

export function HirePage() {
  useDocumentTitle(`Hire me - ${profile.name}`)
  const reduce = useReducedMotion()
  const marquee = [...profile.skills, ...profile.skills]

  return (
    <main id="main" className="page-inner hire">
      <section className="hire-hero">
        <div className="hire-hero__orb hire-hero__orb--a" aria-hidden="true" />
        <div className="hire-hero__orb hire-hero__orb--b" aria-hidden="true" />
        <div className="wrap hire-hero__inner">
          <motion.p
            className="hire-badge"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hire-badge__dot" aria-hidden="true" />
            Available for new web development projects
          </motion.p>
          <h1 className="hire-hero__title" aria-label={headline.join(' ')}>
            {headline.map((w, i) => (
              <motion.span
                key={w}
                aria-hidden="true"
                className={i >= 3 ? 'hire-grad' : undefined}
                initial={reduce ? false : { opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {w}{' '}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="lead hire-hero__lead"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            I design and build fast, custom-coded websites with WordPress, JavaScript and React. Tell me about your project and I'll reply with a clear plan.
          </motion.p>
          <motion.div
            className="hire-hero__cta"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            <HireButton variant="primary" icon="spark" href="#contact">Start a project</HireButton>
            <HireButton variant="ghost" icon="arrow" to="/projects">See my work</HireButton>
            <CvButton />
          </motion.div>
        </div>
      </section>

      <div className="hire-marquee" aria-hidden="true">
        <div className="hire-marquee__track">
          {marquee.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <SectionHeading label="Services" title="How I can help." lead="Focused, hands-on work from first idea to launch." />
          <div className="offers">
            {offers.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.1}>
                <article className="offer">
                  <span className="offer__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={o.icon} />
                    </svg>
                  </span>
                  <h3>{o.title}</h3>
                  <p className="offer__text">{o.text}</p>
                  <ul className="offer__points">
                    {o.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <ul className="chips chips--small">
                    {o.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a className="offer__cta" href="#contact">Discuss this project <span aria-hidden="true">→</span></a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <SectionHeading label="Process" title="How we'll work together." />
          <ol className="hire-steps">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                className="hire-step"
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <span className="hire-step__n" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <Contact />
    </main>
  )
}
