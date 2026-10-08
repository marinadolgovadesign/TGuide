import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { ErrorMessage } from './ErrorMessage'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  /** Shows an ErrorMessage below and marks the field invalid. */
  error?: string
  /** Class for the outer wrapper (e.g. width). */
  className?: string
  /** On a brand background: label turns text/on-brand. */
  onColor?: boolean
}

/** Input — Figma `input` (4:28). Caps label + 1px border/default box, body text. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, onColor, id, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const errId = `${inputId}-error`
  return (
    <div className={cn('flex w-[240px] flex-col gap-4', className)}>
      <label htmlFor={inputId} className={cn('type-caps', onColor ? 'text-on-brand' : 'text-secondary')}>
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        {...rest}
        className={cn(
          'type-body w-full border bg-surface p-16 text-primary placeholder:text-muted',
          'focus-visible:outline-2 focus-visible:outline-offset-0 outline-focus disabled:bg-muted disabled:text-muted',
          error ? 'border-error' : 'border-default',
        )}
      />
      {error && <ErrorMessage id={errId}>{error}</ErrorMessage>}
    </div>
  )
})
