import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { Button } from '../components/atoms/Button'
import { SegmentedTabs } from '../components/atoms/SegmentedTabs'
import { Switch } from '../components/atoms/Switch'
import { Tag } from '../components/atoms/Tag'
import { BudgetCard } from '../components/molecules/BudgetCard'
import { CompareCard } from '../components/molecules/CompareCard'
import { DayNode } from '../components/molecules/DayNode'
import { DestinationCard } from '../components/molecules/DestinationCard'
import { ItineraryPreview } from '../components/molecules/ItineraryPreview'
import { ItinerarySummary } from '../components/molecules/ItinerarySummary'
import { JournalPreview } from '../components/molecules/JournalPreview'
import { Profile } from '../components/molecules/Profile'
import { StatCard } from '../components/molecules/StatCard'
import { TravelTip } from '../components/molecules/TravelTip'
import { ChecklistItem } from '../components/organisms/ChecklistItem'
import { EightDayBoard } from '../components/organisms/EightDayBoard'
import { Header } from '../components/organisms/Header'
import { Hero } from '../components/organisms/Hero'
import { Container } from '../components/sections/Container'
import { Gallery } from '../components/sections/Gallery'
import { Newsletter } from '../components/sections/Newsletter'
import { RouteMap } from '../components/sections/RouteMap'
import { author, budget, checklist, dayGroups, days, gallery, posts, trip } from '../content/trip'
import { useCurrency, useMoney } from '../lib/currency'
import { photo } from '../lib/photos'
import { scrollToId } from '../lib/scroll'
import { useLocalStorage } from '../lib/storage'
import { useToast } from '../lib/toast'

type View = 'overview' | 'days' | 'map'
const views: { value: View; label: string }[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'days', label: 'Day by day' },
  { value: 'map', label: 'Map' },
]

/** Stops of a group spread across its days (day k gets every n-th stop). */
function stopsForDay(day: number) {
  const g = dayGroups.find((x) => x.days.includes(day))!
  const k = g.days.indexOf(day)
  return { group: g, stops: g.stops.filter((_, i) => i % g.days.length === k) }
}

