import { cn } from '../../lib/cn'

export interface JournalPreviewProps {
  date: string
  title: string
  meta: string
  excerpt: string
  href?: string
  className?: string
}

/** JournalPreview — Figma `journal preview` (5:161). Divider, date, H3 title, accent meta, body excerpt. */
export function JournalPreview({ date, title, meta, excerpt, href, className }: JournalPreviewProps) {
  return (
    <article className={cn('flex flex-col gap-16', className)}>
      <div className="h-px w-full bg-(--border-strong)" />
      <p className="type-caps text-secondary">{date}</p>
      <div className="flex flex-col gap-4">
        <h3 className="type-h3 text-primary">
          {href ? (
            <a href={href} className="hover:text-link focus-visible:text-link">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="type-caps text-accent">{meta}</p>
      </div>
      <p className="type-body max-w-[620px] text-secondary">{excerpt}</p>
    </article>
  )
}
