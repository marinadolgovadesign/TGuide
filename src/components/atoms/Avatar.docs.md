# Avatar

**Purpose.** Initials for an author, guest or local contributor. Figma: `avatar` (4:13).

**When to use.** In bylines and traveller groups.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `person` | `author · guest · local` | `author` | Figma "Person" |
| `initials` | `string` | — | Two letters |
| `name` | `string` | — | Full name for screen readers |

**Variants.** author (brand, white initials), guest (accent, dark initials), local (brand-soft, dark initials). 32 px, with a 1.5 px `border/on-brand` ring. Guest and local use dark initials for AA.

**Tokens.** `background/brand` + `text/on-brand`, `background/accent` + `neutral/900`, `background/brand-soft` + `text/primary`, `border/on-brand`.

**Do.** Pass `name` when the avatar stands alone.
**Don't.** Show more than three; use AvatarGroup's count.
