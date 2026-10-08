import { useId } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../atoms/Icon'

export interface DayNodeProps {
  day: number
  place: string
  /** Details revealed when expanded (e.g. the day's stops). */
  details?: { time: string; name: string }[]
  expanded: boolean
  onToggle: () => void
  className?: string
}

/**
 * DayNode — Figma `day node` (5:101). Single day node for the route / map builder.
 * The whole card is a disclosure button; expanding shows the day's plan.
 */
export function DayNode({ day, place, details = [], expanded, onToggle, className }: DayNodeProps) {
  const id = useId()
  return (
    <div className={cn('flex w-[220px] flex-col bg-accent-subtle transition-shadow hover:shadow-[inset_0_0_0_1px_var(--border-strong)]', className)}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={onToggle}
        className="flex cursor-pointer flex-col gap-8 p-16 text-left text-primary outline-focus focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="flex w-full items-center">
          <Icon name={expanded ? 'close' : 'play'} label={expanded ? 'Collapse day' : 'Open day'} />
          <span className="flex-1" />
          <Icon name="more" />
        </span>
        <span className="type-numeral-s">Day {String(day).padStart(2, '0')}</span>
        <span className="type-caps">{place}</span>
        <span className="flex w-full items-center" aria-hidden>
          <span className="size-[6px] rounded-full bg-current text-muted" />
          <span className="flex-1" />
          <span className="size-[6px] rounded-full bg-current text-primary" />
        </span>
      </button>
      <div id={id} hidden={!expanded} className="px-16 pb-16">
        <ol className="flex flex-col gap-8 border-t border-strong pt-12">
          {details.map((d) => (
            <li key={d.name} className="flex gap-12">
              <span className="type-caps w-[40px] shrink-0 pt-2 text-secondary">{d.time}</span>
              <span className="type-body text-primary">{d.name}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
