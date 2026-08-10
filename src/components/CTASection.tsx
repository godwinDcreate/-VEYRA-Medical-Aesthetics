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
    <section className="section-pad py-16 sm:py-24">
      <Reveal>
        <div className="container-wide relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #2c2a26 0%, #1a1612 55%, #3a3530 100%)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 top-0 size-80 rounded-full opacity-40"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, var(--beige) 40%, transparent), transparent 70%)',
              filter: 'blur(30px)',
            }}
            aria-hidden
          />
          <div className="glass-dark relative mx-auto max-w-none rounded-[1.75rem] px-8 py-14 sm:rounded-[2rem] sm:px-14 sm:py-16">
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl text-balance text-ivory sm:text-4xl lg:text-5xl">
                {headline}
              </h2>
              {description && (
                <p className="mt-4 text-base leading-relaxed text-ivory/70 sm:text-lg">{description}</p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={primaryHref}
                  className="inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 text-sm font-medium tracking-wide text-espresso transition hover:-translate-y-0.5 hover:bg-cream"
                  data-cursor="cta"
                >
                  {primaryLabel}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                {secondaryLabel && secondaryHref && (
                  <Link
                    to={secondaryHref}
                    className="inline-flex items-center gap-2 rounded-full border border-ivory/25 bg-white/5 px-6 py-3 text-sm font-medium tracking-wide text-ivory backdrop-blur-sm transition hover:border-ivory/45 hover:bg-white/10"
                    data-cursor="cta"
                  >
                    {secondaryLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
