import { profile } from '../data/profile'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { Reveal } from './Reveal'

export function GitHubRepos() {
  const { status, repos } = useGitHubRepos(profile.githubUser, 6)
  return (
    <div>
      <h3 className="subhead">Latest on GitHub</h3>
      {status === 'loading' && (
        <div className="grid-3" aria-busy="true">
          <div className="skeleton" /><div className="skeleton" /><div className="skeleton" />
        </div>
      )}
      {status === 'error' && (
        <p className="empty">
          Couldn't load repositories right now. See them all on{' '}
          <a href={`https://github.com/${profile.githubUser}`} target="_blank" rel="noopener noreferrer">GitHub ↗</a>.
        </p>
      )}
      {status === 'success' && (
        <div className="grid-3">
          {repos.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.05}>
              <a className="repo-card" href={r.html_url} target="_blank" rel="noopener noreferrer">
                <h3>{r.name}</h3>
                <p>{r.description ?? 'No description yet.'}</p>
                <p className="repo-card__meta">
                  {r.language && <span>{r.language}</span>}
                  <span>★ {r.stargazers_count}</span>
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
