# Switch

**Purpose.** An on/off toggle, e.g. "Prices in USD". Figma: `switch` (3:65), State × Size.

**When to use.** For a setting that applies immediately. Use a checkbox inside forms that are submitted.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `checked` | `boolean` | — | Required |
| `onChange` | `(checked) => void` | — | Required |
| `size` | `big · small` | `big` | 52 × 30 or 40 × 22 |
| `label` | `string` | — | Visible caps label; otherwise pass `aria-label` |

**Variants.** on / off × big / small.

**Tokens.** `action/primary` (on), `border/subtle` (off track), `neutral/0` knob.

**Do.** Say what "on" means in the label.
**Don't.** Use a switch for choices that need a Save button.
