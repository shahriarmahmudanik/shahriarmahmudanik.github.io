import { useEffect, useState } from 'react'

interface Options {
  typeMs?: number
  deleteMs?: number
  pauseMs?: number
  enabled?: boolean // set to false (e.g. for reduced motion) to show the first word only
}

/**
 * Cycles through `words`, typing each one letter by letter and then deleting it.
 * Returns the text to show right now.
 *
 * React ideas used here:
 *  - useState: remembers the current word and how many letters are visible.
 *  - useEffect: runs a side effect (a timer) after every render, and cleans it up.
 */
export function useTyping(words: string[], options: Options = {}): string {
  const { typeMs = 70, deleteMs = 35, pauseMs = 1800, enabled = true } = options
  const [wordIndex, setWordIndex] = useState(0)
  const [letters, setLetters] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!enabled || words.length === 0) return

    const word = words[wordIndex]
    let delay = deleting ? deleteMs : typeMs
    let next: () => void

    if (!deleting && letters === word.length) {
      // Finished typing: wait, then start deleting.
      delay = pauseMs
      next = () => setDeleting(true)
    } else if (deleting && letters === 0) {
      // Finished deleting: move on to the next word.
      delay = 300
      next = () => {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }
    } else {
      next = () => setLetters((n) => n + (deleting ? -1 : 1))
    }

    const id = window.setTimeout(next, delay)
    return () => window.clearTimeout(id) // cleanup: cancel the timer if state changes first
  }, [words, wordIndex, letters, deleting, enabled, typeMs, deleteMs, pauseMs])

  if (!enabled || words.length === 0) return words[0] ?? ''
  return words[wordIndex].slice(0, letters)
}
