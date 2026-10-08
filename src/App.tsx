import { useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/sections/Footer'
import { About } from './pages/About'
import { DesignSystem } from './pages/DesignSystem'
import { Destinations } from './pages/Destinations'
import { Home } from './pages/Home'
import { Journal } from './pages/Journal'
import { NotFound } from './pages/NotFound'
import { ReleaseNotes } from './pages/ReleaseNotes'

function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return (
    <>
      <a
        href="#main"
        className="type-label sr-only z-50 bg-action-primary px-16 py-12 text-on-brand focus:not-sr-only focus:fixed focus:top-8 focus:left-8"
      >
        Skip to content
      </a>
      <Outlet />
      <Footer />
    </>
  )
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="journal" element={<Journal />} />
        <Route path="about" element={<About />} />
        <Route path="design-system" element={<DesignSystem />} />
        <Route path="release-notes" element={<ReleaseNotes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
