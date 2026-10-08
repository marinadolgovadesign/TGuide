import { cn } from '../../lib/cn'

export interface ListRowProps {
  title: string
  country: string
  meta: string
  updated: string
  /** "View" action. */
  onView?: () => void
  href?: string
  className?: string
}

const view =
  'type-label bg-action-secondary px-16 py-4 text-primary transition-colors hover:bg-action-secondary-hover active:bg-action-secondary-pressed'

/** ListRow — Figma `list` (4:89). Itinerary list row: H3 title, caps meta, View button, 1px divider. */
export function ListRow({ title, country, meta, updated, onView, href, className }: ListRowProps) {
  return (
    <div className={cn('flex flex-col gap-16', className)}>
      <div className="flex flex-wrap items-center gap-x-32 gap-y-8">
        <p className="type-h3 w-full text-primary md:w-[220px]">{title}</p>
        <p className="type-caps text-secondary md:w-[90px]">{country}</p>
        <p className="type-caps text-secondary md:w-[130px]">{meta}</p>
        <p className="type-caps text-secondary md:w-[140px]">{updated}</p>
        {href ? (
          <a href={href} className={view} aria-label={`View ${title}`}>
            View
          </a>
        ) : (
          <button type="button" onClick={onView} className={cn(view, 'cursor-pointer')} aria-label={`View ${title}`}>
            View
          </button>
        )}
      </div>
      <div className="h-px w-full bg-(--border-strong)" />
    </div>
  )
}
