// Adds matchers such as toBeInTheDocument() to every test.
import '@testing-library/jest-dom/vitest'

// jsdom has no IntersectionObserver; framer-motion and our hooks use it, so provide a do-nothing version.
class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = FakeIntersectionObserver as unknown as typeof IntersectionObserver
