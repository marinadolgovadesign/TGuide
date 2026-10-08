# ListRow

**Purpose.** An itinerary row in a list. Figma: `list` (4:89).

**When to use.** In search and filter results.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | — | H3 |
| `country` · `meta` · `updated` | `string` | — | Caps columns |
| `onView` / `href` | `() => void` / `string` | — | The View button |

**Variants.** None. Columns stack under 768 px.

**Tokens.** `text/primary`, `text/secondary`, `action/secondary` (+hover, pressed), `border/strong` divider.

**Do.** Keep the column order the same across rows.
**Don't.** Put more than one action in a row.
