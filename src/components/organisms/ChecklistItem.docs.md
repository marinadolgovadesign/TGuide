# ChecklistItem

**Purpose.** Booking or packing checklist item. Figma: `task` (6:419).

**When to use.** In "Before you go" lists.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | — | H4 |
| `done` · `onToggle` | `boolean` · `(v) => void` | — | Bookmark toggle |
| `error` | `string` | — | Shown until done |
| `tags` · `onRemoveTag` | `string[]` · `(t) => void` | — | Control tags |

**Variants.** State = todo (`text/primary` title) | done (saved bookmark, `text/muted` title).

**Tokens.** `border/subtle`, `text/primary`, `text/muted`, `feedback/error/*`.

**Do.** Persist the done state.
**Don't.** Show the error once the item is done.
