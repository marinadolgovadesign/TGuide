import { cn } from '../../lib/cn'
import { Bookmark } from '../atoms/Bookmark'
import { ErrorMessage } from '../atoms/ErrorMessage'
import { Tag } from '../atoms/Tag'

export interface ChecklistItemProps {
  title: string
  done: boolean
  onToggle: (done: boolean) => void
  /** Shown until the item is done. */
  error?: string
  tags?: string[]
  onRemoveTag?: (tag: string) => void
  className?: string
}

/** ChecklistItem — Figma `task` (6:419). Booking / packing checklist item. State = todo | done. */
export function ChecklistItem({ title, done, onToggle, error, tags = [], onRemoveTag, className }: ChecklistItemProps) {
  return (
    <div className={cn('flex w-full items-start gap-16 border-b border-subtle px-4 py-16', className)}>
      <Bookmark saved={done} onToggle={onToggle} label={done ? `Mark “${title}” as not done` : `Mark “${title}” as done`} />
      <div className="flex min-w-0 flex-col items-start gap-8">
        <p className={cn('type-h4 transition-colors', done ? 'text-muted' : 'text-primary')}>{title}</p>
        {!done && error && <ErrorMessage>{error}</ErrorMessage>}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {tags.map((t) => (
              <Tag key={t} variant="control" label={t} onRemove={() => onRemoveTag?.(t)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
