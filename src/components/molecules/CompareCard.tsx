import { useId, useState } from 'react'
import { cn } from '../../lib/cn'
import { EUR_TO_USD, useCurrency, useMoney } from '../../lib/currency'
import { Status } from '../atoms/Status'

export interface CompareOption {
  label: string
  eur: number
  lines: string[]
}

export interface CompareCardProps {
  budget: CompareOption
  comfort: CompareOption
  /** Labels for the calculator rows. */
  parts?: string[]
  className?: string
}

type Column = 'budget' | 'comfort'

/**
 * CompareCard — Figma `compare` (5:51). Budget vs comfort cost comparison.
 * The "Your trip €?" row opens a small calculator: lodging + transport + experiences, live sum.
 */
export function CompareCard({ budget, comfort, parts = ['Lodging', 'Transport', 'Experiences'], className }: CompareCardProps) {
  const money = useMoney()
  const { currency } = useCurrency()
  const id = useId()
  const [open, setOpen] = useState(false)
  // stored in EUR so the currency switch converts entered values
  const [values, setValues] = useState<Record<Column, number[]>>({
    budget: parts.map(() => 0),
    comfort: parts.map(() => 0),
  })
  const rate = currency === 'USD' ? EUR_TO_USD : 1
  const sum = (c: Column) => values[c].reduce((s, v) => s + v, 0)

  function setValue(c: Column, i: number, display: string) {
    const n = Math.max(0, Number(display.replace(/[^\d.]/g, '')) || 0)
    setValues((v) => ({ ...v, [c]: v[c].map((x, j) => (j === i ? n / rate : x)) }))
  }

  const column = (c: Column, align: 'start' | 'end') => (
    <div className={cn('flex flex-col gap-8', align === 'end' ? 'sm:items-end sm:text-right' : 'items-start')}>
      <p className="type-caps text-secondary">Your trip · {c}</p>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-calc`}
        onClick={() => setOpen((o) => !o)}
        className="type-numeral cursor-pointer text-left text-primary transition-colors hover:text-link outline-focus focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-label={open ? `Your ${c} total ${money(sum(c))}. Close calculator` : `Calculate your ${c} trip`}
      >
        {open || sum(c) > 0 ? money(sum(c)) : `${currency === 'USD' ? '$' : '€'}?`}
      </button>
      {open ? (
        <div className={cn('flex flex-col gap-4', align === 'end' && 'sm:items-end')}>
          {parts.map((p, i) => (
            <label key={p} className="flex items-center gap-8">
              <span className={cn('type-caps w-[88px] text-muted', align === 'end' && 'sm:order-2 sm:text-right')}>{p}</span>
              <input
                inputMode="decimal"
                value={values[c][i] ? Math.round(values[c][i] * rate) : ''}
                placeholder="0"
                onChange={(e) => setValue(c, i, e.target.value)}
                className="type-body w-[96px] border border-default bg-surface px-8 py-2 text-primary placeholder:text-muted outline-focus focus-visible:outline-2"
              />
            </label>
          ))}
        </div>
      ) : (
        <ul className="type-caps text-muted">
          {parts.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <div className={cn('flex w-full flex-col gap-16 bg-muted p-16', className)}>
      <div className="flex flex-col gap-24 bg-surface p-20 sm:flex-row sm:items-start sm:gap-0">
        <Option option={budget} money={money} />
        <span className="hidden flex-1 sm:block" />
        <Status status="popular" />
        <Option option={comfort} money={money} align="end" />
      </div>
      <div id={`${id}-calc`} className="flex flex-col gap-24 bg-surface p-20 sm:flex-row sm:items-start">
        {column('budget', 'start')}
        <span className="hidden flex-1 sm:block" />
        {column('comfort', 'end')}
      </div>
    </div>
  )
}

function Option({ option, money, align = 'start' }: { option: CompareOption; money: (n: number) => string; align?: 'start' | 'end' }) {
  return (
    <div className={cn('flex flex-col gap-8', align === 'end' && 'sm:items-end sm:text-right')}>
      <p className="type-caps text-secondary">{option.label}</p>
      <p className="type-numeral whitespace-nowrap text-primary">{money(option.eur)}</p>
      <ul className="type-caps text-muted">
        {option.lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  )
}
