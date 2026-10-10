import { useEffect, useState } from 'react'

export interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  pushed_at: string
  fork: boolean
}

type Status = 'loading' | 'success' | 'error'

interface Result {
  status: Status
  repos: Repo[]
}

const CACHE_MINUTES = 30

function readCache(user: string): Repo[] | null {
  try {
    const cached = sessionStorage.getItem(`repos:${user}`)
    if (!cached) return null
    const { savedAt, repos } = JSON.parse(cached) as { savedAt: number; repos: Repo[] }
    return Date.now() - savedAt < CACHE_MINUTES * 60_000 ? repos : null
  } catch {
    return null // storage can be blocked (private mode)
  }
}

/**
 * Loads your public repositories from the GitHub API, newest first.
 *
 * This hook shows the three states every data-fetching component needs:
 * loading, success and error. It also:
 *  - cancels the request if the component disappears (AbortController),
 *  - caches the answer in sessionStorage, because GitHub only allows 60 anonymous requests per hour.
 */
export function useGitHubRepos(user: string, limit = 6): Result {
  const [result, setResult] = useState<Result>(() => {
    const cached = readCache(user)
    return cached ? { status: 'success', repos: cached.slice(0, limit) } : { status: 'loading', repos: [] }
  })

  useEffect(() => {
    if (readCache(user)) return // already showing cached data, no request needed
    const cacheKey = `repos:${user}`
    const controller = new AbortController()

    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub responded with ${res.status}`)
        return res.json() as Promise<Repo[]>
      })
      .then((all) => {
        const repos = all
          .filter((r) => !r.fork)
          .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), repos }))
        } catch {
          /* ignore */
        }
        setResult({ status: 'success', repos: repos.slice(0, limit) })
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return // we cancelled it ourselves
        setResult({ status: 'error', repos: [] })
      })

    return () => controller.abort()
  }, [user, limit])

  return result
}
