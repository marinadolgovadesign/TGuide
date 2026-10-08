# TopMenu

**Purpose.** Site header: italic serif links, centred logo, then about · design system · release notes and View trip. Figma: `topmenu` (6:118), inspired by In Flow.

**When to use.** At the top of every page, alone or inside Header.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `className` | `string` | — | |

**Behaviour.** Active link follows the route. On desktop, about shows from 768 px, design system from 1024 px and release notes from 1280 px. Under 768 px every link moves to a drawer (focus trapped, Esc closes). "View trip" scrolls to the itinerary overview.

**Variants.** Active = itineraries | destinations | journal.

**Tokens.** `background/surface`, `text/primary`, `action/primary`.

**Do.** Keep exactly three main links on the left; put site resources (about, design system, release notes) on the right.
**Don't.** Add icons to the links.
