import { cn } from '../../lib/cn'

export interface TravelTipProps {
  children: string
  className?: string
}

/** TravelTip — Figma `travel tip` (5:117). Editorial tip callout: Description style in text/brand on brand-subtle. */
export function TravelTip({ children, className }: TravelTipProps) {
  return (
    <blockquote className={cn('bg-brand-subtle px-24 py-20', className)}>
      <p className="type-description max-w-[460px] text-brand">{children}</p>
    </blockquote>
  )
}
