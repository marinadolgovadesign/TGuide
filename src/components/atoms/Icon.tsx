import icons from '../../../design/icons.json'
import { cn } from '../../lib/cn'

export type IconName = Exclude<keyof typeof icons, '$notes'>
export const iconNames = Object.keys(icons).filter((k) => k !== '$notes') as IconName[]

export interface IconProps {
  name: IconName
  /** Rendered size in px. Default 16 (Figma). */
  size?: number
  /** Fill the shape with currentColor (e.g. saved bookmark). */
  filled?: boolean
  /** Accessible label. Omit for decorative icons. */
  label?: string
  className?: string
}

/**
 * Icon — one of the 11 Eight Days line icons from design/icons.json.
 * 24 viewBox, 16px, stroke 1.5, currentColor. Figma: ds-atoms › icons (3:4).
 */
export function Icon({ name, size = 16, filled, label, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={cn('shrink-0', className)}
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  )
}
