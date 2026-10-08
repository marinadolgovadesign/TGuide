import { marked } from 'marked'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import tokens from '../../design/tokens.json'
import figma from '../../design/figma-components.json'
import { Avatar, AvatarGroup } from '../components/atoms/Avatar'
import { Bookmark } from '../components/atoms/Bookmark'
import { Button, type ButtonVariant, type ForcedState } from '../components/atoms/Button'
import { Dropdown } from '../components/atoms/Dropdown'
import { ErrorMessage } from '../components/atoms/ErrorMessage'
import { Icon, iconNames } from '../components/atoms/Icon'
import { Input } from '../components/atoms/Input'
import { ListRow } from '../components/atoms/ListRow'
import { ProgressBar } from '../components/atoms/ProgressBar'
import { SeasonChart } from '../components/atoms/SeasonChart'
import { SegmentedTabs } from '../components/atoms/SegmentedTabs'
import { Status, type StatusKind } from '../components/atoms/Status'
import { Switch } from '../components/atoms/Switch'
import { Tag } from '../components/atoms/Tag'
import { TextArea } from '../components/atoms/TextArea'
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
import { DayTracker } from '../components/organisms/Header'
import { Hero } from '../components/organisms/Hero'
import { NavItem } from '../components/organisms/NavItem'
import { SecondRow } from '../components/organisms/SecondRow'
import { TopMenu } from '../components/organisms/TopMenu'
import { Container } from '../components/sections/Container'
import { author, budget, dayGroups, days, posts, trip } from '../content/trip'
import { cn } from '../lib/cn'
import { useCurrency, useMoney } from '../lib/currency'
import { photo } from '../lib/photos'
import { PageShell } from './PageShell'

// ---------- docs ----------
const docFiles = import.meta.glob<string>('../components/**/*.docs.md', { query: '?raw', import: 'default', eager: true })
function docHtml(name: string) {
  const key = Object.keys(docFiles).find((k) => k.endsWith(`/${name}.docs.md`))
  if (!key) return '<p>No docs yet.</p>'
  return marked.parse(docFiles[key].replace(/^# .*\n/, ''), { async: false })
}
const figmaUrl = (id: string) => `https://www.figma.com/design/${figma.fileKey}/?node-id=${id.replace(':', '-')}`
const nodeOf = (group: 'atoms' | 'molecules' | 'organisms', name: string): string | undefined => {
  const g = figma[group] as Record<string, { id?: string; nodes?: Record<string, string> }>
  return g[name]?.id ?? (g[name]?.nodes ? figma.sections[group === 'atoms' ? 'atoms' : group] : undefined)
}

// ---------- tokens ----------
const primitives = tokens.primitives as Record<string, string>
function resolve(name: string): string {
  const v = primitives[name]
  const alias = v?.match(/^\{(.+)\}$/)
  return alias ? resolve(alias[1]) : v
}
const primitiveGroups = Object.keys(primitives).reduce<Record<string, string[]>>((acc, name) => {
  const group = name.startsWith('brand/') ? name.split('/').slice(0, 2).join('/') : name.split('/')[0]
  ;(acc[group] ??= []).push(name)
  return acc
}, {})
const semantic = tokens.semantic as Record<string, { light: string; dark: string }>
const semanticGroups = Object.keys(semantic).reduce<Record<string, string[]>>((acc, name) => {
  const group = name.split('/')[0]
  ;(acc[group] ??= []).push(name)
  return acc
}, {})
const typeUtil: Record<string, string> = {
  H1: 'type-h1',
  H2: 'type-h2',
  Description: 'type-description',
  H3: 'type-h3',
  H4: 'type-h4',
  'Text - Label': 'type-label',
  'Text - Body': 'type-body',
  'Text - Body Bold': 'type-body-bold',
  Caps: 'type-caps',
  'Button - Serif': 'type-button-serif',
  Numeral: 'type-numeral',
  'Numeral S': 'type-numeral-s',
}

// ---------- layout helpers ----------
function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-strong pt-32 pb-64">
      <h2 id={`${id}-title`} className="type-h2 text-primary md:type-h1">
        {title}
      </h2>
      {intro && <p className="type-body mt-12 max-w-[620px] text-secondary">{intro}</p>}
      <div className="mt-32 flex flex-col gap-48">{children}</div>
    </section>
  )
}

