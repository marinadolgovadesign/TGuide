import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { photo, type PhotoName } from '../../lib/photos'
import { Icon } from '../atoms/Icon'

export interface GalleryItem {
  photo: PhotoName
  alt: string
}

/** Full-bleed photo strip (Figma 24:632). Click opens a lightbox: ←/→, Esc, swipe. */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null)
  return (
    <section aria-label="Photos from the trip">
      <ul className="flex snap-x snap-mandatory gap-8 overflow-x-auto md:overflow-visible">
        {items.map((it, i) => (
          <li key={it.photo} className="w-[80vw] shrink-0 snap-start md:w-auto md:flex-1">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open photo: ${it.alt}`}
              className="group block h-[360px] w-full cursor-zoom-in overflow-hidden outline-focus focus-visible:outline-2 focus-visible:-outline-offset-4"
            >
              <img
                src={photo(it.photo)}
                alt=""
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>
      {index !== null && <Lightbox items={items} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />}
    </section>
  )
}

function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: GalleryItem[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const startX = useRef<number | null>(null)
  const n = items.length
  const prev = () => onIndex((index - 1 + n) % n)
  const next = () => onIndex((index + 1) % n)

  useEffect(() => {
    const d = dialog.current
    d?.showModal()
    const trigger = document.activeElement as HTMLElement | null
    return () => trigger?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  function onPointerDown(e: PointerEvent) {
    startX.current = e.clientX
  }
  function onPointerUp(e: PointerEvent) {
    if (startX.current == null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 48) (dx > 0 ? prev : next)()
  }

  const it = items[index]
  const control =
    'cursor-pointer p-12 text-on-brand transition-opacity hover:opacity-70 outline-focus focus-visible:outline-2'

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onCancel={onClose}
      aria-label="Photo viewer"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-[color-mix(in_srgb,var(--neutral-1000)_90%,transparent)]"
    >
      <div
        className="flex h-full touch-pan-y flex-col items-center justify-center gap-16 p-16 md:p-48"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <button type="button" onClick={onClose} aria-label="Close" className={`${control} absolute top-16 right-16`}>
          <Icon name="close" size={24} />
        </button>
        <img
          src={photo(it.photo)}
          alt={it.alt}
          draggable={false}
          className="max-h-[80vh] max-w-full object-contain select-none"
        />
        <div className="flex items-center gap-16 text-on-brand">
          <button type="button" onClick={prev} aria-label="Previous photo" className={control}>
            <Icon name="arrow-right" size={24} className="rotate-180" />
          </button>
          <p className="type-caps min-w-[220px] text-center" aria-live="polite">
            {index + 1} / {n} · {it.alt}
          </p>
          <button type="button" onClick={next} aria-label="Next photo" className={control}>
            <Icon name="arrow-right" size={24} />
          </button>
        </div>
      </div>
    </dialog>
  )
}
