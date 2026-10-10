import { Hero } from '../components/Hero'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function Home() {
  useDocumentTitle(`${profile.name} - ${profile.jobTitle}`)
  return (
    <main id="main">
      <Hero />
    </main>
  )
}
