Build the **Eight Days** travel design system and sample site in React + Tailwind in this folder (`~/code/TGuide`), matching the Figma file exactly, with every element interactive.

## Sources of truth
- Figma file: https://www.figma.com/design/pzKtL5ltpGpcV3nrnJS8as/Eight-Days-—-Travel-Design-System (file key `pzKtL5ltpGpcV3nrnJS8as`, page `Design System` 0:1). Use the Figma MCP (`get_screenshot`, `get_design_context`, `get_metadata`) to check every component visually before and after you build it.
  - Sections: `styles` 2:8 (Colors, Typography, Spacing, Radius) · `ds-atoms` 3:2 · `ds-molecules` 5:16 · `ds-organisms` 6:43 · `photography` 23:185 · `pages` 24:185
  - Sample page frame: **24:187** "Itinerary — Scalea to Maratea" (1440px). Hero photo variant: **6:240**.
- `design/tokens.json`: exact token export (primitives, semantic Light/Dark, spacing, radius, text styles). Do not invent values; every color, space, radius and font must come from here.
- `design/icons.json`: the 11 SVG icons (24 viewBox, 16px, stroke 1.5, currentColor).
- `design/photos/*.jpg`: 15 trip photos (hero, town, arch, cove, rocks, sunset, lido, stairs, alley, coffee, caves, gulf, tower, harbour, golden). In Figma the sample page uses: hero = hero.jpg; day cards = town, caves, arch, gulf; tip = coffee; journal = golden, lido; gallery = alley, stairs, sunset, cove, tower.

## Stack
Vite + React 19 + TypeScript + Tailwind CSS v4 (`@tailwindcss/vite`) + React Router. No UI kit; build every component yourself. Google Fonts: Cormorant Garamond (300, 300 italic), Gothic A1 (400/600/700), Instrument Serif (400).

## 1. Tokens → CSS + Tailwind
- Generate `src/styles/tokens.css` from `design/tokens.json` with a small script (`scripts/build-tokens.ts`, run on `predev`/`prebuild`). Primitives become `--neutral-100` etc. Semantic tokens become `var()` references to primitives, under `:root` (Light) and `[data-theme="dark"]` plus `@media (prefers-color-scheme: dark)` (Dark).
- Map them in Tailwind v4 `@theme` so classes read like the tokens: `bg-page bg-surface bg-muted bg-brand bg-brand-soft bg-brand-subtle bg-accent bg-accent-subtle bg-inverse`, `text-primary text-secondary text-muted text-disabled text-inverse text-on-brand text-brand text-accent`, `border-subtle border-default border-strong border-brand border-on-brand`, `bg-action-primary hover:bg-action-primary-hover active:bg-action-primary-pressed`, feedback (`bg-success-subtle text-success` …), `outline-focus`.
- Spacing scale = exactly 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96 (`p-16` = 16px, so name utilities by px). Radius: none 0 (the default; the brand is square-cornered), sm 2, md 6, lg 12, full 999.
- Text styles as utilities: `type-h1 type-h2 type-description type-h3 type-h4 type-label type-body type-body-bold type-caps type-button-serif type-numeral type-numeral-s`.
- No hard-coded hex values in components; add a lint/grep check that fails on `#[0-9a-f]{3,6}` inside `src/components`.

## 2. Components (`src/components/<group>/<Name>.tsx`): match every Figma variant
Atoms: Icon, Button (type: secondary | onColor | smallCta | bigCta | ghost | dayNode; states from CSS :hover / :active / :focus-visible / disabled, focus = 2px `action/focus` ring outside), Tag (control = removable, static, accent, onPhoto), Status (bookable/popular/soldOut/offSeason), Switch (big/small), Bookmark (saved toggle), SegmentedTabs, ProgressBar (default/big), Avatar + AvatarGroup, Input, TextArea, Dropdown (default/onColor, filled/empty), ErrorMessage, SeasonChart (12 months), ListRow.
Molecules: Profile (long/short/shortOutlined), BudgetCard, CompareCard, DestinationCard, DayNode, TravelTip, ItineraryPreview, ItinerarySummary, JournalPreview, StatCard.
Organisms: NavItem, TopMenu, SecondRow (breadcrumbs/actions), Header (menu + breadcrumbs + 8-day tracker), Hero (brand/photo with 35% black overlay), EightDayBoard, ChecklistItem.

