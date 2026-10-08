# Bookmark

**Purpose.** Save an itinerary to favourites. Also marks checklist items done. Figma: `bookmark` (3:72).

**When to use.** As a compact toggle on cards, heroes and checklist rows.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `saved` | `boolean` | — | Figma "Saved" |
| `onToggle` | `(saved) => void` | — | |
| `label` | `string` | `Save itinerary` | Accessible name |

**Variants.** Saved = no (surface, outline icon), yes (brand, filled icon).

**Tokens.** `background/surface`, `background/brand`, `text/primary`, `text/on-brand`.

**Do.** Confirm the change with a toast and persist it.
**Don't.** Use it without an accessible label.
