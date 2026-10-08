/**
 * Fails if a hard-coded hex color appears in components or pages.
 * Every color must come from a token (Tailwind semantic utility or var(--…)).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const dirs = ['src/components', 'src/pages']
const hex = /#[0-9a-f]{3,8}\b/gi
const problems: string[] = []

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(tsx?|css)$/.test(name)) {
      readFileSync(p, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          for (const m of line.matchAll(hex)) problems.push(`${relative(root, p)}:${i + 1}  ${m[0]}`)
        })
    }
  }
}
dirs.forEach((d) => walk(join(root, d)))

if (problems.length) {
  console.error(`✗ Hard-coded hex colors found (use tokens):\n  ${problems.join('\n  ')}`)
  process.exit(1)
}
console.log(`✓ No hard-coded hex colors in ${dirs.join(', ')}`)
