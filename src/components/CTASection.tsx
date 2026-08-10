import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './Reveal'

interface CTASectionProps {
  headline: string
  description?: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function CTASection({
  headline,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="section-pad py-20 sm:py-28">
      <Reveal>
        <div className="container-wide relative overflow-hidden rounded-sm bg-espresso px-8 py-14 text-ivory sm:px-14 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at 80% 20%, color-mix(in srgb, var(--sage) 45%, transparent), transparent 55%)',
            }}
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl text-balance sm:text-4xl lg:text-5xl">{headline}</h2>
            {description && (
              <p className="mt-4 text-base leading-relaxed text-ivory/75 sm:text-lg">{description}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={primaryHref}
                className="inline-flex items-center gap-2 bg-ivory px-6 py-3 text-sm font-medium tracking-wide text-espresso transition hover:bg-cream"
              >
                {primaryLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link
                  to={secondaryHref}
                  className="inline-flex items-center gap-2 border border-ivory/30 px-6 py-3 text-sm font-medium tracking-wide text-ivory transition hover:border-ivory/60"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
