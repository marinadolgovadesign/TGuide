import { Link } from 'react-router'
import { Profile } from '../components/molecules/Profile'
import { TravelTip } from '../components/molecules/TravelTip'
import { Container } from '../components/sections/Container'
import { author } from '../content/trip'
import { PageShell } from './PageShell'

/** `/about` */
export function About() {
  return (
    <PageShell crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]} title="About Eight Days" intro="One region, eight slow days, every booking link in one place.">
      <Container className="flex max-w-[1440px] flex-col gap-32 pb-64">
        <Profile variant="long" {...author} />
        <p className="type-body max-w-[620px] text-secondary">
          Eight Days publishes itineraries that stay in one region long enough to know it: where to park, which lido to pick, when the sea
          is clearest. Every page in this site is built from the Eight Days design system.
        </p>
        <TravelTip>Travel slower than you think you should. Eight days is enough for one coast, not three.</TravelTip>
        <p className="type-body text-secondary">
          See the{' '}
          <Link to="/design-system" className="text-link underline underline-offset-4 hover:text-link-hover">
            design system
          </Link>{' '}
          and its{' '}
          <Link to="/release-notes" className="text-link underline underline-offset-4 hover:text-link-hover">
            release notes
          </Link>
          .
        </p>
      </Container>
    </PageShell>
  )
}
