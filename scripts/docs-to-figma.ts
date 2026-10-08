/**
 * Builds design/figma-docs.json from src/components/**\/Name.docs.md, the text pushed to Figma:
 *   description → component / component-set description (Purpose + When to use)
 *   note        → the doc-note frame placed beside the set (purpose · when to use · variants · tokens)
 * The .docs.md files are the single source; never edit figma-docs.json by hand.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const map = JSON.parse(readFileSync(join(root, 'design/figma-components.json'), 'utf8'))

const plain = (s: string) =>
  s
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .trim()

function section(md: string, label: string) {
  const m = md.match(new RegExp(`\\*\\*${label}\\.\\*\\*\\s*([^\\n]+)`))
  return m ? plain(m[1]) : ''
}

const files: string[] = []
const walk = (d: string) =>
  readdirSync(d).forEach((n) => {
    const p = join(d, n)
    if (statSync(p).isDirectory()) walk(p)
    else if (n.endsWith('.docs.md')) files.push(p)
  })
walk(join(root, 'src/components'))

/** Components that live in another component's file. */
const sourceFile: Record<string, string> = { AvatarGroup: 'Avatar' }

const out: Record<string, { group: string; node: string | null; description: string; note: string }> = {}
for (const f of files.sort()) {
  const name = basename(f, '.docs.md')
  const group = f.includes('/atoms/') ? 'atoms' : f.includes('/molecules/') ? 'molecules' : 'organisms'
  const entry = map[group]?.[name]
  const node = entry?.id ?? (name === 'Icon' ? '3:4' : null)
  const md = readFileSync(f, 'utf8')
  const purpose = section(md, 'Purpose')
  const when = section(md, 'When to use')
  const variants = section(md, 'Variants') || section(md, 'Behaviour') || section(md, 'Interaction')
  const tokens = section(md, 'Tokens')
  const doLine = section(md, 'Do')
  const dont = (md.match(/\*\*Don't\.\*\*\s*([^\n]+)/) ?? [])[1]
  out[name] = {
    group,
    node,
    description: `${purpose} When to use: ${when}`,
    note: [
      name,
      `Purpose — ${purpose}`,
      `When to use — ${when}`,
      `Variants — ${variants}`,
      `Tokens — ${tokens}`,
      `Do — ${doLine}${dont ? `  Don't — ${plain(dont)}` : ''}`,
      `Code — src/components/${group}/${sourceFile[name] ?? name}.tsx · docs ${name}.docs.md`,
    ].join('\n'),
  }
}
writeFileSync(join(root, 'design/figma-docs.json'), JSON.stringify(out, null, 2) + '\n')
console.log(`figma-docs: ${Object.keys(out).length} components → design/figma-docs.json`)
