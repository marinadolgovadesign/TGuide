import { cn } from '../../lib/cn'
import { Icon } from './Icon'

export interface BookmarkProps {
  saved: boolean
  onToggle?: (saved: boolean) => void
  /** Accessible name, e.g. "Save itinerary". */
  label?: string
  className?: string
}

/** Bookmark — Figma `bookmark` (3:72). Save to favourites. Saved = yes | no. */
export function Bookmark({ saved, onToggle, label = 'Save itinerary', className }: BookmarkProps) {
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={label}
      onClick={() => onToggle?.(!saved)}
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center rounded-full p-8 transition-colors duration-150',
        saved ? 'bg-brand text-on-brand hover:bg-action-primary-hover' : 'bg-surface text-primary hover:bg-muted',
        className,
      )}
    >
      <Icon name="bookmark" filled={saved} />
    </button>
  )
}
