# Icon

**Purpose.** The 11 Eight Days line icons. Figma: `ds-atoms › icons` (3:4).

**When to use.** Next to a label to support it (arrow on a CTA, pin on a stop). On its own only with a `label`.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `name` | `play · pin · calendar · plane · globe · user · more · arrow-down · arrow-right · close · bookmark` | — | Required |
| `size` | `number` | `16` | px |
| `filled` | `boolean` | `false` | Fills with currentColor (saved bookmark) |
| `label` | `string` | — | Accessible name; omit for decorative icons |

**Variants.** One per icon. 24 viewBox, stroke 1.5, round caps and joins.

**Tokens.** Inherits `currentColor`; set the colour with a `text-*` utility.

**Do.** Keep icons at 16 px in components and 24 px for touch targets (menu, lightbox).
**Don't.** Draw new icons inline. Add them to `design/icons.json` and Figma first.
