# EightDayBoard

**Purpose.** Itinerary board grouped by days, adapted from Pipeline. Figma: `8-day board` (6:273).

**When to use.** "Stops at a glance" on itinerary pages.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `columns` | `{ id, label, town, stops[] }[]` | — | |
| `onReorder` | `(ids) => void` | — | New column order |

**Behaviour.** Stops expand to show time and details. Reorder columns by dragging, or with Alt + ←/→ on a column heading (announced to screen readers).

**Tokens.** `background/surface`, `background/muted`, `background/brand-subtle` (hover), `text/accent`, `text/primary`, `text/secondary`, `text/muted`.

**Do.** Keep four columns at most; the board scrolls sideways on mobile.
**Don't.** Put actions inside stop rows.
