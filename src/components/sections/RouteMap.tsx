import type { KeyboardEvent } from 'react'
import { cn } from '../../lib/cn'

export interface MapStop {
  day: number
  town: string
  x: number
  y: number
}

export interface RouteMapProps {
  stops: readonly MapStop[]
  selected: number | null
  onSelect: (day: number) => void
  className?: string
}

/* Stylised Riviera dei Cedri coastline, sea to the west. viewBox 320 × 520. */
const coast = 'M95 0 L90 50 L100 110 L140 160 L155 210 L172 265 L185 320 L205 380 L222 450 L230 520'
const land = `${coast} L320 520 L320 0 Z`

/** SVG route of the 8 daily stops. Each stop is focusable; Enter/Space selects it. */
export function RouteMap({ stops, selected, onSelect, className }: RouteMapProps) {
  const route = stops.map((s, i) => `${i ? 'L' : 'M'}${s.x} ${s.y}`).join(' ')

  function onKey(e: KeyboardEvent, day: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(day)
    }
  }

  return (
    <svg viewBox="0 0 320 520" role="group" aria-label="Route map: 8 stops from Scalea to Maratea" className={cn('h-auto w-full', className)}>
      <rect width="320" height="520" fill="var(--background-brand-subtle)" />
      <path d={land} fill="var(--background-accent-subtle)" />
      <path d={coast} fill="none" stroke="var(--border-default)" strokeWidth="1" />
      <ellipse cx="146" cy="198" rx="7" ry="4" fill="var(--background-accent-subtle)" stroke="var(--border-default)" />
      <text x="24" y="300" className="type-caps" fill="var(--text-brand)" transform="rotate(-90 24 300)">
        Tyrrhenian Sea
      </text>
      <text x="16" y="28" className="type-caps" fill="var(--text-brand)">
        Gulf of Policastro
      </text>
      <text x="118" y="190" className="type-caps" fill="var(--text-secondary)" textAnchor="end">
        Isola di Dino
      </text>

      <path
        d={route}
        fill="none"
        stroke="var(--text-brand)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {stops.map((s) => {
        const active = selected === s.day
        const labelLeft = s.x > 200
        return (
          <g
            key={s.day}
            role="button"
            tabIndex={0}
            aria-pressed={active}
            aria-label={`Day ${s.day}, ${s.town}`}
            onClick={() => onSelect(s.day)}
            onKeyDown={(e) => onKey(e, s.day)}
            className="cursor-pointer outline-none [&:focus-visible>circle:first-child]:stroke-(--action-focus)"
          >
            <circle cx={s.x} cy={s.y} r={active ? 15 : 13} fill="transparent" stroke="transparent" strokeWidth="2" />
            <circle
              cx={s.x}
              cy={s.y}
              r={active ? 11 : 9}
              fill={active ? 'var(--action-primary-pressed)' : 'var(--background-brand)'}
              className="transition-all duration-200"
            />
            <text
              x={s.x}
              y={s.y + 3.5}
              textAnchor="middle"
              fill="var(--text-on-brand)"
              className="pointer-events-none font-numeral"
              fontSize="11"
            >
              {s.day}
            </text>
            {active && (
              <text
                x={labelLeft ? s.x - 18 : s.x + 18}
                y={s.y + 3}
                textAnchor={labelLeft ? 'end' : 'start'}
                className="type-label pointer-events-none"
                fill="var(--text-primary)"
              >
                {s.town}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
