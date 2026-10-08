import { useId } from 'react'
import { cn } from '../../lib/cn'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: 'big' | 'small'
  /** Visible caps label. If omitted, pass aria-label. */
  label?: string
  'aria-label'?: string
  disabled?: boolean
  className?: string
}

/** Switch — Figma `switch` (3:65). Toggle, e.g. "Show budget in USD". State × Size. */
export function Switch({ checked, onChange, size = 'big', label, disabled, className, ...aria }: SwitchProps) {
  const id = useId()
  const big = size === 'big'
  return (
    <span className={cn('inline-flex items-center gap-12', className)}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label ? undefined : aria['aria-label']}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative shrink-0 cursor-pointer rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50',
          big ? 'h-[30px] w-[52px]' : 'h-[22px] w-[40px]',
          checked ? 'bg-action-primary hover:bg-action-primary-hover' : 'bg-(--border-subtle) hover:bg-(--border-default)',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'absolute top-4 left-4 rounded-full bg-(--neutral-0) transition-transform duration-200',
            big ? 'size-[22px]' : 'size-[14px]',
            checked && (big ? 'translate-x-[22px]' : 'translate-x-[18px]'),
          )}
        />
      </button>
      {label && (
        <label htmlFor={id} className="type-caps cursor-pointer text-secondary">
          {label}
        </label>
      )}
    </span>
  )
}
