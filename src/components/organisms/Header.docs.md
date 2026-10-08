# Header

**Purpose.** Itinerary page header: menu, breadcrumbs and the 8-day tracker. Figma: `header` (6:148).

**When to use.** On itinerary pages.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `crumbs` | `Crumb[]` | — | |
| `days` | `{ day, town }[]` | — | Eight entries |
| `activeDay` | `number` | — | Days up to this are filled |
| `onSelectDay` | `(day) => void` | — | Click a day to jump |

**Behaviour.** Sticky: menu and breadcrumbs scroll away and the tracker stays pinned. The active day follows scroll (IntersectionObserver on `[data-day]`).

**Tokens.** `background/muted`, `background/brand`, `background/brand-subtle`, `text/brand`, `text/muted`.

**Do.** Keep day labels as "Day N · Town".
**Don't.** Use it on non-itinerary pages (use TopMenu + SecondRow).
