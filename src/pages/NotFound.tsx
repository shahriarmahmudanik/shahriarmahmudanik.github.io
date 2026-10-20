import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <main id="main" className="page page--center">
      <div className="wrap">
        <p className="script script--big">404</p>
        <h1>Page not found</h1>
        <p className="lead" style={{ marginInline: 'auto' }}>The page you're looking for doesn't exist or has moved.</p>
        <Link className="btn btn--primary" to="/">Back home</Link>
      </div>
    </main>
  )
}
