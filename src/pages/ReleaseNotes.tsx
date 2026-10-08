import { marked } from 'marked'
import { useState } from 'react'
import { Link } from 'react-router'
import figma from '../../design/figma-components.json'
import { Tag } from '../components/atoms/Tag'
import { Container } from '../components/sections/Container'
import notes from '../content/release-notes.md?raw'
import { cn } from '../lib/cn'
import { PageShell } from './PageShell'

interface Version {
  id: string
  version: string
  date: string
  summary: string[]
  groups: { title: string; items: string[] }[]
  affected: string
}

// Same structure as scripts/release-notes-to-figma.ts, so code and Figma show identical entries.
const [head, ...blocks] = notes.split(/\n## /)
const intro = head.split('\n').filter((l) => l && !l.startsWith('#') && l !== '---')
const versions: Version[] = blocks.map((b) => {
  const lines = b.split('\n')
  const [version, date = ''] = lines[0].split(' — ')
  const v: Version = { id: `v${version.trim().replace(/\./g, '-')}`, version: version.trim(), date: date.trim(), summary: [], groups: [], affected: '' }
  let group: Version['groups'][number] | null = null
  for (const l of lines.slice(1)) {
    if (!l.trim() || l === '---') continue
    if (l.startsWith('### ')) v.groups.push((group = { title: l.slice(4).trim(), items: [] }))
    else if (l.startsWith('- ')) group?.items.push(l.slice(2))
    else if (l.startsWith('**Affected:**')) v.affected = l.replace('**Affected:**', '').trim()
    else if (group) group.items.push(l)
    else v.summary.push(l)
  }
  return v
})

const inline = (md: string) => ({ __html: marked.parseInline(md, { async: false }) as string })

const kinds = ['Added', 'Changed', 'Fixed', 'Removed', 'Known issues'] as const
type Kind = (typeof kinds)[number]
const kindStyle: Record<Kind, string> = {
  Added: 'bg-success-subtle text-success',
  Changed: 'bg-info-subtle text-info',
  Fixed: 'bg-warning-subtle text-warning',
  Removed: 'bg-error-subtle text-error',
  'Known issues': 'bg-warning-subtle text-warning',
}
const usedKinds = kinds.filter((k) => versions.some((v) => v.groups.some((g) => g.title === k)))
const figmaNotesUrl = `https://www.figma.com/design/${figma.fileKey}/?node-id=33-563`

/** `/release-notes`: renders src/content/release-notes.md as a versioned changelog, mirrored on the Figma "Release notes" page. */
export function ReleaseNotes() {
  const [filter, setFilter] = useState<Kind | null>(null)
  const shown = versions.filter((v) => !filter || v.groups.some((g) => g.title === filter))

  return (
    <PageShell
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Design system', to: '/design-system' }, { label: 'Release notes' }]}
      title="Release notes"
      intro="Every change to the Eight Days tokens, components and pages, newest first."
    >
      <Container className="grid gap-32 pb-96 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-64">
        <aside className="flex flex-col gap-24 lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Versions">
            <p className="type-label text-secondary">Versions</p>
            <ol className="mt-12 flex flex-wrap gap-x-24 gap-y-12 lg:flex-col">
              {versions.map((v, i) => (
                <li key={v.id}>
                  <a href={`#${v.id}`} className="group flex items-baseline gap-8 outline-focus focus-visible:outline-2 focus-visible:outline-offset-4">
                    <span className="type-numeral-s text-primary group-hover:text-link">{v.version}</span>
                    {i === 0 && <span className="type-caps text-brand">latest</span>}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="flex flex-col gap-8 border-t border-subtle pt-16">
            <Link to="/design-system" className="type-caps text-link hover:text-link-hover">
              Design system →
            </Link>
            <a href={figmaNotesUrl} target="_blank" rel="noreferrer" className="type-caps text-link hover:text-link-hover">
              Figma release notes ↗
            </a>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-32">
          <div className="flex flex-col gap-12">
            {intro.map((p) => (
              <p key={p} className="type-body max-w-[720px] text-secondary" dangerouslySetInnerHTML={inline(p)} />
            ))}
            <div role="group" aria-label="Filter by change type" className="mt-8 flex flex-wrap items-center gap-8">
              <span className="type-caps text-muted">Show</span>
              <Tag label="All" onClick={() => setFilter(null)} pressed={filter === null} />
              {usedKinds.map((k) => (
                <Tag key={k} label={k} onClick={() => setFilter(filter === k ? null : k)} pressed={filter === k} />
              ))}
            </div>
          </div>

          {shown.map((v) => (
            <VersionCard key={v.id} v={v} latest={v === versions[0]} filter={filter} />
          ))}
          {shown.length === 0 && <p className="type-body text-muted">No releases with {filter} changes.</p>}
        </div>
      </Container>
    </PageShell>
  )
}

function VersionCard({ v, latest, filter }: { v: Version; latest: boolean; filter: Kind | null }) {
  const [open, setOpen] = useState(latest || versions.indexOf(v) < 2)
  const groups = filter ? v.groups.filter((g) => g.title === filter) : v.groups
  const count = v.groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <article id={v.id} aria-labelledby={`${v.id}-title`} className="scroll-mt-24 bg-surface">
      <header className="flex flex-wrap items-center gap-x-16 gap-y-8 border-b border-subtle px-24 py-20 md:px-32">
        <h2 id={`${v.id}-title`} className="type-numeral-s text-primary md:text-[40px]">
          {v.version}
        </h2>
        <span className="type-caps text-muted">{v.date}</span>
        {latest && <Tag variant="accent" label="Latest" />}
        <span className="flex-1" />
        <button
          type="button"
          aria-expanded={open || !!filter}
          aria-controls={`${v.id}-body`}
          onClick={() => setOpen((o) => !o)}
          disabled={!!filter}
          className="type-caps cursor-pointer text-link outline-focus hover:text-link-hover focus-visible:outline-2 disabled:cursor-default disabled:text-muted"
        >
          {open || filter ? 'Hide' : `Show ${count} changes`}
        </button>
      </header>

      {(open || filter) && (
        <div id={`${v.id}-body`} className="flex flex-col gap-24 px-24 py-24 md:px-32 md:py-32">
          {v.summary.map((s) => (
            <p key={s} className="type-body max-w-[760px] text-primary" dangerouslySetInnerHTML={inline(s)} />
          ))}
          {groups.map((g) => (
            <section key={g.title} aria-label={g.title} className="flex flex-col gap-12">
              <span className={cn('type-label self-start px-8 py-4', kindStyle[g.title as Kind] ?? 'bg-muted text-secondary')}>{g.title}</span>
              <ul className="flex max-w-[760px] flex-col gap-8">
                {g.items.map((it) => (
                  <li key={it} className="type-body flex gap-12 text-secondary">
                    <span aria-hidden className="mt-[9px] h-px w-12 shrink-0 bg-(--border-default)" />
                    <span className="[&_code]:bg-muted [&_code]:px-4 [&_strong]:font-bold [&_strong]:text-primary" dangerouslySetInnerHTML={inline(it)} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {v.affected && (
            <p className="type-caps border-t border-subtle pt-16 text-muted">
              Affected: <span className="text-secondary" dangerouslySetInnerHTML={inline(v.affected)} />
            </p>
          )}
        </div>
      )}
    </article>
  )
}
