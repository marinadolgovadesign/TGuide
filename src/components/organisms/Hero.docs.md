# Hero

**Purpose.** Itinerary hero. Figma: `card top` (6:272), photo variant 6:240.

**When to use.** At the top of an itinerary page.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `brand · photo` | `photo` | Figma "Style" |
| `photo` · `photoAlt` | `string` | — | photo: 35 % black overlay |
| `title` · `subtitle` · `eyebrow` · `season` | `string` | — | H1, Description, caps |
| `tags` | `string[]` | — | onPhoto tags |
| `views` · `onView` | `{ value, label }[]` · `(v) => void` | — | Overview / Day by day / Map |
| `saved` · `onSave` | `boolean` · `(v) => void` | — | Bookmark |
| `onCta` | `() => void` | — | View trip |

**Variants.** brand (`background/brand` fill), photo (warm, airy, natural light; overlay keeps text AA).

**Tokens.** `background/brand`, `neutral/1000` at 35 % overlay, `text/on-brand`, `background/surface`, `action/primary`.

**Do.** Use photos with a calm upper third for the title.
**Don't.** Remove the overlay on bright photos.
