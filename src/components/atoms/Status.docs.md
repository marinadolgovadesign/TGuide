# Status

**Purpose.** Trip availability: a dot plus a tracked label. Figma: `status` (3:56).

**When to use.** Next to a price or a CTA to say whether the trip can be booked.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `status` | `bookable · popular · soldOut · offSeason` | `bookable` | Figma "Status" |
| `label` | `string` | from status | Override text |

**Variants.** bookable (`text/brand`), popular (`text/accent`), sold out (`feedback/error/text`), off-season (`text/muted`, dot `text/disabled`).

**Tokens.** `text/brand`, `text/accent`, `feedback/error/text`, `text/muted`, `text/disabled`.

**Do.** Pair with the matching action (no CTA when sold out).
**Don't.** Rely on the dot colour alone: the label carries the meaning.
