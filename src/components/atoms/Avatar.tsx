import { cn } from '../../lib/cn'

export type AvatarPerson = 'author' | 'guest' | 'local'

const bg: Record<AvatarPerson, string> = {
  author: 'bg-brand text-on-brand',
  // White on sand/500 and teal/300 fails AA, so these use dark initials
  guest: 'bg-accent text-on-photo',
  local: 'bg-brand-soft text-primary',
}

export interface AvatarProps {
  person?: AvatarPerson
  initials: string
  /** Full name for screen readers. */
  name?: string
  className?: string
}

/** Avatar — Figma `avatar` (4:13). Author / contributor initials. Person = author | guest | local. */
export function Avatar({ person = 'author', initials, name, className }: AvatarProps) {
  return (
    <span
      role={name ? 'img' : undefined}
      aria-label={name}
      className={cn(
        'type-caps inline-flex size-32 shrink-0 items-center justify-center rounded-full border-[1.5px] border-on-brand',
        bg[person],
        className,
      )}
    >
      <span aria-hidden={name ? true : undefined}>{initials}</span>
    </span>
  )
}

export interface AvatarGroupProps {
  people: { initials: string; name: string; person: AvatarPerson }[]
  /** Extra people not shown, e.g. 12 → "+12 travellers". */
  more?: number
  noun?: string
  className?: string
}

/** AvatarGroup — Figma `avatars` (4:14). Stacked avatars + count. */
export function AvatarGroup({ people, more = 0, noun = 'travellers', className }: AvatarGroupProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex items-center">
        {people.map((p) => (
          <Avatar key={p.initials} {...p} className="-mr-8" />
        ))}
      </div>
      {more > 0 && <span className="type-caps pl-[22px] text-secondary">+{more} {noun}</span>}
    </div>
  )
}
