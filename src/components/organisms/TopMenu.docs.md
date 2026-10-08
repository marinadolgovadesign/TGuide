# TopMenu

**Purpose.** Site header: italic serif links, centred logo, about and View trip. Figma: `topmenu` (6:118), inspired by In Flow.

**When to use.** At the top of every page, alone or inside Header.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `className` | `string` | — | |

**Behaviour.** Active link follows the route. Under 768 px the links move to a drawer (focus trapped, Esc closes). "View trip" scrolls to the itinerary overview.

**Variants.** Active = itineraries | destinations | journal.

**Tokens.** `background/surface`, `text/primary`, `action/primary`.

**Do.** Keep exactly three main links.
**Don't.** Add icons to the links.
