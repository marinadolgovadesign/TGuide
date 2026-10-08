import { cn } from '../../lib/cn'
import { Tag } from '../atoms/Tag'

export interface ItinerarySummaryProps {
  summary: string
  tags: string[]
  /** When set, tags become filter toggles. */
  onTagClick?: (tag: string) => void
  activeTag?: string | null
  className?: string
}

/** ItinerarySummary — Figma `itinerary summary` (5:148). Divider, body text, static tags. */
export function ItinerarySummary({ summary, tags, onTagClick, activeTag, className }: ItinerarySummaryProps) {
  return (
    <div className={cn('flex w-full flex-col gap-16', className)}>
      <div className="h-px w-full bg-(--border-strong)" />
      <p className="type-body max-w-[520px] text-primary">{summary}</p>
      <div className="flex flex-wrap gap-4" role={onTagClick ? 'group' : undefined} aria-label={onTagClick ? 'Filter the journal by tag' : undefined}>
        {tags.map((t) => (
          <Tag
            key={t}
            variant="static"
            label={t}
            onClick={onTagClick ? () => onTagClick(t) : undefined}
            pressed={activeTag === t}
          />
        ))}
      </div>
    </div>
  )
}