/** `/` — the sample itinerary page, Figma 24:187 "Itinerary — Scalea to Maratea". */
export function Home() {
  const toast = useToast()
  const money = useMoney()
  const { currency, setCurrency } = useCurrency()
  const location = useLocation()

  const [view, setView] = useState<View>('overview')
  const [activeDay, setActiveDay] = useState(trip.currentDay)
  const [openDay, setOpenDay] = useState<number | null>(null)
  const [tipOpen, setTipOpen] = useState(false)
  const [mapDay, setMapDay] = useState<number | null>(1)
  const [journalTag, setJournalTag] = useState<string | null>(null)
  const [saved, setSaved] = useLocalStorage('saved-scalea-maratea', false)
  const [order, setOrder] = useLocalStorage('board-order', dayGroups.map((g) => g.id))
  const [done, setDone] = useLocalStorage<Record<string, boolean>>(
    'checklist',
    Object.fromEntries(checklist.map((c) => [c.id, c.initialDone])),
  )
  const [taskTags, setTaskTags] = useLocalStorage<Record<string, string[]>>(
    'checklist-tags',
    Object.fromEntries(checklist.map((c) => [c.id, c.tags])),
  )
  const pendingScroll = useRef<string | null>(null)

  const columns = useMemo(() => {
    const byId = new Map(dayGroups.map((g) => [g.id, g]))
    const ids = [...order.filter((id) => byId.has(id)), ...dayGroups.map((g) => g.id).filter((id) => !order.includes(id))]
    return ids.map((id) => byId.get(id)!)
  }, [order])

  // Jump after the target view has rendered.
  useEffect(() => {
    if (pendingScroll.current) {
      scrollToId(pendingScroll.current)
      pendingScroll.current = null
    }
  })

  // Deep links like /#overview
  useEffect(() => {
    if (location.hash) requestAnimationFrame(() => scrollToId(location.hash.slice(1)))
  }, [location.hash])

  // Active day follows scroll.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-day]')
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActiveDay(Number((hit.target as HTMLElement).dataset.day))
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [view])

  function goToView(v: View) {
    setView(v)
    pendingScroll.current = 'itinerary'
  }
  function goToDay(day: number) {
    setView('days')
    setOpenDay(day)
    setActiveDay(day)
    pendingScroll.current = `day-${day}`
  }
  function toggleSaved(next: boolean) {
    setSaved(next)
    toast(next ? 'Saved to your trips' : 'Removed from your trips')
  }
  function toggleJournalTag(tag: string) {
    const next = journalTag === tag ? null : tag
    setJournalTag(next)
    toast(next ? `Journal filtered by ${tag}` : 'Journal filter cleared')
  }

  const visiblePosts = journalTag ? posts.filter((p) => p.tags.includes(journalTag)) : posts

  return (
    <>
      <Header
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Italy', to: '/destinations' }, { label: trip.title }]}
        days={days}
        activeDay={activeDay}
        onSelectDay={goToDay}
      />

      <main id="main">
        <Hero
          variant="photo"
          photo={photo('hero')}
          photoAlt="Scalea’s old town and Torre Talao above the sea"
          title={trip.title}
          subtitle={trip.subtitle}
          eyebrow={`${trip.country} · ${trip.stats.days} days`}
          season={trip.season}
          tags={trip.heroTags}
          views={views}
          onView={goToView}
          saved={saved}
          onSave={toggleSaved}
          onCta={() => scrollToId('overview')}
          className="md:h-[640px]"
        />

        {/* Overview — Figma 24:280 */}
        <section id="overview" aria-label="Trip overview" className="scroll-mt-[72px]">
          <Container className="flex flex-col gap-32 py-48 md:py-64 xl:flex-row xl:items-start xl:gap-64">
            <div className="flex min-w-0 flex-1 flex-col gap-32 2xl:max-w-[760px]">
              <ItineraryPreview
                title={trip.title}
                onCta={() => goToView('overview')}
                stats={[
                  { value: String(trip.stats.days), label: 'Days' },
                  { value: String(trip.stats.towns), label: 'Towns' },
                  { value: String(trip.stats.km), label: 'Kilometres' },
                  { value: String(trip.stats.sights), label: 'Sights' },
                  { value: money(trip.priceEur), label: 'From' },
                ]}
              />
              <ItinerarySummary summary={trip.summary} tags={trip.tags} onTagClick={toggleJournalTag} activeTag={journalTag} />
              <Profile variant="shortOutlined" {...author} className="self-start" />
            </div>
            <div className="flex flex-col gap-24 md:flex-row md:items-start xl:w-[426px] xl:shrink-0 xl:flex-col">
              <DestinationCard
                country={trip.country}
                count="8 itineraries"
                seasonLabel="Season fit · May"
                seasonFit={92}
                tip="Ask for the catch of the day — grilled alici with lemon are a Scalea classic."
                travellers={{
                  people: [
                    { initials: 'MD', name: 'Marina Dolgova', person: 'author' },
                    { initials: 'AL', name: 'Ana López', person: 'guest' },
                    { initials: 'KO', name: 'Kofi Owusu', person: 'local' },
                  ],
                  more: 12,
                }}
              />
              <div className="flex flex-wrap items-start gap-16">
                <BudgetCard level={budget.level} parts={budget.parts} className="w-[180px]" />
                <StatCard label="Kilometres" value={String(trip.stats.km)} />
              </div>
            </div>
          </Container>
        </section>

        {/* Day by day — Figma 24:363 */}
        <section id="itinerary" aria-labelledby="itinerary-title" className="scroll-mt-[72px] bg-surface">
          <Container className="flex flex-col gap-32 py-48 md:py-64">
            <div className="flex flex-wrap items-center gap-16">
              <h2 id="itinerary-title" className="type-h2 text-primary md:type-h1">
                Your 8 days
              </h2>
              <span className="flex-1" />
              <SegmentedTabs aria-label="Itinerary view" idPrefix="itinerary" options={views} value={view} onChange={setView} />
            </div>

            <div role="tabpanel" id={`itinerary-panel-${view}`} aria-labelledby={`itinerary-tab-${view}`}>
              {view === 'overview' && (
                <div className="flex flex-col gap-32">
                  <ul className="grid gap-24 md:grid-cols-2 xl:grid-cols-4">
                    {dayGroups.map((g) => (
                      <li key={g.id} data-day={g.days[0]} className="flex min-w-0 flex-col gap-8">
                        <img src={photo(g.photo)} alt="" loading="lazy" className="h-[220px] w-full object-cover" />
                        <span className="h-8" aria-hidden />
                        <p className="type-caps text-accent">{g.label}</p>
                        <h3 className="type-h2 text-primary">{g.town}</h3>
                        <p className="type-body text-secondary">{g.summary}</p>
                        <Button
                          variant="ghost"
                          className="self-start"
                          onClick={() => goToDay(g.days[0])}
                          aria-label={`Read more about ${g.town}`}
                        >
                          Read more
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-16">
                    <h3 className="type-label text-secondary">Stops at a glance</h3>
                    <EightDayBoard
                      className="self-start"
                      onReorder={(ids) => {
                        setOrder(ids)
                        toast('Board order saved')
                      }}
                      columns={columns.map((g) => ({ id: g.id, label: g.label, town: g.town, stops: g.stops }))}
                    />
                  </div>
                </div>
              )}

              {view === 'days' && (
                <ol className="flex flex-col">
                  {days.map((d) => {
                    const { group, stops } = stopsForDay(d.day)
                    return (
                      <li
                        key={d.day}
                        id={`day-${d.day}`}
                        data-day={d.day}
                        className="grid scroll-mt-[96px] gap-24 border-b border-subtle py-24 md:grid-cols-[220px_1fr] md:gap-32"
                      >
                        <DayNode
                          day={d.day}
                          place={d.town}
                          details={stops}
                          expanded={openDay === d.day}
                          onToggle={() => setOpenDay(openDay === d.day ? null : d.day)}
                        />
                        <div className="flex flex-col gap-8">
                          <p className="type-caps text-accent">
                            Day {d.day} · {group.label}
                          </p>
                          <h3 className="type-h2 text-primary">{d.town}</h3>
                          <p className="type-body max-w-[620px] text-secondary">{group.summary}</p>
                          <ul className="flex flex-wrap gap-4 pt-8">
                            {stops.map((s) => (
                              <li key={s.name}>
                                <Tag variant="accent" label={`${s.time} · ${s.name}`} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              )}

              {view === 'map' && (
                <div className="grid gap-32 md:grid-cols-[minmax(0,400px)_1fr]">
                  <RouteMap stops={days} selected={mapDay} onSelect={setMapDay} className="max-w-[400px]" />
                  <div className="flex flex-col gap-16">
                    <h3 className="type-label text-secondary">8 stops · tap a day</h3>
                    <ul className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4">
                      {days.map((d) => (
                        <li key={d.day}>
                          <Button
                            variant="dayNode"
                            sublabel={d.town}
                            aria-pressed={mapDay === d.day}
                            onClick={() => setMapDay(d.day)}
                            className="w-full"
                          >
                            Day {String(d.day).padStart(2, '0')}
                          </Button>
                        </li>
                      ))}
                    </ul>
                    {mapDay && (
                      <div className="flex flex-col gap-8 bg-muted p-20" aria-live="polite">
                        <p className="type-caps text-accent">Day {mapDay}</p>
                        <p className="type-h3 text-primary">{days[mapDay - 1].town}</p>
                        <ul className="type-body text-secondary">
                          {stopsForDay(mapDay).stops.map((s) => (
                            <li key={s.name}>
                              {s.time} · {s.name} — {s.detail}
                            </li>
                          ))}
                        </ul>
                        <Button variant="ghost" className="-ml-4 self-start" onClick={() => goToDay(mapDay)}>
                          Open day {mapDay}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* Local tip — Figma 24:538 */}
        <section aria-labelledby="tip-title" className="bg-brand-subtle">
          <Container className="flex flex-col gap-32 py-48 md:flex-row md:items-center md:gap-48 md:py-64">
            <img
              src={photo('coffee')}
              alt="Cappuccino and cornetti on a café table in an old-town lane"
              loading="lazy"
              className="h-[380px] w-full shrink-0 object-cover md:w-[300px]"
            />
            <div className="flex flex-col items-start gap-20">
              <h2 id="tip-title" className="type-label text-brand">
                Local tip
              </h2>
              <TravelTip>Drive up to the Redeemer of Maratea before 9 — the Gulf of Policastro is at its clearest.</TravelTip>
              <DayNode
                day={3}
                place="Praia a Mare · Isola di Dino"
                details={stopsForDay(3).stops}
                expanded={tipOpen}
                onToggle={() => setTipOpen((o) => !o)}
              />
            </div>
          </Container>
        </section>

        {/* Budget — Figma 24:559 */}
        <section aria-labelledby="budget-title">
          <Container className="flex flex-col gap-32 py-48 md:py-64">
            <div className="flex flex-wrap items-center gap-16">
              <h2 id="budget-title" className="type-h2 text-primary md:type-h1">
                Plan your budget
              </h2>
              <span className="flex-1" />
              <Switch
                size="small"
                label="Prices in USD"
                checked={currency === 'USD'}
                onChange={(on) => {
                  setCurrency(on ? 'USD' : 'EUR')
                  toast(on ? 'Showing prices in USD' : 'Showing prices in EUR')
                }}
              />
            </div>
            <div className="flex flex-col gap-32 xl:flex-row xl:items-start">
              <CompareCard
                className="xl:w-[760px] xl:shrink-0"
                budget={{ label: 'Budget version', eur: trip.priceEur, lines: ['B&Bs', 'Rental car', 'Public beaches'] }}
                comfort={{ label: 'Comfort version', eur: trip.comfortEur, lines: ['Sea-view hotels', 'Private boat day', 'Lido with sunbeds'] }}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-8">
                <h3 className="type-label text-secondary">Before you go</h3>
                {checklist.map((c) => (
                  <ChecklistItem
                    key={c.id}
                    title={c.title}
                    error={c.error}
                    done={!!done[c.id]}
                    onToggle={(v) => {
                      setDone((d) => ({ ...d, [c.id]: v }))
                      toast(v ? 'Marked as done' : 'Marked as to do')
                    }}
                    tags={taskTags[c.id] ?? []}
                    onRemoveTag={(t) => setTaskTags((tt) => ({ ...tt, [c.id]: (tt[c.id] ?? []).filter((x) => x !== t) }))}
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Journal — Figma 24:611 */}
        <section id="journal" aria-labelledby="journal-title" className="bg-surface">
          <Container className="flex flex-col gap-32 py-48 md:py-64">
            <div className="flex flex-wrap items-center gap-16">
              <h2 id="journal-title" className="type-h2 text-primary md:type-h1">
                From the journal
              </h2>
              {journalTag && (
                <div className="flex items-center gap-8">
                  <span className="type-caps text-secondary">Filtered by</span>
                  <Tag variant="control" label={journalTag} onRemove={() => toggleJournalTag(journalTag)} />
                </div>
              )}
            </div>
            {visiblePosts.length ? (
              <ul className="grid gap-32 md:grid-cols-2">
                {visiblePosts.map((p) => (
                  <li key={p.id} className="flex min-w-0 flex-col gap-16">
                    <img src={photo(p.photo)} alt="" loading="lazy" className="h-[240px] w-full object-cover md:h-[340px]" />
                    <JournalPreview date={p.date} title={p.title} meta={p.meta} excerpt={p.excerpt} href="/journal" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="type-body text-secondary">No journal posts tagged {journalTag} yet.</p>
            )}
          </Container>
        </section>

        <Gallery items={gallery} />
        <Newsletter />
      </main>
    </>
  )
}
