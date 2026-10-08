# ProgressBar

**Purpose.** Trip or reading progress (day 6 of 8 = 75 %). Figma: `bar` (4:88), Size × Length.

**When to use.** To show how far along something is. Pair it with a numeric label.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `number` | — | 0–100 |
| `size` | `default · big` | `default` | 4 px or 10 px tall |
| `label` | `string` | — | Accessible name |

**Variants.** default / big × any length (Figma shows 75 % and 20 %).

**Tokens.** `background/brand-subtle` track, `background/brand` fill.

**Do.** Show the number next to the bar.
**Don't.** Use it for indeterminate loading.
