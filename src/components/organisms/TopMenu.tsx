import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { cn } from '../../lib/cn'
import { scrollToId } from '../../lib/scroll'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { NavItem } from './NavItem'

export const mainNav = [
  { to: '/', label: 'itineraries' },
  { to: '/destinations', label: 'destinations' },
  { to: '/journal', label: 'journal' },
]

/** Right-hand links: about, then the design system and release notes pages. `show` is the breakpoint each appears at on desktop. */
export const secondaryNav = [
  { to: '/about', label: 'about', show: 'md:inline-flex' },
  { to: '/design-system', label: 'design system', show: 'lg:inline-flex' },
  { to: '/release-notes', label: 'release notes', show: 'xl:inline-flex' },
]

/**
 * TopMenu — Figma `topmenu` (6:118). Italic serif links, centred logo, about · design system · release notes + View trip.
 * Design system shows from 1024px and release notes from 1280px. Under 768px every link collapses into a drawer.
 * "View trip" scrolls to the itinerary overview.
 */
export function TopMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const menuButton = useRef<HTMLButtonElement>(null)
  const drawer = useRef<HTMLDivElement>(null)

  function viewTrip() {
    setOpen(false)
    if (pathname === '/') scrollToId('overview')
    else navigate('/#overview')
  }

  useEffect(() => {
    if (!open) return
    drawer.current?.querySelector<HTMLElement>('a,button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab' && drawer.current) {
        const f = drawer.current.querySelectorAll<HTMLElement>('a,button')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const button = menuButton.current
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      button?.focus()
    }
  }, [open])

  return (
    <div className={cn('flex items-center bg-surface px-16 py-20 md:px-32', className)}>
      <button
        ref={menuButton}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={() => setOpen(true)}
        className="-m-8 cursor-pointer p-8 text-primary md:hidden"
      >
        <Icon name="more" size={24} />
      </button>
      <nav aria-label="Main" className="hidden items-center gap-32 md:flex">
        {mainNav.map((n) => (
          <NavItem key={n.to} {...n} />
        ))}
      </nav>
      <span className="flex-1" />
      <Link
        to="/"
        className="type-h2 tracking-[0.08em] whitespace-nowrap text-primary outline-focus focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        EIGHT DAYS
      </Link>
      <span className="flex-1" />
      <div className="hidden items-center gap-32 md:flex">
        {secondaryNav.map((n) => (
          <span key={n.to} className={cn('hidden', n.show)}>
            <NavItem to={n.to} label={n.label} />
          </span>
        ))}
        <Button variant="smallCta" onClick={viewTrip}>
          View trip
        </Button>
      </div>
      <span className="w-[24px] md:hidden" aria-hidden />

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu" id="mobile-drawer">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            className="absolute inset-0 bg-hero-overlay"
            onClick={() => setOpen(false)}
          />
          <div
            ref={drawer}
            className="absolute inset-y-0 left-0 flex w-[min(320px,85vw)] animate-[drawer-in_200ms_ease-out] flex-col gap-32 bg-surface p-24"
          >
            <div className="flex items-center justify-between">
              <span className="type-label text-secondary">Menu</span>
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="-m-8 cursor-pointer p-8 text-primary">
                <Icon name="close" size={24} />
              </button>
            </div>
            <nav aria-label="Main" className="flex flex-col items-start gap-24">
              {[...mainNav, ...secondaryNav].map((n) => (
                <NavItem key={n.to} to={n.to} label={n.label} onClick={() => setOpen(false)} />
              ))}
            </nav>
            <Button variant="smallCta" onClick={viewTrip} className="self-start">
              View trip
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
