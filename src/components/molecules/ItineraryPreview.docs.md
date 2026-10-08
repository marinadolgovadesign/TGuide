# ItineraryPreview

**Purpose.** Itinerary preview with key stats. Figma: `itinerary preview` (5:120).

**When to use.** At the top of an itinerary's overview, and in featured lists.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | — | H2 |
| `status` | Status kind | `bookable` | |
| `stats` | `{ value, label }[]` | — | Numeral + caps |
| `ctaLabel` · `onCta` | `string` · `() => void` | `View trip` | small CTA |

**Variants.** None. Stats wrap on small screens.

**Tokens.** `background/surface`, `text/primary`, `text/secondary`, `action/primary`.

**Do.** Show five stats or fewer; put price last.
**Don't.** Add decimals to stats.
