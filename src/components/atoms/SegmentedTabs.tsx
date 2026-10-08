import { useRef, type KeyboardEvent } from 'react'
import { cn } from '../../lib/cn'

export interface SegmentedOption<T extends string> {
  value: T
  label: string
}

export interface SegmentedTabsProps<T extends string> {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  'aria-label': string
  /** id prefix; tabs get `${idPrefix}-tab-${value}` and control `${idPrefix}-panel-${value}`. */
  idPrefix?: string
  className?: string
}

/**
 * SegmentedTabs — Figma `segmented` (3:84). Itinerary view switcher.
 * ARIA tablist with roving tabindex; ←/→/Home/End move selection.
 */
export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  idPrefix,
  className,
  ...aria
}: SegmentedTabsProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  function onKeyDown(e: KeyboardEvent, index: number) {
    let next = index
    if (e.key === 'ArrowRight') next = (index + 1) % options.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + options.length) % options.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = options.length - 1
    else return
    e.preventDefault()
    onChange(options[next].value)
    refs.current[next]?.focus()
  }

  return (
    <div role="tablist" aria-label={aria['aria-label']} className={cn('inline-flex gap-4 bg-brand-soft p-4', className)}>
      {options.map((o, i) => {
        const selected = o.value === value
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={idPrefix ? `${idPrefix}-tab-${o.value}` : undefined}
            aria-controls={idPrefix ? `${idPrefix}-panel-${o.value}` : undefined}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              'type-label cursor-pointer px-16 py-8 whitespace-nowrap text-primary transition-colors duration-150',
              selected ? 'bg-surface' : 'hover:bg-brand-subtle',
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
