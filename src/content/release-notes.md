# Release notes

All notable changes to the Eight Days design system: tokens, components and pages. Each entry is mirrored on the **Release notes** page of the Figma file.

Versions follow [semver](https://semver.org): breaking token or component API changes bump the major version.

---

## 1.0.0 — 6 October 2026

**React + Tailwind implementation.** The Figma system is now a working codebase: every token, component and the sample page are built in Vite, React 19, TypeScript and Tailwind CSS v4.

### Added
- **Token pipeline.** `scripts/build-tokens.ts` generates `src/styles/tokens.css` (primitives; semantic Light under `:root`; Dark under `[data-theme="dark"]` and `prefers-color-scheme`) and the Tailwind `@theme` mapping from `design/tokens.json`. Utilities read like the tokens: `bg-page`, `text-primary`, `border-subtle`, `bg-action-primary`, `outline-focus`.
- **Text-style utilities.** `type-h1` … `type-numeral-s`, one per Figma text style.
- **Spacing and radius scales.** Spacing is limited to 2–96 px and named by px (`p-16` = 16 px). Radius defaults to 0 (square brand), with `sm` 2, `md` 6, `lg` 12 and `full` 999.
- **Atoms:** Icon, Button, Tag, Status, Switch, Bookmark, SegmentedTabs, ProgressBar, Avatar, AvatarGroup, Input, TextArea, Dropdown, ErrorMessage, SeasonChart, ListRow.
- **Molecules:** Profile, BudgetCard, CompareCard, DestinationCard, DayNode, TravelTip, ItineraryPreview, ItinerarySummary, JournalPreview, StatCard.
- **Organisms:** NavItem, TopMenu, SecondRow, Header, Hero, EightDayBoard, ChecklistItem.
- **Pages:** `/` (sample itinerary, Figma 24:187), `/design-system` (live showcase and docs), `/release-notes`, plus `/destinations`, `/journal` and `/about`.
- **Interactions:** sticky day tracker that follows scroll; hero and segmented view switching; SVG route map; saved trip and checklist persisted in localStorage, with a toast; tag filters; accessible dropdown listbox; EUR/USD switch; compare calculator; drag-to-reorder board; season tooltips; gallery lightbox; newsletter validation; Light / Dark / System theme.
- **Docs:** a JSDoc block and `Name.docs.md` beside every component, mirrored in the Figma component descriptions and doc notes.
- **Guardrails:** `npm run lint:colors` fails on hard-coded hex colours in components and pages. The `figma-sync` project skill and `design/figma-snapshot.json` support hand edits made in Figma.

### Changed
These are accessibility fixes made in implementation, where a Figma colour pairing missed WCAG AA. Each is mirrored in Figma.
- **Footer copyright** uses `text/disabled` instead of `text/muted` on `background/inverse`. Muted reached only 3.7:1; disabled gives 12.8:1 in Light and 9.2:1 in Dark.
- **Avatar initials** for guest and local use dark text (`neutral/900` and `text/primary`). White on `background/accent` was 2.4:1, and white on `background/brand-soft` was 1.9:1; dark text gives 7.2:1 and 9.0:1.
- **Dropdown, onColor + empty:** the placeholder uses `text/primary`. `text/muted` on `background/brand-soft` was 3.0:1 in Light and 1.8:1 in Dark.
- **Day-node hover** shows a 1px `border/strong` inset ring instead of `background/accent`. Light text on the accent fill was 2.1:1 in Dark.
- **Dark mode, muted text on muted surfaces** (breadcrumbs, upcoming tracker days, empty dropdowns): inside `background/muted`, `text/muted` resolves to `neutral/300` (8.5:1, previously 3.8:1). This is scoped in CSS until the token is changed (see Known issues).
- **EightDayBoard reordering** uses pointer events, so dragging works with touch as well as a mouse. Alt + ←/→ on a heading is the keyboard alternative.

### Known issues
- **`action/secondary-pressed`** with `text/primary` is 4.4:1 in Light. In Dark, `action/secondary-hover` and `action/secondary-pressed` with `text/primary` are 4.5:1 and 3.5:1. Button - Serif at 20px light counts as normal text, so AA needs 4.5:1. Proposal: Light pressed → `brand/teal/400`; Dark hover → `brand/teal/800`, pressed → `brand/teal/900`. This needs a token decision in Figma.
- **`text/muted` (Dark) on `background/muted` (Dark)** fails AA at the token level. Proposal: `background/muted` Dark → `neutral/900`, or add a `text/muted-on-muted` token.
- **Figma frame 24:187, budget row** overflows the 1440 frame (760 + 32 + 700 px). In code, the checklist takes the remaining width, so its error message wraps onto two lines.

**Affected:** all components · all tokens (first implementation)

---

## 0.5.0 — 6 October 2026

### Added
- **Scalea → Maratea content** across every component.
- **Photography moodboard** (section `photography`, 15 photos).
- **Sample itinerary page**, "Itinerary — Scalea to Maratea" (24:187).

### Changed
- **Styles section reordered:** Colors, Typography, Spacing, Radius.

**Affected:** Hero (photo variant), DayNode, TravelTip, JournalPreview, EightDayBoard

---

## 0.4.0 — 6 October 2026

### Added
- **Semantic `action/*` group:** primary (+hover, pressed), secondary (+hover, pressed), disabled, link (+hover), focus.
- **Semantic `feedback/*` group:** success, warning, error and info, each with solid, subtle and text.
- **Spacing** 12, 40, 48 and 64.
- **Radius** `lg` (12) and `full` (999).
- **Button states:** hover, pressed, focus and disabled for every type.

### Changed
- **Spacing moved to a 4 px grid:** 14 → 16, 30 → 32, 90 → 96.

**Affected:** Button, Input, Dropdown, ErrorMessage, Status · tokens `action/*`, `feedback/*`, `space/*`, `radius/*`

---

## 0.3.0 — 6 October 2026

**Audit.**

### Changed
- **Teal ramp fixed:** even lightness steps from 50 to 900.
- **Hero primitives** are now aliases of brand (`hero/background` → `brand/teal/600`).
- **All text tokens** meet WCAG AA on their intended backgrounds.

### Added
- **`border/*` group:** subtle, default, strong, brand, on-brand.

### Removed
- **Duplicate colour tokens.**

**Affected:** tokens `primitives/*`, `text/*`, `border/*`

---

## 0.2.0 — 6 October 2026

### Changed
- **Colours split** into Primitives (neutral, brand, success, warning, error, hero) and Semantic tokens with Light and Dark modes.

**Affected:** all colour tokens

---

## 0.1.0 — 6 October 2026

### Added
- **Initial system** inspired by In Flow: styles (colour, type, spacing, radius), atoms, molecules and organisms.
