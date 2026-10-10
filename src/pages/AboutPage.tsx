import { About } from '../components/About'
import { Education } from '../components/Education'
import { Experience } from '../components/Experience'
import { Services } from '../components/Services'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function AboutPage() {
  useDocumentTitle(`About - ${profile.name}`)
  return (
    <main id="main" className="page-inner">
      <About />
      <Education />
      <Experience />
      <Services />
    </main>
  )
}
