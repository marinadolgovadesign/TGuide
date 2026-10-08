import { cn } from '../../lib/cn'
import { Avatar } from '../atoms/Avatar'
import { Status, type StatusKind } from '../atoms/Status'

export interface ProfileProps {
  /** Figma "Type". */
  variant?: 'long' | 'short' | 'shortOutlined'
  name: string
  role: string
  initials: string
  /** long only. */
  status?: StatusKind
  className?: string
}

/** Profile — Figma `profile` (5:42). Author byline. long (row + divider) | short (sand) | shortOutlined (white, outlined). */
export function Profile({ variant = 'shortOutlined', name, role, initials, status = 'bookable', className }: ProfileProps) {
  const person = (
    <>
      <Avatar initials={initials} />
      <span className="flex flex-col gap-2">
        <span className="type-h4 text-primary">{name}</span>
        <span className="type-caps text-secondary">{role}</span>
      </span>
    </>
  )
  if (variant === 'long') {
    return (
      <div className={cn('flex w-full max-w-[700px] flex-col gap-16', className)}>
        <div className="flex items-center gap-16">
          {person}
          <span className="flex-1" />
          <Status status={status} />
        </div>
        <div className="h-px w-full bg-(--border-strong)" />
      </div>
    )
  }
  return (
    <div
      className={cn(
        'inline-flex items-center gap-16 px-16 py-8',
        variant === 'short' ? 'bg-accent-subtle' : 'border border-subtle bg-surface',
        className,
      )}
    >
      {person}
    </div>
  )
}
