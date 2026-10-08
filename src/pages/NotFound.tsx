import { Button } from '../components/atoms/Button'
import { Container } from '../components/sections/Container'
import { PageShell } from './PageShell'

export function NotFound() {
  return (
    <PageShell crumbs={[{ label: 'Home', to: '/' }, { label: 'Not found' }]} title="Off the map">
      <Container className="flex flex-col items-start gap-24 pb-64">
        <p className="type-body text-secondary">This page doesn’t exist. The coast is still there.</p>
        <Button variant="smallCta" href="/">
          Back to the itinerary
        </Button>
      </Container>
    </PageShell>
  )
}
