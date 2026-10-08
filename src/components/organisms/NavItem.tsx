import { NavLink } from 'react-router'
import { cn } from '../../lib/cn'

export interface NavItemProps {
  to: string
  label: string
  /** Force the visual state (docs). Otherwise follows the current route. */
  active?: boolean
  onClick?: () => void
  className?: string
}

const cls = (active: boolean, className?: string) =>
  cn(
    'group inline-flex flex-col items-center gap-4 type-button-serif text-primary outline-focus focus-visible:outline-2 focus-visible:outline-offset-4',
    className,
  ) + (active ? ' is-active' : '')

function Underline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'h-px w-full transition-colors duration-150',
        active ? 'bg-(--text-brand)' : 'bg-transparent group-hover:bg-(--border-subtle)',
      )}
    />
  )
}

/** NavItem — Figma `nav item` (6:51). Top-menu link: italic serif, 1px text/brand underline when active. State = active | default. */
export function NavItem({ to, label, active, onClick, className }: NavItemProps) {
  if (active !== undefined) {
    return (
      <a href={to} onClick={onClick} aria-current={active ? 'page' : undefined} className={cls(active, className)}>
        {label}
        <Underline active={active} />
      </a>
    )
  }
  return (
    <NavLink to={to} end={to === '/'} onClick={onClick} className={({ isActive }) => cls(isActive, className)}>
      {({ isActive }) => (
        <>
          {label}
          <Underline active={isActive} />
        </>
      )}
    </NavLink>
  )
}
