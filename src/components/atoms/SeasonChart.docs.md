# SeasonChart

**Purpose.** Seasonality mini chart: 12 months. Figma: `graph` (4:63).

**When to use.** On destination and itinerary pages to show the best months.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | `Best time to visit` | |
| `summary` | `string` | `Jun – Sep · best swim` | |
| `months` | `{ month, height, best, swim }[]` | Scalea data | 12 entries |

**Interaction.** Hover or focus a bar for the month name and a swim-weather label.

**Tokens.** `background/surface`, `background/brand` (recommended), `background/brand-soft`, `background/inverse` tooltip, `text/brand`.

**Do.** Highlight recommended months, not only the hottest.
**Don't.** Add axes or gridlines: it is a glance chart.
