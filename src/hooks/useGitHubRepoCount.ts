import { useEffect, useState } from 'react'

const CACHE_MINUTES = 30

function readCache(user: string): number | null {
  try {
    const cached = sessionStorage.getItem(`repoCount:${user}`)
    if (!cached) return null
    const { savedAt, count } = JSON.parse(cached) as { savedAt: number; count: number }
    return Date.now() - savedAt < CACHE_MINUTES * 60_000 ? count : null
  } catch {
    return null
  }
}

/** Live public repo count from GitHub; returns `fallback` until it loads or if the request fails. */
export function useGitHubRepoCount(user: string, fallback: number, enabled = true): number {
  const [count, setCount] = useState<number>(() => readCache(user) ?? fallback)

  useEffect(() => {
    if (!enabled || readCache(user) !== null) return
    const controller = new AbortController()
    fetch(`https://api.github.com/users/${user}`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? (res.json() as Promise<{ public_repos: number }>) : Promise.reject(res.status)))
      .then(({ public_repos }) => {
        try {
          sessionStorage.setItem(`repoCount:${user}`, JSON.stringify({ savedAt: Date.now(), count: public_repos }))
        } catch {
          /* ignore */
        }
        setCount(public_repos)
      })
      .catch(() => {
        /* keep fallback */
      })
    return () => controller.abort()
  }, [user, enabled])

  return count
}
