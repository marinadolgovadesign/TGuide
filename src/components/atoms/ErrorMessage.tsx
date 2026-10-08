import { cn } from '../../lib/cn'

export interface ErrorMessageProps {
  children: string
  id?: string
  className?: string
}

/** ErrorMessage — Figma `error` (4:24). Inline form / validation message. */
export function ErrorMessage({ children, id, className }: ErrorMessageProps) {
  return (
    <p
      id={id}
      role="alert"
      className={cn('type-label inline-flex items-start gap-8 bg-error-subtle px-16 py-8 text-error', className)}
    >
      <span className="shrink-0">Error!</span>
      <span>{children}</span>
    </p>
  )
}
