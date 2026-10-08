import { cn } from '../../lib/cn'
import { Bookmark } from '../atoms/Bookmark'
import { Button } from '../atoms/Button'
import { Tag } from '../atoms/Tag'

export interface HeroView<T extends string> {
  value: T
  label: string
}

export interface HeroProps<T extends string> {
  /** Figma "Style". photo = destination photo with a 35% black overlay. */
  variant?: 'brand' | 'photo'
  photo?: string
  photoAlt?: string
  title: string
  subtitle: string
  eyebrow: string
  season: string
  tags: string[]
  views: HeroView<T>[]
  onView?: (value: T) => void
  saved?: boolean
  onSave?: (saved: boolean) => void
  ctaLabel?: string
  onCta?: () => void
  /** Heading element for the title. Default h1. */
  titleAs?: 'h1' | 'h2' | 'p'
  className?: string
}

/**
 * Hero — Figma `card top` (6:272). Itinerary hero. Style = brand | photo (6:240).
 * Overview / Day by day / Map buttons drive the page's view state; bookmark saves the trip.
 */
export function Hero<T extends string>({
  variant = 'photo',
  photo,
  photoAlt = '',
  title,
  subtitle,
  eyebrow,
  season,
  tags,
  views,
  onView,
  saved = false,
  onSave,
  ctaLabel = 'View trip',
  onCta,
  titleAs: Title = 'h1',
  className,
}: HeroProps<T>) {
  const isPhoto = variant === 'photo' && photo
  return (
    <section
      className={cn(
        'relative isolate flex h-[480px] flex-col items-center overflow-hidden p-16 text-center md:p-32',
        !isPhoto && 'bg-brand',
        className,
      )}
    >
      {isPhoto && (
        <>
          <img src={photo} alt={photoAlt} className="absolute inset-0 -z-10 size-full object-cover" fetchPriority="high" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-hero-overlay" />
        </>
      )}
      <div className="type-caps flex w-full text-on-brand">
        <p>{eyebrow}</p>
        <span className="flex-1" />
        <p>{season}</p>
      </div>
      <span className="flex-1" />
      <Title className="type-h2 text-on-brand md:type-h1">{title}</Title>
      <p className="type-button-serif text-on-brand md:type-description">{subtitle}</p>
      <span className="h-24 w-px shrink-0" />
      <div className="flex flex-wrap items-center justify-center gap-8">
        {views.map((v) => (
          <Button key={v.value} variant="onColor" onClick={() => onView?.(v.value)}>
            {v.label}
          </Button>
        ))}
        <Bookmark saved={saved} onToggle={onSave} label={saved ? 'Remove from saved' : 'Save itinerary'} />
      </div>
      <span className="flex-1" />
      <div className="flex w-full flex-wrap items-end gap-x-4 gap-y-16">
        <ul className="flex flex-wrap gap-4" aria-label="Trip tags">
          {tags.map((t) => (
            <li key={t}>
              <Tag variant="onPhoto" label={t} />
            </li>
          ))}
        </ul>
        <span className="flex-1" />
        <Button variant="smallCta" onClick={onCta}>
          {ctaLabel}
        </Button>
      </div>
    </section>
  )
}
