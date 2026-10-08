import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'
import { SecondRow, type Crumb } from './SecondRow'
import { TopMenu } from './TopMenu'

export interface TrackerDay {
  day: number
  town: string
}

export interface HeaderProps {
  crumbs: Crumb[]
  days: readonly TrackerDay[]
  /** Days up to and including this one are filled. */
  activeDay: number
  onSelectDay: (day: number) => void
  className?: string
}

/**
 * Header — Figma `header` (6:148). Itinerary page header: menu + breadcrumbs + 8-day tracker.
 * Sticky: menu and breadcrumbs scroll away, the tracker stays pinned.
 */
export function Header({ crumbs, days, activeDay, onSelectDay, className }: HeaderProps) {
  const top = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    const el = top.current
    if (!el) return
    const ro = new ResizeObserver(() => setOffset(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <header className={cn('sticky z-40 bg-muted', className)} style={{ top: -offset }}>
      <div ref={top}>
        <TopMenu />
        <SecondRow crumbs={crumbs} />
      </div>
      <DayTracker days={days} activeDay={activeDay} onSelectDay={onSelectDay} />
    </header>
  )
}

/** The 8-day progress row. Click a day to jump to it. */
export function DayTracker({ days, activeDay, onSelectDay }: Pick<HeaderProps, 'days' | 'activeDay' | 'onSelectDay'>) {
  return (
    <nav aria-label="Itinerary days" className="bg-muted px-16 py-16 md:px-32">
      <ol className="flex items-start gap-4">
        {days.map((d) => {
          const done = d.day <= activeDay
          return (
            <li key={d.day} className="min-w-0 flex-1">
              <button
                type="button"
                onClick={() => onSelectDay(d.day)}
                aria-current={d.day === activeDay ? 'step' : undefined}
                aria-label={`Day ${d.day}, ${d.town}`}
                className="group flex w-full cursor-pointer flex-col items-start gap-8 overflow-hidden text-left outline-focus focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span
                  className={cn(
                    'h-4 w-full transition-colors duration-300',
                    done ? 'bg-brand' : 'bg-brand-subtle group-hover:bg-brand-soft',
                  )}
                />
                <span className={cn('type-caps block w-full truncate', done ? 'text-brand' : 'text-muted')}>
                  <span className="lg:hidden">{d.day}</span>
                  <span className="hidden lg:inline">
                    Day {d.day} · {d.town}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
