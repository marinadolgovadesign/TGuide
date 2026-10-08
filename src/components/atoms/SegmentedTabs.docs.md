# SegmentedTabs

**Purpose.** Switch between views of the same content. Figma: `segmented` (3:84).

**When to use.** Two to four peer views (Overview / Day by day / Map; Light / Dark / System).

| Prop | Type | Default | Notes |
|---|---|---|---|
| `options` | `{ value, label }[]` | — | |
| `value` | `string` | — | Selected value |
| `onChange` | `(value) => void` | — | |
| `aria-label` | `string` | — | Required |
| `idPrefix` | `string` | — | Links tabs to `${idPrefix}-panel-${value}` |

**Variants.** Selected tab on `background/surface`; others on the `background/brand-soft` track.

**Tokens.** `background/brand-soft`, `background/surface`, `background/brand-subtle` (hover), `text/primary`.

**Do.** Keep the keyboard model: ←/→, Home, End.
**Don't.** Use it for navigation to other pages.
