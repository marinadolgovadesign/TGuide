import { Link } from 'react-router'
import { useTheme, type ThemeChoice } from '../../lib/theme'
import { SegmentedTabs } from '../atoms/SegmentedTabs'
import { Container } from './Container'

const links = [
  { to: '/', label: 'Itineraries' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/journal', label: 'Journal' },
  { to: '/about', label: 'About' },
]

const linkCls = 'type-label text-inverse hover:underline underline-offset-4 outline-focus focus-visible:outline-2 focus-visible:outline-offset-4'

/** Site footer (Figma 24:652) with the Light / Dark / System theme switch. */
export function Footer() {
  const { theme, setTheme } = useTheme()
  return (
    <footer className="bg-inverse">
      <Container className="flex flex-col gap-32 py-48">
        <div className="flex flex-col gap-24 lg:flex-row lg:items-center lg:gap-32">
          <Link to="/" className="type-h2 tracking-[0.08em] text-inverse outline-focus focus-visible:outline-2">
            EIGHT DAYS
          </Link>
          <span className="hidden flex-1 lg:block" />
          <nav aria-label="Footer" className="flex flex-wrap gap-x-32 gap-y-16">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={linkCls}>
                {l.label}
              </Link>
            ))}
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className={linkCls}>
              Instagram
            </a>
          </nav>
        </div>
        <div className="h-px w-full bg-(--text-muted)" />
        <div className="flex flex-col gap-24 lg:flex-row lg:items-center">
          <p className="type-caps text-(--text-disabled)">© 2026 Eight Days · Slow 8-day itineraries · Photos: Scalea &amp; Maratea, Italy</p>
          <span className="hidden flex-1 lg:block" />
          <div className="flex flex-wrap items-center gap-24">
            <Link to="/design-system" className="type-caps text-inverse hover:underline">
              Design system
            </Link>
            <Link to="/release-notes" className="type-caps text-inverse hover:underline">
              Release notes
            </Link>
            <SegmentedTabs<ThemeChoice>
              aria-label="Colour theme"
              value={theme}
              onChange={setTheme}
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System' },
              ]}
            />
          </div>
        </div>
      </Container>
    </footer>
  )
}
