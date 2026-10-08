import { cn } from '../../lib/cn'

export type StatusKind = 'bookable' | 'popular' | 'soldOut' | 'offSeason'

const config: Record<StatusKind, { label: string; text: string; dot: string }> = {
  bookable: { label: 'Bookable', text: 'text-brand', dot: 'text-brand' },
  popular: { label: 'Popular', text: 'text-accent', dot: 'text-accent' },
  soldOut: { label: 'Sold out', text: 'text-error', dot: 'text-error' },
  offSeason: { label: 'Off-season', text: 'text-muted', dot: 'text-disabled' },
}

export interface StatusProps {
  status?: StatusKind
  /** Override the default label. */
  label?: string
  className?: string
}

/** Status — Figma `status` (3:56). Trip availability: dot + tracked label. */
export function Status({ status = 'bookable', label, className }: StatusProps) {
  const c = config[status]
  return (
    <span className={cn('inline-flex items-center gap-8 type-label whitespace-nowrap', c.text, className)}>
      <span aria-hidden className={cn('size-[6px] rounded-full bg-current', c.dot)} />
      {label ?? c.label}
    </span>
  )
}
