# DayNode

**Purpose.** A single day for the route or map builder. Figma: `day node` (5:101).

**When to use.** In the day-by-day timeline and the local-tip band.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `day` | `number` | — | Rendered "Day 03" |
| `place` | `string` | — | Caps |
| `details` | `{ time, name }[]` | `[]` | Revealed when expanded |
| `expanded` · `onToggle` | `boolean` · `() => void` | — | Disclosure |

**Variants.** collapsed / expanded. Hover adds a 1 px `border/strong` inset ring.

**Tokens.** `background/accent-subtle`, `border/strong`, `text/primary`, `text/secondary`, `text/muted`.

**Do.** Keep details to the day's three or four stops.
**Don't.** Nest a DayNode inside another card with an accent fill.
