import { useEffect } from 'react'

/** Sets the browser tab title while the component is on screen, and restores it afterwards. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])
}
