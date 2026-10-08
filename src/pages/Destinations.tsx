import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Dropdown } from '../components/atoms/Dropdown'
import { ListRow } from '../components/atoms/ListRow'
import { Container } from '../components/sections/Container'
import { itineraries, type Region, type Season } from '../content/trip'
import { PageShell } from './PageShell'

const regions: Region[] = ['Southern Europe', 'Western Europe', 'Northern Europe']
const seasons: Season[] = ['Spring', 'Summer', 'Autumn', 'Winter']

/** `/destinations` — itineraries filtered by region and season (Dropdown + ListRow). */
export function Destinations() {
  const navigate = useNavigate()
  const [region, setRegion] = useState<string | null>(null)
  const [season, setSeason] = useState<string | null>(null)
  const list = itineraries.filter(
    (i) => (!region || i.region === region) && (!season || i.seasons.includes(season as Season)),
  )
  return (
    <PageShell
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Destinations' }]}
      title="Destinations"
      intro="Eight-day routes across Europe. Filter by region and the season you can travel."
    >
      <Container className="flex flex-col gap-32 pb-64">
        <div className="flex flex-wrap items-end gap-16 bg-brand p-16 md:gap-24">
          <Dropdown
            variant="onColor"
            label="Region"
            placeholder="Any region"
            value={region}
            onChange={setRegion}
            options={regions.map((r) => ({ value: r, label: r }))}
          />
          <Dropdown
            variant="onColor"
            label="Season"
            placeholder="Any season"
            value={season}
            onChange={setSeason}
            options={seasons.map((s) => ({ value: s, label: s }))}
          />
          <p className="type-caps pb-8 text-on-brand" aria-live="polite">
            {list.length} {list.length === 1 ? 'itinerary' : 'itineraries'}
          </p>
        </div>
        {list.length ? (
          <ul className="flex flex-col gap-16">
            {list.map((i) => (
              <li key={i.title}>
                <ListRow title={i.title} country={i.country} meta={i.meta} updated={i.updated} onView={() => navigate(i.href)} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="type-body text-secondary">No itineraries match. Try another season.</p>
        )}
      </Container>
    </PageShell>
  )
}
