# Eight Days: travel design system + sample site

React 19 + TypeScript + Vite + Tailwind CSS v4 + React Router. No UI kit. The Figma file is the source of truth for design:
`pzKtL5ltpGpcV3nrnJS8as` (Eight Days — Travel Design System), page `Design System` (0:1).
Sections: styles 2:8 · ds-atoms 3:2 · ds-molecules 5:16 · ds-organisms 6:43 · photography 23:185 · pages 24:185 · sample page 24:187.

## Standing rule (always)

**Every change to tokens, components or pages must, in the same change:**
1. **Add a release-notes entry in both places.**
   - Code: `src/content/release-notes.md`, newest first. Use the version + date heading and Added / Changed / Fixed / Removed sections, and end with an **Affected:** line listing components and tokens.
   - Figma: the **Release notes** page. Add a matching entry frame at the top, with the same text.
2. **Update the matching component docs in both places.**
   - Code: the JSDoc block in `Name.tsx` and `Name.docs.md` beside it (purpose, props table, variants, tokens, do/don't).
   - Figma: the component or set `description` and the doc-note frame beside the set. Run `npm run docs:figma` and push the `description` / `note` text from `design/figma-docs.json` so the two stay identical.

Versioning: a patch for fixes, a minor for new components, variants or tokens, and a major for breaking API or token renames.
For changes made by hand in Figma, use the **figma-sync** skill (`.claude/skills/figma-sync/SKILL.md`).

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Generates tokens, then starts Vite on :5173 |
| `npm run build` | Tokens → `tsc -b` → hex-colour check → `vite build` |
| `npm run tokens` | `design/tokens.json` → `src/styles/tokens.css` + `src/styles/theme.css` |
| `npm run lint:colors` | Fails on `#hex` in `src/components` or `src/pages` |
| `npm run docs:figma` | `*.docs.md` → `design/figma-docs.json` (text for Figma descriptions and doc notes) |

## Tokens

- **`design/tokens.json` is the only source of values.** Never invent a colour, space, radius or font. The generated CSS (`src/styles/tokens.css`, `theme.css`) is never edited by hand.
- **Utilities read like tokens:** `bg-page bg-surface bg-muted bg-brand bg-brand-soft bg-brand-subtle bg-accent bg-accent-subtle bg-inverse`, `text-primary text-secondary text-muted text-disabled text-inverse text-on-brand text-brand text-accent text-link`, `border-subtle border-default border-strong border-brand border-on-brand`, `bg-action-primary(-hover|-pressed)`, `bg-action-secondary(-hover|-pressed)`, `bg-action-disabled`, `bg-success|warning|error|info(-subtle)` + `text-success|…`, `outline-focus`.
- **Text styles:** `type-h1 type-h2 type-description type-h3 type-h4 type-label type-body type-body-bold type-caps type-button-serif type-numeral type-numeral-s`.
- **Spacing exists only at 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96,** named by px (`p-16` = 16px). Radius defaults to 0 (square brand); `rounded-sm|md|lg|full` only for avatars, switches and the bookmark.
- **Dark mode:** `[data-theme="dark"]` or `prefers-color-scheme` (unless `data-theme="light"`). The footer sets it.
- **No `#hex` in components or pages.** For a primitive that has no semantic token (e.g. a fixed photo overlay), use `var(--neutral-…)` and add a named utility in `src/index.css`.

## Layout of the code

```
design/            tokens.json, icons.json, figma-components.json, figma-docs.json, figma-snapshot.json, photos/
scripts/           build-tokens.ts, check-hex.ts, docs-to-figma.ts
src/components/    atoms/ molecules/ organisms/   Name.tsx + Name.docs.md (Figma node in the JSDoc)
                   sections/  page-level blocks (Container, Footer, Newsletter, Gallery, RouteMap)
src/pages/         Home (/), DesignSystem, ReleaseNotes, Destinations, Journal, About
src/content/       trip.ts (all copy and data), release-notes.md
src/lib/           cn, photos, storage (localStorage), theme, currency (EUR/USD), toast, scroll
```

## Conventions

- **Component props** use the Figma variant names in camelCase (`variant="smallCta"` = Type "small CTA"). Button takes `forceState` (renders `data-force-state`) for docs only.
- **Every interactive element** is keyboard reachable with a visible 2px `action/focus` outline, and respects `prefers-reduced-motion`. Text pairs must meet WCAG AA in Light and Dark.
- **Persisted state** goes through `useLocalStorage` (keys prefixed `ed-`).
- **Responsive breakpoints:** 375 → `md` 768 → `lg` 1024 → `xl` 1280 → `2xl` 1440. Gutters 16 / 32 / 48 / 96 (`Container`).