function Spec({
  name,
  group,
  docName = name,
  demoClassName,
  wide,
  children,
}: {
  name: string
  group: 'atoms' | 'molecules' | 'organisms'
  docName?: string
  demoClassName?: string
  /** Full-width demo with the doc underneath (large components, variant matrices). */
  wide?: boolean
  children: ReactNode
}) {
  const node = nodeOf(group, name)
  return (
    <article
      id={`c-${name.toLowerCase()}`}
      className={cn('grid scroll-mt-24 gap-24', !wide && '2xl:grid-cols-[minmax(0,1fr)_400px]')}
    >
      <div className="flex min-w-0 flex-col gap-12">
        <div className="flex items-baseline gap-12">
          <h3 className="type-h3 text-primary">{name}</h3>
          {node && (
            <a href={figmaUrl(node)} target="_blank" rel="noreferrer" className="type-caps text-link hover:text-link-hover">
              Figma {node} ↗
            </a>
          )}
        </div>
        <div className={cn('flex flex-wrap items-start gap-16 bg-page p-24', demoClassName)}>{children}</div>
      </div>
      <div
        className={cn('prose-ed min-w-0', wide ? 'max-w-[760px]' : '2xl:pt-[38px]')}
        dangerouslySetInnerHTML={{ __html: docHtml(docName) }}
      />
    </article>
  )
}

const nav = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Radius' },
  { id: 'atoms', label: 'Atoms' },
  { id: 'molecules', label: 'Molecules' },
  { id: 'organisms', label: 'Organisms' },
]

// ---------- page ----------
/** `/design-system` — showcase in Figma order with live components beside their docs. */
export function DesignSystem() {
  return (
    <PageShell
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Design system' }]}
      title="Eight Days design system"
      intro="Tokens, type and components behind the Scalea to Maratea itinerary. Every example is live."
    >
      <Container className="grid gap-32 pb-64 lg:grid-cols-[160px_minmax(0,1fr)]">
        <nav aria-label="Design system sections" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex flex-wrap gap-x-24 gap-y-8 lg:flex-col">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="type-label text-secondary hover:text-link">
                  {n.label}
                </a>
              </li>
            ))}
            <li className="lg:mt-16">
              <Link to="/release-notes" className="type-caps text-link hover:text-link-hover">
                Release notes →
              </Link>
            </li>
            <li>
              <span className="type-caps text-muted">v1.0.0 · 6 Oct 2026</span>
            </li>
          </ul>
        </nav>

        <div className="min-w-0">
          <Colors />
          <Typography />
          <Spacing />
          <Radius />
          <Atoms />
          <Molecules />
          <Organisms />
        </div>
      </Container>
    </PageShell>
  )
}

function Swatch({ color, name, value, sub }: { color: string; name: string; value: string; sub?: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="h-[56px] w-full border border-subtle" style={{ background: color }} />
      <div className="flex flex-col gap-2">
        <span className="type-body-bold text-primary">{name}</span>
        {sub && <span className="type-caps text-accent">{sub}</span>}
        <span className="type-caps text-muted">{value}</span>
      </div>
    </div>
  )
}

