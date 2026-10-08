import { useState } from 'react'
import { Tag } from '../components/atoms/Tag'
import { JournalPreview } from '../components/molecules/JournalPreview'
import { Container } from '../components/sections/Container'
import { posts } from '../content/trip'
import { photo } from '../lib/photos'
import { PageShell } from './PageShell'

const allTags = [...new Set(posts.flatMap((p) => p.tags))]

/** `/journal` — posts with static tags as filters. */
export function Journal() {
  const [tag, setTag] = useState<string | null>(null)
  const list = tag ? posts.filter((p) => p.tags.includes(tag)) : posts
  return (
    <PageShell crumbs={[{ label: 'Home', to: '/' }, { label: 'Journal' }]} title="Journal" intro="Notes from the road: practical, slow and specific.">
      <Container className="flex flex-col gap-32 pb-64">
        <div className="flex flex-wrap gap-4" role="group" aria-label="Filter by tag">
          {allTags.map((t) => (
            <Tag key={t} variant="static" label={t} pressed={tag === t} onClick={() => setTag(tag === t ? null : t)} />
          ))}
        </div>
        <ul className="grid gap-32 md:grid-cols-2">
          {list.map((p) => (
            <li key={p.id} className="flex flex-col gap-16">
              <img src={photo(p.photo)} alt="" className="h-[240px] w-full object-cover md:h-[340px]" />
              <JournalPreview date={p.date} title={p.title} meta={p.meta} excerpt={p.excerpt} />
            </li>
          ))}
        </ul>
      </Container>
    </PageShell>
  )
}
