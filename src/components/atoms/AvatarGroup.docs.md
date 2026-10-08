# AvatarGroup

**Purpose.** Stacked avatars plus a count. Figma: `avatars` (4:14).

**When to use.** To show who has travelled or saved a route.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `people` | `{ initials, name, person }[]` | — | Shown overlapped by 8 px |
| `more` | `number` | `0` | "+12 travellers" |
| `noun` | `string` | `travellers` | |

**Variants.** None.

**Tokens.** As Avatar, plus `text/secondary` for the count.

**Do.** Keep it to three faces.
**Don't.** Make it the only way to see who is involved.