function Colors() {
  return (
    <Section id="colors" title="Colors" intro="Primitives hold raw values. Components use semantic tokens only, which alias primitives per mode.">
      <div className="flex flex-col gap-32">
        <h3 className="type-label text-secondary">Primitives</h3>
        {Object.entries(primitiveGroups).map(([group, names]) => (
          <div key={group} className="flex flex-col gap-12">
            <p className="type-caps text-muted">{group}</p>
            <div className="grid grid-cols-3 gap-12 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
              {names.map((n) => {
                const alias = primitives[n].match(/^\{(.+)\}$/)?.[1]
                return <Swatch key={n} color={resolve(n)} name={n.split('/').pop()!} value={resolve(n)} sub={alias ? `→ ${alias}` : undefined} />
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-24">
        <h3 className="type-label text-secondary">Semantic · Light / Dark</h3>
        {Object.entries(semanticGroups).map(([group, names]) => (
          <div key={group} className="overflow-x-auto" tabIndex={0} aria-label={`${group} tokens`}>
            <table className="w-full min-w-[560px] border-collapse">
              <caption className="type-caps pb-8 text-left text-muted">{group}</caption>
              <thead>
                <tr className="type-caps text-muted">
                  <th className="border-b border-strong py-8 pr-12 text-left font-normal">Token</th>
                  <th className="border-b border-strong py-8 pr-12 text-left font-normal">Light</th>
                  <th className="border-b border-strong py-8 text-left font-normal">Dark</th>
                </tr>
              </thead>
              <tbody>
                {names.map((n) => (
                  <tr key={n}>
                    <td className="type-body border-b border-subtle py-8 pr-12 text-primary">
                      <code>{n}</code>
                    </td>
                    {(['light', 'dark'] as const).map((m) => (
                      <td key={m} className="border-b border-subtle py-8 pr-12">
                        <span className="flex items-center gap-8">
                          <span className="size-24 shrink-0 border border-subtle" style={{ background: resolve(semantic[n][m]) }} />
                          <span className="type-caps text-secondary">
                            {semantic[n][m]} · {resolve(semantic[n][m])}
                          </span>
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Typography() {
  return (
    <Section id="typography" title="Typography" intro="Cormorant Garamond for display, Gothic A1 for UI, Instrument Serif for numerals. Use the type-* utilities.">
      <ul className="flex flex-col">
        {Object.entries(tokens.textStyles).map(([name, s]) => (
          <li key={name} className="grid gap-8 border-b border-subtle py-20 md:grid-cols-[200px_1fr] md:items-baseline">
            <div className="flex flex-col gap-4">
              <span className="type-body-bold text-primary">{name}</span>
              <code className="type-caps text-accent">{typeUtil[name]}</code>
              <span className="type-caps text-muted">
                {s.font} {s.weight}
                {'italic' in s && s.italic ? ' italic' : ''} · {s.size}/{s.lineHeight} · {s.letterSpacing}
              </span>
            </div>
            <p className={cn(typeUtil[name], 'min-w-0 break-words text-primary')}>
              {name.startsWith('Numeral') ? '8 · 120 · €1 450' : 'Scalea to Maratea'}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Spacing() {
  return (
    <Section id="spacing" title="Spacing" intro="A 4 px grid. Utilities are named by px: p-16 = 16 px, gap-24 = 24 px. Nothing outside this scale exists.">
      <ul className="flex flex-col gap-12">
        {Object.entries(tokens.spacing).map(([name, v]) => (
          <li key={name} className="flex items-center gap-16">
            <code className="type-caps w-[88px] text-secondary">{name}</code>
            <span className="h-16 bg-brand-soft" style={{ width: v }} />
            <span className="type-caps text-muted">{v}px</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Radius() {
  return (
    <Section id="radius" title="Radius" intro="The brand is square-cornered: radius/none is the default. Round only avatars, switches and the bookmark.">
      <ul className="flex flex-wrap gap-24">
        {Object.entries(tokens.radius).map(([name, v]) => (
          <li key={name} className="flex flex-col items-start gap-8">
            <span className="size-64 border border-strong bg-brand-subtle" style={{ borderRadius: v }} />
            <code className="type-caps text-secondary">{name}</code>
            <span className="type-caps text-muted">{v}px</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

// ---------- atoms ----------
const buttonTypes: { v: ButtonVariant; label: string; text: string; sub?: string }[] = [
  { v: 'secondary', label: 'secondary', text: 'Explore itinerary' },
  { v: 'onColor', label: 'on color', text: 'Explore itinerary' },
  { v: 'smallCta', label: 'small CTA', text: 'View trip' },
  { v: 'bigCta', label: 'big CTA', text: 'Plan my 8 days' },
  { v: 'ghost', label: 'ghost', text: 'Read more' },
  { v: 'dayNode', label: 'day node', text: 'Day 01', sub: 'Scalea' },
]
const states: (ForcedState | 'default')[] = ['default', 'hover', 'pressed', 'focus', 'disabled']

function Atoms() {
  const [saved, setSaved] = useState(false)
  const [on, setOn] = useState(true)
  const [small, setSmall] = useState(false)
  const [tab, setTab] = useState('overview')
  const [progress, setProgress] = useState(75)
  const [tags, setTags] = useState(['Italy', 'Coast', 'Beaches'])
  const [filter, setFilter] = useState<string | null>('Coast')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string>()
  const [region, setRegion] = useState<string | null>('Southern Europe')
  const [season, setSeason] = useState<string | null>(null)
  const regions = ['Southern Europe', 'Western Europe', 'Northern Europe'].map((r) => ({ value: r, label: r }))

  return (
    <Section id="atoms" title="Atoms" intro="The smallest building blocks. Figma section ds-atoms (3:2).">
      <Spec wide name="Icon" group="atoms">
        <ul className="grid grid-cols-3 gap-16 sm:grid-cols-6">
          {iconNames.map((n) => (
            <li key={n} className="flex flex-col items-center gap-8 bg-surface px-12 py-16 text-primary">
              <Icon name={n} size={24} />
              <span className="type-caps text-secondary">{n}</span>
            </li>
          ))}
        </ul>
      </Spec>

      <Spec wide name="Button" group="atoms" demoClassName="flex-col p-16">
        <div className="max-w-full overflow-x-auto" tabIndex={0} aria-label="Button variant matrix">
          <table className="border-separate border-spacing-x-8 border-spacing-y-12">
            <caption className="type-caps pb-4 text-left text-muted">Type × State (Figma 3:109, transposed to fit)</caption>
            <thead>
              <tr>
                <th>
                  <span className="sr-only">State</span>
                </th>
                {buttonTypes.map((t) => (
                  <th key={t.v} className="type-caps text-left font-normal whitespace-nowrap text-muted">
                    {t.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {states.map((s) => (
                <tr key={s}>
                  <th className="type-caps pr-4 text-left font-normal text-muted">{s}</th>
                  {buttonTypes.map((t) => (
                    <td key={t.v} className="align-middle">
                      <Button
                        variant={t.v}
                        sublabel={t.sub}
                        forceState={s === 'default' ? undefined : s}
                        tabIndex={-1}
                        aria-hidden
                      >
                        {t.text}
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="type-caps text-muted">Live: hover, press, Tab to focus</p>
        <div className="flex flex-wrap items-center gap-12">
          <Button variant="smallCta">View trip</Button>
          <Button variant="secondary">Explore itinerary</Button>
          <Button variant="ghost">Read more</Button>
          <Button variant="smallCta" disabled>
            Sold out
          </Button>
        </div>
      </Spec>

      <Spec name="Tag" group="atoms" demoClassName="flex-col">
        <div className="flex flex-wrap items-center gap-12">
          <Tag variant="control" label="Italy" onRemove={() => {}} />
          <Tag variant="static" label="Italy" />
          <Tag variant="accent" label="Italy" />
          <span className="bg-brand p-8">
            <Tag variant="onPhoto" label="Italy" />
          </span>
        </div>
        <p className="type-caps text-muted">Control tags remove themselves · static tags toggle</p>
        <div className="flex flex-wrap gap-4">
          {tags.map((t) => (
            <Tag key={t} variant="control" label={t} onRemove={() => setTags(tags.filter((x) => x !== t))} />
          ))}
          {tags.length < 3 && (
            <Button variant="ghost" arrow={false} onClick={() => setTags(['Italy', 'Coast', 'Beaches'])}>
              Reset
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          {trip.tags.map((t) => (
            <Tag key={t} variant="static" label={t} pressed={filter === t} onClick={() => setFilter(filter === t ? null : t)} />
          ))}
        </div>
      </Spec>

      <Spec name="Status" group="atoms" demoClassName="flex-col">
        {(['bookable', 'popular', 'soldOut', 'offSeason'] as StatusKind[]).map((s) => (
          <Status key={s} status={s} />
        ))}
      </Spec>

      <Spec name="Switch" group="atoms" demoClassName="flex-col">
        <Switch checked={on} onChange={setOn} label={on ? 'On · big' : 'Off · big'} />
        <Switch checked={small} onChange={setSmall} size="small" label={small ? 'On · small' : 'Off · small'} />
        <CurrencySwitchDemo />
      </Spec>

      <Spec name="Bookmark" group="atoms">
        <Bookmark saved={false} label="Not saved example" />
        <Bookmark saved label="Saved example" />
        <span className="type-caps self-center text-muted">Live →</span>
        <Bookmark saved={saved} onToggle={setSaved} />
      </Spec>

      <Spec name="SegmentedTabs" group="atoms">
        <SegmentedTabs
          aria-label="Example view"
          value={tab}
          onChange={setTab}
          options={[
            { value: 'overview', label: 'Overview' },
            { value: 'days', label: 'Day by day' },
            { value: 'map', label: 'Map' },
          ]}
        />
      </Spec>

      <Spec name="ProgressBar" group="atoms" demoClassName="flex-col">
        <ProgressBar value={progress} label="Default progress" />
        <ProgressBar value={progress} size="big" label="Big progress" />
        <ProgressBar value={20} label="20 percent" />
        <label className="flex w-full items-center gap-12">
          <span className="type-caps text-secondary">Value {progress}%</span>
          <input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(+e.target.value)} className="flex-1 accent-(--action-primary)" />
        </label>
      </Spec>

      <Spec name="Avatar" group="atoms">
        <Avatar person="author" initials="MD" name="Marina Dolgova, author" />
        <Avatar person="guest" initials="AL" name="Ana López, guest" />
        <Avatar person="local" initials="KO" name="Kofi Owusu, local" />
      </Spec>

      <Spec name="AvatarGroup" group="atoms">
        <AvatarGroup
          people={[
            { initials: 'MD', name: 'Marina Dolgova', person: 'author' },
            { initials: 'AL', name: 'Ana López', person: 'guest' },
            { initials: 'KO', name: 'Kofi Owusu', person: 'local' },
          ]}
          more={12}
        />
      </Spec>

      <Spec name="Input" group="atoms">
        <Input
          label="Email"
          placeholder="you@example.com"
          value={email}
          error={emailError}
          onChange={(e) => {
            setEmail(e.target.value)
            setEmailError(undefined)
          }}
          onBlur={() => setEmailError(email && !email.includes('@') ? 'That email doesn’t look right' : undefined)}
        />
        <Input label="Name" defaultValue="Marina" />
        <Input label="Disabled" disabled placeholder="Not available" />
      </Spec>

      <Spec name="TextArea" group="atoms">
        <TextArea label="Your question" placeholder="What should I pack for Maratea in June?" />
      </Spec>

      <Spec name="Dropdown" group="atoms" demoClassName="min-h-[260px]">
        <Dropdown label="Region" options={regions} value={region} onChange={setRegion} placeholder="Any region" />
        <Dropdown
          label="Season"
          options={['Spring', 'Summer', 'Autumn', 'Winter'].map((s) => ({ value: s, label: s }))}
          value={season}
          onChange={setSeason}
          placeholder="Any season"
        />
        <Dropdown variant="onColor" label="Region" options={regions} value={region} onChange={setRegion} placeholder="Any region" />
        <Dropdown variant="onColor" label="Region" options={regions} value={null} onChange={() => {}} placeholder="Any region" />
      </Spec>

      <Spec name="ErrorMessage" group="atoms">
        <ErrorMessage>Choose your travel dates to see availability</ErrorMessage>
      </Spec>

      <Spec name="SeasonChart" group="atoms" demoClassName="pt-64">
        <SeasonChart />
      </Spec>

      <Spec wide name="ListRow" group="atoms" demoClassName="flex-col">
        <ListRow title="Scalea to Maratea" country="Italy" meta="8 days · 3 stops" updated="Updated 24.05.2026" onView={() => {}} className="w-full" />
      </Spec>
    </Section>
  )
}

function CurrencySwitchDemo() {
  const { currency, setCurrency } = useCurrency()
  const money = useMoney()
  return (
    <Switch
      size="small"
      checked={currency === 'USD'}
      onChange={(v) => setCurrency(v ? 'USD' : 'EUR')}
      label={`Prices in USD (site-wide) · ${money(1450)}`}
    />
  )
}

// ---------- molecules ----------
function Molecules() {
  const [open, setOpen] = useState(true)
  return (
    <Section id="molecules" title="Molecules" intro="Atoms combined into cards and blocks. Figma section ds-molecules (5:16).">
      <Spec wide name="Profile" group="molecules" demoClassName="flex-col">
        <Profile variant="long" {...author} />
        <Profile variant="short" {...author} />
        <Profile variant="shortOutlined" {...author} />
      </Spec>
      <Spec name="BudgetCard" group="molecules">
        <BudgetCard level={budget.level} parts={budget.parts} />
      </Spec>
      <Spec wide name="CompareCard" group="molecules">
        <CompareCard
          budget={{ label: 'Budget version', eur: 1450, lines: ['B&Bs', 'Rental car', 'Public beaches'] }}
          comfort={{ label: 'Comfort version', eur: 2980, lines: ['Sea-view hotels', 'Private boat day', 'Lido with sunbeds'] }}
        />
      </Spec>
      <Spec name="DestinationCard" group="molecules">
        <DestinationCard
          country="Italy"
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
      </Spec>
      <Spec name="DayNode" group="molecules">
        <DayNode day={3} place="Praia a Mare · Isola di Dino" details={dayGroups[1].stops} expanded={open} onToggle={() => setOpen(!open)} />
      </Spec>
      <Spec name="TravelTip" group="molecules">
        <TravelTip>Drive up to the Redeemer of Maratea before 9 — the Gulf of Policastro is at its clearest.</TravelTip>
      </Spec>
      <Spec wide name="ItineraryPreview" group="molecules">
        <ItineraryPreviewDemo />
      </Spec>
      <Spec name="ItinerarySummary" group="molecules">
        <SummaryDemo />
      </Spec>
      <Spec name="JournalPreview" group="molecules">
        <JournalPreview {...posts[0]} />
      </Spec>
      <Spec name="StatCard" group="molecules">
        <StatCard label="Kilometres" value="120" />
      </Spec>
    </Section>
  )
}

function ItineraryPreviewDemo() {
  const money = useMoney()
  return (
    <ItineraryPreview
      title={trip.title}
      stats={[
        { value: '8', label: 'Days' },
        { value: '3', label: 'Towns' },
        { value: '120', label: 'Kilometres' },
        { value: '14', label: 'Sights' },
        { value: money(trip.priceEur), label: 'From' },
      ]}
    />
  )
}

function SummaryDemo() {
  const [tag, setTag] = useState<string | null>(null)
  return <ItinerarySummary summary={trip.summary} tags={trip.tags} activeTag={tag} onTagClick={(t) => setTag(tag === t ? null : t)} />
}

// ---------- organisms ----------
function Organisms() {
  const [activeDay, setActiveDay] = useState(6)
  const [saved, setSaved] = useState(false)
  const [order, setOrder] = useState(dayGroups.map((g) => g.id))
  const [done, setDone] = useState({ a: false, b: true })
  const [heroView, setHeroView] = useState('overview')
  const views = [
    { value: 'overview', label: 'Overview' },
    { value: 'days', label: 'Day by day' },
    { value: 'map', label: 'Map' },
  ]
  const cols = order.map((id) => dayGroups.find((g) => g.id === id)!)
  return (
    <Section id="organisms" title="Organisms" intro="Page-level sections. Figma section ds-organisms (6:43).">
      <Spec name="NavItem" group="organisms">
        <NavItem to="#c-navitem" label="itineraries" active />
        <NavItem to="#c-navitem" label="destinations" active={false} />
      </Spec>
      <Spec wide name="TopMenu" group="organisms" demoClassName="block overflow-hidden p-0">
        <TopMenu />
      </Spec>
      <Spec wide name="SecondRow" group="organisms" demoClassName="block p-0">
        <SecondRow crumbs={[{ label: 'Home', to: '/' }, { label: 'Italy' }, { label: 'Scalea to Maratea' }]} />
        <SecondRow variant="actions" saved={saved} onSave={setSaved} />
      </Spec>
      <Spec wide name="Header" group="organisms" demoClassName="block p-0">
        <p className="type-caps px-16 pt-16 text-muted">Day tracker (menu and breadcrumbs as above) · click a day</p>
        <DayTracker days={days} activeDay={activeDay} onSelectDay={setActiveDay} />
      </Spec>
      <Spec wide name="Hero" group="organisms" demoClassName="flex-col p-0 gap-0">
        <Hero
          variant="brand"
          title={trip.title}
          subtitle={trip.subtitle}
          eyebrow="Italy · 8 days"
          season={trip.season}
          tags={trip.heroTags}
          views={views}
          onView={setHeroView}
          saved={saved}
          onSave={setSaved}
          titleAs="p"
          className="w-full"
        />
        <Hero
          variant="photo"
          photo={photo('hero')}
          title={trip.title}
          subtitle={trip.subtitle}
          eyebrow="Italy · 8 days"
          season={trip.season}
          tags={trip.heroTags}
          views={views}
          onView={setHeroView}
          saved={saved}
          onSave={setSaved}
          titleAs="p"
          className="w-full"
        />
        <p className="type-caps p-16 text-muted">Selected view: {heroView}</p>
      </Spec>
      <Spec wide name="EightDayBoard" group="organisms" demoClassName="block">
        <EightDayBoard columns={cols.map((g) => ({ id: g.id, label: g.label, town: g.town, stops: g.stops }))} onReorder={setOrder} />
      </Spec>
      <Spec wide name="ChecklistItem" group="organisms" demoClassName="flex-col gap-0">
        <ChecklistItem
          title="Book the Isola di Dino boat tour"
          error="Choose your travel dates to see availability"
          tags={['Boat']}
          done={done.a}
          onToggle={(v) => setDone({ ...done, a: v })}
        />
        <ChecklistItem title="Reserve a rental car from Scalea" tags={['Car']} done={done.b} onToggle={(v) => setDone({ ...done, b: v })} />
      </Spec>
    </Section>
  )
}
