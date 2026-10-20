import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AboutPage } from './pages/AboutPage'
import { GlowCursor } from './components/GlowCursor'
import { HirePage } from './pages/HirePage'
import { Home } from './pages/Home'
import { ProjectsPage } from './pages/ProjectsPage'
import { Skills } from './pages/Skills'
import { NotFound } from './pages/NotFound'
import { ProjectDetail } from './pages/ProjectDetail'

// React Router changes the page without a reload, so the browser doesn't scroll for us.
// This component scrolls to the #section in the URL, or to the top on a new page.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollManager />
      <Header />
      {pathname !== '/' && <GlowCursor />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/hire-me" element={<HirePage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {pathname !== '/' && <Footer showCta={pathname !== '/hire-me'} />}
    </>
  )
}
