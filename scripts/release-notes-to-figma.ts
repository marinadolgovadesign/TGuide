/**
 * Parses src/content/release-notes.md into design/figma-release-notes.json:
 * the exact text for the "Release notes" page in Figma (one frame per version).
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const md = readFileSync(join(root, 'src/content/release-notes.md'), 'utf8')
const plain = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1').trim()

const [head, ...blocks] = md.split(/\n## /)
const intro = head.split('\n').filter((l) => l && !l.startsWith('#') && l !== '---').map(plain)
const versions = blocks.map((b) => {
  const lines = b.split('\n')
  const [version, date] = lines[0].split(' — ')
  const out: { version: string; date: string; summary: string[]; groups: { title: string; items: string[] }[]; affected: string } = {
    version: version.trim(),
    date: (date ?? '').trim(),
    summary: [],
    groups: [],
    affected: '',
  }
  let group: { title: string; items: string[] } | null = null
  for (const l of lines.slice(1)) {
    if (!l.trim() || l === '---') continue
    if (l.startsWith('### ')) out.groups.push((group = { title: l.slice(4), items: [] }))
    else if (l.startsWith('- ')) group?.items.push(plain(l.slice(2)))
    else if (l.startsWith('**Affected:**')) out.affected = plain(l.replace('**Affected:**', ''))
    else if (group) group.items.push(plain(l))
    else out.summary.push(plain(l))
  }
  return out
})
writeFileSync(join(root, 'design/figma-release-notes.json'), JSON.stringify({ intro, versions }, null, 2) + '\n')
console.log(`release notes: ${versions.length} versions → design/figma-release-notes.json`)
