# Profile

**Purpose.** Author byline. Figma: `profile` (5:42).

**When to use.** Under itinerary summaries and journal posts.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `long · short · shortOutlined` | `shortOutlined` | Figma "Type" |
| `name` · `role` · `initials` | `string` | — | |
| `status` | Status kind | `bookable` | long only |

**Variants.** long (full-width row with status and divider), short (accent-subtle fill), shortOutlined (surface + border/subtle).

**Tokens.** `background/accent-subtle`, `background/surface`, `border/subtle`, `border/strong`, `text/primary`, `text/secondary`.

**Do.** Use shortOutlined on page backgrounds and short on white.
**Don't.** Show more than one byline per block.
