# Tag

**Purpose.** Destination or theme label. Figma: `tag` (3:83). Square corners.

**When to use.** `static` for trip themes (and as a filter toggle with `onClick`); `control` for removable choices; `accent` for highlights; `onPhoto` over imagery.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `control · static · accent · onPhoto` | `static` | Figma "Type" |
| `label` | `string` | — | Uppercase via Text - Label |
| `onRemove` | `() => void` | — | control: the × button |
| `onClick` | `() => void` | — | static: makes it a toggle button |
| `pressed` | `boolean` | — | static toggle state |

**Variants.** control (surface + border/subtle + ×), static (brand-subtle / text-brand), accent (accent-subtle), onPhoto (white 85 %).

**Tokens.** `background/surface`, `border/subtle`, `background/brand-subtle`, `text/brand`, `background/accent-subtle`, `text/primary`.

**Do.** Keep labels to one or two words.
**Don't.** Use tags as primary actions.
