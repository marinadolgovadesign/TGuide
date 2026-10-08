import { useId, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { ErrorMessage } from './ErrorMessage'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  className?: string
}

/** TextArea — Figma `text_area` (4:33). Multi-line input, 90px tall box. */
export function TextArea({ label, error, className, id, ...rest }: TextAreaProps) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const errId = `${fieldId}-error`
  return (
    <div className={cn('flex w-[240px] flex-col gap-4', className)}>
      <label htmlFor={fieldId} className="type-caps text-secondary">
        {label}
      </label>
      <textarea
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        {...rest}
        className={cn(
          'type-body h-[90px] w-full resize-none border bg-surface p-16 text-primary placeholder:text-muted',
          'focus-visible:outline-2 focus-visible:outline-offset-0 outline-focus',
          error ? 'border-error' : 'border-default',
        )}
      />
      {error && <ErrorMessage id={errId}>{error}</ErrorMessage>}
    </div>
  )
}
