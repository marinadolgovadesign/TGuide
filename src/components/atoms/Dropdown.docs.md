# Dropdown

**Purpose.** Filter select for region, season or budget. Figma: `dropdown` (4:62), Style × Filled.

**When to use.** Choosing one value from five or more options. For two to four, use SegmentedTabs.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Caps label |
| `options` | `{ value, label }[]` | — | |
| `value` | `string \| null` | — | null = empty |
| `onChange` | `(value \| null) => void` | — | |
| `placeholder` | `string` | `Any` | Shown when empty |
| `variant` | `default · onColor` | `default` | Figma "Style" |
| `clearable` | `boolean` | `true` | Adds the placeholder as an option |

**Variants.** default / onColor × filled / empty. The onColor + empty placeholder uses `text/primary` for AA on `background/brand-soft`.

**Keyboard.** ↑/↓ move, Enter or Space select, Esc close, Home/End, type-ahead.

**Tokens.** `background/surface`, `background/muted`, `border/default`, `background/brand`, `background/brand-soft`, `text/primary`, `text/muted`, `text/brand`.

**Do.** Show the result count next to filters.
**Don't.** Nest dropdowns or open them on hover.
