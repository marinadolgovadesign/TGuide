# Button

**Purpose.** Triggers an action or navigation. Figma: `btn` (3:109), Type × State.

**When to use.** `smallCta` / `bigCta` for the main action on a surface; `secondary` for alternatives; `onColor` on photos and brand fills; `ghost` for "Read more" links; `dayNode` to pick a day.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `secondary · onColor · smallCta · bigCta · ghost · dayNode` | `secondary` | Figma "Type" |
| `arrow` | `boolean` | on for smallCta, ghost | Trailing arrow-right |
| `sublabel` | `string` | — | dayNode only: caps line under the numeral |
| `href` | `string` | — | Renders an `<a>` |
| `disabled` | `boolean` | `false` | Uses `action/disabled` + `text/muted` |
| `forceState` | `hover · pressed · focus · disabled` | — | Docs only: show a state statically |

**Variants.** Type: secondary, onColor, smallCta, bigCta, ghost, dayNode. State: default, hover, pressed, focus, disabled. States come from `:hover`, `:active`, `:focus-visible` and `:disabled`.

**Tokens.** `action/primary` (+hover, pressed), `action/secondary` (+hover, pressed), `action/disabled`, `action/link` (+hover), `action/focus` (2 px ring outside), `background/surface`, `background/accent-subtle`, `text/on-brand`, `text/primary`, `text/muted`.

**Do.** One `smallCta` or `bigCta` per view. Keep corners square.
**Don't.** Put `secondary` on photos (use `onColor`). Remove the focus ring.
