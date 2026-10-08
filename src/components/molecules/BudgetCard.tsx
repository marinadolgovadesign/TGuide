import { useState } from 'react'
import { cn } from '../../lib/cn'
import { useMoney } from '../../lib/currency'

export interface BudgetPart {
  label: string
  eur: number
}

export interface BudgetCardProps {
  level: string
  parts: BudgetPart[]
  className?: string
}

const heights = [60, 40, 24]
const fills = ['bg-brand-soft', 'bg-brand-soft', 'bg-surface']

/**
 * BudgetCard — Figma `card budget` (5:43). Budget level: three blocks + caps caption.
 * Hover or focus a block to see that part of the budget in the chosen currency.
 */
export function BudgetCard({ level, parts, className }: BudgetCardProps) {
  const money = useMoney()
  const [active, setActive] = useState<number | null>(null)
  const total = parts.reduce((s, p) => s + p.eur, 0)
  return (
    <div className={cn('flex flex-col gap-16 bg-brand-subtle p-20', className)}>
      <p className="type-h4 text-primary">Budget</p>
      <div className="flex items-end gap-4" onMouseLeave={() => setActive(null)}>
        {parts.slice(0, 3).map((p, i) => (
          <button
            key={p.label}
            type="button"
            aria-label={`${p.label}: ${money(p.eur)}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className={cn(
              'w-[44px] cursor-pointer transition-opacity outline-focus focus-visible:outline-2 focus-visible:outline-offset-2',
              fills[i],
              active !== null && active !== i && 'opacity-60',
            )}
            style={{ height: heights[i] }}
          />
        ))}
      </div>
      <p className="type-caps text-brand" aria-live="polite">
        {active === null ? `Overall · ${level}` : `${parts[active].label} · ${money(parts[active].eur)}`}
      </p>
      <span className="sr-only">Total {money(total)}</span>
    </div>
  )
}
