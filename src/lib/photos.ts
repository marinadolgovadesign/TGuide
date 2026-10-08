const files = import.meta.glob<string>('../../design/photos/*.jpg', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const photoNames = [
  'hero', 'town', 'arch', 'cove', 'rocks', 'sunset', 'lido', 'stairs',
  'alley', 'coffee', 'caves', 'gulf', 'tower', 'harbour', 'golden',
] as const
export type PhotoName = (typeof photoNames)[number]

/** URL of one of the 15 trip photos in design/photos. */
export function photo(name: PhotoName): string {
  const url = files[`../../design/photos/${name}.jpg`]
  if (!url) throw new Error(`Missing photo ${name}`)
  return url
}
