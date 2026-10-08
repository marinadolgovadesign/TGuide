import { useId, useState } from 'react'
import { cn } from '../../lib/cn'

export interface SeasonMonth {
  month: string
  /** Bar height in px (Figma: 10–48). */
  height: number
  /** Recommended month: brand fill instead of brand-soft. */
  best: boolean
  /** Swim-weather label for the tooltip. */
  swim: string
}

/** Figma `graph` (4:63) bar heights and highlights. */
export const scaleaSeason: SeasonMonth[] = [
  { month: 'January', height: 10, best: false, swim: 'Too cold · sea 15°C' },
  { month: 'February', height: 14, best: false, swim: 'Too cold · sea 14°C' },
  { month: 'March', height: 22, best: false, swim: 'Too cold · sea 15°C' },
  { month: 'April', height: 34, best: true, swim: 'Brisk dip · sea 16°C' },
  { month: 'May', height: 44, best: true, swim: 'Fresh swim · sea 19°C' },
  { month: 'June', height: 48, best: true, swim: 'Warm swim · sea 23°C' },
  { month: 'July', height: 46, best: false, swim: 'Best swim, busy · sea 26°C' },
  { month: 'August', height: 40, best: false, swim: 'Best swim, crowded · sea 27°C' },
  { month: 'September', height: 34, best: true, swim: 'Warm swim · sea 25°C' },
  { month: 'October', height: 24, best: true, swim: 'Mild swim · sea 22°C' },
  { month: 'November', height: 14, best: false, swim: 'Cool · sea 19°C' },
  { month: 'December', height: 10, best: false, swim: 'Too cold · sea 16°C' },
]

export interface SeasonChartProps {
  title?: string
  summary?: string
  months?: SeasonMonth[]
  className?: string
}

/**
 * SeasonChart — Figma `graph` (4:63). Seasonality mini chart, 12 months.
 * Hover or focus a bar for the month name and a swim-weather label.
 */
export function SeasonChart({
  title = 'Best time to visit',
  summary = 'Jun – Sep · best swim',
  months = scaleaSeason,
  className,
}: SeasonChartProps) {
  const [active, setActive] = useState<number | null>(null)
  const tipId = useId()
  return (
    <figure className={cn('inline-flex flex-col gap-8 bg-surface p-16', className)}>
      <figcaption className="type-caps text-secondary">{title}</figcaption>
      <div className="relative flex h-[48px] items-end gap-4" onMouseLeave={() => setActive(null)}>
        {months.map((m, i) => (
          <button
            key={m.month}
            type="button"
            aria-label={`${m.month}: ${m.swim}${m.best ? ' (recommended)' : ''}`}
            aria-describedby={active === i ? tipId : undefined}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className={cn(
              'w-8 cursor-pointer transition-opacity outline-focus focus-visible:outline-2 focus-visible:outline-offset-2',
              m.best ? 'bg-brand' : 'bg-brand-soft',
              active !== null && active !== i && 'opacity-50',
            )}
            style={{ height: m.height }}
          />
        ))}
        {active !== null && (
          <span
            id={tipId}
            role="tooltip"
            className="type-caps pointer-events-none absolute bottom-full z-10 mb-8 -translate-x-1/2 bg-inverse px-8 py-4 whitespace-nowrap text-inverse"
            style={{ left: active * 12 + 4 }}
          >
            {months[active].month} · {months[active].swim}
          </span>
        )}
      </div>
      <p className="type-label text-brand">{summary}</p>
    </figure>
  )
}
