# Input

**Purpose.** Single-line text field with a caps label. Figma: `input` (4:28).

**When to use.** Short free text: email, name, amounts.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Always visible |
| `error` | `string` | — | Shows ErrorMessage, sets `aria-invalid` |
| `onColor` | `boolean` | `false` | Label in `text/on-brand` |
| `…input` | native attributes | — | `type`, `value`, `placeholder`… |

**Variants.** default, error, disabled. Focus draws the 2 px `action/focus` outline.

**Tokens.** `background/surface`, `border/default`, `feedback/error/solid`, `text/primary`, `text/secondary`, `text/muted`.

**Do.** Validate on submit and move focus to the first error.
**Don't.** Use the placeholder as the label.
