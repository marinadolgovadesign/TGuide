# ItinerarySummary

**Purpose.** Itinerary summary text and tags. Figma: `itinerary summary` (5:148).

**When to use.** Under ItineraryPreview.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `summary` | `string` | — | Body, max 520 px |
| `tags` | `string[]` | — | Static tags |
| `onTagClick` · `activeTag` | `(tag) => void` · `string \| null` | — | Turns tags into filters |

**Variants.** read-only / filter tags.

**Tokens.** `border/strong`, `text/primary`, `background/brand-subtle`, `text/brand`, `background/brand` (pressed tag).

**Do.** Keep the summary to two lines at 1440.
**Don't.** Mix control and static tags in one row.
