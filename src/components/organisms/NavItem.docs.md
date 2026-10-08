# NavItem

**Purpose.** Top-menu link. Figma: `nav item` (6:51).

**When to use.** Only inside TopMenu and the mobile drawer.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `to` | `string` | — | Route |
| `label` | `string` | — | Lowercase, italic serif |
| `active` | `boolean` | from route | Force for docs |

**Variants.** State = active (1 px `text/brand` underline) | default (subtle underline on hover).

**Tokens.** `text/primary`, `text/brand`, `border/subtle`.

**Do.** Keep labels lowercase and short: one or two words ("design system").
**Don't.** Use NavItem for in-page actions.
