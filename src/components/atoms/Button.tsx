import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from './Icon'

export type ButtonVariant = 'secondary' | 'onColor' | 'smallCta' | 'bigCta' | 'ghost' | 'dayNode'
export type ForcedState = 'hover' | 'pressed' | 'focus' | 'disabled'

const base =
  'relative inline-flex items-center whitespace-nowrap transition-colors duration-150 cursor-pointer select-none ' +
  'outline-focus focus-visible:outline-2 focus-visible:outline-offset-2 data-[force-state=focus]:outline-2 data-[force-state=focus]:outline-offset-2 ' +
  'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed'

/* Literal class strings so Tailwind can see them. States: :hover, :active, :focus-visible, :disabled (+ data-force-state for docs). */
const variants: Record<ButtonVariant, string> = {
  secondary:
    'type-button-serif text-primary px-24 py-8 bg-action-secondary ' +
    'not-disabled:hover:bg-action-secondary-hover not-disabled:active:bg-action-secondary-pressed ' +
    'data-[force-state=hover]:bg-action-secondary-hover data-[force-state=pressed]:bg-action-secondary-pressed ' +
    'disabled:bg-action-disabled disabled:text-muted data-[force-state=disabled]:bg-action-disabled data-[force-state=disabled]:text-muted',
  onColor:
    'type-button-serif text-primary px-24 py-8 bg-surface ' +
    'not-disabled:hover:bg-muted not-disabled:active:bg-brand-subtle ' +
    'data-[force-state=hover]:bg-muted data-[force-state=pressed]:bg-brand-subtle ' +
    'aria-pressed:bg-brand-subtle ' +
    'disabled:bg-action-disabled disabled:text-muted data-[force-state=disabled]:bg-action-disabled data-[force-state=disabled]:text-muted',
  smallCta:
    'type-label text-on-brand gap-8 px-20 py-16 bg-action-primary ' +
    'not-disabled:hover:bg-action-primary-hover not-disabled:active:bg-action-primary-pressed ' +
    'data-[force-state=hover]:bg-action-primary-hover data-[force-state=pressed]:bg-action-primary-pressed ' +
    'disabled:bg-action-disabled disabled:text-muted data-[force-state=disabled]:bg-action-disabled data-[force-state=disabled]:text-muted',
  bigCta:
    'type-description text-on-brand px-32 py-20 bg-action-primary ' +
    'not-disabled:hover:bg-action-primary-hover not-disabled:active:bg-action-primary-pressed ' +
    'data-[force-state=hover]:bg-action-primary-hover data-[force-state=pressed]:bg-action-primary-pressed ' +
    'disabled:bg-action-disabled disabled:text-muted data-[force-state=disabled]:bg-action-disabled data-[force-state=disabled]:text-muted',
  ghost:
    'type-label text-primary gap-8 p-4 ' +
    'not-disabled:hover:text-link not-disabled:active:text-link-hover ' +
    'data-[force-state=hover]:text-link data-[force-state=pressed]:text-link-hover ' +
    'disabled:text-disabled data-[force-state=disabled]:text-disabled',
  dayNode:
    'flex-col items-start! gap-2 px-16 py-8 bg-accent-subtle text-primary ' +
    'not-disabled:hover:shadow-[inset_0_0_0_1px_var(--border-strong)] not-disabled:active:shadow-[inset_0_0_0_2px_var(--border-strong)] aria-pressed:shadow-[inset_0_0_0_2px_var(--border-strong)] ' +
    'data-[force-state=hover]:shadow-[inset_0_0_0_1px_var(--border-strong)] data-[force-state=pressed]:shadow-[inset_0_0_0_2px_var(--border-strong)] ' +
    'disabled:bg-action-disabled disabled:text-muted data-[force-state=disabled]:bg-action-disabled data-[force-state=disabled]:text-muted',
}

interface CommonProps {
  /** Figma "Type". */
  variant?: ButtonVariant
  /** Show the trailing arrow. Defaults to true for smallCta and ghost. */
  arrow?: boolean
  /** dayNode only: small caps line under the numeral (e.g. town). */
  sublabel?: string
  /** Docs/playground only: render a state statically. */
  forceState?: ForcedState
  children: ReactNode
  className?: string
}

export type ButtonProps = CommonProps &
  (
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  )

/**
 * Button — Figma `btn` (3:109). Type × State.
 * Primary CTA uses action/primary (+hover/pressed); secondary uses action/secondary;
 * focus = 2px action/focus ring outside; disabled = action/disabled + text/muted. Square corners.
 */
export function Button(props: ButtonProps) {
  const { variant = 'secondary', arrow, sublabel, forceState, children, className, ...rest } = props
  const showArrow = arrow ?? (variant === 'smallCta' || variant === 'ghost')
  const classes = cn(base, variants[variant], className)
  const content =
    variant === 'dayNode' ? (
      <>
        <span className="type-numeral-s">{children}</span>
        {sublabel && <span className="type-caps">{sublabel}</span>}
      </>
    ) : (
      <>
        {children}
        {showArrow && <Icon name="arrow-right" />}
      </>
    )

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} data-force-state={forceState} className={classes}>
        {content}
      </a>
    )
  }
  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" {...buttonRest} data-force-state={forceState} className={classes}>
      {content}
    </button>
  )
}
