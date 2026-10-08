import { marked } from 'marked'
import notes from '../content/release-notes.md?raw'
import { Container } from '../components/sections/Container'
import { PageShell } from './PageShell'

const body = notes.replace(/^# .*\n/, '')
const html = marked.parse(body, { async: false })

/** `/release-notes` — renders src/content/release-notes.md. */
export function ReleaseNotes() {
  return (
    <PageShell crumbs={[{ label: 'Home', to: '/' }, { label: 'Design system', to: '/design-system' }, { label: 'Release notes' }]} title="Release notes">
      <Container className="pb-64">
        <article className="prose-ed max-w-[760px]" dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </PageShell>
  )
}
