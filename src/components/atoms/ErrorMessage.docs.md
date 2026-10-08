# ErrorMessage

**Purpose.** Inline form or validation message. Figma: `error` (4:24).

**When to use.** Under a field or inside a row that needs attention.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `children` | `string` | — | What to do, not just what failed |
| `id` | `string` | — | Reference with `aria-describedby` |

**Variants.** None. Prefixed with "Error!".

**Tokens.** `feedback/error/subtle`, `feedback/error/text`.

**Do.** Say how to fix it ("Choose your travel dates…").
**Don't.** Show it before the user has acted.
