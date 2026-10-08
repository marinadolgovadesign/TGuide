import { useRef, useState, type FormEvent } from 'react'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import { Container } from './Container'

type State = 'idle' | 'loading' | 'success'

/** Newsletter band (Figma 24:638): email validation, loading and success states. */
export function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>()
  const [state, setState] = useState<State>('idle')
  const input = useRef<HTMLInputElement>(null)

  function submit(e: FormEvent) {
    e.preventDefault()
    const v = email.trim()
    if (!v) setError('Enter your email address')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) setError('That email doesn’t look right')
    else {
      setError(undefined)
      setState('loading')
      window.setTimeout(() => setState('success'), 1200)
      return
    }
    input.current?.focus()
  }

  return (
    <section aria-labelledby="newsletter-title" className="bg-brand">
      <Container className="flex flex-col gap-32 py-64 lg:flex-row lg:items-center lg:gap-64">
        <div className="flex flex-col gap-8 text-on-brand">
          <h2 id="newsletter-title" className="type-h2 md:type-h1">
            Get the 8-day planner
          </h2>
          <p className="type-description max-w-[560px]">One coast, eight days, every booking link in one printable PDF.</p>
        </div>
        <span className="hidden flex-1 lg:block" />
        <div className="w-full bg-surface p-24 sm:w-auto" aria-live="polite">
          {state === 'success' ? (
            <div className="flex w-full flex-col gap-8 sm:w-[240px]">
              <p className="type-caps text-success">Sent</p>
              <p className="type-h4 text-primary">Check your inbox</p>
              <p className="type-body text-secondary">The planner is on its way to {email.trim()}.</p>
              <Button
                variant="ghost"
                className="-ml-4 self-start"
                onClick={() => {
                  setEmail('')
                  setState('idle')
                }}
              >
                Use another email
              </Button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="flex flex-col gap-16">
              <Input
                ref={input}
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                error={error}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError(undefined)
                }}
                disabled={state === 'loading'}
                className="w-full sm:w-[240px]"
              />
              <Button variant="smallCta" type="submit" disabled={state === 'loading'} className="self-start" aria-busy={state === 'loading'}>
                {state === 'loading' ? 'Sending…' : 'Send me the planner'}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
