# DestinationCard

**Purpose.** Destination overview: season fit, a local tip and travellers. Figma: `destination card` (5:76).

**When to use.** Beside an itinerary preview, or in destination lists.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `country` · `count` | `string` | — | |
| `seasonLabel` · `seasonFit` | `string` · `number` | — | 0–100 |
| `tip` | `string` | — | Text - Label |
| `travellers` | AvatarGroup props | — | |

**Variants.** None. Max 380 px wide.

**Tokens.** `background/surface`, `text/primary`, `text/secondary`, `text/muted`, `text/brand`.

**Do.** Keep the tip to one sentence.
**Don't.** Stack two DestinationCards side by side below 768 px.
