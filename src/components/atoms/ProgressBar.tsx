import { cn } from '../../lib/cn'

export interface ProgressBarProps {
  /** 0–100 */
  value: number
  size?: 'default' | 'big'
  /** Accessible label, e.g. "Trip progress". */
  label: string
  className?: string
}

/** ProgressBar — Figma `bar` (4:88). Trip / reading progress. Day 6 of 8 = 75%. Size × Length. */
export function ProgressBar({ value, size = 'default', label, className }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
      className={cn('flex w-full bg-brand-subtle', size === 'big' ? 'h-[10px]' : 'h-4', className)}
    >
      <div className="h-full bg-brand transition-[width] duration-500" style={{ width: `${v}%` }} />
    </div>
  )
}
