import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, Sparkles } from 'lucide-react'
import { useMedSpa } from '@/context/MedSpaContext'
import { MEDICAL_DISCLAIMER, requestTreatmentGuide, type AIGuideResponse } from '@/services/aiService'
import { Reveal } from './Reveal'

const EXAMPLES = [
  "I'm concerned about fine lines around my eyes.",
  'I want brighter and smoother skin before an event.',
  'I want smoother skin and less noticeable fine lines.',
]

export function AITreatmentGuide() {
  const { config } = useMedSpa()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
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
    try {
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
    }
  }

  return (
    <Reveal>
      <div className="border border-border bg-card p-6 sm:p-10">
        <div className="flex items-start gap-3">
          <span className="mt-1 inline-flex size-9 items-center justify-center bg-muted text-accent">
            <Sparkles className="size-4" aria-hidden />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">VEYRA Treatment Guide</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Not sure where to start?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Tell us what you&apos;re hoping to improve and explore treatments worth discussing with a
              qualified provider.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label htmlFor="ai-query" className="block text-sm font-medium">
            What are you hoping to improve?
          </label>
          <textarea
            id="ai-query"
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={EXAMPLES[0]}
            className="w-full border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none focus:border-accent"
          />
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setQuery(ex)}
                className="border border-border px-3 py-1.5 text-left text-xs text-muted-foreground transition hover:border-accent hover:text-foreground"
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
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-espresso px-5 py-3 text-sm font-medium text-ivory disabled:opacity-60"
          >
            {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {loading ? 'Exploring options…' : 'Explore treatment categories'}
          </button>
        </form>

        {result && (
          <div className="mt-8 border-t border-border pt-8" aria-live="polite">
            <p className="text-sm leading-relaxed sm:text-base">{result.summary}</p>
            <ul className="mt-6 space-y-4">
              {result.suggestions.map((s) => (
                <li key={s.slug} className="border-l border-accent/40 pl-4">
                  <Link to={`/treatments/${s.slug}`} className="font-display text-xl hover:text-accent">
                    {s.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{s.reason}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/treatments"
                className="inline-flex border border-border px-4 py-2.5 text-sm font-medium"
              >
                Explore Treatment Options
              </Link>
              <Link
                to="/book"
                className="inline-flex bg-espresso px-4 py-2.5 text-sm font-medium text-ivory"
              >
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
          </div>
        )}

        {!result && (
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{MEDICAL_DISCLAIMER}</p>
        )}
      </div>
    </Reveal>
  )
}
