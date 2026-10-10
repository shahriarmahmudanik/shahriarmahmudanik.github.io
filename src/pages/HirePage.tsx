import { Contact } from '../components/Contact'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function HirePage() {
  useDocumentTitle(`Hire me - ${profile.name}`)
  return (
    <main id="main" className="page-inner">
      <Contact />
    </main>
  )
}
