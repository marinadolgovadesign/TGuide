import { cn } from '../../lib/cn'
import { Icon } from './Icon'

export type TagVariant = 'control' | 'static' | 'accent' | 'onPhoto'

export interface TagProps {
  /** Figma "Type". */
  variant?: TagVariant
  label: string
  /** control: called when the × is pressed. */
  onRemove?: () => void
  /** static: makes the tag a toggle button (e.g. a filter). */
  onClick?: () => void
  /** static toggle: selected state. */
  pressed?: boolean
  className?: string
}

const styles: Record<TagVariant, string> = {
  control: 'bg-surface border border-subtle text-primary',
  static: 'bg-brand-subtle text-brand',
  accent: 'bg-accent-subtle text-primary',
  onPhoto: 'bg-on-photo text-on-photo',
}

/**
 * Tag — Figma `tag` (3:83). Destination / theme tag. Square corners.
 * control = removable, static = brand label (optionally a filter toggle), accent, onPhoto.
 */
export function Tag({ variant = 'static', label, onRemove, onClick, pressed, className }: TagProps) {
  const cls = cn('inline-flex items-center gap-4 px-8 py-4 type-label whitespace-nowrap', styles[variant], className)

  if (variant === 'control') {
    return (
      <span className={cls}>
        {label}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="-m-2 inline-flex cursor-pointer p-2 text-primary hover:text-link"
        >
          <Icon name="close" size={12} />
        </button>
      </span>
    )
  }
  if (variant === 'static' && onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={!!pressed}
        className={cn(
          cls,
          'cursor-pointer transition-colors hover:bg-brand-soft aria-pressed:bg-brand aria-pressed:text-on-brand',
        )}
      >
        {label}
      </button>
    )
  }
  return <span className={cls}>{label}</span>
}