## 3. Everything interactive
- TopMenu: real routes with an active underline; collapses to a hamburger drawer under 768px; "View trip" scrolls to the overview.
- Header day tracker: click a day to smooth-scroll to that day; the active day follows scroll (IntersectionObserver).
- Hero buttons Overview / Day by day / Map drive the same state as SegmentedTabs; the Map tab shows an SVG route of the 8 stops.
- Bookmark and Save toggle, persisted in localStorage, with a toast.
- Tags: control tags remove themselves; static tags filter the journal list.
- Dropdowns: accessible listbox (keyboard ↑↓/Enter/Esc), filtering itineraries by region/season.
- Switch: toggles EUR/USD in BudgetCard, CompareCard and stats.
- CompareCard "Your trip €?" becomes a small calculator (lodging/transport/experiences inputs, live sum).
- ChecklistItem toggles done (persisted); ErrorMessage shows until the item is resolved.
- DayNode and EightDayBoard stops expand to show details; board columns can be reordered by drag.
- SeasonChart: hover/focus a month for a tooltip with the month name and a swim-weather label.
- Gallery: click opens a lightbox (←/→/Esc, swipe on mobile).
- Newsletter form: validation via Input + ErrorMessage, loading state, success state.
- Footer theme switch: Light / Dark / System (sets `data-theme`).
- Keyboard: everything reachable, visible focus, `prefers-reduced-motion` respected, WCAG AA contrast (tokens already pass).

## 4. Pages (React Router)
- `/`: the sample itinerary page, a pixel-faithful build of Figma node 24:187 (header with tracker, photo hero, overview with preview/summary/byline/destination/budget/stat, "Your 8 days" day cards + board, local-tip band, budget + checklist, journal, gallery, newsletter, footer). Responsive: 1440 → 1024 → 768 → 375.
- `/design-system`: a showcase in Figma's order: Colors (primitives + semantic Light/Dark), Typography, Spacing, Radius, then Atoms, Molecules, Organisms. Each component sits beside a **short doc** (purpose, props table, variants, usage do/don't) that is live and interactive.
- `/release-notes`: see §5.

## 5. Docs, release notes, rules
- **Component docs, in two places:** (a) in code, a JSDoc block + `Name.docs.md` beside each component, rendered on `/design-system`; (b) in Figma, update each component/set `description` and add a small doc note frame beside each set in its section (purpose · when to use · variants · tokens). Keep the two identical.
- **Release notes, in two places:** `src/content/release-notes.md` rendered at `/release-notes`, and a **"Release notes"** page in the Figma file, both professionally formatted (version, date, Added / Changed / Fixed / Removed, affected components/tokens). Seed with today's history:
  - 0.1: Initial system from In Flow inspiration (styles, atoms, molecules, organisms).
  - 0.2: Colors split into Primitives (neutral, brand, success, warning, error, hero) + Semantic Light/Dark.
  - 0.3: Audit: removed duplicate tokens, fixed teal ramp, hero primitives aliased to brand, added border group, all text tokens WCAG AA.
  - 0.4: Semantic action + feedback groups; spacing moved to 4-px grid (14→16, 30→32, 90→96, added 12/40/48/64); radius lg + full; button states.
  - 0.5: Scalea → Maratea content, Photography moodboard, sample itinerary page, styles reordered.
  - 1.0: React + Tailwind implementation (this build).
- Create `CLAUDE.md` with this **standing rule:** every change to tokens, components or pages adds a release-notes entry in both code and Figma, and updates the matching component docs in both places.
- Create a project skill `.claude/skills/figma-sync/SKILL.md` for changes made by hand in Figma. It should: (1) snapshot components, variables and descriptions from Figma into `design/figma-snapshot.json`; (2) diff that against the previous snapshot to list what changed; (3) update tokens.json, the affected React components and the docs in both places; (4) write the release-notes entry in both places. Commit the first snapshot now.

## 6. Verify before you say it's done
- `npm run build` and the type check pass; the hex-color check passes.
- Run the dev server and compare `/` side by side with `get_screenshot` of 24:187, and each `/design-system` section with its Figma section; fix differences.
- Click through every interaction listed in §3 at 1440 and 375 widths, in Light and Dark.
- Report what was checked and anything that doesn't match Figma yet.
