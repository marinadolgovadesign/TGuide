---
name: figma-sync
description: Pull changes made by hand in the Eight Days Figma file into code. Snapshot components, variables and descriptions to design/figma-snapshot.json, diff against the previous snapshot, update tokens.json, React components and docs (code + Figma), and write the release-notes entry in both places. Use when the user says they changed something in Figma, asks to "sync from Figma", or the Figma file and code have drifted.
---

# figma-sync

Brings hand edits in Figma (`pzKtL5ltpGpcV3nrnJS8as`, page `Design System` 0:1) into this repo, following the standing rule in `CLAUDE.md`.

## 0. Prerequisites
- Figma MCP server connected. Load the `figma:figma-use` skill before any `use_figma` call, and `figma:figma-design-to-code` before `get_design_context`.
- Clean working tree (`git status`), so the sync is one reviewable change.

## 1. Snapshot Figma
Run this with `use_figma` (read-only) on the file and write the returned JSON to `design/figma-snapshot.next.json`:

```js
const page = figma.root.children.find(p => p.name === 'Design System') ?? figma.currentPage
await figma.setCurrentPageAsync(page)
const comps = page.findAll(n => n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent?.type !== 'COMPONENT_SET'))
const components = comps.map(n => ({
  id: n.id, name: n.name, type: n.type, description: n.description ?? '',
  variants: n.type === 'COMPONENT_SET'
    ? Object.fromEntries(Object.entries(n.componentPropertyDefinitions).filter(([,d]) => d.type === 'VARIANT').map(([k,d]) => [k, d.variantOptions]))
    : {},
  size: [Math.round(n.width), Math.round(n.height)],
})).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
const collections = await figma.variables.getLocalVariableCollectionsAsync()
const variables = []
for (const c of collections) for (const id of c.variableIds) {
  const v = await figma.variables.getVariableByIdAsync(id)
  const values = {}
  for (const m of c.modes) {
    const raw = v.valuesByMode[m.modeId]
    values[m.name] = raw?.type === 'VARIABLE_ALIAS' ? { alias: (await figma.variables.getVariableByIdAsync(raw.id))?.name }
      : typeof raw === 'object' && 'r' in raw ? '#' + [raw.r, raw.g, raw.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase()
      : raw
  }
  variables.push({ collection: c.name, name: v.name, type: v.resolvedType, values })
}
const textStyles = (await figma.getLocalTextStylesAsync()).map(s => ({ name: s.name, font: s.fontName, size: s.fontSize, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, textCase: s.textCase }))
return { fileKey: 'pzKtL5ltpGpcV3nrnJS8as', takenAt: new Date().toISOString(), components, variables, textStyles }
```

If the result is too large for one call, run it per collection or per section and merge.

## 2. Diff
Compare `design/figma-snapshot.next.json` with the committed `design/figma-snapshot.json`:

```bash
node -e '
const a=require("./design/figma-snapshot.json"), b=require("./design/figma-snapshot.next.json");
const key=x=>x.id??`${x.collection}/${x.name}`;
for (const k of ["components","variables","textStyles"]) {
  const A=new Map(a[k].map(x=>[key(x)??x.name,x])), B=new Map(b[k].map(x=>[key(x)??x.name,x]));
  for (const [id,x] of B) if(!A.has(id)) console.log("ADDED  ",k,x.name);
  for (const [id,x] of A) if(!B.has(id)) console.log("REMOVED",k,x.name);
  for (const [id,x] of B) if(A.has(id) && JSON.stringify(A.get(id))!==JSON.stringify(x)) console.log("CHANGED",k,x.name);
}'
```

List the changes for the user. For each changed component, also call `get_screenshot` (and `get_design_context` if the layout changed) on its node, to see what moved.

## 3. Apply
- **Variables / text styles** → update `design/tokens.json` (same shape: primitives, semantic light/dark, spacing, radius, textStyles). Then `npm run tokens`.
- **Components** → update `src/components/<group>/<Name>.tsx` to match: variant axes become props, using token utilities only. New components need a file, a `Name.docs.md`, an entry in `design/figma-components.json` and a showcase entry in `src/pages/DesignSystem.tsx`.
- **Descriptions** → if the Figma description was edited by hand, fold the change into `Name.docs.md`. Then `npm run docs:figma` and push the regenerated `description` and doc-note text back to Figma (`use_figma`: set `node.description`; replace the text in the frame named `doc · <Name>` beside the set), so both sides match.
- Run `npm run build` (typecheck + hex check) and look at `/design-system` and `/` against `get_screenshot`.

## 4. Release notes, in both places
- `src/content/release-notes.md`: add a new version at the top (patch, minor or major per `CLAUDE.md`). Use Added / Changed / Fixed / Removed and an **Affected:** line naming components and tokens.
- Figma, page **Release notes**: duplicate the latest entry frame, put it at the top and fill it with the same text.

## 5. Finish
- `mv design/figma-snapshot.next.json design/figma-snapshot.json`
- Commit with the release-notes heading as the message, e.g. `1.0.1 — Tag: accent variant uses sand/300`.
