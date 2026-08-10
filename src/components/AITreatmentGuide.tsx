import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMedSpa } from '@/context/MedSpaContext'
import { MEDICAL_DISCLAIMER, requestTreatmentGuide, type AIGuideResponse } from '@/services/aiService'
import { Reveal } from './Reveal'

const EXAMPLES = [
  "I'm concerned about fine lines and dull skin.",
  'I want brighter, smoother skin before an event.',
  'I want less noticeable fine lines around my eyes.',
]

export function AITreatmentGuide() {
  const { config } = useMedSpa()
  const reduce = useReducedMotion()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [result, setResult] = useState<AIGuideResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!query.trim()) {
      setError('Please describe what you hope to improve.')
      return
    }
    setError(null)
    setLoading(true)
    setResult(null)
    setStatus('Understanding your goals…')
    try {
      await new Promise((r) => setTimeout(r, reduce ? 0 : 650))
      setStatus('Treatments worth discussing')
      const response = await requestTreatmentGuide({
        query: query.trim(),
        brandName: config.brand.name,
        city: `${config.contact.city}, ${config.contact.state}`,
        treatments: config.treatments.map((t) => ({
          slug: t.slug,
          name: t.name,
          shortDescription: t.shortDescription,
          typicalConcern: t.typicalConcern,
          commonConcerns: t.commonConcerns,
        })),
      })
      setResult(response)
    } catch {
      setError('Something went wrong. Please try again or book a consultation.')
    } finally {
      setLoading(false)
      setStatus(null)
    }
  }

  return (
    <Reveal>
      <div className="relative">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl">Not sure where to start?</h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Tell us what you&apos;d like to improve.
          </p>
        </div>

        <div className="glass-strong glass-reflect relative overflow-hidden rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-10">
          <div
            className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full opacity-40"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, var(--beige) 55%, transparent), transparent 70%)',
              filter: 'blur(20px)',
            }}
            aria-hidden
          />

          <div className="relative flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/40 text-accent">
              <Sparkles className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-accent">
                {config.brand.shortName} Treatment Guide
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">An intelligent concierge — educational only</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="relative mt-8 space-y-5">
            <label htmlFor="ai-query" className="block text-sm font-medium text-espresso">
              What would you like to improve?
            </label>
            <textarea
              id="ai-query"
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={EXAMPLES[0]}
              className="field-glass min-h-[6.5rem] resize-y leading-relaxed"
            />
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setQuery(ex)}
                  className="rounded-full border border-white/40 bg-white/25 px-3.5 py-1.5 text-left text-xs text-muted-foreground transition hover:border-white/60 hover:bg-white/40 hover:text-foreground"
                >
                  {ex}
                </button>
              ))}
            </div>
            {error && (
              <p className="text-sm text-red-800" role="alert">
                {error}
              </p>
            )}
            <button type="submit" disabled={loading} className="btn-primary" data-cursor="cta">
              {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
              {loading ? 'Exploring…' : 'Explore Options'}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {(loading || status) && !result && (
              <motion.p
                key={status || 'loading'}
                className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/50 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {status || 'Understanding your goals…'}
              </motion.p>
            )}
          </AnimatePresence>

          {result && (
            <motion.div
              className="relative mt-8 border-t border-white/35 pt-8"
              aria-live="polite"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-accent">
                Treatments worth discussing
              </p>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">{result.summary}</p>
              <ul className="mt-6 space-y-3">
                {result.suggestions.map((s) => (
                  <li key={s.slug} className="glass-light rounded-2xl p-4 transition hover:bg-white/35">
                    <Link
                      to={`/treatments/${s.slug}`}
                      className="font-display text-xl text-espresso hover:text-accent sm:text-2xl"
                    >
                      {s.name}
                    </Link>
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.reason}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/treatments" className="btn-glass">
                  Explore Treatment Options
                </Link>
                <Link to="/book" className="btn-primary">
                  Book a Consultation
                </Link>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                {result.disclaimer || MEDICAL_DISCLAIMER}
                {result.source === 'mock' && (
                  <span className="mt-1 block opacity-80">
                    Demo mode: structured knowledge-base matching. Connect a secure API for live AI.
                  </span>
                )}
              </p>
            </motion.div>
          )}

          {!result && (
            <p className="relative mt-6 text-xs leading-relaxed text-muted-foreground">
              {MEDICAL_DISCLAIMER}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  )
}
