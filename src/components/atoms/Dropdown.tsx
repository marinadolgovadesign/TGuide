import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from './Icon'

export interface DropdownOption {
  value: string
  label: string
}

export interface DropdownProps {
  label: string
  options: DropdownOption[]
  /** null = empty (shows placeholder). */
  value: string | null
  onChange: (value: string | null) => void
  placeholder?: string
  /** Figma "Style". */
  variant?: 'default' | 'onColor'
  /** Adds an option that clears the value. */
  clearable?: boolean
  className?: string
}

/**
 * Dropdown — Figma `dropdown` (4:62). Filter select for region / season / budget.
 * Style × Filled. Accessible listbox: ↑/↓ move, Enter/Space select, Esc closes, Home/End jump, type-ahead.
 */
export function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = 'Any',
  variant = 'default',
  clearable = true,
  className,
}: DropdownProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const items: DropdownOption[] = clearable ? [{ value: '', label: placeholder }, ...options] : options
  const selectedIndex = Math.max(0, items.findIndex((o) => o.value === (value ?? '')))
  const [active, setActive] = useState(selectedIndex)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const filled = value != null && value !== ''
  const current = options.find((o) => o.value === value)
  const onColor = variant === 'onColor'

  useEffect(() => {
    if (!open) return
    list.current?.focus()
    const close = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  useEffect(() => {
    if (open) list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  function openList() {
    setActive(selectedIndex)
    setOpen(true)
  }
  function choose(i: number) {
    const v = items[i].value
    onChange(v === '' ? null : v)
    setOpen(false)
    button.current?.focus()
  }
  function onButtonKey(e: KeyboardEvent) {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault()
      openList()
    }
  }
  function onListKey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') setActive((a) => Math.min(items.length - 1, a + 1))
    else if (e.key === 'ArrowUp') setActive((a) => Math.max(0, a - 1))
    else if (e.key === 'Home') setActive(0)
    else if (e.key === 'End') setActive(items.length - 1)
    else if (e.key === 'Enter' || e.key === ' ') choose(active)
    else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false)
      if (e.key === 'Escape') button.current?.focus()
      return
    } else if (e.key.length === 1) {
      const i = items.findIndex((o) => o.label.toLowerCase().startsWith(e.key.toLowerCase()))
      if (i >= 0) setActive(i)
      return
    } else return
    e.preventDefault()
  }

  return (
    <div ref={root} className={cn('relative inline-flex flex-col gap-4', onColor && 'bg-brand p-8', className)}>
      <span id={`${id}-label`} className={cn('type-caps', onColor ? 'text-on-brand' : 'text-secondary')}>
        {label}
      </span>
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onButtonKey}
        className={cn(
          'type-label flex cursor-pointer items-center justify-between gap-16 px-16 py-8 text-left whitespace-nowrap transition-colors',
          'outline-focus focus-visible:outline-2 focus-visible:outline-offset-2',
          onColor
            ? filled
              ? 'bg-surface'
              : 'bg-brand-soft'
            : cn('border border-default hover:border-strong', filled ? 'bg-surface' : 'bg-muted'),
          filled || onColor ? 'text-primary' : 'text-muted',
        )}
      >
        <span id={`${id}-value`}>{current?.label ?? placeholder}</span>
        <Icon name="arrow-down" className={cn('text-primary transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <ul
          ref={list}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKey}
          className="absolute top-full left-0 z-30 mt-4 max-h-[280px] min-w-full overflow-auto border border-default bg-surface py-4 outline-none"
        >
          {items.map((o, i) => {
            const selected = (value ?? '') === o.value
            return (
              <li
                key={o.value || '__empty'}
                id={`${id}-opt-${i}`}
                data-index={i}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
                className={cn(
                  'type-label flex cursor-pointer items-center justify-between gap-16 px-16 py-8 whitespace-nowrap',
                  i === active && 'bg-muted',
                  selected ? 'text-brand' : o.value === '' ? 'text-muted' : 'text-primary',
                )}
              >
                {o.label}
                {selected && <span aria-hidden className="size-[6px] rounded-full bg-current" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
