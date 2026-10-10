import { About } from '../components/About'
import { Experience } from '../components/Experience'
import { Services } from '../components/Services'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function AboutPage() {
  useDocumentTitle(`About - ${profile.name}`)
  return (
    <main id="main" className="page-inner">
      <About />
      <Experience />
      <Services />
    </main>
  )
}
