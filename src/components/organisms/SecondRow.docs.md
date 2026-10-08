# SecondRow

**Purpose.** Breadcrumbs or page actions under the menu. Figma: `second-row` (6:147).

**When to use.** On every page below the home level.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `breadcrumbs · actions` | `breadcrumbs` | Figma "Type" |
| `crumbs` | `{ label, to? }[]` | `[]` | Last crumb is the current page |
| `saved` · `onSave` | `boolean` · `(v) => void` | — | actions |
| `onDownload` · `onBook` | `() => void` | — | actions |

**Variants.** breadcrumbs, actions (bookmark, Download PDF, Book this trip).

**Tokens.** `border/brand`, `text/primary`, `text/muted`, `text/accent` (separator), `action/primary`.

**Do.** Keep Back as the first item.
**Don't.** Show both variants on one page.
