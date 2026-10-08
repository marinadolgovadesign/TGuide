import { Link, useNavigate } from 'react-router'
import { cn } from '../../lib/cn'
import { Bookmark } from '../atoms/Bookmark'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'

export interface Crumb {
  label: string
  to?: string
}

export interface SecondRowProps {
  /** Figma "Type". */
  variant?: 'breadcrumbs' | 'actions'
  crumbs?: Crumb[]
  saved?: boolean
  onSave?: (saved: boolean) => void
  onDownload?: () => void
  onBook?: () => void
  className?: string
}

/** SecondRow — Figma `second-row` (6:147). Back button + breadcrumbs, or back + page actions. */
export function SecondRow({ variant = 'breadcrumbs', crumbs = [], saved = false, onSave, onDownload, onBook, className }: SecondRowProps) {
  const navigate = useNavigate()
  return (
    <div className={cn('flex items-center px-16 py-16 md:px-32', variant === 'actions' ? 'gap-16' : 'gap-32', className)}>
      <button
        type="button"
        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
        className="type-label inline-flex cursor-pointer items-center gap-4 border border-brand px-16 py-4 text-primary transition-colors hover:bg-brand-subtle outline-focus focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Icon name="arrow-right" className="rotate-180" />
        Back
      </button>
      {variant === 'breadcrumbs' ? (
        <nav aria-label="Breadcrumb" className="min-w-0 overflow-hidden">
          <ol className="type-caps flex items-center gap-8 whitespace-nowrap">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1
              return (
                <li key={c.label} className="flex items-center gap-8">
                  {i > 0 && (
                    <span aria-hidden className="text-accent">
                      ·
                    </span>
                  )}
                  {last || !c.to ? (
                    <span aria-current={last ? 'page' : undefined} className={last ? 'text-primary' : 'text-muted'}>
                      {c.label}
                    </span>
                  ) : (
                    <Link to={c.to} className="text-muted hover:text-link">
                      {c.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      ) : (
        <>
          <span className="flex-1" />
          <Bookmark saved={saved} onToggle={onSave} />
          <Button variant="ghost" onClick={onDownload} className="max-sm:hidden">
            Download PDF
          </Button>
          <Button variant="smallCta" onClick={onBook}>
            Book this trip
          </Button>
        </>
      )}
    </div>
  )
}
