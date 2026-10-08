import { cn } from '../../lib/cn'
import { AvatarGroup, type AvatarGroupProps } from '../atoms/Avatar'
import { ProgressBar } from '../atoms/ProgressBar'

export interface DestinationCardProps {
  country: string
  count: string
  seasonLabel: string
  /** 0–100 */
  seasonFit: number
  tip: string
  travellers: AvatarGroupProps
  className?: string
}

/** DestinationCard — Figma `destination card` (5:76). H3 country, season fit bar, local tip, travellers. */
export function DestinationCard({ country, count, seasonLabel, seasonFit, tip, travellers, className }: DestinationCardProps) {
  return (
    <div className={cn('flex w-full max-w-[380px] flex-col gap-20 bg-surface p-24', className)}>
      <div className="flex items-center">
        <p className="type-h3 text-primary">{country}</p>
        <span className="flex-1" />
        <p className="type-caps text-secondary">{count}</p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex">
          <p className="type-caps text-muted">{seasonLabel}</p>
          <span className="flex-1" />
          <p className="type-caps text-brand">{seasonFit}%</p>
        </div>
        <ProgressBar value={seasonFit} label={`${seasonLabel}: ${seasonFit}%`} />
      </div>
      <div className="flex flex-col gap-4">
        <p className="type-caps text-muted">Local tip</p>
        <p className="type-label text-primary">{tip}</p>
      </div>
      <AvatarGroup {...travellers} />
    </div>
  )
}
