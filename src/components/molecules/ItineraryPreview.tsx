import { cn } from '../../lib/cn'
import { Button } from '../atoms/Button'
import { Status, type StatusKind } from '../atoms/Status'

export interface ItineraryPreviewProps {
  title: string
  status?: StatusKind
  stats: { value: string; label: string }[]
  ctaLabel?: string
  onCta?: () => void
  className?: string
}

/** ItineraryPreview — Figma `itinerary preview` (5:120). H2 title, status, small CTA, row of Numeral stats. */
export function ItineraryPreview({ title, status = 'bookable', stats, ctaLabel = 'View trip', onCta, className }: ItineraryPreviewProps) {
  return (
    <div className={cn('flex w-full flex-col gap-32 bg-surface p-24', className)}>
      <div className="flex flex-wrap items-center gap-16">
        <h2 className="type-h2 text-primary">{title}</h2>
        <span className="hidden flex-1 sm:block" />
        <Status status={status} />
        <Button variant="smallCta" onClick={onCta}>
          {ctaLabel}
        </Button>
      </div>
      <dl className="flex flex-wrap gap-x-32 gap-y-24">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-4">
            <dt className="type-caps text-secondary">{s.label}</dt>
            <dd className="type-numeral whitespace-nowrap text-primary">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
