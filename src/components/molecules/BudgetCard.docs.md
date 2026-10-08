# BudgetCard

**Purpose.** Budget level at a glance. Figma: `card budget` (5:43).

**When to use.** In the overview, next to StatCard.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `level` | `string` | — | e.g. `mid-range` |
| `parts` | `{ label, eur }[]` | — | Three parts → three blocks |

**Interaction.** Hover or focus a block to read that part in the chosen currency (follows the EUR/USD switch).

**Tokens.** `background/brand-subtle`, `background/brand-soft`, `background/surface`, `text/primary`, `text/brand`.

**Do.** Keep the three parts in the same order everywhere.
**Don't.** Use it for exact totals; use CompareCard.
