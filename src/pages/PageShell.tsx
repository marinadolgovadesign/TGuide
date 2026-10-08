import type { ReactNode } from 'react'
import type { Crumb } from '../components/organisms/SecondRow'
import { SecondRow } from '../components/organisms/SecondRow'
import { TopMenu } from '../components/organisms/TopMenu'
import { Container } from '../components/sections/Container'

/** Header (menu + breadcrumbs) and page title for secondary pages. */
export function PageShell({ crumbs, title, intro, children }: { crumbs: Crumb[]; title: string; intro?: string; children: ReactNode }) {
  return (
    <>
      <header className="bg-muted">
        <TopMenu />
        <SecondRow crumbs={crumbs} />
      </header>
      <main id="main">
        <Container className="flex flex-col gap-16 pt-48 pb-32 md:pt-64">
          <h1 className="type-h2 text-primary md:type-h1">{title}</h1>
          {intro && <p className="type-description max-w-[720px] text-secondary">{intro}</p>}
        </Container>
        {children}
      </main>
    </>
  )
}
