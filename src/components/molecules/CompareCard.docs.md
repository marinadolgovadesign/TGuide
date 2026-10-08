# CompareCard

**Purpose.** Budget vs comfort cost comparison, plus a "Your trip" calculator. Figma: `compare` (5:51).

**When to use.** In the budget section of an itinerary.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `budget` · `comfort` | `{ label, eur, lines[] }` | — | Amounts in EUR |
| `parts` | `string[]` | Lodging, Transport, Experiences | Calculator rows |

**Interaction.** Press "€?" to open the calculator; the sum updates live. Amounts follow the EUR/USD switch, and entered values convert too.

**Tokens.** `background/muted`, `background/surface`, `border/default`, `text/primary`, `text/secondary`, `text/muted`, `text/accent`.

**Do.** Keep the comfort column right-aligned on desktop.
**Don't.** Add a third column: split it into another card.
