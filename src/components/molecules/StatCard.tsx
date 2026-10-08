import { cn } from '../../lib/cn'

export interface StatCardProps {
  label: string
  value: string
  className?: string
}

/** StatCard — Figma `stat card` (5:169). Single metric: H2 label, Numeral value, 230 × 230. */
export function StatCard({ label, value, className }: StatCardProps) {
  return (
    <div className={cn('flex size-[230px] flex-col justify-between bg-surface p-20 text-primary', className)}>
      <p className="type-h2">{label}</p>
      <p className="type-numeral">{value}</p>
    </div>
  )
}
