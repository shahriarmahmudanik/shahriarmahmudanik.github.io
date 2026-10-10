import { profile } from '../data/profile'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <p>© {YEAR} {profile.name}</p>
        <div className="site-footer__links">
          {profile.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
