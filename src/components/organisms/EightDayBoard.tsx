import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../atoms/Icon'

export interface BoardStop {
  name: string
  kind: string
  time: string
  detail: string
}

export interface BoardColumn {
  id: string
  label: string
  town: string
  stops: BoardStop[]
}

export interface EightDayBoardProps {
  columns: BoardColumn[]
  /** Called with the new column order after a drag or keyboard move. */
  onReorder?: (ids: string[]) => void
  className?: string
}

/**
 * EightDayBoard — Figma `8-day board` (6:273). Itinerary board grouped by days (adapted from Pipeline).
 * Stops expand to show time and details. Columns reorder by dragging the heading (mouse, pen or touch),
 * or Alt + ←/→ on a focused heading.
 */
export function EightDayBoard({ columns, onReorder, className }: EightDayBoardProps) {
  const [dragging, setDragging] = useState<string | null>(null)
  const [over, setOver] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>(null)
  const [announce, setAnnounce] = useState('')

  function move(from: number, to: number) {
    if (to < 0 || to >= columns.length || from === to) return
    const ids = columns.map((c) => c.id)
    const [m] = ids.splice(from, 1)
    ids.splice(to, 0, m)
    onReorder?.(ids)
    setAnnounce(`${columns[from].town} moved to position ${to + 1} of ${columns.length}`)
  }

  const start = useRef<{ x: number; y: number; moved: boolean } | null>(null)

  function columnAt(x: number, y: number) {
    const el = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-board-col]')
    return el?.dataset.boardCol ?? null
  }
  function onPointerDown(e: PointerEvent, id: string) {
    if (e.button !== 0) return
    start.current = { x: e.clientX, y: e.clientY, moved: false }
    setDragging(id)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  function onPointerMove(e: PointerEvent) {
    if (!dragging || !start.current) return
    if (!start.current.moved && Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y) < 6) return
    start.current.moved = true
    setOver(columnAt(e.clientX, e.clientY))
  }
  function onPointerUp(e: PointerEvent) {
    const target = start.current?.moved ? columnAt(e.clientX, e.clientY) : null
    if (dragging && target) {
      move(
        columns.findIndex((c) => c.id === dragging),
        columns.findIndex((c) => c.id === target),
      )
    }
    start.current = null
    setDragging(null)
    setOver(null)
  }

  function onHeadKey(e: KeyboardEvent, index: number) {
    if (!e.altKey) return
    if (e.key === 'ArrowLeft') move(index, index - 1)
    else if (e.key === 'ArrowRight') move(index, index + 1)
    else return
    e.preventDefault()
    requestAnimationFrame(() =>
      document.querySelector<HTMLElement>(`[data-board-head="${columns[index].id}"]`)?.focus(),
    )
  }

  return (
    <div className={cn('max-w-full overflow-x-auto bg-surface p-24', className)}>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
      <ol className="flex w-max items-start gap-16" aria-label="Stops by day. Drag a column heading, or press Alt plus arrow keys on it, to reorder.">
        {columns.map((col, i) => (
          <li
            key={col.id}
            data-board-col={col.id}
            className={cn(
              'flex w-[240px] flex-col gap-4 transition-opacity',
              dragging === col.id && start.current?.moved && 'opacity-40',
              over === col.id && dragging !== col.id && 'outline-2 outline-offset-4 outline-focus outline-dashed',
            )}
          >
            <div
              tabIndex={0}
              data-board-head={col.id}
              onKeyDown={(e) => onHeadKey(e, i)}
              onPointerDown={(e) => onPointerDown(e, col.id)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              aria-label={`${col.label}, ${col.town}, ${col.stops.length} stops. Alt plus arrow keys to move.`}
              className="flex cursor-grab touch-none flex-col gap-2 px-4 py-8 select-none active:cursor-grabbing outline-focus focus-visible:outline-2"
            >
              <p className="type-caps text-accent">{col.label}</p>
              <div className="flex items-end">
                <p className="type-h2 text-primary">{col.town}</p>
                <span className="flex-1" />
                <p className="type-numeral-s text-muted">{col.stops.length}</p>
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {col.stops.map((s) => {
                const key = `${col.id}:${s.name}`
                const expanded = open === key
                return (
                  <li key={s.name} className="bg-muted">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpen(expanded ? null : key)}
                      className="flex w-full cursor-pointer items-center gap-8 px-16 py-8 text-left transition-colors hover:bg-brand-subtle outline-focus focus-visible:outline-2 focus-visible:-outline-offset-2"
                    >
                      <Icon name="pin" className="text-accent" />
                      <span className="flex min-w-0 flex-col gap-2">
                        <span className="type-body text-primary">{s.name}</span>
                        <span className="type-caps text-secondary">{s.kind}</span>
                      </span>
                    </button>
                    {expanded && (
                      <div className="flex flex-col gap-4 px-16 pt-4 pb-12 pl-[40px]">
                        <span className="type-caps text-accent">{s.time}</span>
                        <p className="type-body text-secondary">{s.detail}</p>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
