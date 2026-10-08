Build an **interactive playground** for the Eight Days design system at `/playground` in this app (`~/code/TGuide`). It's where designers and developers try every component, state and token live, and build page sections from them.

## Before you start
- This extends the React + Tailwind build from `PROMPT.md`. If `src/components` or the token pipeline doesn't exist yet, do `PROMPT.md` first.
- Sources: `design/tokens.json` (all token values, Light/Dark), `design/figma-components.json` (every component → Figma node id + variant axes), `design/icons.json`, `design/photos/`. Figma file key `pzKtL5ltpGpcV3nrnJS8as`; use the Figma MCP (`get_screenshot`) to compare.
- Follow `CLAUDE.md`: add a release-notes entry (code + Figma) and component docs for anything new.
- The playground UI uses the design system itself (its own tokens, type styles and components), not a third-party UI kit. Allowed extra deps: `axe-core` (a11y checks), `@dnd-kit/core` (drag & drop), `prism-react-renderer` or `shiki` (code highlighting). Nothing else without asking.

## Layout (3 panes + bottom drawer, all resizable, collapsible on small screens)
1. **Left: Explorer.** Searchable tree: Foundations (Colors, Typography, Spacing, Radius) → Atoms → Molecules → Organisms → Pages (sample itinerary) → Sandbox. Shows a variant count per component; ⌘K opens quick search.
2. **Center: Canvas.**
   - Live preview of the selected component.
   - Toolbar:
     - viewport presets 375 / 768 / 1024 / 1440 plus free resize handle
     - zoom 50–200%
     - background: page / surface / brand / inverse / photo (any of the 15 photos)
     - Light / Dark / System theme
     - grid & spacing overlay that draws the space-* tokens between elements
     - "Show all variants" toggle that renders the full Figma variant matrix (e.g. Button 6 Types × 5 States) in a labeled grid, like Figma
3. **Right: Controls,** auto-generated from a typed spec per component (`src/playground/specs/<Name>.spec.ts`):
   - variant selects (exact axes/values from `figma-components.json`)
   - text fields for labels
   - booleans
   - number sliders for counts/percentages (e.g. ProgressBar value, AvatarGroup count)
   - photo picker for Hero/cards
   - **state forcer** (default / hover / pressed / focus / disabled), applied through a `data-force-state` attribute the components honor in playground mode only
   - "Reset" button
4. **Bottom drawer tabs:**
   - **Code:** live JSX for the current props (highlighted, copy button), plus the Tailwind classes used.
   - **Tokens:** every CSS variable the rendered component uses, with its resolved value in the current theme, its primitive alias chain (e.g. `action/primary → hero/background → brand/teal/600 #3D7886`), and the WCAG contrast ratio for each text/background pair (AA pass/fail badge).
   - **Docs:** the component's `Name.docs.md`.
   - **Accessibility:** axe-core results for the canvas, re-run on every change.
   - **Actions:** log of events the component fires (onClick, onChange, onToggle…) with payload and timestamp, like Storybook actions.
   - **Figma:** "Open in Figma" link to the exact node, and a side-by-side compare that fetches the Figma screenshot (via a small dev-only script that calls the Figma REST image endpoint with a `FIGMA_TOKEN` from `.env.local`; if no token, show the link only).

## Token lab (Foundations → "Edit tokens")
- Color pickers for every primitive; semantic tokens update live through the alias chain in both themes, and the whole playground re-themes instantly.
- Sliders for spacing and radius scales; a type-scale editor (size / line-height / tracking per text style).
- A contrast matrix (all text tokens × all background tokens) that turns red the moment an edit breaks AA.
- "Export": download a `tokens.json` in the same shape as `design/tokens.json` plus a readable diff of what changed; "Reset to Figma".
- Edits live only in the playground (localStorage) until exported; they never change `design/tokens.json` automatically.

## Sandbox (compose sections)
- Drag components from the Explorer onto a page-width canvas, stack and reorder them (dnd-kit), select one to edit its props in the Controls pane, delete or duplicate.
- Start from templates: "Itinerary hero + overview", "Day cards", "Budget", "Newsletter + footer", "Full sample page".
- Save multiple compositions to localStorage; share via URL (state compressed into the hash); export the composition as a React component file.

## State, routing, quality
- Everything is deep-linkable: `/playground/atoms/button?type=bigCta&state=hover&theme=dark&vp=375`. Back/forward work.
- Keyboard: ⌘K search, `[`/`]` to switch variants, `T` to toggle theme, `G` for the grid, `1–4` for viewports, `?` for a shortcuts sheet.
- Every component in `figma-components.json` must have a spec. Add a Vitest test that fails if one is missing and that renders every variant combination without errors. Add one Playwright smoke test: open the playground, switch theme, change a Button variant, and confirm the code panel updates.
- Responsive: at 375px the panes become tabs (Canvas / Controls / Code).
- Add the playground to the top nav of the site and link it from `/design-system`.

## Verify before you say it's done
- `npm run build`, type check, Vitest and Playwright pass.
- In the browser: open 5 components across atoms/molecules/organisms, force every state, and toggle Light/Dark and all viewports. Compare the "Show all variants" grids for Button, Tag and Hero against Figma screenshots (3:109, 3:83, 6:272) and fix differences.
- Edit `brand/teal/600` in the token lab, confirm buttons/hero re-theme and the contrast matrix reacts, export, reset.
- Build "Full sample page" in the sandbox, share the URL in a fresh tab, and confirm it restores.
- Add the release-notes entry (1.1: Interactive playground) in code and Figma, and report what you verified and anything still open.
